"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/rule-of-life/ui/button"
import { PageHeader, PageShell } from "@/components/rule-of-life/components/Chrome"
import { PillarListItem } from "@/components/rule-of-life/components/PillarCard"
import { formatFrequency } from "@/lib/rule-of-life/scheduling"
import { sortFocusFirst } from "@/lib/rule-of-life/observance"
import type { Pillar } from "@/lib/rule-of-life/types"

export function PillarsScreen({
  pillars,
  onCreate,
  onOpen,
}: {
  pillars: Pillar[]
  onCreate: () => void
  onOpen: (pillar: Pillar) => void
}) {
  const ordered = sortFocusFirst(pillars)

  return (
    <PageShell vellum withNav>
        <PageHeader
          eyebrow="Rule of Life"
          title="Your Pillars"
          action={
            <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1" onClick={onCreate} aria-label="Create Pillar">
              <Plus />
            </Button>
          }
        />

        <div className="space-y-2.5">
          {ordered.length === 0 ? (
            <p className="font-serif italic text-center text-rol-muted-foreground py-10">
              No Pillars yet. Begin with one practice.
            </p>
          ) : (
            ordered.map((pillar, index) => (
              <div key={pillar.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <PillarListItem
                  pillar={pillar}
                  frequencyLabel={formatFrequency(pillar.frequency)}
                  onOpen={() => onOpen(pillar)}
                />
              </div>
            ))
          )}
        </div>
    </PageShell>
  )
}
