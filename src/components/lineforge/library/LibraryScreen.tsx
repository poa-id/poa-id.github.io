"use client"

import { BookOpen, Globe, Layers } from "lucide-react"

export function LibraryScreen({
  onOpenObject,
  onOpenMaterial,
  onOpenCulture,
}: {
  onOpenObject: () => void
  onOpenMaterial: () => void
  onOpenCulture: () => void
}) {
  const items = [
    { title: "Object Reference", description: "Weapons, vehicles, props, and construction notes.", icon: BookOpen, onClick: onOpenObject },
    { title: "Material Reference", description: "Rendering properties for metal, cloth, skin, and more.", icon: Layers, onClick: onOpenMaterial },
    { title: "Culture Reference", description: "Periods, motifs, costume, and design notes.", icon: Globe, onClick: onOpenCulture },
  ]

  return (
    <div className="max-w-lg mx-auto px-4 pb-24 pt-6 space-y-px">
      <h1 className="text-lg font-mono font-bold tracking-tight mb-4">Library</h1>
      {items.map(({ title, description, icon: Icon, onClick }) => (
        <button
          key={title}
          type="button"
          onClick={onClick}
          className="w-full p-4 border border-border bg-card hover:bg-surface-hover text-left flex items-start gap-3"
        >
          <Icon className="size-4 mt-0.5 text-primary" strokeWidth={1.5} />
          <span>
            <span className="block text-xs font-mono uppercase tracking-wider">{title}</span>
            <span className="block text-[10px] font-mono text-muted-foreground mt-1">{description}</span>
          </span>
        </button>
      ))}
    </div>
  )
}
