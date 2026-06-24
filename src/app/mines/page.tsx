"use client"

import { SurfaceEntryEdge, SurfaceEntryInline } from "@/components/mines-entry"
import { RoomHeader } from "@/components/room-header"
import { RoomRelic } from "@/components/room-relic"
import { useCubeFaceThemeForSlug } from "@/hooks/use-cube-face-theme"
import { ROOMS } from "@/lib/room-content"

export default function MinesPage() {
  const theme = useCubeFaceThemeForSlug("deep")
  const game = ROOMS.deep.gameTeaser

  return (
    <div
      className="min-h-screen w-full flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-500"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <SurfaceEntryEdge />

      <RoomRelic
        id="lantern"
        className="fixed top-11 left-1/2 translate-x-[5.25rem] z-30 lg:top-9 lg:translate-x-[5.75rem]"
      />

      <div className="lg:hidden px-6 pt-4">
        <SurfaceEntryInline />
      </div>

      <main className="flex-1 flex items-center justify-center px-6 py-12 lg:pt-16">
        <div className="max-w-md space-y-8 w-full">
          <RoomHeader roomId="deep" textMuted={theme.textMuted} align="center" />

          {game && (
            <div className="text-center space-y-4">
              <h2 className="text-xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">
                {game.title}
              </h2>
              <p className="text-sm leading-relaxed [font-family:var(--font-disket)] opacity-80">
                {game.description}
              </p>
            </div>
          )}

          <p className="text-xs opacity-40 [font-family:var(--font-disket)] text-center">
            No playable build yet. Check back eventually.
          </p>
        </div>
      </main>
    </div>
  )
}
