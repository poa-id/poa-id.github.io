"use client"

import Image from "next/image"
import { ANCHOR_NOTE } from "@/data/commissions/creature-taxonomy"
import type { CubeFaceTheme } from "@/lib/cube-face-themes"
import { serialFromId } from "@/lib/commissions/random"
import type { IllustrationCommission } from "@/lib/commissions/types"

function BriefBlock({
  label,
  children,
  muted,
}: {
  label: string
  children: React.ReactNode
  muted: string
}) {
  return (
    <section className="space-y-2">
      <h3
        className="text-[10px] uppercase tracking-[0.22em] [font-family:var(--font-disket)]"
        style={{ color: muted }}
      >
        {label}
      </h3>
      <div className="text-sm leading-relaxed whitespace-pre-line">{children}</div>
    </section>
  )
}

export function CommissionBrief({
  commission,
  theme,
}: {
  commission: IllustrationCommission
  theme: CubeFaceTheme
}) {
  const serial = serialFromId(commission.id)
  const accepted = commission.status === "accepted"

  return (
    <article
      className="relative overflow-hidden border px-5 py-6 sm:px-7 sm:py-8 space-y-6"
      style={{
        backgroundColor: theme.bg,
        borderColor: accepted ? theme.text : theme.border,
      }}
      aria-live="polite"
    >
      {accepted && (
        <p
          className="absolute top-5 right-4 sm:top-6 sm:right-6 rotate-[-8deg] border px-2 py-1 text-[10px] uppercase tracking-[0.18em] [font-family:var(--font-disket-bold)]"
          style={{ borderColor: theme.text, color: theme.text }}
        >
          Commission Accepted
        </p>
      )}

      <header className="relative space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p
              className="text-[10px] uppercase tracking-[0.22em] [font-family:var(--font-disket)]"
              style={{ color: theme.textMuted }}
            >
              POA Forge / Commission {serial}
            </p>
            <p
              className="text-[10px] tracking-[0.16em] [font-family:var(--font-disket)]"
              style={{ color: theme.textMuted }}
            >
              {commission.id}
            </p>
          </div>
          <Image
            src="/logo.svg"
            alt=""
            width={28}
            height={28}
            className="opacity-50 dark:invert"
          />
        </div>

        <div className="space-y-2 pt-2">
          <h2 className="text-xl sm:text-2xl uppercase tracking-wide [font-family:var(--font-disket-bold)] leading-snug pr-16">
            {commission.title}
          </h2>
          <p className="text-sm [font-family:var(--font-disket)]">{commission.subjectLabel}</p>
          {commission.being && (
            <p className="text-sm [font-family:var(--font-disket)]">{commission.being.summary}</p>
          )}
          <p
            className="text-xs [font-family:var(--font-disket)]"
            style={{ color: theme.textMuted }}
          >
            {commission.colorLabel} · {commission.primaryStudyLabel} · {commission.difficultyLabel}
          </p>
        </div>
      </header>

      <div
        className="relative h-px w-full"
        style={{ backgroundColor: theme.border }}
        aria-hidden="true"
      />

      <div className="relative space-y-6">
        <BriefBlock label="Art Brief" muted={theme.textMuted}>
          {commission.artBrief}
        </BriefBlock>

        {commission.realismAnchor && (
          <BriefBlock label="Realism Anchor" muted={theme.textMuted}>
            {`${commission.realismAnchor}\n\n${ANCHOR_NOTE}`}
          </BriefBlock>
        )}

        {commission.anatomyDirection && (
          <BriefBlock label="Anatomy" muted={theme.textMuted}>
            {commission.anatomyDirection}
          </BriefBlock>
        )}

        <BriefBlock label="Primary Study" muted={theme.textMuted}>
          {commission.primaryStudyLabel}
        </BriefBlock>

        {commission.secondaryStudies.length > 0 && (
          <BriefBlock label="Secondary Studies" muted={theme.textMuted}>
            {commission.secondaryStudies.join("\n")}
          </BriefBlock>
        )}

        <BriefBlock label="Composition" muted={theme.textMuted}>
          {commission.composition}
        </BriefBlock>

        <BriefBlock label="Lighting" muted={theme.textMuted}>
          {commission.lighting}
        </BriefBlock>

        <BriefBlock label="Material Challenge" muted={theme.textMuted}>
          {commission.materials.join("\n")}
        </BriefBlock>

        <BriefBlock label={commission.constraints.length > 1 ? "Constraints" : "Constraint"} muted={theme.textMuted}>
          {commission.constraints.join("\n")}
        </BriefBlock>

        {commission.artDirection && (
          <BriefBlock label="Art Direction" muted={theme.textMuted}>
            {commission.artDirection}
          </BriefBlock>
        )}
      </div>
    </article>
  )
}
