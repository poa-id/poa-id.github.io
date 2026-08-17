"use client"

import { useEffect, useRef, useState } from "react"
import { CheckSquare, Link2, Plus, Square } from "lucide-react"
import { Button } from "@/components/rule-of-life/ui/button"
import { Textarea } from "@/components/rule-of-life/ui/fields"
import { cn } from "@/lib/utils"
import {
  SYMBOLS,
  SYMBOL_LABELS,
  type Collection,
  type EntrySymbol,
  type JournalEntry,
} from "@/lib/rule-of-life/types"

const SYMBOL_ORDER: EntrySymbol[] = ["task", "event", "note", "insight", "prayer"]

export function JournalEntryInput({
  collections,
  defaultCollection,
  defaultSymbol = "note",
  initial,
  submitLabel = "Add",
  onSubmit,
  onCancel,
}: {
  collections: Collection[]
  defaultCollection?: string
  defaultSymbol?: EntrySymbol
  initial?: JournalEntry
  submitLabel?: string
  onSubmit: (
    content: string,
    symbol: EntrySymbol,
    hasCheckbox: boolean,
    linkedCollections: string[],
    isChecked?: boolean
  ) => void
  onCancel: () => void
}) {
  const [content, setContent] = useState(initial?.content ?? "")
  const [symbol, setSymbol] = useState<EntrySymbol>(initial?.symbol ?? defaultSymbol)
  const [hasCheckbox, setHasCheckbox] = useState(initial?.hasCheckbox ?? false)
  const [linkedCollections, setLinkedCollections] = useState<string[]>(
    initial?.linkedCollections ?? (defaultCollection ? [defaultCollection] : [])
  )
  const [symbolOpen, setSymbolOpen] = useState(false)
  const [linkOpen, setLinkOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setSymbolOpen(false)
        setLinkOpen(false)
      }
    }
    window.addEventListener("mousedown", onPointer)
    return () => window.removeEventListener("mousedown", onPointer)
  }, [])

  const submit = () => {
    if (!content.trim()) return
    const links = defaultCollection
      ? Array.from(new Set([...linkedCollections, defaultCollection]))
      : linkedCollections
    onSubmit(content.trim(), symbol, hasCheckbox, links, initial?.isChecked)
    setContent("")
    setSymbol(defaultSymbol)
    setHasCheckbox(false)
    setLinkedCollections(defaultCollection ? [defaultCollection] : [])
  }

  return (
    <div ref={rootRef} className="relative z-10 overflow-visible rounded border border-rol-border/50 bg-rol-card/70 p-3 animate-fade-in">
      <div className="flex items-start gap-2">
        {hasCheckbox ? (
          <span className="mt-2 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border border-rol-primary bg-rol-primary/10" aria-hidden="true" />
        ) : null}
        <Textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
              event.preventDefault()
              submit()
            }
          }}
          placeholder="A line for the margin…"
          className="min-h-[72px] resize-none bg-transparent border-0 px-0 focus-visible:ring-0 font-serif"
        />
      </div>
      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 relative">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 font-serif"
            onClick={() => {
              setSymbolOpen((open) => !open)
              setLinkOpen(false)
            }}
            aria-label="Choose symbol"
            disabled={hasCheckbox}
          >
            {hasCheckbox ? <Square className="opacity-40" /> : SYMBOLS[symbol]}
          </Button>
          {symbolOpen ? (
            <div className="absolute left-0 bottom-full mb-1 z-[70] w-40 p-1 rounded border border-rol-border/50 bg-rol-popover shadow-card">
              {SYMBOL_ORDER.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setSymbol(item)
                    setSymbolOpen(false)
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 px-2 py-1.5 text-sm rounded-sm",
                    item === symbol ? "bg-rol-muted" : "hover:bg-rol-muted/50"
                  )}
                >
                  <span className="w-4 text-center font-serif">{SYMBOLS[item]}</span>
                  {SYMBOL_LABELS[item]}
                </button>
              ))}
            </div>
          ) : null}

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8",
              hasCheckbox
                ? "bg-rol-primary/15 text-rol-primary hover:bg-rol-primary/20 hover:text-rol-primary"
                : "text-rol-muted-foreground"
            )}
            aria-pressed={hasCheckbox}
            aria-label={hasCheckbox ? "Remove checkbox" : "Add checkbox"}
            onClick={() => {
              setHasCheckbox((value) => !value)
              setSymbolOpen(false)
              setLinkOpen(false)
            }}
          >
            {hasCheckbox ? <CheckSquare /> : <Square />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", linkedCollections.length > 0 && "text-rol-primary")}
            onClick={() => {
              setLinkOpen((open) => !open)
              setSymbolOpen(false)
            }}
            aria-label="Link to collection"
          >
            <Link2 />
          </Button>
          {linkOpen ? (
            <div className="absolute left-0 bottom-full mb-1 z-[70] w-48 p-1 rounded border border-rol-border/50 bg-rol-popover shadow-card">
              <p className="px-2 py-1.5 text-[10px] uppercase tracking-widest text-rol-muted-foreground/70">
                Link to Collection
              </p>
              {collections.length === 0 ? (
                <p className="px-2 py-1.5 text-sm italic font-serif text-rol-muted-foreground">
                  No collections yet.
                </p>
              ) : (
                collections.map((collection) => {
                  const selected = linkedCollections.includes(collection.id)
                  return (
                    <button
                      key={collection.id}
                      type="button"
                      onClick={() => {
                        setLinkedCollections((current) =>
                          selected
                            ? current.filter((id) => id !== collection.id)
                            : [...current, collection.id]
                        )
                      }}
                      className={cn(
                        "flex w-full items-center px-2 py-1.5 text-sm rounded-sm text-left",
                        selected ? "bg-rol-primary/10 text-rol-primary" : "hover:bg-rol-muted/50"
                      )}
                    >
                      {collection.name}
                    </button>
                  )
                })
              )}
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button size="sm" disabled={!content.trim()} onClick={submit}>
            <Plus />
            {submitLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
