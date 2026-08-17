"use client"

import { BackLink, PageShell, TallyMarks } from "@/components/rule-of-life/components/Chrome"
import { Button } from "@/components/rule-of-life/ui/button"
import { formatSchedule } from "@/lib/rule-of-life/scheduling"
import type { ContinuityStats, Pillar } from "@/lib/rule-of-life/types"

export function PillarDetailScreen({
  pillar,
  continuity,
  onBack,
  onEdit,
  onDelete,
}: {
  pillar: Pillar
  continuity: ContinuityStats
  onBack: () => void
  onEdit: () => void
  onDelete: () => void
}) {
  const modeLabel =
    pillar.mode === "quantity"
      ? `Quantity (${pillar.quantityConfig?.unit ?? "units"}) — Target: ${pillar.quantityConfig?.target ?? 0}`
      : "Simple (Observed / Not Observed)"

  return (
    <PageShell vellum={false}>
        <BackLink label="Back" onClick={onBack} />

        <section className="animate-fade-in">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-serif text-2xl font-semibold">{pillar.title}</h1>
            {pillar.isFocus ? (
              <span className="text-xs bg-rol-muted px-2 py-0.5 rounded-full text-rol-muted-foreground">
                In Focus
              </span>
            ) : null}
          </div>
          {pillar.description ? (
            <p className="mt-3 text-rol-muted-foreground leading-relaxed">{pillar.description}</p>
          ) : null}
        </section>

        <section className="mt-8 animate-fade-in" style={{ animationDelay: "50ms" }}>
          <p className="section-header mb-3">Continuity</p>
          <TallyMarks history={continuity.history} />
          <p className="mt-4 text-sm text-rol-muted-foreground">
            Current continuity:{" "}
            <span className="text-rol-foreground">
              {continuity.current} {continuity.current === 1 ? "day" : "days"}
            </span>
          </p>
          <p className="text-sm text-rol-muted-foreground">
            Longest continuity:{" "}
            <span className="text-rol-foreground">
              {continuity.longest} {continuity.longest === 1 ? "day" : "days"}
            </span>
          </p>
        </section>

        <section className="mt-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <p className="section-header mb-2">Schedule</p>
          <p className="text-sm">{formatSchedule(pillar.frequency)}</p>
        </section>

        <section className="mt-8 animate-fade-in" style={{ animationDelay: "150ms" }}>
          <p className="section-header mb-2">Mode</p>
          <p className="text-sm">{modeLabel}</p>
        </section>

        <div className="mt-10 space-y-2">
          <Button variant="outline" className="w-full" onClick={onEdit}>
            Edit Pillar
          </Button>
          <Button variant="ghost" className="w-full text-rol-destructive" onClick={onDelete}>
            Delete Pillar
          </Button>
        </div>
    </PageShell>
  )
}
