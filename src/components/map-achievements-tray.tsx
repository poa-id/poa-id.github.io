"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import { ACHIEVEMENT_LIST } from "@/lib/achievements"
import { useGamification } from "@/contexts/gamification-provider"

export function MapAchievementsTray() {
  const { unlocked } = useGamification()
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [tooltipRect, setTooltipRect] = useState<DOMRect | null>(null)

  const earned = ACHIEVEMENT_LIST.filter((a) => unlocked.includes(a.id))
  const total = ACHIEVEMENT_LIST.length
  const secretsTotal = ACHIEVEMENT_LIST.filter((a) => a.secret).length
  const secretsFound = ACHIEVEMENT_LIST.filter(
    (a) => a.secret && unlocked.includes(a.id)
  ).length

  const hoveredAchievement = earned.find((a) => a.id === hoveredId)

  const showTooltip = (id: string, rect: DOMRect) => {
    setHoveredId(id)
    setTooltipRect(rect)
  }

  const hideTooltip = () => {
    setHoveredId(null)
    setTooltipRect(null)
  }

  return (
    <div className="shrink-0 border-t border-[#3d3830]/60 pt-3 pb-1">
      <div className="flex items-center justify-between gap-2 mb-2">
        <p className="text-[9px] uppercase tracking-widest text-[#6a6258] [font-family:var(--font-disket)]">
          Trophies
        </p>
        <span className="text-[9px] text-[#8a8070] [font-family:var(--font-disket)]">
          {earned.length}/{total}
          {secretsTotal > 0 && (
            <span className="text-[#6a6258]"> · {secretsFound} secrets</span>
          )}
        </span>
      </div>

      <div className="h-[6rem]">
        {earned.length === 0 ? (
          <p className="text-[10px] text-[#5a5248] italic [font-family:var(--font-disket)] leading-relaxed">
            Nothing charted yet. Wander.
          </p>
        ) : (
          <ul className="h-full overflow-y-auto space-y-1.5 pr-1">
            {earned.map((achievement) => (
              <li key={achievement.id} className="shrink-0">
                <button
                  type="button"
                  className="w-full text-left text-[10px] text-[#c4a882]/90 hover:text-[#c4a882] transition-colors [font-family:var(--font-disket)] leading-snug"
                  onMouseEnter={(e) =>
                    showTooltip(achievement.id, e.currentTarget.getBoundingClientRect())
                  }
                  onMouseLeave={hideTooltip}
                  onFocus={(e) =>
                    showTooltip(achievement.id, e.currentTarget.getBoundingClientRect())
                  }
                  onBlur={hideTooltip}
                >
                  {achievement.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {hoveredAchievement &&
        tooltipRect &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed z-[100] w-44 p-2 border border-[#3d3830] bg-[#0e0c0a] shadow-lg pointer-events-none"
            style={{
              left: tooltipRect.left,
              top: tooltipRect.top - 8,
              transform: "translateY(-100%)",
            }}
            role="tooltip"
          >
            <p className="text-[10px] leading-relaxed italic text-[#8a8070] [font-family:var(--font-disket)]">
              {hoveredAchievement.description}
            </p>
          </div>,
          document.body
        )}
    </div>
  )
}
