"use client"

import { useState } from "react"
import { RELIC_LIST, type RelicId } from "@/lib/relics"
import { useRelics } from "@/contexts/relics-provider"
import { MAP_RELIC_GOLD, RelicIcon } from "@/components/relic-icons"

export function MapRelicsTray() {
  const { ready, hasRelic } = useRelics()
  const [hovered, setHovered] = useState<RelicId | null>(null)

  return (
    <div className="shrink-0 border-t border-[#3d3830]/60 pt-3 mt-auto">
      <p className="text-[9px] uppercase tracking-widest text-[#6a6258] mb-2 [font-family:var(--font-disket)]">
        Relics
      </p>

      <div className="flex items-end gap-2">
        {RELIC_LIST.map((relic) => {
          const found = ready && hasRelic(relic.id)
          const isHovered = hovered === relic.id

          return (
            <div key={relic.id} className="relative">
              <button
                type="button"
                disabled={!found}
                onMouseEnter={() => found && setHovered(relic.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => found && setHovered(relic.id)}
                onBlur={() => setHovered(null)}
                className={`w-10 h-10 border flex items-center justify-center transition-colors ${
                  found
                    ? isHovered
                      ? "border-[#c4a882]/70 bg-[#1a1814]"
                      : "border-[#4a5c52] bg-[#141612] hover:border-[#c4a882]/50"
                    : "border-dashed border-[#3d3830]/50 bg-transparent cursor-default"
                }`}
                aria-label={found ? relic.label : "Unfound relic"}
              >
                {found ? (
                  <RelicIcon
                    id={relic.id}
                    tone="map"
                    mapColor={MAP_RELIC_GOLD}
                    className={relic.id === "lantern" ? "h-6 w-[11px]" : "w-5 h-5"}
                  />
                ) : (
                  <span
                    className="text-xs [font-family:var(--font-disket)]"
                    style={{ color: MAP_RELIC_GOLD, opacity: 0.35 }}
                  >
                    ?
                  </span>
                )}
              </button>

              {found && isHovered && (
                <div className="absolute bottom-full right-0 mb-2 w-44 p-3 border border-[#3d3830] bg-[#0e0c0a] shadow-lg z-10 pointer-events-none">
                  <p className="text-[10px] uppercase tracking-wide text-[#c4a882] mb-1 [font-family:var(--font-disket-bold)]">
                    {relic.label}
                  </p>
                  <p className="text-[9px] text-[#6a6258] mb-2 [font-family:var(--font-disket)]">
                    Found in {relic.foundIn}
                  </p>
                  <p className="text-[10px] leading-relaxed italic text-[#8a8070] [font-family:var(--font-disket)]">
                    &ldquo;{relic.marginalia}&rdquo;
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
