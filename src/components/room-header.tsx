"use client"

import type { RoomId } from "@/lib/room-content"
import { ROOMS } from "@/lib/room-content"

export function RoomHeader({
  roomId,
  textMuted,
  align = "left",
  compact = false,
  hideQuestion = false,
}: {
  roomId: RoomId
  textMuted: string
  align?: "left" | "center"
  compact?: boolean
  hideQuestion?: boolean
}) {
  const room = ROOMS[roomId]
  const centered = align === "center"

  if (compact) {
    return (
      <div className={`space-y-2 ${centered ? "text-center" : ""}`}>
        {!hideQuestion && (
          <p className="text-sm [font-family:var(--font-disket)] leading-snug">
            {room.question}
          </p>
        )}
        <p
          className="text-xs leading-relaxed [font-family:var(--font-disket)] opacity-80 whitespace-pre-line"
          style={{ color: textMuted }}
        >
          {room.body}
        </p>
      </div>
    )
  }

  return (
    <header className={`space-y-4 ${centered ? "text-center" : ""}`}>
      <div className="space-y-1">
        <p
          className="text-xs uppercase tracking-widest [font-family:var(--font-disket)]"
          style={{ color: textMuted }}
        >
          {room.archetype}
        </p>
        <h1 className="text-2xl lg:text-3xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">
          {room.label}
        </h1>
      </div>
      {!hideQuestion && (
        <p className="text-lg lg:text-xl [font-family:var(--font-disket)] leading-snug">
          {room.question}
        </p>
      )}
      <p className="text-sm leading-relaxed [font-family:var(--font-disket)] opacity-85 whitespace-pre-line">
        {room.body}
      </p>
    </header>
  )
}
