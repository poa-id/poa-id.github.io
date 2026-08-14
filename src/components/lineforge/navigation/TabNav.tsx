"use client"

import { BarChart3, BookOpen, Calendar, Dices, FlaskConical, Layers } from "lucide-react"
import type { LineforgeTab } from "@/lib/lineforge/types/lineforge"
import { cn } from "@/lib/utils"

const TABS: { id: LineforgeTab; label: string; icon: typeof Calendar }[] = [
  { id: "today", label: "Today", icon: Calendar },
  { id: "decks", label: "Decks", icon: Layers },
  { id: "dice", label: "Dice", icon: Dices },
  { id: "lab", label: "Lab", icon: FlaskConical },
  { id: "library", label: "Library", icon: BookOpen },
  { id: "history", label: "History", icon: BarChart3 },
]

export function TabNav({
  tab,
  onChange,
}: {
  tab: LineforgeTab
  onChange: (tab: LineforgeTab) => void
}) {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Lineforge"
    >
      <div className="max-w-lg mx-auto flex">
        {TABS.map(({ id, label, icon: Icon }) => {
          const active = tab === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-11 transition-colors duration-100",
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
              aria-current={active ? "page" : undefined}
              aria-label={label}
            >
              <Icon className="size-4" strokeWidth={1.5} />
              <span className="text-[9px] font-mono uppercase tracking-wider">{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
