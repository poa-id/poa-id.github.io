"use client"

import { Button } from "@/components/rule-of-life/ui/button"
import { TallyMarks } from "@/components/rule-of-life/components/Chrome"
import { cn } from "@/lib/utils"
import type { ContinuityStats, Observation, Pillar } from "@/lib/rule-of-life/types"
import { isObservationComplete } from "@/lib/rule-of-life/observance"

export function PillarCard({
  pillar,
  observation,
  continuity,
  onOpen,
  onObserve,
  onIncrement,
}: {
  pillar: Pillar
  observation?: Observation
  continuity: ContinuityStats
  onOpen: () => void
  onObserve: () => void
  onIncrement: (amount: number) => void
}) {
  const isQuantity = pillar.mode === "quantity"
  const currentQuantity = observation?.quantity ?? 0
  const target = pillar.quantityConfig?.target ?? 0
  const isComplete = isObservationComplete(pillar, observation)
  const statusText = isQuantity
    ? `${currentQuantity} / ${target} ${pillar.quantityConfig?.unit ?? ""}`.trim()
    : isComplete
      ? "Observed"
      : "Not yet observed"

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onOpen()
        }
      }}
      className={cn(
        "rounded p-4 shadow-card animate-fade-in cursor-pointer transition-all duration-200 active:scale-[0.99]",
        pillar.isFocus && "bg-rol-card border border-rol-primary/20 ring-1 ring-rol-primary/10",
        !pillar.isFocus && isComplete && "bg-rol-muted/40 border border-rol-border/30",
        !pillar.isFocus && !isComplete && "bg-rol-card border border-rol-border/40"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-base leading-tight truncate">{pillar.title}</h2>
            {pillar.isFocus ? (
              <span className="text-[9px] uppercase tracking-widest text-rol-primary/70 bg-rol-primary/8 px-1.5 py-0.5 rounded-sm border border-rol-primary/15">
                Focus
              </span>
            ) : null}
          </div>
          <p className={cn("text-sm mt-1", isComplete ? "text-observed" : "text-rol-muted-foreground")}>
            {statusText}
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0" onClick={(event) => event.stopPropagation()}>
          {isQuantity
            ? pillar.quantityConfig?.steps?.map((step) => (
                <Button
                  key={step.value}
                  variant="increment"
                  className="h-11 px-3 text-sm w-auto"
                  onClick={() => onIncrement(step.value)}
                >
                  {step.label}
                </Button>
              ))
            : (
                <Button variant={isComplete ? "observed" : "observe"} size="pill" onClick={onObserve}>
                  {isComplete ? "✓" : "Observe"}
                </Button>
              )}
          {isQuantity && isComplete ? (
            <Button variant="observed" size="pill" disabled>
              ✓
            </Button>
          ) : null}
        </div>
      </div>

      <div className="pt-2 mt-3 border-t border-rol-border/30">
        <TallyMarks history={continuity.history.slice(-30)} compact />
      </div>
    </article>
  )
}

export function PillarListItem({
  pillar,
  frequencyLabel,
  onOpen,
}: {
  pillar: Pillar
  frequencyLabel: string
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full text-left rounded-lg shadow-soft border border-rol-border/50 bg-rol-card hover:bg-rol-muted/50 p-4 transition-colors duration-200 animate-fade-in"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-base truncate">{pillar.title}</h2>
            {pillar.isFocus ? (
              <span className="text-xs bg-rol-muted px-2 py-0.5 rounded-full text-rol-muted-foreground">
                In Focus
              </span>
            ) : null}
          </div>
          <p className="text-sm text-rol-muted-foreground mt-1">{frequencyLabel}</p>
        </div>
        <span className="text-rol-muted-foreground/60" aria-hidden="true">
          ›
        </span>
      </div>
    </button>
  )
}
