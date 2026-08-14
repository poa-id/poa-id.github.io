"use client"

import { Pause, Play, SkipBack, SkipForward, Square } from "lucide-react"
import { formatTime, useTimer } from "@/hooks/lineforge/useTimer"
import { cn } from "@/lib/utils"

export function TimerDisplay({
  totalSeconds,
  label,
  onComplete,
  onNext,
  onBack,
  autoAdvance,
  onToggleAutoAdvance,
  onStop,
}: {
  totalSeconds: number
  label: string
  onComplete: () => void
  onNext: () => void
  onBack: () => void
  autoAdvance: boolean
  onToggleAutoAdvance: () => void
  onStop: (elapsed: number) => void
}) {
  const { remaining, isRunning, start, pause } = useTimer({
    totalSeconds,
    onComplete: autoAdvance ? onNext : onComplete,
  })

  const elapsed = totalSeconds - remaining
  const progress = totalSeconds > 0 ? elapsed / totalSeconds : 0

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="text-center">
        <div
          className={cn(
            "timer-display text-7xl font-bold tracking-tight",
            isRunning ? "text-primary" : "text-foreground"
          )}
        >
          {formatTime(remaining)}
        </div>
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mt-2">
          {label}
        </p>
      </div>

      <div className="w-full max-w-[240px] h-[2px] bg-border relative">
        <div
          className="absolute inset-y-0 left-0 h-[2px] bg-primary transition-all duration-1000 ease-linear"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="flex gap-2 items-center">
        <button
          type="button"
          onClick={onBack}
          className="p-2.5 border border-border bg-card hover:bg-surface-hover min-h-11 min-w-11"
          aria-label="Previous block"
        >
          <SkipBack className="size-4" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={isRunning ? pause : start}
          className={cn(
            "p-3 border min-h-11 min-w-11",
            isRunning
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-primary bg-primary text-primary-foreground"
          )}
          aria-label={isRunning ? "Pause" : "Start"}
        >
          {isRunning ? (
            <Pause className="size-4" strokeWidth={1.5} />
          ) : (
            <Play className="size-4" strokeWidth={1.5} />
          )}
        </button>
        <button
          type="button"
          onClick={() => onStop(elapsed)}
          className="p-2.5 border border-border bg-card hover:bg-destructive/10 hover:text-destructive min-h-11 min-w-11"
          aria-label="Finish exercise"
        >
          <Square className="size-4" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={onNext}
          className="p-2.5 border border-border bg-card hover:bg-surface-hover min-h-11 min-w-11"
          aria-label="Next block"
        >
          <SkipForward className="size-4" strokeWidth={1.5} />
        </button>
      </div>

      <button
        type="button"
        onClick={onToggleAutoAdvance}
        className={cn(
          "text-xs px-2.5 py-1 border font-mono uppercase tracking-wider",
          autoAdvance ? "border-primary text-primary" : "border-border text-muted-foreground"
        )}
        aria-pressed={autoAdvance}
      >
        Auto-advance {autoAdvance ? "ON" : "OFF"}
      </button>
    </div>
  )
}
