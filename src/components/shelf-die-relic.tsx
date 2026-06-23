"use client"

import { useGamification } from "@/contexts/gamification-provider"
import { DIE_NUMERALS } from "@/lib/cube-die"

export function ShelfDieRelic() {
  const { unlocked, unlock } = useGamification()
  const found = unlocked.includes("found_dice")

  if (found) return null

  return (
    <button
      type="button"
      onClick={() => unlock("found_dice")}
      className="opacity-30 hover:opacity-80 transition-opacity p-1 border border-transparent hover:border-current rounded-sm"
      aria-label="Discover a relic on the shelf"
      title="Something small catches the light…"
    >
      <span
        className="text-lg leading-none [font-family:var(--font-disket-bold)]"
        aria-hidden
      >
        {DIE_NUMERALS[1]}
      </span>
    </button>
  )
}
