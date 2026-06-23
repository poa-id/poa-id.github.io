"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { RoomHeader } from "@/components/room-header"
import { useCubeFaceThemeForSlug } from "@/hooks/use-cube-face-theme"
import {
  HallReturnEdge,
  HallReturnInline,
  ForgeEntryFromGardenEdge,
  ForgeEntryInline,
} from "@/components/cube-edge-tabs"
import { GARDEN_SECTIONS, type GardenSection } from "@/lib/garden-content"
import type { CubeFaceStubContent } from "@/lib/cube-face-content"

interface GardenShellProps {
  content: CubeFaceStubContent
  activeSection: GardenSection
  onSectionChange: (section: GardenSection) => void
  children: React.ReactNode
}

export function GardenShell({
  content,
  activeSection,
  onSectionChange,
  children,
}: GardenShellProps) {
  const theme = useCubeFaceThemeForSlug("garden")

  return (
    <div
      className="h-screen w-full flex flex-col"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <HallReturnEdge theme="garden" />
      <ForgeEntryFromGardenEdge />

      <div className="lg:hidden px-6 pt-4 flex flex-wrap gap-4 shrink-0">
        <HallReturnInline />
        <ForgeEntryInline />
      </div>

      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* Main — 80% */}
        <main
          className="w-full lg:w-4/5 overflow-y-auto px-6 py-8 lg:py-12 lg:pt-16 content-scroll min-h-0 order-1 lg:order-none"
          style={{ backgroundColor: theme.hover }}
        >
          <div className="w-full lg:w-4/5 max-w-2xl mx-auto">{children}</div>
        </main>

        {/* Sidebar — 20% */}
        <aside
          className="w-full lg:w-1/5 lg:min-w-[200px] lg:max-w-xs shrink-0 border-t lg:border-t-0 lg:border-l flex flex-col order-2 lg:order-none"
          style={{ borderColor: theme.border }}
        >
          <div
            className="flex items-center justify-between px-4 lg:px-6 py-4 border-b"
            style={{ borderColor: theme.border }}
          >
            <span className="text-sm uppercase tracking-wide [font-family:var(--font-disket-bold)]">
              {content.label}
            </span>
            <ThemeToggle />
          </div>

          <div
            className="px-4 lg:px-6 py-4 border-b"
            style={{ borderColor: theme.border }}
          >
            <RoomHeader roomId="garden" textMuted={theme.textMuted} compact />
          </div>

          <nav
            className="flex-1 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden px-4 lg:px-6 py-4"
            aria-label="Garden sections"
          >
            <ul className="flex lg:flex-col gap-1 lg:gap-0">
              {GARDEN_SECTIONS.map((section) => {
                const isActive = activeSection === section.id
                return (
                  <li key={section.id} className="shrink-0 lg:shrink">
                    <button
                      type="button"
                      onClick={() => onSectionChange(section.id)}
                      className={`w-full text-left px-2 lg:px-3 py-2 lg:py-3 border-l-2 transition-colors text-sm leading-snug ${
                        isActive
                          ? "[font-family:var(--font-disket-bold)]"
                          : "[font-family:var(--font-disket)]"
                      }`}
                      style={{
                        color: isActive ? theme.text : theme.textMuted,
                        borderColor: isActive ? theme.text : "transparent",
                      }}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {section.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  )
}
