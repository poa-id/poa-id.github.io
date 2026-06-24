"use client"

import { useState } from "react"
import { HearthShell } from "@/components/hearth-shell"
import { RoomHeader } from "@/components/room-header"
import { RoomRelic } from "@/components/room-relic"
import { useCubeFaceThemeForSlug } from "@/hooks/use-cube-face-theme"
import {
  HEARTH_SECTION_INTROS,
  HEARTH_SECTIONS,
  type HearthSection,
} from "@/lib/hearth-content"

function HearthSectionContent({ section }: { section: HearthSection }) {
  const theme = useCubeFaceThemeForSlug("hearth")
  const sectionMeta = HEARTH_SECTIONS.find((s) => s.id === section)!

  return (
    <section className="relative space-y-6 pb-12">
      <h2 className="text-2xl lg:text-3xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">
        {sectionMeta.label}
      </h2>
      <p className="text-sm leading-relaxed [font-family:var(--font-disket)] opacity-85">
        {HEARTH_SECTION_INTROS[section]}
      </p>
      {section === "home" && (
        <RoomRelic
          id="key"
          className="absolute bottom-0 right-0 sm:right-8"
        />
      )}
    </section>
  )
}

export default function HearthPage() {
  const theme = useCubeFaceThemeForSlug("hearth")
  const [activeSection, setActiveSection] = useState<HearthSection>("family")

  const handleSectionChange = (section: HearthSection) => {
    setActiveSection(section)
    const content = document.querySelector(".content-scroll")
    if (content) content.scrollTop = 0
  }

  return (
    <HearthShell activeSection={activeSection} onSectionChange={handleSectionChange}>
      <div className="space-y-10 mb-8">
        <RoomHeader roomId="hearth" textMuted={theme.textMuted} />
      </div>
      <HearthSectionContent section={activeSection} />
    </HearthShell>
  )
}
