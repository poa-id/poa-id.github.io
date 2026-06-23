"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import {
  HallReturnEdge,
  HallReturnInline,
} from "@/components/cube-edge-tabs"
import { useCubeFaceThemeForSlug } from "@/hooks/use-cube-face-theme"
import {
  HEARTH_SECTIONS,
  type HearthSection,
} from "@/lib/hearth-content"

interface HearthShellProps {
  activeSection: HearthSection
  onSectionChange: (section: HearthSection) => void
  children: React.ReactNode
}

export function HearthShell({
  activeSection,
  onSectionChange,
  children,
}: HearthShellProps) {
  const theme = useCubeFaceThemeForSlug("hearth")

  return (
    <div
      className="h-screen w-full flex flex-col"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <HallReturnEdge chevronDir="up" theme="hearth" />

      <div className="lg:hidden px-6 pt-4 shrink-0">
        <HallReturnInline chevronDir="up" />
      </div>

      {/* Content — 90% */}
      <main
        className="flex-1 overflow-y-auto px-6 py-6 lg:py-8 lg:pt-12 content-scroll min-h-0"
        style={{ backgroundColor: theme.hover }}
      >
        <div className="w-full lg:w-4/5 max-w-3xl mx-auto">{children}</div>
      </main>

      {/* Nav strip — 10% */}
      <footer
        className="relative shrink-0 flex items-center border-t px-4 lg:px-6 h-[10vh] max-h-14 min-h-12"
        style={{ borderColor: theme.border }}
      >
        <nav
          className="flex-1 flex items-stretch justify-center overflow-x-auto"
          aria-label="Hearth sections"
        >
          {HEARTH_SECTIONS.map((section) => {
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

        <div className="absolute right-4 lg:right-6 flex items-center gap-4">
          <h1 className="hidden sm:block text-sm uppercase tracking-wide [font-family:var(--font-disket-bold)]">
            Hearth
          </h1>
          <ThemeToggle />
        </div>
      </footer>
    </div>
  )
}
