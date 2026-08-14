"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { cultureLibrary } from "@/lib/lineforge/data/cultureLibrary"
import type { CulturePeriod, CultureRegion } from "@/lib/lineforge/types/library"

function SafeImage({ src, alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return null
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="w-full max-h-48 object-cover border border-border bg-card"
      onError={() => setFailed(true)}
    />
  )
}

function List({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null
  return (
    <section>
      <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground mb-1">{title}</p>
      <p className="text-[11px] font-sans text-muted-foreground leading-relaxed">{items.join(" · ")}</p>
    </section>
  )
}

export function CultureLibrary({ onClose }: { onClose: () => void }) {
  const [region, setRegion] = useState<CultureRegion | null>(null)
  const [period, setPeriod] = useState<CulturePeriod | null>(null)

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      <div className="max-w-lg mx-auto px-4 pb-24 pt-4">
        <header className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-mono uppercase tracking-wider">Culture Reference</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 border border-border text-muted-foreground hover:text-foreground min-h-11 min-w-11"
            aria-label="Close culture library"
          >
            <X className="size-4" strokeWidth={1.5} />
          </button>
        </header>

        {period && region ? (
          <article className="space-y-3">
            <button
              type="button"
              onClick={() => setPeriod(null)}
              className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              ← {region.name}
            </button>
            <h3 className="text-sm font-mono">{period.name}</h3>
            <p className="text-[10px] font-mono text-muted-foreground">{period.era}</p>
            <SafeImage src={period.imageUrl} alt={period.name} />
            <List title="Aesthetics" items={period.aesthetics} />
            <List title="Architecture" items={period.architecture} />
            <List title="Clothing" items={period.clothing} />
            <List title="Weapons" items={period.weapons} />
            <List title="Motifs" items={period.motifs} />
            <List title="Colors" items={period.colors} />
            <List title="Design notes" items={period.designNotes} />
          </article>
        ) : region ? (
          <div className="space-y-px">
            <button
              type="button"
              onClick={() => setRegion(null)}
              className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground mb-2"
            >
              ← Cultures
            </button>
            {region.periods.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setPeriod(item)}
                className="w-full text-left border border-border bg-card px-3 py-3 hover:bg-surface-hover"
              >
                <p className="text-xs font-mono">{item.name}</p>
                <p className="text-[10px] font-mono text-muted-foreground">{item.era}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-px">
            {cultureLibrary.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setRegion(item)}
                className="w-full text-left border border-border bg-card px-3 py-3 hover:bg-surface-hover"
              >
                <p className="text-xs font-mono">
                  {item.icon} {item.name}
                </p>
                <p className="text-[10px] font-mono text-muted-foreground">{item.region}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
