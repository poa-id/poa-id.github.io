"use client"

import { Nav } from "@/components/nav"
import { HallActions } from "@/components/hall-actions"
import { WritingEntryEdge } from "@/components/writing-entry"
import {
  GardenEntryEdge,
  HearthEntryEdge,
  ShelfEntryEdge,
} from "@/components/cube-edge-tabs"
import { useTheme } from "next-themes"
import { useGamification } from "@/contexts/gamification-provider"
import { ROOMS } from "@/lib/room-content"
import { HALL_CONTENT_SPAN, HALL_DESKTOP_COLUMN, HALL_MOBILE_GRID } from "@/lib/hall-layout"
import { useState, useEffect } from "react"

type LightVideoKey = "forest" | "snow" | "water"
type DarkVideoKey = "campfire" | "moto"

function MobileHallWelcome() {
  const welcome = ROOMS.hall.homeWelcome
  if (!welcome) return null

  return (
    <section className={`${HALL_CONTENT_SPAN} space-y-3`}>
      <h1 className="text-xl tracking-wide leading-tight [font-family:var(--font-disket-bold)]">
        {welcome.name}
      </h1>

      <div className="space-y-0.5">
        {welcome.roles.map((role) => (
          <p
            key={role}
            className="text-sm text-foreground [font-family:var(--font-disket)]"
          >
            {role}
          </p>
        ))}
      </div>

      <div className="space-y-2 pt-1">
        {welcome.paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 24)}
            className="text-xs leading-snug text-muted-foreground font-light whitespace-pre-line"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <p className="text-xs text-muted-foreground font-light [font-family:var(--font-disket)]">
        {welcome.closing}
      </p>
    </section>
  )
}

export default function Home() {
  const { theme, systemTheme } = useTheme()
  const { recordLightVideo, recordDarkVideo, recordLightVideoSwitch, recordDarkVideoSwitch } = useGamification()
  const [mounted, setMounted] = useState(false)
  const [currentLightVideo, setCurrentLightVideo] = useState<LightVideoKey>("forest")
  const [currentDarkVideo, setCurrentDarkVideo] = useState<DarkVideoKey>("campfire")

  const lightVideos: Record<LightVideoKey, string> = {
    forest: "/forest-pixel.mp4",
    snow: "/snow.mp4",
    water: "/water.mp4",
  }

  const darkVideos: Record<DarkVideoKey, string> = {
    campfire: "/campfire-pixel.mp4",
    moto: "/moto.mp4",
  }

  const currentTheme = theme === "system" ? systemTheme : theme

  const selectLightVideo = (key: LightVideoKey) => {
    if (key !== currentLightVideo) {
      recordLightVideoSwitch()
    }
    recordLightVideo(key)
    setCurrentLightVideo(key)
  }

  const selectDarkVideo = (key: DarkVideoKey) => {
    if (key !== currentDarkVideo) {
      recordDarkVideoSwitch()
    }
    recordDarkVideo(key)
    setCurrentDarkVideo(key)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const media = window.matchMedia("(max-width: 1023px)")
    if (!media.matches) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    if (currentTheme === "light") {
      recordLightVideo(currentLightVideo)
    } else if (currentTheme === "dark") {
      recordDarkVideo(currentDarkVideo)
    }
  }, [mounted, currentTheme, currentLightVideo, currentDarkVideo, recordLightVideo, recordDarkVideo])

  const welcome = ROOMS.hall.homeWelcome

  if (!mounted) {
    return (
      <main className="h-[100dvh] lg:min-h-screen w-full overflow-hidden lg:overflow-visible">
        <Nav />
        <div className="lg:hidden fixed top-14 inset-x-0 bottom-0 bg-background" />
        <div className="hidden lg:flex h-[calc(100vh-6rem)] w-full">
          <div className="w-1/2 bg-background border-r border-gray-200 dark:border-gray-800" />
          <div className="w-1/2 bg-[#0C0E15]" />
        </div>
      </main>
    )
  }

  return (
    <main className="h-[100dvh] lg:min-h-screen w-full overflow-hidden lg:overflow-visible">
      <Nav />

      {/* Mobile: Hall welcome only — no map, no cube */}
      <div className="lg:hidden fixed top-14 inset-x-0 bottom-0 z-0 flex flex-col bg-background overflow-hidden">
        <div className="flex-1 min-h-0 flex items-center overflow-y-auto">
          <div className={`${HALL_MOBILE_GRID} ${HALL_DESKTOP_COLUMN} py-4`}>
            <MobileHallWelcome />
          </div>
        </div>
        <div className={`shrink-0 ${HALL_MOBILE_GRID} ${HALL_DESKTOP_COLUMN} pb-5`}>
          <HallActions compact className="mt-0" />
        </div>
      </div>

      {/* Desktop: full spatial hall */}
      <div className="hidden lg:contents">
        <WritingEntryEdge />
        <div className="fixed top-24 inset-x-0 bottom-0 z-0 flex flex-row isolate overflow-hidden">
          <div className="w-1/2 bg-background border-r border-gray-200 dark:border-gray-800">
            <div className="h-full flex items-center justify-center">
              <div className={`${HALL_MOBILE_GRID} ${HALL_DESKTOP_COLUMN}`}>
                <section className={`${HALL_CONTENT_SPAN} space-y-6`}>
                {welcome && (
                  <>
                    <h1 className="text-4xl tracking-wide [font-family:var(--font-disket-bold)]">
                      {welcome.name}
                    </h1>

                    <div className="space-y-1">
                      {welcome.roles.map((role) => (
                        <p
                          key={role}
                          className="text-xl text-foreground [font-family:var(--font-disket)]"
                        >
                          {role}
                        </p>
                      ))}
                    </div>

                    <div className="space-y-4 pt-2">
                      {welcome.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 24)}
                          className="text-base text-muted-foreground font-light whitespace-pre-line"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    <p className="text-base text-muted-foreground font-light [font-family:var(--font-disket)]">
                      {welcome.closing}
                    </p>
                  </>
                )}
                <HallActions />
                </section>
              </div>
            </div>
          </div>

          <div className="w-1/2 bg-[#0F1015] h-full relative overflow-hidden flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              <div
                className={`${
                  currentTheme === "light"
                    ? currentLightVideo === "snow"
                      ? "h-full w-full flex items-end overflow-hidden"
                      : "h-full w-full flex items-center overflow-hidden"
                    : "h-full w-full flex items-center overflow-hidden"
                } bg-[#0F1015] justify-center`}
              >
                <video
                  key={currentTheme === "light" ? currentLightVideo : currentDarkVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={`relative z-0 ${
                    currentTheme === "light"
                      ? currentLightVideo === "snow"
                        ? "w-[150%] max-w-none h-auto object-cover -mb-32"
                        : "w-full h-full object-cover"
                      : currentDarkVideo === "campfire"
                        ? "w-full h-full object-cover"
                        : "w-[150%] max-w-none h-auto object-cover"
                  }`}
                >
                  <source
                    src={currentTheme === "light" ? lightVideos[currentLightVideo] : darkVideos[currentDarkVideo]}
                    type="video/mp4"
                  />
                </video>
              </div>
              <div
                className={`absolute top-4 right-8 flex gap-3 p-2 rounded-full ${
                  currentTheme === "light" ? "bg-black/20" : "bg-white/5"
                } backdrop-blur-sm`}
              >
                {currentTheme === "light" ? (
                  <>
                    <button
                      onClick={() => selectLightVideo("forest")}
                      className={`w-5 h-5 rounded-full transition-all ${currentLightVideo === "forest" ? "bg-white scale-100" : "bg-black/50 hover:bg-black/30 scale-90"}`}
                      aria-label="Switch to forest video"
                    />
                    <button
                      onClick={() => selectLightVideo("snow")}
                      className={`w-5 h-5 rounded-full transition-all ${currentLightVideo === "snow" ? "bg-white scale-100" : "bg-black/50 hover:bg-black/30 scale-90"}`}
                      aria-label="Switch to snow video"
                    />
                    <button
                      onClick={() => selectLightVideo("water")}
                      className={`w-5 h-5 rounded-full transition-all ${currentLightVideo === "water" ? "bg-white scale-100" : "bg-black/50 hover:bg-black/30 scale-90"}`}
                      aria-label="Switch to water video"
                    />
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => selectDarkVideo("campfire")}
                      className={`w-5 h-5 rounded-full transition-all ${currentDarkVideo === "campfire" ? "bg-white scale-100" : "bg-white/20 hover:bg-white/30 scale-90"}`}
                      aria-label="Switch to campfire video"
                    />
                    <button
                      onClick={() => selectDarkVideo("moto")}
                      className={`w-5 h-5 rounded-full transition-all ${currentDarkVideo === "moto" ? "bg-white scale-100" : "bg-white/20 hover:bg-white/30 scale-90"}`}
                      aria-label="Switch to moto video"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <GardenEntryEdge />
        <ShelfEntryEdge />
        <HearthEntryEdge />
      </div>
    </main>
  )
}
