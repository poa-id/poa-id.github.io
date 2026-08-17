"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/rule-of-life/ui/button"
import { Textarea } from "@/components/rule-of-life/ui/fields"
import { PageHeader, PageShell } from "@/components/rule-of-life/components/Chrome"
import { dateKey, formatShortMonthDay } from "@/lib/rule-of-life/dates"
import { calculateWeeklyObservance, sortFocusFirst } from "@/lib/rule-of-life/observance"
import type { Observation, Pillar } from "@/lib/rule-of-life/types"

export function WeeklyExamenScreen({
  weekStart,
  weekEnd,
  pillars,
  observations,
  content,
  onChange,
  onSave,
}: {
  weekStart: Date
  weekEnd: Date
  pillars: Pillar[]
  observations: Observation[]
  content: string
  onChange: (value: string) => void
  onSave: () => void
}) {
  const [saved, setSaved] = useState(false)
  const timeoutRef = useRef<number | null>(null)
  const ordered = sortFocusFirst(pillars)
  const range = `${formatShortMonthDay(dateKey(weekStart))} – ${formatShortMonthDay(dateKey(weekEnd))}`

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleSave = () => {
    onSave()
    setSaved(true)
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => setSaved(false), 2000)
  }

  return (
    <PageShell vellum withNav>
        <PageHeader eyebrow={range} title="Weekly Examen" />

        <section>
          <p className="section-header mb-3">This Week’s Observance</p>
          <div className="bg-rol-card/40 border border-rol-border/30 rounded-sm p-4">
            {ordered.map((pillar, index) => {
              const stats = calculateWeeklyObservance(pillar, observations, weekStart, weekEnd)
              return (
                <div
                  key={pillar.id}
                  className="py-2.5 animate-fade-in flex items-center justify-between gap-3"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    borderBottom:
                      index === ordered.length - 1 ? undefined : "1px solid hsl(var(--rol-border) / 0.3)",
                  }}
                >
                  <div className="min-w-0">
                    <p className="font-serif truncate">{pillar.title}</p>
                    {pillar.isFocus ? (
                      <p className="text-[9px] uppercase tracking-widest text-rol-primary/70">Focus</p>
                    ) : null}
                  </div>
                  <p className="text-xs tabular-nums text-rol-muted-foreground shrink-0">
                    {pillar.mode === "quantity"
                      ? `${stats.quantity} ${pillar.quantityConfig?.unit ?? ""}`.trim()
                      : `${stats.observed}/${stats.scheduled}`}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        <section className="mt-10">
          <p className="section-header mb-3">Reflection</p>
          <p className="font-serif italic text-rol-foreground mb-3">
            What did this week reveal about your practice?
          </p>
          <Textarea
            value={content}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Consider where you remained faithful, where you resisted, and what deserves your attention next week…"
            className="min-h-[140px] resize-none font-serif text-sm placeholder:italic bg-rol-card/50 border-rol-border/40"
          />
          <div className="mt-3 flex justify-end">
            <Button variant={saved ? "outline" : "default"} size="sm" onClick={handleSave}>
              {saved ? "✓ Saved" : "Save"}
            </Button>
          </div>
        </section>
    </PageShell>
  )
}
