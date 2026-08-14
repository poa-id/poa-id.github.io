import type { SceneEntityDef } from "@/data/commissions/entities"
import type { EnvironmentDef } from "@/data/commissions/environments"
import { headNoun } from "@/lib/commissions/grammar"
import type { BeingTaxonomy, Study, Subject } from "@/lib/commissions/types"

export function subjectSettingCollision(entity: SceneEntityDef, env: EnvironmentDef): boolean {
  if (entity.category === "environment-land") return false
  if (entity.forbidEnvIds?.includes(env.id)) return true

  const envName = env.name.toLowerCase()
  const envIdName = env.id.replace(/-/g, " ")
  const type = entity.type.toLowerCase()
  const noun = entity.noun.replace(/^the\s+/i, "").toLowerCase()

  if (type && (envIdName === type || envName === type)) return true
  if (noun && (envIdName === noun || envName === noun)) return true

  const subjectHead = headNoun(type || noun)
  const settingHead = headNoun(env.name)
  if (entity.category === "architecture" && subjectHead.length >= 4 && subjectHead === settingHead) {
    return true
  }

  return false
}

interface ValidatableScene {
  what: string
  subject: {
    category: Subject
    type: string
    noun: string
    tags: string[]
    elements: string[]
  }
  setting: {
    environmentName: string
    placeLabel: string
    tags: string[]
    vegetation: boolean
  }
  being?: BeingTaxonomy
  visualGoal: {
    primaryStudy: Study
    lighting: { id: string }
  }
  anatomyDirection?: string
  visualPremise: string
  establishedLight?: { tags: string[] }
}

export function validateCommission(model: ValidatableScene): string[] {
  const issues: string[] = []

  if (model.subject.category !== "environment-land") {
    const subjectHead = headNoun(model.subject.type || model.subject.noun)
    const settingHead = headNoun(model.setting.environmentName)
    if (subjectHead.length >= 4 && subjectHead === settingHead) {
      issues.push("subject-setting-collision")
    }
  }

  if (model.being?.kind === "creature") {
    const parts = model.being.summary.split("·").map((part) => part.trim().toLowerCase())
    if (parts.length !== new Set(parts).size) issues.push("redundant-taxonomy")
    if (/piscine/.test(model.being.summary) && /flightless/.test(model.being.summary)) {
      issues.push("useless-locomotion")
    }
  }

  const lightingId = model.visualGoal.lighting.id
  const tags = [
    ...model.setting.tags,
    ...model.subject.tags,
    ...model.subject.elements,
    ...(model.establishedLight?.tags ?? []),
  ].map((tag) => tag.toLowerCase())
  const artificial: Record<string, string[]> = {
    "fog-lamp": ["lamp", "lantern", "carriedlight", "carried light"],
    firelight: ["fire", "forge", "hearth", "camp", "torch"],
    candlelight: ["interior", "shrine", "household", "candle"],
    bioluminescence: ["bioluminescent", "fungus", "fungal"],
  }
  const need = artificial[lightingId]
  if (need && !model.establishedLight) {
    const blob = tags.join(" ")
    if (!need.some((tag) => blob.includes(tag))) issues.push("unmotivated-lighting")
  }

  if (
    model.visualGoal.primaryStudy === "foliage" &&
    !model.setting.vegetation &&
    !model.subject.tags.includes("vegetation")
  ) {
    issues.push("missing-study-presence")
  }

  if (model.being?.kind === "creature") {
    const family = model.being.family.toLowerCase()
    const text = `${model.anatomyDirection ?? ""} ${model.visualPremise}`
    if (/crustacean|serpentine|piscine|insectoid|arachnid|molluscan/.test(family)) {
      if (/muzzle|paws/.test(text)) issues.push("impossible-anatomy-language")
    }
    if (/serpentine|piscine|molluscan|worm/.test(family) && /head and shoulders/.test(text)) {
      issues.push("impossible-anatomy-language")
    }
  }

  void model.what
  return [...new Set(issues)]
}
