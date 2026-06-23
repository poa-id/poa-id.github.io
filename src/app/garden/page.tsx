"use client"

import { useState } from "react"
import { GardenShell } from "@/components/garden-shell"
import { useCubeFaceThemeForSlug } from "@/hooks/use-cube-face-theme"
import { CUBE_FACE_STUBS } from "@/lib/cube-face-content"
import {
  GARDEN_SECTION_INTROS,
  GARDEN_SECTIONS,
  type GardenSection,
} from "@/lib/garden-content"

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
