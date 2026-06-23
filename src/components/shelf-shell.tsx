"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { ShelfDieRelic } from "@/components/shelf-die-relic"
import { ShelfReturnEdge, ShelfReturnInline } from "@/components/cube-edge-tabs"
import { useCubeFaceThemeForSlug } from "@/hooks/use-cube-face-theme"
import {
  SHELF_SECTIONS,
  type ShelfSection,
} from "@/lib/shelf-content"

interface ShelfShellProps {
  activeSection: ShelfSection
  onSectionChange: (section: ShelfSection) => void
  children: React.ReactNode
}

export function ShelfShell({
  activeSection,
  onSectionChange,
  children,
}: ShelfShellProps) {
  const theme = useCubeFaceThemeForSlug("shelf")

  return (
    <div
      className="h-screen w-full flex flex-col"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <ShelfReturnEdge />

      <div className="lg:hidden px-6 pt-4 shrink-0">
        <ShelfReturnInline />
      </div>

      {/* Nav strip — 10% */}
      <header
        className="relative shrink-0 flex items-center border-b px-4 lg:px-6 h-[10vh] max-h-14 min-h-12"
        style={{ borderColor: theme.border }}
      >
        <div className="absolute left-4 lg:left-6 hidden sm:block">
          <p
            className="text-[10px] uppercase tracking-widest leading-none [font-family:var(--font-disket)]"
            style={{ color: theme.textMuted }}
          >
            The Learner
          </p>
          <h1 className="text-sm uppercase tracking-wide [font-family:var(--font-disket-bold)]">
            Shelf
          </h1>
        </div>

        <nav
          className="flex-1 flex items-stretch justify-center overflow-x-auto"
          aria-label="Shelf sections"
        >
          {SHELF_SECTIONS.map((section) => {
            const isActive = activeSection === section.id
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => onSectionChange(section.id)}
                className="shrink-0 px-3 lg:px-4 flex items-center border-b-2 transition-colors [font-family:var(--font-disket)] text-xs uppercase tracking-wide"
                style={{
                  color: isActive ? theme.text : theme.textMuted,
                  borderColor: isActive ? theme.text : "transparent",
                }}
                aria-current={isActive ? "page" : undefined}
              >
                {section.label}
              </button>
            )
          })}
        </nav>

        <div className="absolute right-4 lg:right-6 flex items-center gap-3">
          <ShelfDieRelic />
          <ThemeToggle />
        </div>
      </header>

      {/* Content — 90% */}
      <main
        className="flex-1 overflow-y-auto px-6 py-6 lg:py-8 pb-16 content-scroll min-h-0"
        style={{ backgroundColor: theme.hover }}
      >
        <div className="w-full lg:w-4/5 max-w-3xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
