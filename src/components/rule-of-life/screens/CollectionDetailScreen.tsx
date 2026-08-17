"use client"

import { useState } from "react"
import { BackLink, PageShell } from "@/components/rule-of-life/components/Chrome"
import { Button } from "@/components/rule-of-life/ui/button"
import { Input } from "@/components/rule-of-life/ui/fields"
import { JournalEntryInput } from "@/components/rule-of-life/components/JournalEntryInput"
import { JournalEntryRow } from "@/components/rule-of-life/components/JournalEntryRow"
import type { Collection, EntrySymbol, JournalEntry } from "@/lib/rule-of-life/types"

export function CollectionDetailScreen({
  collection,
  entries,
  collections,
  defaultSymbol,
  composing,
  onComposingChange,
  onBack,
  onRename,
  onAddEntry,
  onToggleCheck,
  onOpenCollection,
  onEditEntry,
  onDeleteEntry,
  onUnlink,
}: {
  collection: Collection
  entries: JournalEntry[]
  collections: Collection[]
  defaultSymbol: EntrySymbol
  composing: boolean
  onComposingChange: (open: boolean) => void
  onBack: () => void
  onRename: (name: string) => void
  onAddEntry: (content: string, symbol: EntrySymbol, hasCheckbox: boolean, linked: string[]) => void
  onToggleCheck: (id: string) => void
  onOpenCollection: (id: string) => void
  onEditEntry: (entry: JournalEntry) => void
  onDeleteEntry: (id: string) => void
  onUnlink: (entryId: string) => void
}) {
  const [editingName, setEditingName] = useState(false)
  const [name, setName] = useState(collection.name)
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <PageShell vellum={false}>
        <BackLink label="Back to Collections" onClick={onBack} />

        {editingName ? (
          <div className="flex gap-2 mb-2">
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="font-serif"
            />
            <Button
              disabled={!name.trim()}
              onClick={() => {
                onRename(name.trim())
                setEditingName(false)
              }}
            >
              Save
            </Button>
          </div>
        ) : (
          <button type="button" onClick={() => setEditingName(true)} className="text-left">
            <h1 className="font-serif text-xl font-semibold">{collection.name}</h1>
          </button>
        )}
        <p className="text-sm text-rol-muted-foreground mt-1">
          {sorted.length} {sorted.length === 1 ? "entry" : "entries"}
        </p>
        <div className="mt-4 h-px bg-gradient-to-r from-rol-border via-rol-border/50 to-transparent" />

        <div className="mt-6">
          {composing ? (
            <JournalEntryInput
              collections={collections}
              defaultCollection={collection.id}
              defaultSymbol={defaultSymbol}
              onSubmit={(content, symbol, hasCheckbox, linked) => {
                onAddEntry(content, symbol, hasCheckbox, linked)
                onComposingChange(false)
              }}
              onCancel={() => onComposingChange(false)}
            />
          ) : (
            <Button variant="outline" className="w-full border-dashed" onClick={() => onComposingChange(true)}>
              Add to {collection.name}
            </Button>
          )}
        </div>

        <div className="mt-6">
          {sorted.map((entry) => (
            <div key={entry.id} className="group">
              <JournalEntryRow
                entry={entry}
                collections={collections}
                showDate
                onToggleCheck={onToggleCheck}
                onOpenCollection={onOpenCollection}
                onEdit={onEditEntry}
                onDelete={onDeleteEntry}
              />
              <button
                type="button"
                onClick={() => onUnlink(entry.id)}
                className="ml-6 mb-2 hidden group-hover:inline text-[10px] uppercase tracking-widest text-rol-muted-foreground/70 hover:text-rol-foreground"
              >
                Unlink
              </button>
            </div>
          ))}
        </div>
    </PageShell>
  )
}
