"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { ACHIEVEMENTS, type Achievement } from "@/lib/achievements"
import { getFaceForPath, isDeepPath, type CubeDirection } from "@/lib/cube-faces"

const STORAGE_KEY = "poa-portfolio-gamification"

const ALL_LIGHT_VIDEOS = ["forest", "snow", "water"]
const ALL_DARK_VIDEOS = ["campfire", "moto"]

interface GamificationState {
  unlockedAchievements: string[]
  visitedFaces: CubeDirection[]
  deepMapUnlocked: boolean
  themeToggleCount: number
  themesSeen: string[]
  lightVideosSeen: string[]
  darkVideosSeen: string[]
  lightVideoSwitchCount: number
  darkVideoSwitchCount: number
}

interface GamificationContextValue {
  unlocked: string[]
  visitedFaces: CubeDirection[]
  deepMapUnlocked: boolean
  recentUnlock: Achievement | null
  dismissUnlock: () => void
  unlock: (id: string) => void
  unlockDeepMap: () => void
  recordThemeToggle: (theme: "light" | "dark") => void
  recordLightVideo: (key: string) => void
  recordDarkVideo: (key: string) => void
  recordLightVideoSwitch: () => void
  recordDarkVideoSwitch: () => void
  recordFaceVisit: (direction: CubeDirection) => void
}

const defaultState: GamificationState = {
  unlockedAchievements: [],
  visitedFaces: [],
  deepMapUnlocked: false,
  themeToggleCount: 0,
  themesSeen: [],
  lightVideosSeen: [],
  darkVideosSeen: [],
  lightVideoSwitchCount: 0,
  darkVideoSwitchCount: 0,
}

const GamificationContext = createContext<GamificationContextValue | null>(null)

function loadState(): GamificationState {
  if (typeof window === "undefined") return defaultState
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    return { ...defaultState, ...JSON.parse(raw) }
  } catch {
    return defaultState
  }
}

function saveState(state: GamificationState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { theme } = useTheme()
  const [state, setState] = useState<GamificationState>(defaultState)
  const [hydrated, setHydrated] = useState(false)
  const [recentUnlock, setRecentUnlock] = useState<Achievement | null>(null)

  useEffect(() => {
    setState(loadState())
    setHydrated(true)
  }, [])

  const persist = useCallback((updater: (prev: GamificationState) => GamificationState) => {
    setState((prev) => {
      const next = updater(prev)
      saveState(next)
      return next
    })
  }, [])

  const unlock = useCallback((id: string) => {
    if (!ACHIEVEMENTS[id]) return

    setState((prev) => {
      if (prev.unlockedAchievements.includes(id)) return prev

      const next = {
        ...prev,
        unlockedAchievements: [...prev.unlockedAchievements, id],
      }
      saveState(next)
      setRecentUnlock(ACHIEVEMENTS[id])
      return next
    })
  }, [])

  const dismissUnlock = useCallback(() => setRecentUnlock(null), [])

  const unlockDeepMap = useCallback(() => {
    persist((prev) => {
      if (prev.deepMapUnlocked) return prev
      return { ...prev, deepMapUnlocked: true }
    })
    unlock("deep_map_found")
  }, [persist, unlock])

  // Migrate: visitors who reached The Deep before map unlock existed
  useEffect(() => {
    if (!hydrated) return
    if (
      state.unlockedAchievements.includes("face_down") &&
      !state.deepMapUnlocked
    ) {
      persist((prev) => ({ ...prev, deepMapUnlocked: true }))
    }
  }, [hydrated, state.unlockedAchievements, state.deepMapUnlocked, persist])

  const recordFaceVisit = useCallback(
    (direction: CubeDirection) => {
      persist((prev) => {
        if (prev.visitedFaces.includes(direction)) return prev
        return { ...prev, visitedFaces: [...prev.visitedFaces, direction] }
      })
    },
    [persist]
  )

  const recordThemeSeen = useCallback(
    (seenTheme: "light" | "dark") => {
      persist((prev) => {
        if (prev.themesSeen.includes(seenTheme)) return prev
        return { ...prev, themesSeen: [...prev.themesSeen, seenTheme] }
      })
    },
    [persist]
  )

  const recordThemeToggle = useCallback(
    (newTheme: "light" | "dark") => {
      persist((prev) => ({
        ...prev,
        themeToggleCount: prev.themeToggleCount + 1,
        themesSeen: prev.themesSeen.includes(newTheme)
          ? prev.themesSeen
          : [...prev.themesSeen, newTheme],
      }))
    },
    [persist]
  )

  const recordLightVideo = useCallback(
    (key: string) => {
      persist((prev) => {
        if (prev.lightVideosSeen.includes(key)) return prev
        return { ...prev, lightVideosSeen: [...prev.lightVideosSeen, key] }
      })
    },
    [persist]
  )

  const recordDarkVideo = useCallback(
    (key: string) => {
      persist((prev) => {
        if (prev.darkVideosSeen.includes(key)) return prev
        return { ...prev, darkVideosSeen: [...prev.darkVideosSeen, key] }
      })
    },
    [persist]
  )

  const recordLightVideoSwitch = useCallback(() => {
    persist((prev) => ({
      ...prev,
      lightVideoSwitchCount: prev.lightVideoSwitchCount + 1,
    }))
  }, [persist])

  const recordDarkVideoSwitch = useCallback(() => {
    persist((prev) => ({
      ...prev,
      darkVideoSwitchCount: prev.darkVideoSwitchCount + 1,
    }))
  }, [persist])

  // Record active theme on load
  useEffect(() => {
    if (!hydrated || !theme) return
    if (theme === "light" || theme === "dark") {
      recordThemeSeen(theme)
    }
  }, [hydrated, theme, recordThemeSeen])

  // Track cube face visits (The Deep is not a cube face)
  useEffect(() => {
    if (!hydrated || isDeepPath(pathname)) return
    recordFaceVisit(getFaceForPath(pathname).direction)
  }, [pathname, hydrated, recordFaceVisit])

  // Achievement side-effects
  useEffect(() => {
    if (!hydrated) return

    const face = getFaceForPath(pathname)
    const visitedCount = new Set([...state.visitedFaces, face.direction]).size
    const totalVideoSwitches = state.lightVideoSwitchCount + state.darkVideoSwitchCount

    if (face.direction === "front") unlock("face_front")
    if (face.direction === "left") unlock("face_left")
    if (face.direction === "right") unlock("face_right")
    if (face.direction === "back") unlock("face_back")
    if (face.direction === "top") unlock("face_top")
    if (face.direction === "bottom") unlock("face_bottom")
    if (isDeepPath(pathname)) {
      unlock("face_down")
      if (!state.deepMapUnlocked) {
        persist((prev) => ({ ...prev, deepMapUnlocked: true }))
        unlock("deep_map_found")
      }
    }
    if (visitedCount >= 3) unlock("cube_explorer")
    if (visitedCount >= 6) unlock("cube_complete")

    if (state.themeToggleCount >= 1) unlock("theme_lightswitch")
    if (state.themeToggleCount >= 3) unlock("theme_wanderer")
    if (state.themeToggleCount >= 5) unlock("theme_flipper_5")
    if (state.themeToggleCount >= 10) unlock("theme_flipper_10")
    if (state.themeToggleCount >= 50) unlock("theme_flipper_50")
    if (state.themesSeen.includes("light") && state.themesSeen.includes("dark")) {
      unlock("theme_both_worlds")
    }

    if (totalVideoSwitches >= 1) unlock("video_channel_change")
    if (state.lightVideoSwitchCount >= 3) unlock("video_day_tripper")
    if (state.darkVideoSwitchCount >= 1) unlock("video_night_shift")

    if (state.lightVideosSeen.includes("forest")) unlock("video_forest")
    if (state.lightVideosSeen.includes("snow")) unlock("video_snow")
    if (state.lightVideosSeen.includes("water")) unlock("video_water")
    if (state.darkVideosSeen.includes("campfire")) unlock("video_campfire")
    if (state.darkVideosSeen.includes("moto")) unlock("video_moto")

    if (ALL_LIGHT_VIDEOS.every((v) => state.lightVideosSeen.includes(v))) {
      unlock("video_day_complete")
    }
    if (ALL_DARK_VIDEOS.every((v) => state.darkVideosSeen.includes(v))) {
      unlock("video_night_complete")
    }
    if (
      ALL_LIGHT_VIDEOS.every((v) => state.lightVideosSeen.includes(v)) &&
      ALL_DARK_VIDEOS.every((v) => state.darkVideosSeen.includes(v))
    ) {
      unlock("video_pilgrim")
    }
  }, [
    hydrated,
    pathname,
    state.visitedFaces,
    state.themeToggleCount,
    state.themesSeen,
    state.lightVideosSeen,
    state.darkVideosSeen,
    state.lightVideoSwitchCount,
    state.darkVideoSwitchCount,
    state.deepMapUnlocked,
    unlock,
  ])

  const value = useMemo(
    () => ({
      unlocked: state.unlockedAchievements,
      visitedFaces: state.visitedFaces,
      deepMapUnlocked: state.deepMapUnlocked,
      recentUnlock,
      dismissUnlock,
      unlock,
      unlockDeepMap,
      recordThemeToggle,
      recordLightVideo,
      recordDarkVideo,
      recordLightVideoSwitch,
      recordDarkVideoSwitch,
      recordFaceVisit,
    }),
    [
      state.unlockedAchievements,
      state.visitedFaces,
      state.deepMapUnlocked,
      recentUnlock,
      dismissUnlock,
      unlock,
      unlockDeepMap,
      recordThemeToggle,
      recordLightVideo,
      recordDarkVideo,
      recordLightVideoSwitch,
      recordDarkVideoSwitch,
      recordFaceVisit,
    ]
  )

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  )
}

export function useGamification() {
  const ctx = useContext(GamificationContext)
  if (!ctx) {
    throw new Error("useGamification must be used within GamificationProvider")
  }
  return ctx
}
