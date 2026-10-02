"use client"

import { useState } from "react"
import Link from "next/link"
import { GardenShell } from "@/components/garden-shell"
import { useCubeFaceThemeForSlug } from "@/hooks/use-cube-face-theme"
import { CUBE_FACE_STUBS } from "@/lib/cube-face-content"
import {
  GARDEN_SECTION_INTROS,
  GARDEN_SECTIONS,
  getGardenJournalEntries,
  getGardenTradeProjects,
  type GardenSection,
} from "@/lib/garden-content"
import { GardenTradeEntry } from "@/components/garden/garden-trade-entry"
import { GardenJournalEntry } from "@/components/garden/garden-journal-entry"

function GardenSectionContent({ section }: { section: GardenSection }) {
  const theme = useCubeFaceThemeForSlug("garden")
  const content = CUBE_FACE_STUBS.garden
  const sectionMeta = GARDEN_SECTIONS.find((s) => s.id === section)!

  return (
    <section className="space-y-8">
      <header className="space-y-2 text-center lg:text-left">
        <p
          className="text-xs uppercase tracking-widest [font-family:var(--font-disket)]"
          style={{ color: theme.textMuted }}
        >
          {content.archetype}
        </p>
        <h2 className="text-2xl lg:text-3xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">
          {sectionMeta.label}
        </h2>
      </header>

      <p className="text-sm leading-relaxed [font-family:var(--font-disket)] opacity-85">
        {GARDEN_SECTION_INTROS[section]}
      </p>

      {section === "skills" ? (
        <Link
          href="/skills"
          className="group block border p-5 transition-colors [font-family:var(--font-disket)]"
          style={{ borderColor: theme.border }}
        >
          <span className="block text-xs uppercase tracking-widest opacity-65">
            Character record
          </span>
          <span className="mt-2 flex items-center justify-between gap-4 text-lg [font-family:var(--font-disket-bold)]">
            Open the Skillbook
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
          <span className="mt-2 block text-sm leading-relaxed opacity-75">
            A living record of disciplines, levels, achievements, and the work
            still in progress.
          </span>
        </Link>
      ) : null}

      {section === "trades"
        ? getGardenTradeProjects().map((object) => (
            <GardenTradeEntry key={object.slug} object={object} theme={theme} />
          ))
        : null}

      {getGardenJournalEntries(section).map((entry) => (
        <GardenJournalEntry key={entry.slug} entry={entry} theme={theme} />
      ))}
    </section>
  )
}

export default function GardenPage() {
  const content = CUBE_FACE_STUBS.garden
  const [activeSection, setActiveSection] = useState<GardenSection>("gardening")

  const handleSectionChange = (section: GardenSection) => {
    setActiveSection(section)
    const scroll = document.querySelector(".content-scroll")
    if (scroll) scroll.scrollTop = 0
  }

  return (
    <GardenShell
      content={content}
      activeSection={activeSection}
      onSectionChange={handleSectionChange}
    >
      <GardenSectionContent section={activeSection} />
    </GardenShell>
  )
}
