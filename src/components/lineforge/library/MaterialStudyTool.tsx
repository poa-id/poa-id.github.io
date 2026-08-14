"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { MATERIAL_LIBRARY } from "@/lib/lineforge/data/materials"
import type { MaterialData } from "@/lib/lineforge/types/library"

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border py-1.5">
      <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="text-[11px] font-mono text-right">{value}</span>
    </div>
  )
}

export function MaterialStudyTool({ onClose }: { onClose: () => void }) {
  const [material, setMaterial] = useState<MaterialData | null>(null)

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      <div className="max-w-lg mx-auto px-4 pb-24 pt-4">
        <header className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-mono uppercase tracking-wider">Material Reference</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 border border-border text-muted-foreground hover:text-foreground min-h-11 min-w-11"
            aria-label="Close material library"
          >
            <X className="size-4" strokeWidth={1.5} />
          </button>
        </header>

        {material ? (
          <article className="space-y-3">
            <button
              type="button"
              onClick={() => setMaterial(null)}
              className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              ← Materials
            </button>
            <h3 className="text-sm font-mono">{material.name}</h3>
            <p className="text-[10px] font-mono uppercase tracking-wider text-primary">{material.category}</p>
            <p className="text-[11px] font-sans text-muted-foreground leading-relaxed">{material.description}</p>
            <div>
              <Row label="Albedo" value={material.albedo} />
              <Row label="Roughness" value={material.roughness} />
              <Row label="Metalness" value={material.metalness} />
              <Row label="Specularity" value={material.specularity} />
              <Row label="IOR" value={material.ior} />
              <Row label="Subsurface" value={material.subsurface} />
              <Row label="Values" value={material.valueRange} />
            </div>
            <section>
              <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground mb-1">Color</p>
              <ul className="text-[11px] font-sans text-muted-foreground space-y-1">
                {material.colorNotes.map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
            </section>
            <section>
              <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground mb-1">Tips</p>
              <ul className="text-[11px] font-sans text-muted-foreground space-y-1">
                {material.tips.map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
            </section>
            <section>
              <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground mb-1">Mistakes</p>
              <ul className="text-[11px] font-sans text-muted-foreground space-y-1">
                {material.mistakes.map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
            </section>
            <section>
              <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground mb-1">Lighting</p>
              <ul className="text-[11px] font-sans text-muted-foreground space-y-1">
                {material.lighting.map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
            </section>
          </article>
        ) : (
          <div className="space-y-px">
            {MATERIAL_LIBRARY.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setMaterial(item)}
                className="w-full text-left border border-border bg-card px-3 py-3 hover:bg-surface-hover"
              >
                <p className="text-xs font-mono">{item.name}</p>
                <p className="text-[10px] font-mono text-muted-foreground">{item.category}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
