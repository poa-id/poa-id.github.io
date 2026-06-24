"use client"

import {
  ROOM_ANNOTATIONS,
  getRoomLabel,
  getRoomState,
  type MapDirection,
} from "@/lib/hall-cube-map"
import type { CubeDirection } from "@/lib/cube-faces"

function getMarginaliaContent(
  direction: MapDirection | null,
  visitedFaces: CubeDirection[],
  deepMapUnlocked: boolean
): { label: string; quote: string } {
  if (!direction) {
    return {
      label: "\u00a0",
      quote: "Select a charted room to read the marginalia.",
    }
  }

  const state = getRoomState(direction, visitedFaces, deepMapUnlocked)

  if (state !== "discovered") {
    return {
      label: getRoomLabel(direction),
      quote: "Uncharted territory. Walk the rooms first.",
    }
  }

  return {
    label: getRoomLabel(direction),
    quote: ROOM_ANNOTATIONS[direction],
  }
}

export function MapAnnotationPanel({
  direction,
  visitedFaces,
  deepMapUnlocked,
}: {
  direction: MapDirection | null
  visitedFaces: CubeDirection[]
  deepMapUnlocked: boolean
}) {
  const { label, quote } = getMarginaliaContent(
    direction,
    visitedFaces,
    deepMapUnlocked
  )

  return (
    <div className="shrink-0 px-1 pt-4 pb-3">
      <p className="text-[10px] uppercase tracking-[0.15em] text-[#8a8070] mb-2 [font-family:var(--font-disket)]">
        Marginalia
      </p>
      <h3 className="text-sm uppercase tracking-wide text-[#c4a882] mb-2 h-5 truncate [font-family:var(--font-disket-bold)]">
        {label}
      </h3>
      <p className="text-sm leading-relaxed italic text-[#8a8070] h-[5rem] line-clamp-3 [font-family:var(--font-disket)]">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  )
}
