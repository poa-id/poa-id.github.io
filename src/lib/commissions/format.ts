import { ANCHOR_NOTE } from "@/data/commissions/creature-taxonomy"
import { serialFromId } from "@/lib/commissions/random"
import type { IllustrationCommission } from "@/lib/commissions/types"

export function formatCommissionAsText(commission: IllustrationCommission): string {
  const serial = serialFromId(commission.id)
  const lines = [
    `POA FORGE / COMMISSION ${serial}`,
    commission.id,
    "",
    commission.title.toUpperCase(),
    "",
    commission.subjectLabel,
  ]

  if (commission.being) {
    lines.push(commission.being.summary)
  }

  lines.push(
    `${commission.colorLabel} · ${commission.primaryStudyLabel} · ${commission.difficultyLabel}`,
    "",
    "ART BRIEF",
    commission.artBrief
  )

  if (commission.realismAnchor) {
    lines.push(
      "",
      "REALISM ANCHOR",
      commission.realismAnchor,
      ANCHOR_NOTE
    )
  }

  if (commission.anatomyDirection) {
    lines.push("", "ANATOMY", commission.anatomyDirection)
  }

  lines.push("", "PRIMARY STUDY", commission.primaryStudyLabel)

  if (commission.secondaryStudies.length > 0) {
    lines.push("", "SECONDARY STUDIES", commission.secondaryStudies.join("\n"))
  }

  lines.push(
    "",
    "COMPOSITION",
    commission.composition,
    "",
    "LIGHTING",
    commission.lighting,
    "",
    "MATERIAL CHALLENGE",
    commission.materials.join("\n"),
    "",
    commission.constraints.length > 1 ? "CONSTRAINTS" : "CONSTRAINT",
    commission.constraints.join("\n")
  )

  if (commission.artDirection) {
    lines.push("", "ART DIRECTION", commission.artDirection)
  }

  lines.push("", `Status: ${commission.status}`, `Seed: ${commission.seed}`)

  return lines.join("\n")
}
