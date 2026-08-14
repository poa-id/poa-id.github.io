"use client"

import { useEffect, useMemo, useState } from "react"
import { getCards, getSchedules } from "@/lib/lineforge/storage"
import type { CardSchedule, DeckName, PracticeCard } from "@/lib/lineforge/types/lineforge"
import { cn } from "@/lib/utils"

const ORDER: DeckName[] = [
  "drills",
  "targeted",
  "personal",
  "master",
  "weekly",
  "hard_surface",
  "environment",
  "anatomy",
  "creature",
  "character",
  "grimdark",
]

function label(deck: DeckName): string {
  return deck.replaceAll("_", " ")
}

export function DecksScreen() {
  const [cards, setCards] = useState<PracticeCard[]>([])
  const [schedules, setSchedules] = useState<CardSchedule[]>([])
  const [openDeck, setOpenDeck] = useState<DeckName | null>("drills")

  useEffect(() => {
    setCards(getCards())
    setSchedules(getSchedules())
  }, [])

  const grouped = useMemo(() => {
    const map = new Map<DeckName, PracticeCard[]>()
    for (const card of cards) {
      const list = map.get(card.deckName) ?? []
      list.push(card)
      map.set(card.deckName, list)
    }
    return map
  }, [cards])

  const scheduleById = useMemo(
    () => new Map(schedules.map((item) => [item.cardId, item])),
    [schedules]
  )

  return (
    <div className="max-w-lg mx-auto px-4 pb-24 pt-6">
      <h1 className="text-lg font-mono font-bold tracking-tight mb-4">Decks</h1>
      <div className="space-y-px">
        {ORDER.map((deck) => {
          const list = grouped.get(deck) ?? []
          const open = openDeck === deck
          return (
            <section key={deck} className="border border-border bg-card">
              <button
                type="button"
                onClick={() => setOpenDeck(open ? null : deck)}
                className="w-full flex items-center justify-between px-3 py-3 min-h-11"
                aria-expanded={open}
              >
                <span className="text-xs font-mono uppercase tracking-wider">{label(deck)}</span>
                <span className="text-[10px] font-mono text-muted-foreground">{list.length}</span>
              </button>
              {open && (
                <div className="border-t border-border divide-y divide-border">
                  {list.map((card) => {
                    const schedule = scheduleById.get(card.id)
                    return (
                      <div key={card.id} className="px-3 py-3 space-y-1">
                        <p className="text-xs font-mono">{card.title}</p>
                        <p className="text-[11px] font-sans text-muted-foreground leading-relaxed">{card.prompt}</p>
                        <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
                          {card.category} · d{card.difficulty} · {card.estimatedMinutes}m
                          {card.tags.length > 0 ? ` · ${card.tags.join(" · ")}` : ""}
                        </p>
                        {schedule && (
                          <p
                            className={cn(
                              "text-[9px] font-mono uppercase tracking-wider",
                              schedule.streak > 0 ? "text-primary" : "text-muted-foreground"
                            )}
                          >
                            due {schedule.dueDate}
                            {schedule.streak > 0 ? ` · streak ${schedule.streak}` : ""}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
