"use client"

import { useState, type ReactNode } from "react"
import { ACHIEVEMENT_LIST } from "@/lib/achievements"
import { CUBE_ROOM_COUNT } from "@/lib/hall-cube-map"
import { useGamification } from "@/contexts/gamification-provider"
import { DIE_NUMERALS } from "@/lib/cube-die"

const RELIC_SLOTS = 3

export function MapRelicsTray() {
  const { unlocked, visitedFaces } = useGamification()
  const [expanded, setExpanded] = useState<string | null>(null)

  const hasDie = unlocked.includes("found_dice")
  const roomsFound = new Set(visitedFaces).size
  const achievementsEarned = unlocked.length
  const achievementsTotal = ACHIEVEMENT_LIST.length
  const secretsFound = ACHIEVEMENT_LIST.filter(
    (a) => a.secret && unlocked.includes(a.id)
  ).length
  const secretsTotal = ACHIEVEMENT_LIST.filter((a) => a.secret).length

  const relics: { id: string; label: string; icon: ReactNode }[] = []

  if (hasDie) {
    relics.push({
      id: "die",
      label: "Surveyor's Die",
      icon: (
        <span className="text-sm [font-family:var(--font-disket-bold)] leading-none">
          {DIE_NUMERALS[1]}
        </span>
      ),
    })
  }

  const emptySlots = Math.max(0, RELIC_SLOTS - relics.length)

  return (
    <div className="border-t border-[#3d3830]/60 pt-3 mt-auto">
      <p className="text-[9px] uppercase tracking-widest text-[#6a6258] mb-2 [font-family:var(--font-disket)]">
        Relics
      </p>

      <div className="flex items-end gap-2">
        {relics.map((relic) => (
          <div key={relic.id} className="relative">
            <button
              type="button"
              onClick={() =>
                setExpanded(expanded === relic.id ? null : relic.id)
              }
              className={`w-10 h-10 border flex items-center justify-center transition-colors ${
                expanded === relic.id
                  ? "border-[#c4a882] bg-[#1a1814] text-[#c4a882]"
                  : "border-[#4a4540] bg-[#141210] text-[#8a8070] hover:border-[#6a6258] hover:text-[#c4a882]"
              }`}
              aria-label={relic.label}
              aria-expanded={expanded === relic.id}
            >
              {relic.icon}
            </button>

            {expanded === relic.id && relic.id === "die" && (
              <div className="absolute bottom-full right-0 mb-2 w-44 p-3 border border-[#3d3830] bg-[#0e0c0a] shadow-lg z-10">
                <p className="text-[9px] uppercase tracking-widest text-[#6a6258] mb-2 [font-family:var(--font-disket)]">
                  {relic.label}
                </p>
                <ul className="text-[10px] text-[#8a8070] space-y-1 [font-family:var(--font-disket)]">
                  <li>
                    Rooms:{" "}
                    <span className="text-[#c4a882]">
                      {roomsFound}/{CUBE_ROOM_COUNT}
                    </span>
                  </li>
                  <li>
                    Trophies:{" "}
                    <span className="text-[#c4a882]">
                      {achievementsEarned}/{achievementsTotal}
                    </span>
                  </li>
                  <li>
                    Secrets:{" "}
                    <span className="text-[#c4a882]">
                      {secretsFound}/{secretsTotal}
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ))}

        {Array.from({ length: emptySlots }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="w-10 h-10 border border-dashed border-[#3d3830]/50 bg-transparent"
            aria-hidden
          />
        ))}
      </div>
    </div>
  )
}
