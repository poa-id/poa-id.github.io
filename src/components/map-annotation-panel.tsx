"use client"

import {
  ROOM_ANNOTATIONS,
  getRoomLabel,
  getRoomState,
  type MapDirection,
} from "@/lib/hall-cube-map"
import type { CubeDirection } from "@/lib/cube-faces"

export function MapAnnotationPanel({
  direction,
  visitedFaces,
  deepMapUnlocked,
}: {
  direction: MapDirection | null
  visitedFaces: CubeDirection[]
  deepMapUnlocked: boolean
}) {
  if (!direction) {
    return (
      <div className="flex-1 flex items-center justify-center px-2 py-6">
        <p className="text-[10px] text-[#5a5248] text-center italic [font-family:var(--font-disket)] leading-relaxed">
          Select a charted room to read the marginalia.
        </p>
      </div>
    )
  }

  const state = getRoomState(direction, visitedFaces, deepMapUnlocked)

  if (state !== "discovered") {
    return (
      <div className="flex-1 flex items-center justify-center px-2 py-6">
        <p className="text-[10px] text-[#5a5248] text-center [font-family:var(--font-disket)]">
          Uncharted territory. Walk the rooms first.
        </p>
      </div>
    )
  }

  const label = getRoomLabel(direction)
  const annotation = ROOM_ANNOTATIONS[direction]

  return (
    <div className="flex-1 px-1 py-4 min-h-[8rem]">
      <p className="text-[10px] uppercase tracking-[0.15em] text-[#8a8070] mb-3 [font-family:var(--font-disket)]">
        Marginalia
      </p>
      <h3 className="text-sm uppercase tracking-wide text-[#c4a882] mb-3 [font-family:var(--font-disket-bold)]">
        {label}
      </h3>
      <p className="text-sm leading-relaxed italic text-[#8a8070] [font-family:var(--font-disket)]">
        &ldquo;{annotation}&rdquo;
      </p>
    </div>
  )
}
