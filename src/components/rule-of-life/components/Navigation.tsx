"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import type { MainScreen } from "@/lib/rule-of-life/types"

const TABS: { id: MainScreen; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "pillars", label: "Pillars" },
  { id: "journal", label: "Journal" },
  { id: "review", label: "Review" },
]

function DeskBar({ children }: { children?: ReactNode }) {
  return (
    <div className="rol-desk relative z-[80] isolate shrink-0 h-[var(--rol-desk-height)]">
      <div className="relative h-full">{children}</div>
    </div>
  )
}

export function DeskRail() {
  return <DeskBar />
}

export function Navigation({
  screen,
  onChange,
}: {
  screen: MainScreen
  onChange: (screen: MainScreen) => void
}) {
  return (
    <nav aria-label="Rule of Life">
      <DeskBar>
        <div className="rol-desk-tabs relative flex items-center justify-around gap-1 px-2 sm:px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {TABS.map((tab) => {
            const active = tab.id === screen
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChange(tab.id)}
                className={cn(
                  "flex-1 min-h-11 py-2 text-[13px] sm:text-[15px] tracking-wide font-serif transition-colors duration-200 relative touch-manipulation",
                  active
                    ? "text-rol-primary"
                    : "text-rol-muted-foreground hover:text-rol-foreground"
                )}
                aria-current={active ? "page" : undefined}
              >
                {tab.label}
                {active ? (
                  <span className="absolute inset-x-4 -bottom-0.5 h-px bg-rol-primary/80" />
                ) : null}
              </button>
            )
          })}
        </div>
      </DeskBar>
    </nav>
  )
}
