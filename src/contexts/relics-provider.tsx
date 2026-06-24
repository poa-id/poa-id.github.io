"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import {
  DEFAULT_RELICS_STATE,
  RELIC_STORAGE_KEY,
  RELICS_BY_ID,
  type RelicDefinition,
  type RelicId,
  type RelicsState,
} from "@/lib/relics"

const GAMIFICATION_STORAGE_KEY = "poa-portfolio-gamification"

interface RelicsContextValue {
  ready: boolean
  relics: RelicsState
  hasRelic: (id: RelicId) => boolean
  discover: (id: RelicId) => void
  recentDiscovery: RelicDefinition | null
  dismissDiscovery: () => void
}

const RelicsContext = createContext<RelicsContextValue | null>(null)

function loadRelics(): RelicsState {
  if (typeof window === "undefined") return DEFAULT_RELICS_STATE
  try {
    const raw = localStorage.getItem(RELIC_STORAGE_KEY)
    if (!raw) return DEFAULT_RELICS_STATE
    return { ...DEFAULT_RELICS_STATE, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_RELICS_STATE
  }
}

function saveRelics(state: RelicsState) {
  localStorage.setItem(RELIC_STORAGE_KEY, JSON.stringify(state))
}

function migrateLegacyDie(state: RelicsState): RelicsState {
  if (state.die || typeof window === "undefined") return state
  try {
    const raw = localStorage.getItem(GAMIFICATION_STORAGE_KEY)
    if (!raw) return state
    const parsed = JSON.parse(raw) as { unlockedAchievements?: string[] }
    if (parsed.unlockedAchievements?.includes("found_dice")) {
      return { ...state, die: true }
    }
  } catch {
    // ignore
  }
  return state
}

export function RelicsProvider({ children }: { children: React.ReactNode }) {
  const [relics, setRelics] = useState<RelicsState>(DEFAULT_RELICS_STATE)
  const [hydrated, setHydrated] = useState(false)
  const [recentDiscovery, setRecentDiscovery] = useState<RelicDefinition | null>(
    null
  )

  useEffect(() => {
    const fromStorage = loadRelics()
    const migrated = migrateLegacyDie(fromStorage)
    setRelics(migrated)
    if (migrated.die && !fromStorage.die) {
      saveRelics(migrated)
    }
    setHydrated(true)
  }, [])

  const hasRelic = useCallback(
    (id: RelicId) => relics[id],
    [relics]
  )

  const discover = useCallback((id: RelicId) => {
    setRelics((prev) => {
      if (prev[id]) return prev
      const next = { ...prev, [id]: true }
      saveRelics(next)
      setRecentDiscovery(RELICS_BY_ID[id])
      return next
    })
  }, [])

  const dismissDiscovery = useCallback(() => setRecentDiscovery(null), [])

  const value = useMemo(
    () => ({
      ready: hydrated,
      relics,
      hasRelic,
      discover,
      recentDiscovery,
      dismissDiscovery,
    }),
    [hydrated, relics, hasRelic, discover, recentDiscovery, dismissDiscovery]
  )

  return (
    <RelicsContext.Provider value={value}>{children}</RelicsContext.Provider>
  )
}

export function useRelics() {
  const ctx = useContext(RelicsContext)
  if (!ctx) {
    throw new Error("useRelics must be used within RelicsProvider")
  }
  return ctx
}
