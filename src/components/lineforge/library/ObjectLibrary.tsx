"use client"

import { useEffect, useMemo, useState } from "react"
import { X } from "lucide-react"
import { findObjectEntry, objectLibrary } from "@/lib/lineforge/data/objectLibrary"
import type { ObjectCategory, ObjectEntry } from "@/lib/lineforge/types/library"

function SafeImage({ src, alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return null
  return (
    // Wikimedia / arbitrary hosts — standard img is more robust than next/image here
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="w-full max-h-48 object-cover border border-border bg-card"
      onError={() => setFailed(true)}
    />
  )
}

export function ObjectLibrary({
  initialEntryName,
  onClose,
}: {
  initialEntryName?: string | null
  onClose: () => void
}) {
  const [categoryId, setCategoryId] = useState(objectLibrary[0]?.id ?? "")
  const [entry, setEntry] = useState<ObjectEntry | null>(null)

  useEffect(() => {
    if (!initialEntryName) return
    const found = findObjectEntry(initialEntryName)
    if (!found) return
    setCategoryId(found.category.id)
    setEntry(found.entry)
  }, [initialEntryName])

  const category: ObjectCategory | undefined = useMemo(
    () => objectLibrary.find((item) => item.id === categoryId) ?? objectLibrary[0],
    [categoryId]
  )

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      <div className="max-w-lg mx-auto px-4 pb-24 pt-4">
        <header className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-mono uppercase tracking-wider">Object Reference</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 border border-border text-muted-foreground hover:text-foreground min-h-11 min-w-11"
            aria-label="Close object library"
          >
            <X className="size-4" strokeWidth={1.5} />
          </button>
        </header>

        <div className="flex flex-wrap gap-1 mb-3">
          {objectLibrary.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setCategoryId(item.id)
                setEntry(null)
              }}
              className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 border ${
                categoryId === item.id ? "border-primary text-primary" : "border-border text-muted-foreground"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {entry ? (
          <article className="space-y-3">
            <button
              type="button"
              onClick={() => setEntry(null)}
              className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              ← {category?.name}
            </button>
            <h3 className="text-sm font-mono">{entry.name}</h3>
            <SafeImage src={entry.imageUrl} alt={entry.name} />
            <section>
              <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground mb-1">Key shapes</p>
              <p className="text-[11px] font-sans text-muted-foreground">{entry.keyShapes.join(" · ")}</p>
            </section>
            <section>
              <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground mb-1">Tips</p>
              <ul className="space-y-1 text-[11px] font-sans text-muted-foreground">
                {entry.tips.map((tip) => (
                  <li key={tip}>— {tip}</li>
                ))}
              </ul>
            </section>
            <section>
              <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground mb-1">Mistakes</p>
              <ul className="space-y-1 text-[11px] font-sans text-muted-foreground">
                {entry.mistakes.map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
            </section>
            {entry.variations.length > 0 && (
              <section className="space-y-1">
                <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">Variations</p>
                {entry.variations.map((variation) => (
                  <div key={variation.name} className="border border-border bg-card px-3 py-2">
                    <p className="text-[11px] font-mono text-primary">{variation.name}</p>
                    <p className="text-[11px] font-sans text-muted-foreground">{variation.notes}</p>
                  </div>
                ))}
              </section>
            )}
          </article>
        ) : (
          <div className="space-y-px">
            <p className="text-[10px] font-mono text-muted-foreground mb-2">{category?.description}</p>
            {category?.entries.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setEntry(item)}
                className="w-full text-left border border-border bg-card px-3 py-3 hover:bg-surface-hover min-h-11"
              >
                <p className="text-xs font-mono">{item.name}</p>
                <p className="text-[10px] font-mono text-muted-foreground">{item.keyShapes.join(" · ")}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
