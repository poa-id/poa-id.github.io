"use client"

import { useState } from "react"
import { ShelfShell } from "@/components/shelf-shell"
import { RoomHeader } from "@/components/room-header"
import { RoomRelic } from "@/components/room-relic"
import { useCubeFaceThemeForSlug } from "@/hooks/use-cube-face-theme"
import {
  SHELF_CURRENT_BOOKS,
  SHELF_CURRENT_CURIOSITIES,
  SHELF_CURRENT_STUDIES,
  SHELF_FOUNDATIONS,
  SHELF_MARGINALIA_FRAGMENTS,
  SHELF_MARGINALIA_NOTES,
  SHELF_MARGINALIA_QUOTES,
  SHELF_SECTION_INTROS,
  type ShelfItem,
  type ShelfQuote,
  type ShelfSection,
} from "@/lib/shelf-content"

function ShelfItemRow({
  title,
  creator,
  note,
  textMuted,
}: {
  title: string
  creator?: string
  note?: string
  textMuted: string
}) {
  return (
    <li className="space-y-0.5">
      <p className="text-base [font-family:var(--font-disket-bold)]">{title}</p>
      {creator && (
        <p className="text-sm [font-family:var(--font-disket)]" style={{ color: textMuted }}>
          {creator}
        </p>
      )}
      {note && (
        <p className="text-sm italic [font-family:var(--font-disket)]" style={{ color: textMuted }}>
          {note}
        </p>
      )}
    </li>
  )
}

function ShelfQuoteList({
  items,
  textMuted,
  borderColor,
  emptyLabel,
}: {
  items: ShelfQuote[]
  textMuted: string
  borderColor: string
  emptyLabel?: string
}) {
  if (items.length === 0) {
    return emptyLabel ? (
      <p className="text-sm italic [font-family:var(--font-disket)]" style={{ color: textMuted }}>
        {emptyLabel}
      </p>
    ) : null
  }

  return (
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li
          key={`${item.text.slice(0, 24)}-${i}`}
          className="text-sm border-l-2 pl-4 [font-family:var(--font-disket)]"
          style={{ borderColor, color: textMuted }}
        >
          {item.text}
          {item.attribution && (
            <span className="block mt-1 not-italic opacity-70">— {item.attribution}</span>
          )}
        </li>
      ))}
    </ul>
  )
}

function DeskSubsection({
  title,
  items,
  textMuted,
}: {
  title: string
  items: ShelfItem[]
  textMuted: string
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm uppercase tracking-wide [font-family:var(--font-disket-bold)]">
        {title}
      </h3>
      {items.length > 0 ? (
        <ul className="space-y-4">
          {items.map((item) => (
            <ShelfItemRow key={item.title} {...item} textMuted={textMuted} />
          ))}
        </ul>
      ) : (
        <p className="text-sm italic [font-family:var(--font-disket)]" style={{ color: textMuted }}>
          Nothing here right now.
        </p>
      )}
    </div>
  )
}

function ShelfSectionContent({ section }: { section: ShelfSection }) {
  const theme = useCubeFaceThemeForSlug("shelf")

  switch (section) {
    case "foundations":
      return (
        <section className="relative space-y-6">
          <header className="space-y-2">
            <h2 className="text-2xl lg:text-3xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">
              Foundations
            </h2>
            <p className="text-sm [font-family:var(--font-disket)]" style={{ color: theme.textMuted }}>
              {SHELF_SECTION_INTROS.foundations}
            </p>
          </header>
          <ul className="space-y-2">
            {SHELF_FOUNDATIONS.map((name) => (
              <li
                key={name}
                className="text-base [font-family:var(--font-disket)]"
              >
                {name}
              </li>
            ))}
          </ul>
          <RoomRelic
            id="die"
            className="absolute bottom-0 right-2 sm:right-6 translate-y-1"
          />
        </section>
      )
    case "onMyDesk":
      return (
        <section className="space-y-8">
          <header className="space-y-2">
            <h2 className="text-2xl lg:text-3xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">
              On My Desk
            </h2>
            <p className="text-sm [font-family:var(--font-disket)]" style={{ color: theme.textMuted }}>
              {SHELF_SECTION_INTROS.onMyDesk}
            </p>
          </header>
          <DeskSubsection
            title="Current books"
            items={SHELF_CURRENT_BOOKS}
            textMuted={theme.textMuted}
          />
          <DeskSubsection
            title="Current studies"
            items={SHELF_CURRENT_STUDIES}
            textMuted={theme.textMuted}
          />
          <DeskSubsection
            title="Current curiosities"
            items={SHELF_CURRENT_CURIOSITIES}
            textMuted={theme.textMuted}
          />
        </section>
      )
    case "marginalia":
      return (
        <section className="space-y-8">
          <header className="space-y-2">
            <h2 className="text-2xl lg:text-3xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">
              Marginalia
            </h2>
            <p className="text-sm [font-family:var(--font-disket)]" style={{ color: theme.textMuted }}>
              {SHELF_SECTION_INTROS.marginalia}
            </p>
          </header>
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-sm uppercase tracking-wide [font-family:var(--font-disket-bold)]">
                Quotes
              </h3>
              <ShelfQuoteList
                items={SHELF_MARGINALIA_QUOTES}
                textMuted={theme.textMuted}
                borderColor={theme.border}
                emptyLabel="Nothing filed yet."
              />
            </div>
            <div className="space-y-3">
              <h3 className="text-sm uppercase tracking-wide [font-family:var(--font-disket-bold)]">
                Fragments
              </h3>
              <ShelfQuoteList
                items={SHELF_MARGINALIA_FRAGMENTS}
                textMuted={theme.textMuted}
                borderColor={theme.border}
                emptyLabel="Nothing filed yet."
              />
            </div>
            <div className="space-y-3">
              <h3 className="text-sm uppercase tracking-wide [font-family:var(--font-disket-bold)]">
                Notes
              </h3>
              <ShelfQuoteList
                items={SHELF_MARGINALIA_NOTES}
                textMuted={theme.textMuted}
                borderColor={theme.border}
                emptyLabel="Nothing filed yet."
              />
            </div>
          </div>
        </section>
      )
  }
}

export default function ShelfPage() {
  const theme = useCubeFaceThemeForSlug("shelf")
  const [activeSection, setActiveSection] = useState<ShelfSection>("foundations")

  const handleSectionChange = (section: ShelfSection) => {
    setActiveSection(section)
    const content = document.querySelector(".content-scroll")
    if (content) content.scrollTop = 0
  }

  return (
    <ShelfShell activeSection={activeSection} onSectionChange={handleSectionChange}>
      <div className="space-y-10 mb-8">
        <RoomHeader roomId="shelf" textMuted={theme.textMuted} hideQuestion />
      </div>
      <ShelfSectionContent section={activeSection} />
    </ShelfShell>
  )
}
