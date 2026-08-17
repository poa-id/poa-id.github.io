"use client"

import { Settings } from "lucide-react"
import { Button } from "@/components/rule-of-life/ui/button"
import { PageHeader, PageShell } from "@/components/rule-of-life/components/Chrome"
import { PillarCard } from "@/components/rule-of-life/components/PillarCard"
import { JournalEntryInput } from "@/components/rule-of-life/components/JournalEntryInput"
import { JournalEntryRow } from "@/components/rule-of-life/components/JournalEntryRow"
import { formatLongDate } from "@/lib/rule-of-life/dates"
import { findObservation } from "@/lib/rule-of-life/observance"
import { isScheduled } from "@/lib/rule-of-life/scheduling"
import type {
  Collection,
  ContinuityStats,
  EntrySymbol,
  JournalEntry,
  Observation,
  Pillar,
} from "@/lib/rule-of-life/types"

export function TodayScreen({
  today,
  pillars,
  observations,
  journal,
  collections,
  continuityMap,
  defaultSymbol,
  composing,
  onComposingChange,
  onOpenSettings,
  onOpenPillar,
  onObserve,
  onIncrement,
  onAddEntry,
  onToggleCheck,
  onOpenCollection,
  onEditEntry,
  onDeleteEntry,
}: {
  today: string
  pillars: Pillar[]
  observations: Observation[]
  journal: JournalEntry[]
  collections: Collection[]
  continuityMap: Record<string, ContinuityStats>
  defaultSymbol: EntrySymbol
  composing: boolean
  onComposingChange: (open: boolean) => void
  onOpenSettings: () => void
  onOpenPillar: (pillar: Pillar) => void
  onObserve: (pillarId: string) => void
  onIncrement: (pillarId: string, amount: number) => void
  onAddEntry: (content: string, symbol: EntrySymbol, hasCheckbox: boolean, linked: string[]) => void
  onToggleCheck: (id: string) => void
  onOpenCollection: (id: string) => void
  onEditEntry: (entry: JournalEntry) => void
  onDeleteEntry: (id: string) => void
}) {
  const todayDate = new Date()
  const ordered = [...pillars].sort((a, b) => {
    if (a.isFocus !== b.isFocus) return a.isFocus ? -1 : 1
    const aOn = isScheduled(a.frequency, todayDate)
    const bOn = isScheduled(b.frequency, todayDate)
    if (aOn !== bOn) return aOn ? -1 : 1
    return 0
  })
  const todaysEntries = journal.filter((entry) => entry.date === today)

  return (
    <PageShell vellum withNav>
        <PageHeader
          eyebrow={formatLongDate(today)}
          title="Daily Observance"
          action={
            <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1" onClick={onOpenSettings} aria-label="Settings">
              <Settings />
            </Button>
          }
        />

        <div className="space-y-2.5">
          {ordered.length === 0 ? (
            <p className="font-serif italic text-rol-muted-foreground text-center py-8">
              No Pillars yet. Begin with one practice.
            </p>
          ) : (
            ordered.map((pillar) => (
              <PillarCard
                key={pillar.id}
                pillar={pillar}
                observation={findObservation(observations, pillar.id, today)}
                continuity={continuityMap[pillar.id] ?? { current: 0, longest: 0, history: [] }}
                onOpen={() => onOpenPillar(pillar)}
                onObserve={() => onObserve(pillar.id)}
                onIncrement={(amount) => onIncrement(pillar.id, amount)}
              />
            ))
          )}
        </div>

        <section className="mt-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-rol-border/50" />
            <p className="font-serif italic text-sm text-rol-muted-foreground">Marginalia</p>
            <div className="h-px flex-1 bg-rol-border/50" />
          </div>

          {composing ? (
            <JournalEntryInput
              collections={collections}
              defaultSymbol={defaultSymbol}
              onSubmit={(content, symbol, hasCheckbox, linked) => {
                onAddEntry(content, symbol, hasCheckbox, linked)
                onComposingChange(false)
              }}
              onCancel={() => onComposingChange(false)}
            />
          ) : (
            <Button variant="outline" className="w-full border-dashed" onClick={() => onComposingChange(true)}>
              Add Entry
            </Button>
          )}

          <div className="mt-4 pl-1 border-l-2 border-rol-border/30">
            {todaysEntries.map((entry) => (
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
        </section>
    </PageShell>
  )
}
