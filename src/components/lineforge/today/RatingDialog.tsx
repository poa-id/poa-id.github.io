"use client"

import { Check, RotateCcw, SkipForward, Zap } from "lucide-react"
import type { Rating, SessionBlock } from "@/lib/lineforge/types/lineforge"

const OPTIONS: { id: Rating; label: string; icon: typeof Check }[] = [
  { id: "again", label: "Again", icon: RotateCcw },
  { id: "good", label: "Good", icon: Check },
  { id: "easy", label: "Easy", icon: Zap },
  { id: "skip", label: "Skip", icon: SkipForward },
]

export function RatingDialog({
  block,
  onRate,
}: {
  block: SessionBlock
  onRate: (rating: Rating) => void
}) {
  return (
    <div className="fixed inset-0 z-50 bg-background/90 p-4 flex items-center justify-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lf-rate-title"
        className="bg-surface-elevated border border-border p-6 max-w-sm w-full animate-fade-in"
      >
        <h2 id="lf-rate-title" className="text-xs font-mono uppercase tracking-wider">
          Rate this block
        </h2>
        <p className="text-xs text-muted-foreground mt-1">{block.label}</p>
        <div className="grid grid-cols-2 gap-1.5 mt-4">
          {OPTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => onRate(id)}
              className="p-3 border border-border text-muted-foreground hover:text-foreground hover:border-primary font-mono flex flex-col items-center gap-1 min-h-11"
            >
              <Icon className="size-4" strokeWidth={1.5} />
              <span className="text-xs uppercase tracking-wider">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
