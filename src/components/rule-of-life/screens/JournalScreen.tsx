"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/rule-of-life/ui/button"
import { Input } from "@/components/rule-of-life/ui/fields"
import { PageHeader, PageShell } from "@/components/rule-of-life/components/Chrome"
import { JournalEntryInput } from "@/components/rule-of-life/components/JournalEntryInput"
import { JournalEntryRow } from "@/components/rule-of-life/components/JournalEntryRow"
import { cn } from "@/lib/utils"
import { formatRelativeDateHeader } from "@/lib/rule-of-life/dates"
import type { Collection, EntrySymbol, JournalEntry } from "@/lib/rule-of-life/types"

export function JournalScreen({
  today,
  journal,
  collections,
  defaultSymbol,
  composing,
  onComposingChange,
  onAddEntry,
  onToggleCheck,
  onOpenCollection,
  onOpenDay,
  onCreateCollection,
  onEditEntry,
  onDeleteEntry,
}: {
  today: string
  journal: JournalEntry[]
  collections: Collection[]
  defaultSymbol: EntrySymbol
  composing: boolean
  onComposingChange: (open: boolean) => void
  onAddEntry: (content: string, symbol: EntrySymbol, hasCheckbox: boolean, linked: string[]) => void
  onToggleCheck: (id: string) => void
  onOpenCollection: (id: string) => void
  onOpenDay: (date: string) => void
  onCreateCollection: (name: string) => void
  onEditEntry: (entry: JournalEntry) => void
  onDeleteEntry: (id: string) => void
}) {
  const [tab, setTab] = useState<"log" | "collections">("log")
  const [naming, setNaming] = useState(false)
  const [newName, setNewName] = useState("")

  const grouped = useMemo(() => {
    const map: Record<string, JournalEntry[]> = {}
    for (const entry of journal) {
      map[entry.date] ??= []
      map[entry.date].push(entry)
    }
    return Object.keys(map)
      .sort((a, b) => b.localeCompare(a))
      .map((date) => ({ date, entries: map[date] }))
  }, [journal])

  const counts = useMemo(() => {
    const map: Record<string, number> = {}
    for (const entry of journal) {
      for (const id of entry.linkedCollections ?? []) {
        map[id] = (map[id] ?? 0) + 1
      }
    }
    return map
  }, [journal])

  return (
    <PageShell vellum withNav>
        <PageHeader eyebrow="Marginalia" title="Journal" />

        <div className="w-full mb-6 bg-rol-card/50 border border-rol-border/40 p-1 rounded flex">
          {(["log", "collections"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={cn(
                "flex-1 font-serif text-sm py-2 rounded-sm transition-colors duration-200",
                tab === item ? "bg-rol-background shadow-soft" : "text-rol-muted-foreground"
              )}
            >
              {item === "log" ? "Daily Log" : "Collections"}
            </button>
          ))}
        </div>

        {tab === "log" ? (
          <div>
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
              <Button variant="outline" className="w-full border-dashed mb-6" onClick={() => onComposingChange(true)}>
                Add Entry
              </Button>
            )}

            {grouped.length === 0 ? (
              <p className="text-center font-serif italic text-rol-muted-foreground py-10">Your journal awaits.</p>
            ) : (
              <div className="space-y-8 mt-6">
                {grouped.map((group) => (
                  <section key={group.date}>
                    <button
                      type="button"
                      onClick={() => onOpenDay(group.date)}
                      className="font-serif text-sm text-rol-muted-foreground/70 italic hover:text-rol-foreground transition-colors duration-200"
                    >
                      {formatRelativeDateHeader(group.date, today)}
                    </button>
                    <div className="mt-2 pl-3 border-l border-rol-border/40">
                      {group.entries.map((entry) => (
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
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {collections.length === 0 ? (
              <p className="font-serif italic text-rol-muted-foreground text-center py-8">No collections yet.</p>
            ) : (
              <div className="bg-rol-card/40 border border-rol-border/30 rounded-sm divide-y divide-rol-border/20">
                {collections.map((collection) => {
                  const count = counts[collection.id] ?? 0
                  return (
                    <button
                      key={collection.id}
                      type="button"
                      onClick={() => onOpenCollection(collection.id)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-rol-muted/40 transition-colors duration-200"
                    >
                      <span className="font-serif">{collection.name}</span>
                      <span className="text-xs text-rol-muted-foreground">
                        {count} {count === 1 ? "entry" : "entries"} ›
                      </span>
                    </button>
                  )
                })}
              </div>
            )}

            {naming ? (
              <div className="mt-4 flex gap-2">
                <Input
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)}
                  placeholder="Collection name"
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && newName.trim()) {
                      onCreateCollection(newName.trim())
                      setNewName("")
                      setNaming(false)
                    }
                  }}
                />
                <Button
                  disabled={!newName.trim()}
                  onClick={() => {
                    onCreateCollection(newName.trim())
                    setNewName("")
                    setNaming(false)
                  }}
                >
                  Add
                </Button>
              </div>
            ) : (
              <Button variant="outline" className="w-full border-dashed mt-4" onClick={() => setNaming(true)}>
                New Collection
              </Button>
            )}
          </div>
        )}
    </PageShell>
  )
}
