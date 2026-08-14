import { SUBJECT_IDS, type Subject } from "@/lib/commissions/types"
import { generateCommission } from "@/lib/commissions/generator"

const FAIL_PATTERNS: Array<{ id: string; re: RegExp }> = [
  { id: "muzzle-on-wrong-body", re: /muzzle/i },
  { id: "head-and-shoulders", re: /head and shoulders/i },
  { id: "weight-through-legs-generic", re: /weight through the legs/i },
  { id: "subject-in-itself", re: /stands in an? (leaking |raised |timber )?(granary|boathouse|watch post)/i },
  { id: "crew-of-singular", re: /crew of \w+(?:-\w+)? \w+ \w+ is\b/i },
  { id: "occupy-agreement", re: /\b(crop|bed|stand) occupy\b/i },
  { id: "is-implied-plural", re: /\b(trunks|reeds|beds|stools) is\b/i },
  { id: "piscine-flightless", re: /Piscine · Flightless/i },
  { id: "serpentine-serpentine", re: /Serpentine · Serpentine/i },
  { id: "plate-armor-on-building", re: /plate armor/i },
  { id: "lamplight-unmotivated", re: /Lamplight in fog/i },
  { id: "bioluminescent-unmotivated", re: /Bioluminescent fill/i },
]

function inspect(text: string, family?: string): string[] {
  const hits: string[] = []
  for (const pattern of FAIL_PATTERNS) {
    if (pattern.id === "muzzle-on-wrong-body") {
      if (family && /crustacean|serpentine|piscine|insectoid|arachnid|molluscan|worm/i.test(family) && pattern.re.test(text)) {
        hits.push(pattern.id)
      }
      continue
    }
    if (pattern.id === "weight-through-legs-generic") {
      if (family && /serpentine|piscine|molluscan|worm|cephalopod/i.test(family) && pattern.re.test(text)) {
        hits.push(pattern.id)
      }
      continue
    }
    if (pattern.id === "subject-in-itself") {
      if (/Architecture/i.test(text) && pattern.re.test(text)) hits.push(pattern.id)
      continue
    }
    if (pattern.id === "head-and-shoulders") {
      if (family && /serpentine|piscine|molluscan|crustacean|insectoid/i.test(family) && pattern.re.test(text)) {
        hits.push(pattern.id)
      }
      continue
    }
    if (pattern.id === "plate-armor-on-building") {
      if (/Architecture/i.test(text) && pattern.re.test(text) && !/guard|soldier|warrior/i.test(text)) {
        hits.push(pattern.id)
      }
      continue
    }
    if (pattern.re.test(text)) hits.push(pattern.id)
  }
  return hits
}

export function runQualityCheck(count = 50): {
  generated: number
  failures: Array<{ seed: string; subject: string; issues: string[]; excerpt: string }>
} {
  const failures: Array<{ seed: string; subject: string; issues: string[]; excerpt: string }> = []
  let generated = 0
  const perSubject = Math.max(2, Math.ceil(count / SUBJECT_IDS.length))

  for (const subject of SUBJECT_IDS) {
    for (let i = 0; i < perSubject; i++) {
      const commission = generateCommission({
        subject: subject as Subject,
        seed: `quality-${subject}-${i}-v2`,
      })
      generated += 1
      const blob = [
        commission.artBrief,
        commission.composition,
        commission.lighting,
        commission.constraints.join(" "),
        commission.artDirection ?? "",
        commission.being?.summary ?? "",
        commission.anatomyDirection ?? "",
        commission.environment,
      ].join("\n")
      const family = commission.being?.kind === "creature" ? commission.being.family : undefined
      const issues = inspect(blob, family).filter((id) => {
        if (id === "lamplight-unmotivated") {
          return /Lamplight in fog/i.test(commission.lighting) && !/lantern|lamp/i.test(blob)
        }
        if (id === "bioluminescent-unmotivated") {
          return /Bioluminescent/i.test(commission.lighting) && !/fungal|fungus|biolumines/i.test(commission.artBrief + commission.lighting)
        }
        return true
      })
      if (/Piscine · Flightless/i.test(commission.being?.summary ?? "")) issues.push("piscine-flightless")
      if (/Serpentine · Serpentine/i.test(commission.being?.summary ?? "")) issues.push("serpentine-serpentine")
      if (issues.length > 0) {
        failures.push({
          seed: commission.seed,
          subject,
          issues: [...new Set(issues)],
          excerpt: `${commission.being?.summary ?? commission.subjectLabel} | ${commission.environment} | ${commission.artBrief.slice(0, 180)}`,
        })
      }
    }
  }

  return { generated, failures }
}
