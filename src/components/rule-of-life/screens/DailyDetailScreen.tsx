"use client"

import { BackLink, DividerFlourish, PageShell } from "@/components/rule-of-life/components/Chrome"
import { JournalEntryRow } from "@/components/rule-of-life/components/JournalEntryRow"
import { Textarea } from "@/components/rule-of-life/ui/fields"
import { formatLongDateWithYear } from "@/lib/rule-of-life/dates"
import { isObservationComplete } from "@/lib/rule-of-life/observance"
import type { Collection, JournalEntry, Observation, Pillar } from "@/lib/rule-of-life/types"

export function DailyDetailScreen({
  date,
  pillars,
  observations,
  entries,
  collections,
  reflection,
  onBack,
  onReflectionChange,
  onToggleCheck,
  onOpenCollection,
  onEditEntry,
  onDeleteEntry,
}: {
  date: string
  pillars: Pillar[]
  observations: Observation[]
  entries: JournalEntry[]
  collections: Collection[]
  reflection: string
  onBack: () => void
  onReflectionChange: (content: string) => void
  onToggleCheck: (id: string) => void
  onOpenCollection: (id: string) => void
  onEditEntry: (entry: JournalEntry) => void
  onDeleteEntry: (id: string) => void
}) {
  const observed = pillars.filter((pillar) => {
    const record = observations.find((item) => item.pillarId === pillar.id && item.date === date)
    return isObservationComplete(pillar, record)
  })

  return (
    <PageShell vellum>
        <BackLink label="Return" onClick={onBack} />
        <h1 className="font-serif text-xl">{formatLongDateWithYear(date)}</h1>
        <DividerFlourish className="mt-4 mb-8" />

        {observed.length > 0 ? (
          <section className="mb-8">
            <p className="section-header mb-3">Observed</p>
            <div className="flex flex-wrap gap-2">
              {observed.map((pillar) => (
                <span
                  key={pillar.id}
                  className="text-xs text-rol-primary/80 bg-rol-primary/8 px-2 py-0.5 rounded-sm border border-rol-primary/15"
                >
                  {pillar.title}
                </span>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mb-8">
          <p className="section-header mb-3">Entries</p>
          {entries.length === 0 ? (
            <p className="font-serif italic text-rol-muted-foreground">No entries for this day.</p>
          ) : (
            <div className="pl-3 border-l border-rol-border/40">
              {entries.map((entry) => (
                <JournalEntryRow
                  key={entry.id}
                  entry={entry}
                  collections={collections}
                  onToggleCheck={onToggleCheck}
                  onOpenCollection={onOpenCollection}
                  onEdit={onEditEntry}
                  onDelete={onDeleteEntry}
                />
              ))}
            </div>
          )}
        </section>

        <section>
          <p className="section-header mb-3">Reflection</p>
          <Textarea
            value={reflection}
            onChange={(event) => onReflectionChange(event.target.value)}
            placeholder="Gratitude, examen, offering…"
            className="min-h-[120px] bg-rol-card/50 border-rol-border/40 resize-none font-serif text-sm placeholder:italic focus-visible:ring-1 focus-visible:ring-rol-primary/30"
          />
        </section>
    </PageShell>
  )
}
