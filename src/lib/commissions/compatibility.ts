import type { CameraDef } from "@/data/commissions/cameras"
import type { PlaceContext } from "@/data/commissions/environments"
import type { LightingDef } from "@/data/commissions/lighting"
import type { Difficulty, Study, Subject } from "@/lib/commissions/types"

export function anyOverlap(need: string[] | undefined, have: string[]): boolean {
  if (!need || need.length === 0) return true
  return need.some((tag) => have.includes(tag))
}

export function allPresent(need: string[] | undefined, have: string[]): boolean {
  if (!need || need.length === 0) return true
  return need.every((tag) => have.includes(tag))
}

export function nonePresent(forbid: string[] | undefined, have: string[]): boolean {
  if (!forbid || forbid.length === 0) return true
  return !forbid.some((tag) => have.includes(tag))
}

export function overlapCount(a: string[], b: string[]): number {
  const set = new Set(b)
  return a.filter((tag) => set.has(tag)).length
}

export function unique<T>(items: T[]): T[] {
  return [...new Set(items)]
}

export function withArticle(rest: string): string {
  const first = rest.trim().split(/\s+/)[0] ?? rest
  return `${/^[aeiou]/i.test(first) ? "An" : "A"} ${rest}`
}

export function articleFor(word: string): "a" | "an" {
  return /^[aeiou]/i.test(word.trim()) ? "an" : "a"
}

export function sentence(text: string): string {
  const trimmed = text.trim().replace(/\s+/g, " ")
  if (!trimmed) return ""
  const capped = trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
  return /[.!?]$/.test(capped) ? capped : `${capped}.`
}

export function fillTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{([a-zA-Z0-9]+)\}/g, (_, key: string) => vars[key] ?? "")
}

export function joinFeatures(features: string[]): string {
  if (features.length === 0) return "the immediate ground"
  if (features.length === 1) return features[0]
  if (features.length === 2) return `${features[0]} and ${features[1]}`
  return `${features.slice(0, -1).join(", ")}, and ${features[features.length - 1]}`
}

export function lightingCompatible(light: LightingDef, place: PlaceContext): boolean {
  const tags = place.tags
  switch (light.id) {
    case "dapple":
      return tags.includes("forest")
    case "firelight":
      return tags.includes("fire") || (tags.includes("domestic") && place.interior)
    case "forge-glow":
      return tags.includes("fire") || tags.includes("industrial")
    case "snow-glare":
    case "twilight":
      return tags.includes("cold") && !place.interior
    case "underwater":
      return (tags.includes("flood") || tags.includes("swamp") || tags.includes("wetland") || place.env.id === "coral-pool") && !place.interior
    case "subterranean":
      return tags.includes("underground")
    case "hearth-interior":
      return place.interior && (tags.includes("domestic") || tags.includes("interior"))
    case "workshop-window":
      return place.interior
    case "shaft":
      return place.interior || tags.includes("underground")
    case "candlelight":
      return place.interior
    case "bioluminescence":
      return tags.includes("underground") || tags.includes("swamp") || tags.includes("strange")
    case "procession-lamps":
      return tags.includes("civic") || tags.includes("sacred")
    case "water-bounce":
    case "wet-bounce":
    case "after-rain":
      return place.wet
    case "golden-hour":
    case "dawn":
    case "noon":
    case "backlight":
    case "storm":
      return !place.interior
    default:
      return true
  }
}

export function accentCompatible(accent: string, place: PlaceContext, hasBeing: boolean): boolean {
  const text = accent.toLowerCase()
  if (/(puddle|wet-ground|wet surfaces|wet-stone|caustic|rain|moisture on)/.test(text) && !place.wet) {
    return false
  }
  if (/(leaf|canopy|glade|tree mass)/.test(text) && !place.vegetation && !place.tags.includes("forest")) {
    return false
  }
  if (/(ember|forge|heat shimmer)/.test(text) && !place.tags.includes("fire") && !place.tags.includes("industrial")) {
    return false
  }
  if (/(snow|ice)/.test(text) && !place.tags.includes("cold")) return false
  if (/breath/.test(text) && !hasBeing) return false
  if (/(indoor leak|interior leak|hallway|clerestory|shop walls|window as a blown|interior bounce)/.test(text) && !place.interior) {
    return false
  }
  if (/grease and ceramic/.test(text) && !place.tags.includes("domestic") && !place.interior) {
    return false
  }
  return true
}

export function cameraWeight(
  camera: CameraDef,
  args: {
    study: Study
    difficulty: Difficulty
    subject: Subject
    place: PlaceContext
    scaleProblem: boolean
    hasBeing: boolean
  }
): number {
  let weight = (camera.studyWeights[args.study] ?? 0.7) * camera.difficultyBias[args.difficulty]
  const { subject, place } = args

  if (camera.id === "reflection" && !place.wet) return 0
  if (camera.id === "undergrowth" && !place.vegetation) return 0
  if (camera.id === "intimate-interior" && !place.interior) return 0
  if (camera.id === "figure-for-scale" && !args.scaleProblem) return 0
  if (camera.id === "crowd-texture" && subject !== "group-scene") return 0
  if (camera.id === "cross-section") {
    const built = subject === "architecture" || subject === "construct-machine"
    const site = place.interior || place.tags.includes("industrial")
    if (!built || !site) return 0
  }
  if (camera.id === "cropped-action") {
    if (!["character", "creature", "beast", "group-scene", "spell-moment", "weapon-tool"].includes(subject)) {
      return 0
    }
  }
  if (camera.id === "two-shot" && subject === "environment-land") weight *= 0.45
  if (camera.id === "profile-silhouette") {
    if (!["creature", "beast", "character", "weapon-tool", "artifact"].includes(subject)) weight *= 0.25
  }
  if (camera.id === "three-point") {
    if (!["architecture", "construct-machine", "environment-land"].includes(subject) && !place.interior) {
      weight *= 0.2
    }
  }
  if (camera.id === "birds-eye" && (args.study !== "perspective" && args.study !== "composition" || place.interior)) {
    weight *= 0.2
  }
  if (camera.id === "worms-eye" && args.study !== "perspective" && args.study !== "foreshortening" && args.study !== "scale") {
    weight *= 0.35
  }
  if (camera.id === "close-up" && args.study === "atmosphere") weight *= 0.2
  if (camera.id === "establishing" && args.study === "materials") weight *= 0.55
  if (!args.hasBeing && camera.id === "over-shoulder") weight *= 0.4

  return weight
}
