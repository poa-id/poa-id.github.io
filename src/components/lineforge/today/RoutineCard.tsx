"use client"

import { useState } from "react"
import { ChevronDown, Dice5, ExternalLink, FlaskConical, Lightbulb } from "lucide-react"
import type { SessionBlock, WeeklyBrief } from "@/lib/lineforge/types/lineforge"
import { cn } from "@/lib/utils"

export function RoutineCard({
  block,
  isActive,
  isCompleted,
  expanded,
  onClick,
  onOpen3D,
  weeklyBrief,
  onRerollBrief,
  onOpenLibraryEntry,
}: {
  block: SessionBlock
  isActive: boolean
  isCompleted: boolean
  expanded: boolean
  onClick: () => void
  onOpen3D?: () => void
  weeklyBrief?: WeeklyBrief
  onRerollBrief?: () => void
  onOpenLibraryEntry?: (name: string) => void
}) {
  const [showTips, setShowTips] = useState<Record<string, boolean>>({})

  return (
    <article
      className={cn(
        "border-y border-border bg-card",
        isActive && "bg-surface-hover border-l-2 border-l-primary",
        isCompleted && "opacity-50"
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className="w-full flex items-center justify-between gap-3 px-3 py-3 text-left min-h-11"
        aria-expanded={expanded}
      >
        <div className="min-w-0">
          <p className="text-xs font-mono uppercase tracking-wider">{block.label}</p>
          <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
            {block.durationMinutes}m · {block.cards.length} card{block.cards.length === 1 ? "" : "s"}
          </p>
        </div>
        <ChevronDown
          className={cn("size-4 shrink-0 text-muted-foreground transition-transform duration-100", expanded && "rotate-180")}
          strokeWidth={1.5}
        />
      </button>

      {expanded && (
        <div className="px-3 pb-3 space-y-3 animate-fade-in">
          {block.cards.map((card) => (
            <div key={card.id} className="space-y-1.5">
              <p className="text-xs font-mono text-foreground">{card.title}</p>
              <p className="text-[11px] font-sans text-muted-foreground leading-relaxed">{card.prompt}</p>
              <div className="flex flex-wrap gap-1.5">
                {card.tips && card.tips.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowTips((prev) => ({ ...prev, [card.id]: !prev[card.id] }))}
                    className="p-1.5 border border-border text-muted-foreground hover:text-foreground hover:border-primary"
                    aria-label="Tips"
                  >
                    <Lightbulb className="size-3.5" strokeWidth={1.5} />
                  </button>
                )}
                {card.referenceUrl && (
                  <a
                    href={card.referenceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 border border-border text-muted-foreground hover:text-foreground hover:border-primary"
                    aria-label="Open reference"
                  >
                    <ExternalLink className="size-3.5" strokeWidth={1.5} />
                  </a>
                )}
                {onOpen3D && (
                  <button
                    type="button"
                    onClick={onOpen3D}
                    className="p-1.5 border border-border text-muted-foreground hover:text-foreground hover:border-primary"
                    aria-label="Open Form and Lighting Lab"
                  >
                    <FlaskConical className="size-3.5" strokeWidth={1.5} />
                  </button>
                )}
              </div>
              {showTips[card.id] && card.tips && (
                <ul className="space-y-1 text-[10px] font-mono text-muted-foreground">
                  {card.tips.map((tip) => (
                    <li key={tip}>— {tip}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {weeklyBrief && (
            <div className="border border-primary/20 bg-surface-elevated p-3 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[9px] font-mono uppercase tracking-wider text-primary">Weekly brief</p>
                {onRerollBrief && (
                  <button
                    type="button"
                    onClick={onRerollBrief}
                    className="p-1.5 border border-border text-muted-foreground hover:text-primary hover:border-primary"
                    aria-label="Reroll brief"
                  >
                    <Dice5 className="size-3.5" strokeWidth={1.5} />
                  </button>
                )}
              </div>
              <p className="text-[11px] font-sans text-muted-foreground leading-relaxed">{weeklyBrief.prompt}</p>
              <div className="flex flex-wrap gap-1">
                {weeklyBrief.objects.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => onOpenLibraryEntry?.(name)}
                    className="text-[10px] font-mono uppercase tracking-wider border border-primary/20 text-primary px-1.5 py-0.5 underline decoration-primary/30 underline-offset-2"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  )
}
