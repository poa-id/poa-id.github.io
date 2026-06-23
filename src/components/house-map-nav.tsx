"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { HallCubeMap } from "@/components/hall-cube-map"
import { MapAnnotationPanel } from "@/components/map-annotation-panel"
import { MapRelicsTray } from "@/components/map-relics-tray"
import { MapScrollIcon } from "@/components/map-scroll-icon"
import { getFaceForPath, isDeepPath } from "@/lib/cube-faces"
import type { MapDirection } from "@/lib/hall-cube-map"
import { useGamification } from "@/contexts/gamification-provider"

export function HouseMapNav() {
  const pathname = usePathname()
  const { visitedFaces, deepMapUnlocked } = useGamification()
  const [open, setOpen] = useState(false)
  const [selectedDirection, setSelectedDirection] = useState<MapDirection | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  const currentFace = getFaceForPath(pathname)
  const onDeep = isDeepPath(pathname)
  const currentDirection: MapDirection = onDeep ? "deep" : currentFace.direction

  const toggle = () => setOpen((prev) => !prev)
  const close = () => setOpen(false)

  useEffect(() => {
    if (open) {
      setSelectedDirection(currentDirection)
    }
  }, [open, currentDirection])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }

    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          <div
            ref={navRef}
            className="w-full max-w-4xl max-h-[min(90vh,44rem)] flex flex-col border-2 border-[#3d3830] bg-[#0e0c0a] shadow-2xl animate-in zoom-in-95 fade-in duration-300"
            role="dialog"
            aria-label="Floor plan"
            aria-modal="true"
          >
            <header className="flex items-center justify-between px-5 py-4 border-b border-[#3d3830] shrink-0">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#6a6258] [font-family:var(--font-disket)]">
                  Surveyor&apos;s Notes
                </p>
                <h2 className="text-sm uppercase tracking-wide text-[#c4a882] mt-0.5 [font-family:var(--font-disket-bold)]">
                  Floor Plan
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                className="text-[10px] uppercase tracking-wide text-[#6a6258] hover:text-[#c4a882] px-3 py-1.5 border border-[#3d3830] hover:border-[#6a6258] transition-colors [font-family:var(--font-disket)]"
              >
                Close
              </button>
            </header>

            <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
              <div className="flex-1 flex items-center justify-center p-5 sm:p-8 overflow-auto min-h-0">
                <HallCubeMap
                  onNavigate={close}
                  selectedDirection={selectedDirection}
                  onSelectDirection={setSelectedDirection}
                />
              </div>

              <aside className="w-full lg:w-52 shrink-0 border-t lg:border-t-0 lg:border-l border-[#3d3830] flex flex-col px-4 py-4 min-h-[10rem]">
                <MapAnnotationPanel
                  direction={selectedDirection}
                  visitedFaces={visitedFaces}
                  deepMapUnlocked={deepMapUnlocked}
                />
                <MapRelicsTray />
              </aside>
            </div>

            <footer className="px-5 py-3 border-t border-[#3d3830]/60 shrink-0">
              <p className="text-[10px] text-[#4a4540] text-center italic [font-family:var(--font-disket)]">
                Rooms chart themselves as you wander.
              </p>
            </footer>
          </div>
        </div>
      )}

      <div className="fixed bottom-8 left-8 z-[60]">
        <button
          type="button"
          onClick={toggle}
          className="w-12 h-12 flex items-center justify-center border border-border bg-background/95 hover:bg-muted shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 text-foreground"
          aria-label={open ? "Close floor plan" : "Open floor plan"}
          aria-expanded={open}
        >
          <MapScrollIcon open={open} className="h-7 w-7" />
        </button>
      </div>
    </>
  )
}
