"use client"

import { SYMBOLS, type Collection, type JournalEntry } from "@/lib/rule-of-life/types"
import { formatShortMonthDay } from "@/lib/rule-of-life/dates"
import { Checkbox } from "@/components/rule-of-life/ui/controls"
import { cn } from "@/lib/utils"

export function JournalEntryRow({
  entry,
  collections,
  showDate = false,
  onToggleCheck,
  onOpenCollection,
  onEdit,
  onDelete,
}: {
  entry: JournalEntry
  collections: Collection[]
  showDate?: boolean
  onToggleCheck?: (id: string) => void
  onOpenCollection?: (id: string) => void
  onEdit?: (entry: JournalEntry) => void
  onDelete?: (id: string) => void
}) {
  return (
    <div className="flex items-start gap-2 py-1.5 group">
      {entry.hasCheckbox ? (
        <Checkbox checked={entry.isChecked} onCheckedChange={() => onToggleCheck?.(entry.id)} />
      ) : (
        <span
          className={cn(
            "w-4 text-center font-serif select-none text-rol-muted-foreground/70",
            entry.symbol === "insight" && "text-rol-primary/60",
            entry.symbol === "prayer" && "text-rol-muted-foreground/80"
          )}
        >
          {SYMBOLS[entry.symbol]}
        </span>
      )}

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "text-sm leading-relaxed",
            entry.isChecked && "line-through text-rol-muted-foreground"
          )}
        >
          {entry.content}
          {entry.linkedCollections?.map((id) => {
            const collection = collections.find((item) => item.id === id)
            if (!collection) return null
            return (
              <button
                key={id}
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  onOpenCollection?.(id)
                }}
                className="ml-1.5 text-rol-primary/70 hover:text-rol-primary underline underline-offset-2 decoration-rol-primary/30"
              >
                {collection.name}
              </button>
            )
          })}
        </p>
        {(onEdit || onDelete) && (
          <div className="mt-1 hidden group-hover:flex group-focus-within:flex items-center gap-3 text-[10px] uppercase tracking-widest text-rol-muted-foreground/70">
            {onEdit ? (
              <button type="button" onClick={() => onEdit(entry)} className="hover:text-rol-foreground">
                Edit
              </button>
            ) : null}
            {onDelete ? (
              <button type="button" onClick={() => onDelete(entry.id)} className="hover:text-rol-destructive">
                Delete
              </button>
            ) : null}
          </div>
        )}
      </div>

      {showDate ? (
        <span className="text-xs text-rol-muted-foreground/70 shrink-0">{formatShortMonthDay(entry.date)}</span>
      ) : null}
    </div>
  )
}
