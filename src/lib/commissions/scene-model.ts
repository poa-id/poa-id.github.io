import { CAMERAS, type CameraDef } from "@/data/commissions/cameras"
import { COLOR_ENV_TAGS } from "@/data/commissions/colors"
import { ANTI_SHORTCUTS, STUDY_CONSTRAINTS, materialConstraint } from "@/data/commissions/constraints"
import { ENTITIES_BY_CATEGORY, SCENE_ENTITIES, type SceneEntityDef } from "@/data/commissions/entities"
import {
  describePlace,
  ENVIRONMENTS,
  environmentPhrase,
  type EnvironmentDef,
  type PlaceContext,
} from "@/data/commissions/environments"
import { LIGHTING, type LightingDef } from "@/data/commissions/lighting"
import { MATERIAL_BY_ID } from "@/data/commissions/materials"
import { ecoAction, roleWork, SITUATIONS, type SituationDef } from "@/data/commissions/situations"
import { SUBJECT_STUDY_WEIGHTS } from "@/data/commissions/subjects"
import {
  accentCompatible,
  allPresent,
  anyOverlap,
  articleFor,
  cameraWeight,
  fillTemplate,
  joinFeatures,
  lightingCompatible,
  nonePresent,
  overlapCount,
  sentence,
  unique,
  withArticle,
} from "@/lib/commissions/compatibility"
import type { SeededRng } from "@/lib/commissions/random"
import {
  finishLivingTaxonomy,
  pickCharacterIdentity,
  pickCreatureIdentity,
  type CharacterIdentity,
  type CreatureIdentity,
} from "@/lib/commissions/taxonomy"
import type {
  BeingTaxonomy,
  ColorIdentity,
  Difficulty,
  Study,
  Subject,
} from "@/lib/commissions/types"

const MATERIAL_ALIAS: Record<string, string> = {
  hide: "leather",
  skin: "leather",
}

const MATERIAL_COUNT: Record<Difficulty, [number, number]> = {
  apprentice: [1, 2],
  journeyman: [2, 3],
  master: [3, 4],
}

const SECONDARY_COUNT: Record<Difficulty, [number, number]> = {
  apprentice: [0, 1],
  journeyman: [1, 2],
  master: [1, 2],
}

export interface VisibleMaterial {
  id: string
  name: string
  where: string
}

export interface SceneModel {
  visualPremise: string
  what: string
  where: string
  happening: string
  subject: {
    category: Subject
    type: string
    subtype?: string
    role?: string
    physicalDescription: string
    noun: string
    elements: string[]
    tags: string[]
  }
  setting: {
    environmentId: string
    environmentName: string
    placeLabel: string
    location: string
    environmentalCondition?: string
    tags: string[]
    features: string[]
    wet: boolean
    vegetation: boolean
    interior: boolean
  }
  narrative: {
    situationId: string
    situationLabel: string
    relationshipToEnvironment: string
    storyHook: string
  }
  visualGoal: {
    primaryStudy: Study
    secondaryStudies: Study[]
    camera: CameraDef
    lighting: LightingDef
    lightingAccent: string
    materials: VisibleMaterial[]
  }
  constraints: {
    studyConstraint: string
    extraConstraints: string[]
    artDirectionConstraint?: string
  }
  being?: BeingTaxonomy
  realismAnchor?: string
  anatomyDirection?: string
  titleNouns: string[]
  scaleProblem: boolean
  scaleCue?: string
  vegetationCentral: boolean
  color: ColorIdentity
  difficulty: Difficulty
}

function resolveMaterialId(id: string): string | undefined {
  const resolved = MATERIAL_ALIAS[id] ?? id
  return MATERIAL_BY_ID[resolved] ? resolved : undefined
}

function situationFits(
  situation: SituationDef,
  subject: Subject,
  entityTags: string[],
  envTags: string[]
): boolean {
  if (situation.categories && !situation.categories.includes(subject)) return false
  if (!anyOverlap(situation.requireEnvTags, envTags)) return false
  if (!allPresent(situation.requireAllEnvTags, envTags)) return false
  if (!nonePresent(situation.forbidEnvTags, envTags)) return false
  if (!anyOverlap(situation.requireEntityTags, entityTags)) return false
  if (!nonePresent(situation.forbidEntityTags, entityTags)) return false
  return true
}

function livingEntityFromCharacter(subject: Subject, identity: CharacterIdentity): SceneEntityDef {
  const clothing = identity.materialTags
    .map(resolveMaterialId)
    .filter((id): id is string => Boolean(id))

  const materialWhere: Record<string, string> = {
    fabric: "clothing worn for this job",
    leather: "belt, boots, strap or kit",
    wool: "wool clothing against weather",
    iron: "tools or fittings carried for the job",
    "translucent-fabric": "light cloth in the clothing",
    fur: "fur on clothing or the body",
    feathers: "feathers on the body or clothing",
    scales: "scales on the body",
    bone: "worked bone in tools or ornaments of use",
  }

  return {
    id: `living-${identity.role.id}`,
    category: subject,
    type: identity.role.label.toLowerCase(),
    role: identity.role.label,
    noun: identity.phrase.replace(/^An?\s+/i, "the "),
    what: identity.phrase,
    physicalDescription: `The body should read as ${identity.taxonomy.age.toLowerCase()} and ${identity.taxonomy.build.toLowerCase()}, dressed for the job of ${identity.role.label.toLowerCase()}, not for display.`,
    placement: "is at work",
    tags: ["living", "being", ...(identity.role.envTags ?? [])],
    materials: clothing,
    materialWhere,
    elements: ["the working body", "clothing of the job", "tools of the role"],
    compatibleEnvTags: identity.preferredEnvTags.length > 0 ? identity.preferredEnvTags : ["rural", "civic"],
    studyAffinity: {
      "human-anatomy": 3.4,
      gesture: 3.2,
      "visual-storytelling": 2.6,
      materials: 1.6,
    },
    titleNouns: [identity.role.label, identity.species.noun.replace(/^./, (c) => c.toUpperCase())],
  }
}

function livingEntityFromCreature(subject: Subject, identity: CreatureIdentity): SceneEntityDef {
  const materials = identity.materialTags.map(resolveMaterialId).filter((id): id is string => Boolean(id))
  return {
    id: `living-${identity.family.id}`,
    category: subject,
    type: identity.ecoRole.noun,
    subtype: identity.family.label,
    noun: `the ${identity.ecoRole.noun}`,
    what: withArticle(identity.phraseCore),
    physicalDescription: `Build ${articleFor(identity.body.adjective)} ${identity.body.adjective} ${identity.family.adjective} body that can actually stand, turn and feed. Locomotion must be readable.`,
    placement: "occupies",
    tags: ["living", "being", "animal", ...identity.preferredEnvTags],
    materials,
    materialWhere: {
      fur: "the animal's coat",
      "wet-fur": "fur wet from this place",
      scales: "the animal's scales",
      chitin: "the animal's shell or plates",
      feathers: "the animal's plumage",
      leather: "bare skin, pads or a worn hide",
    },
    elements: ["the full body", "the feet or contact with the ground", "the head and feeding gear"],
    compatibleEnvTags: identity.preferredEnvTags,
    studyAffinity: {
      "creature-anatomy": 4,
      texture: 2.6,
      gesture: 2.4,
      scale: 2.2,
    },
    titleNouns: [identity.family.label, identity.ecoRole.label],
  }
}

function envSatisfiesPreferred(preferred: string[], envTags: string[]): boolean {
  if (preferred.length === 0) return true
  const primary = preferred[0]
  if (primary && !["rural", "civic", "ordered", "open", "wilderness", "sky"].includes(primary)) {
    return envTags.includes(primary)
  }
  const habitat = new Set([
    "coastal",
    "forest",
    "underground",
    "agricultural",
    "sacred",
    "industrial",
    "mountain",
    "wetland",
    "swamp",
    "fire",
    "cold",
    "death",
    "scholarly",
    "volcanic",
  ])
  const specific = preferred.filter((tag) => habitat.has(tag))
  if (specific.length > 0) return specific.some((tag) => envTags.includes(tag))
  return preferred.some((tag) => envTags.includes(tag))
}

function environmentWeight(
  env: EnvironmentDef,
  color: ColorIdentity,
  entity: SceneEntityDef,
  preferredTags: string[],
  lockedStudy?: Study
): number {
  const tags = describePlace(env).tags
  if (entity.preferEnvIds?.length) {
    if (!entity.preferEnvIds.includes(env.id)) return 0
  }
  if (!nonePresent(entity.forbidEnvTags, tags)) return 0
  if (!allPresent(entity.requireAllEnvTags, tags)) return 0
  if (entity.compatibleEnvTags.length > 0 && !anyOverlap(entity.compatibleEnvTags, tags)) return 0
  if (!envSatisfiesPreferred(preferredTags, tags)) return 0

  let score = 1
  if (entity.preferEnvIds?.includes(env.id)) score += 8
  score += overlapCount(entity.compatibleEnvTags, tags) * 0.9
  score += overlapCount(preferredTags, tags) * 1.4

  const colorWeights = COLOR_ENV_TAGS[color]
  for (const tag of env.tags) {
    score += (colorWeights[tag] ?? 1) - 1
  }

  if (lockedStudy === "foliage" && !tags.includes("vegetation")) score *= 0.08
  if (lockedStudy === "architecture" && entity.category !== "architecture" && !tags.includes("civic") && !tags.includes("interior")) {
    score *= 0.4
  }
  if (lockedStudy === "atmosphere" && tags.includes("interior")) score *= 0.45

  return Math.max(0, score)
}

function pickEnvironment(
  rng: SeededRng,
  color: ColorIdentity,
  entity: SceneEntityDef,
  preferredTags: string[],
  lockedStudy?: Study
): EnvironmentDef | null {
  const weighted = ENVIRONMENTS.map((env) => ({
    env,
    weight: environmentWeight(env, color, entity, preferredTags, lockedStudy),
  }))
  const viable = weighted.filter((item) => item.weight > 0.2)
  if (viable.length === 0) return null
  return rng.weightedPick(
    viable.map((item) => item.env),
    (env) => weighted.find((item) => item.env.id === env.id)?.weight ?? 0
  )
}

function landEntityFromPlace(env: EnvironmentDef, place: PlaceContext): SceneEntityDef {
  const named = env.name
  return {
    id: `land-${env.id}`,
    category: "environment-land",
    type: named,
    noun: `the ${named}`,
    what: `${env.article.charAt(0).toUpperCase()}${env.article.slice(1)} ${named}`,
    physicalDescription: `This is a used landscape: ${joinFeatures(place.features)}. Keep it specific and worked, not a generic vista.`,
    placement: "is the subject",
    tags: ["place", ...place.tags],
    materials: place.materials.slice(0, 4),
    materialWhere: place.materialWhere,
    elements: place.features,
    compatibleEnvTags: env.tags,
    preferEnvIds: [env.id],
    studyAffinity: {
      atmosphere: 3,
      composition: 2.6,
      lighting: 2.6,
      foliage: place.vegetation ? 3.4 : 0.6,
      perspective: 2.8,
      color: 2.2,
    },
    titleNouns: named
      .split(/\s+/)
      .filter((word) => word.length > 3 && !word.includes("'"))
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)),
  }
}

const OPEN_LAND: SceneEntityDef = {
  id: "open-land",
  category: "environment-land",
  type: "landscape",
  noun: "the land",
  what: "A working landscape",
  physicalDescription: "",
  placement: "is the subject",
  tags: ["place"],
  materials: [],
  materialWhere: {},
  elements: [],
  compatibleEnvTags: [],
  studyAffinity: {},
  titleNouns: [],
}

function pickEntity(
  rng: SeededRng,
  subject: Subject,
  lockedStudy?: Study
): SceneEntityDef | null {
  const pool = ENTITIES_BY_CATEGORY[subject]
  if (pool.length === 0) return null
  return rng.weightedPick(pool, (entity) => {
    let weight = 1
    if (lockedStudy) weight += entity.studyAffinity[lockedStudy] ?? 0
    return weight
  })
}

function pickSituation(
  rng: SeededRng,
  subject: Subject,
  entity: SceneEntityDef,
  place: PlaceContext,
  lockedStudy?: Study
): SituationDef | null {
  const fits = SITUATIONS.filter((situation) =>
    situationFits(situation, subject, entity.tags, place.tags)
  )
  if (fits.length === 0) return null
  return rng.weightedPick(fits, (situation) => {
    let weight = 1
    if (lockedStudy) weight += situation.studyAffinity?.[lockedStudy] ?? 0
    if (lockedStudy === "foliage" && situation.vegetationCentral) weight += 3
    if (place.vegetation && situation.vegetationCentral) weight += 1.2
    return weight
  })
}

interface StudyContext {
  subject: Subject
  entity: SceneEntityDef
  situation: SituationDef
  place: PlaceContext
  materials: VisibleMaterial[]
  vegetationCentral: boolean
  scaleProblem: boolean
}

function studySupport(study: Study, ctx: StudyContext): number {
  const affinity = (ctx.entity.studyAffinity[study] ?? 0) + (ctx.situation.studyAffinity?.[study] ?? 0)
  switch (study) {
    case "foliage":
      if (!ctx.place.vegetation && !ctx.entity.tags.includes("vegetation")) return 0
      return affinity + (ctx.vegetationCentral ? 3 : 1) + (ctx.place.vegetation ? 1.2 : 0)
    case "creature-anatomy":
      return ctx.subject === "creature" || ctx.subject === "beast" ? affinity + 3.5 : 0
    case "human-anatomy":
    case "gesture":
      return ctx.subject === "character" || ctx.subject === "group-scene" ? affinity + 3.2 : 0.1
    case "architecture":
      if (ctx.subject === "architecture") return affinity + 3.4
      if (ctx.place.interior || ctx.place.tags.includes("civic")) return affinity + 1.1
      return 0.2 + affinity * 0.3
    case "perspective":
      if (["architecture", "environment-land", "construct-machine"].includes(ctx.subject) || ctx.place.interior) {
        return affinity + 2.6
      }
      return affinity + 0.7
    case "scale":
      return ctx.scaleProblem ? affinity + 3.2 : 0.25
    case "materials":
      return ctx.materials.length >= 2 ? affinity + 2.2 + ctx.materials.length * 0.15 : 0.35
    case "texture":
      return ctx.materials.length >= 2 || ctx.place.vegetation ? affinity + 2 : 0.4
    case "lighting":
      return affinity + 1.8
    case "atmosphere":
      return ctx.place.open ? affinity + 2.2 : affinity + 0.5
    case "foreshortening":
      return ["character", "creature", "beast", "weapon-tool"].includes(ctx.subject) ? affinity + 2.1 : 0.15
    case "visual-storytelling":
      return affinity + 1.7
    case "color":
      return affinity + 1.5
    case "composition":
      return affinity + 1.6
    default:
      return affinity
  }
}

function collectMaterials(
  entity: SceneEntityDef,
  place: PlaceContext,
  situation: SituationDef,
  extraIds: string[]
): VisibleMaterial[] {
  const seen = new Set<string>()
  const pool: VisibleMaterial[] = []

  const add = (id: string, where?: string) => {
    const resolved = resolveMaterialId(id)
    if (!resolved || seen.has(resolved)) return
    const def = MATERIAL_BY_ID[resolved]
    if (!def) return
    const located =
      where ||
      entity.materialWhere[resolved] ||
      entity.materialWhere[id] ||
      situation.extraMaterialWhere?.[resolved] ||
      place.materialWhere[resolved] ||
      `visible on ${entity.noun}`
    seen.add(resolved)
    pool.push({ id: resolved, name: def.name, where: located })
  }

  for (const id of entity.materials) add(id)
  for (const id of situation.extraMaterials ?? []) {
    add(id, situation.extraMaterialWhere?.[id])
  }
  for (const id of extraIds) add(id)
  if (place.vegetation) add("foliage", place.materialWhere.foliage)
  if (place.wet) add("shallow-water", place.materialWhere["shallow-water"])
  return pool
}

function pickMaterialsFromScene(
  rng: SeededRng,
  difficulty: Difficulty,
  study: Study,
  pool: VisibleMaterial[],
  vegetationCentral: boolean
): VisibleMaterial[] {
  if (pool.length === 0) return []
  const [min, max] = MATERIAL_COUNT[difficulty]
  const count = Math.min(pool.length, rng.intRange(min, max + (study === "materials" ? 1 : 0)))
  const chosen: VisibleMaterial[] = []
  const used = new Set<string>()

  const must = pool.filter((material) => {
    if (study === "foliage" || vegetationCentral) return material.id === "foliage" || material.id === "moss"
    if (study === "materials") return true
    return false
  })
  if (must.length > 0 && (study === "foliage" || vegetationCentral)) {
    const first = must[0]
    chosen.push(first)
    used.add(first.id)
  }

  const subjectMaterials = pool.slice(0, Math.min(3, pool.length))
  for (const material of subjectMaterials) {
    if (chosen.length >= count) break
    if (used.has(material.id)) continue
    chosen.push(material)
    used.add(material.id)
  }

  while (chosen.length < count) {
    const remaining = pool.filter((material) => !used.has(material.id))
    if (remaining.length === 0) break
    const next = rng.pick(remaining)
    used.add(next.id)
    chosen.push(next)
  }

  return chosen
}

function pickStudyFromScene(
  rng: SeededRng,
  ctx: StudyContext,
  locked?: Study
): Study | null {
  if (locked) {
    return studySupport(locked, ctx) >= 1 ? locked : null
  }

  const candidates = (Object.keys(SUBJECT_STUDY_WEIGHTS[ctx.subject]) as Study[]).filter(
    (study) => studySupport(study, ctx) >= 1.15
  )
  if (candidates.length === 0) return null
  return rng.weightedPick(candidates, (study) => {
    return studySupport(study, ctx) * (SUBJECT_STUDY_WEIGHTS[ctx.subject][study] ?? 1)
  })
}

function pickSecondaries(
  rng: SeededRng,
  primary: Study,
  ctx: StudyContext,
  difficulty: Difficulty
): Study[] {
  const [min, max] = SECONDARY_COUNT[difficulty]
  const count = rng.intRange(min, max)
  if (count === 0) return []

  const candidates = (Object.keys(SUBJECT_STUDY_WEIGHTS[ctx.subject]) as Study[]).filter((study) => {
    if (study === primary) return false
    return studySupport(study, ctx) >= 1.7
  })

  const picked: Study[] = []
  while (picked.length < count && candidates.length > picked.length) {
    const remaining = candidates.filter((study) => !picked.includes(study))
    if (remaining.length === 0) break
    picked.push(
      rng.weightedPick(remaining, (study) => studySupport(study, ctx))
    )
  }
  return picked
}

function leadNoun(what: string): string {
  const comma = what.indexOf(",")
  if (comma > 24) return what.slice(0, comma)
  return what
}

function composePremise(
  what: string,
  placement: string,
  where: string,
  hook: string,
  category: Subject
): { visualPremise: string; happening: string } {
  const hookText = sentence(hook)
  const subjectLead = leadNoun(what)
  const envCore = where
    .toLowerCase()
    .replace(/^(in|inside|at|on)\s+(an?|the)\s+/i, "")
    .trim()
  const whereAlreadyNamed = envCore.length > 8 && what.toLowerCase().includes(envCore)

  if (category === "environment-land") {
    return {
      visualPremise: `${sentence(`${what.replace(/[.!?]$/, "")} is the picture`)} ${hookText}`.trim(),
      happening: hookText,
    }
  }

  const located = whereAlreadyNamed ? subjectLead : `${subjectLead} ${placement} ${where}`.replace(/\s+/g, " ")

  if (category === "spell-moment" || !placement || placement === "is the subject") {
    const first = whereAlreadyNamed ? what : `${leadNoun(what)} ${where}`
    return {
      visualPremise: `${sentence(first)} ${hookText}`.trim(),
      happening: hookText,
    }
  }

  if (hook.trim().startsWith(what) || hook.trim().startsWith(subjectLead)) {
    const parts = hook.trim().split(/(?<=\.)\s+/)
    const first = (parts[0] ?? hook).replace(/[.!?]$/, "")
    const withWhere =
      whereAlreadyNamed || /\b(in|inside|at|on|among|through|across)\b/i.test(first)
        ? `${first}.`
        : `${first} ${where}.`
    const happening = sentence([withWhere, ...parts.slice(1)].join(" "))
    return { visualPremise: happening, happening }
  }

  return {
    visualPremise: `${sentence(located)} ${hookText}`.trim(),
    happening: hookText,
  }
}

function pickConstraintsForModel(
  rng: SeededRng,
  study: Study,
  materials: VisibleMaterial[],
  difficulty: Difficulty,
  extra: string[],
  scaleProblem: boolean
): string[] {
  const skipScaleCue = (text: string) =>
    /figure|known object for scale/i.test(text) && !scaleProblem

  const pool = STUDY_CONSTRAINTS[study].filter((text) => !skipScaleCue(text))
  const count = difficulty === "master" ? rng.intRange(1, 2) : 1
  const chosen = rng.pickN(pool, Math.min(count, pool.length))

  if (study === "materials" || (difficulty !== "apprentice" && rng.chance(0.35) && materials.length >= 2)) {
    const generated = materialConstraint(materials.map((material) => material.name))
    if (study === "materials") return unique([generated, ...chosen, ...extra]).slice(0, 2)
    return unique([...chosen, generated, ...extra]).slice(0, difficulty === "master" ? 2 : 1)
  }

  return unique([...chosen, ...extra]).slice(0, difficulty === "master" ? 2 : 1)
}

function pickArtDirection(
  rng: SeededRng,
  subject: Subject,
  entity: SceneEntityDef,
  difficulty: Difficulty
): string | undefined {
  const chance = difficulty === "master" ? 0.42 : difficulty === "journeyman" ? 0.34 : 0.26
  if (!rng.chance(chance)) return undefined

  const relevant = ANTI_SHORTCUTS.filter((item) => {
    const text = `${item.text} ${item.extra ?? ""}`.toLowerCase()
    if (/plate armor|spiked pauldron|antlered helmet/.test(text)) {
      return /soldier|guard|warrior|watch/.test(entity.type)
    }
    if (/extra pairs of wings/.test(text)) return /winged|feather/.test(entity.tags.join(" ") + entity.type)
    if (/crowd clones/.test(text)) return subject === "group-scene"
    if (/cloak-as-silhouette/.test(text)) return subject === "character" || subject === "group-scene"
    if (/generic medieval european castle/.test(text)) return subject === "architecture"
    if (/floating rocks|magical particles|glowing|energy beams|lens flares/.test(text)) return true
    if (/unblemished metal/.test(text)) return entity.materials.some((id) => ["iron", "steel", "bronze", "copper"].includes(id))
    return true
  })

  const shortcut = rng.pick(relevant.length > 0 ? relevant : ANTI_SHORTCUTS)
  return [shortcut.text, shortcut.extra].filter(Boolean).join(" ")
}

function validateModel(model: SceneModel): string | null {
  if (!model.what || !model.where || !model.happening) return "missing triad"
  if (!model.visualPremise) return "missing premise"
  if (model.visualGoal.materials.some((material) => !material.where)) return "material without location"
  if (model.visualGoal.primaryStudy === "foliage" && !model.setting.vegetation && !model.subject.tags.includes("vegetation")) {
    return "foliage study without plants"
  }
  if (model.visualGoal.primaryStudy === "creature-anatomy" && model.subject.category !== "creature" && model.subject.category !== "beast") {
    return "creature study without creature"
  }
  if (
    (model.visualGoal.primaryStudy === "human-anatomy" || model.visualGoal.primaryStudy === "gesture") &&
    model.subject.category !== "character" &&
    model.subject.category !== "group-scene"
  ) {
    return "figure study without a figure"
  }
  if (model.visualGoal.camera.id === "reflection" && !model.setting.wet) return "reflection without water"
  if (model.visualGoal.camera.id === "undergrowth" && !model.setting.vegetation) return "undergrowth without plants"
  if (model.visualGoal.camera.id === "figure-for-scale" && !model.scaleProblem) return "scale camera without scale problem"
  return null
}

export function tryBuildSceneModel(
  rng: SeededRng,
  args: {
    subject: Subject
    color: ColorIdentity
    difficulty: Difficulty
    lockedStudy?: Study
  }
): SceneModel | null {
  const living =
    args.subject === "character" ||
    args.subject === "group-scene" ||
    args.subject === "creature" ||
    args.subject === "beast"

  let character: CharacterIdentity | undefined
  let creature: CreatureIdentity | undefined
  let entity: SceneEntityDef | null = null
  let preferredTags: string[] = []
  let preselectedEnv: EnvironmentDef | undefined

  if (args.subject === "character" || args.subject === "group-scene") {
    character = pickCharacterIdentity(rng, args.color, args.subject === "group-scene")
    entity = livingEntityFromCharacter(args.subject, character)
    preferredTags = character.preferredEnvTags
  } else if (args.subject === "creature" || args.subject === "beast") {
    creature = pickCreatureIdentity(rng, args.subject === "beast")
    entity = livingEntityFromCreature(args.subject, creature)
    preferredTags = creature.preferredEnvTags
  } else if (args.subject === "environment-land") {
    preselectedEnv = pickEnvironment(rng, args.color, OPEN_LAND, [], args.lockedStudy) ?? undefined
    if (!preselectedEnv) return null
    const placePick = describePlace(preselectedEnv)
    entity =
      SCENE_ENTITIES.find(
        (item) => item.category === "environment-land" && item.preferEnvIds?.includes(preselectedEnv!.id)
      ) ?? landEntityFromPlace(preselectedEnv, placePick)
    preferredTags = entity.compatibleEnvTags
  } else {
    entity = pickEntity(rng, args.subject, args.lockedStudy)
    preferredTags = entity?.compatibleEnvTags ?? []
  }

  if (!entity) return null

  const environment = preselectedEnv ?? pickEnvironment(rng, args.color, entity, preferredTags, args.lockedStudy)
  if (!environment) return null
  const place = describePlace(environment)
  const situation = pickSituation(rng, args.subject, entity, place, args.lockedStudy)
  if (!situation) return null

  const extraMaterialIds = living ? [...(character?.materialTags ?? []), ...(creature?.materialTags ?? [])] : []
  const materialPool = collectMaterials(entity, place, situation, extraMaterialIds)
  const vegetationCentral = Boolean(situation.vegetationCentral || args.lockedStudy === "foliage")
  const scaleProblem = Boolean(entity.scaleProblem || situation.scaleProblem)
  const materials = pickMaterialsFromScene(rng, args.difficulty, args.lockedStudy ?? "composition", materialPool, vegetationCentral)

  const studyCtx: StudyContext = {
    subject: args.subject,
    entity,
    situation,
    place,
    materials: materials.length > 0 ? materials : materialPool.slice(0, 2),
    vegetationCentral,
    scaleProblem,
  }

  const primaryStudy = pickStudyFromScene(rng, studyCtx, args.lockedStudy)
  if (!primaryStudy) return null

  const visibleMaterials =
    primaryStudy === args.lockedStudy || materials.length > 0
      ? pickMaterialsFromScene(rng, args.difficulty, primaryStudy, materialPool, vegetationCentral || primaryStudy === "foliage")
      : materials
  studyCtx.materials = visibleMaterials.length > 0 ? visibleMaterials : materialPool.slice(0, 2)

  const secondaryStudies = pickSecondaries(rng, primaryStudy, studyCtx, args.difficulty)

  const cameras = CAMERAS.filter((camera) =>
    cameraWeight(camera, {
      study: primaryStudy,
      difficulty: args.difficulty,
      subject: args.subject,
      place,
      scaleProblem,
      hasBeing: living,
    }) > 0
  )
  if (cameras.length === 0) return null
  const camera = rng.weightedPick(cameras, (item) =>
    cameraWeight(item, {
      study: primaryStudy,
      difficulty: args.difficulty,
      subject: args.subject,
      place,
      scaleProblem,
      hasBeing: living,
    })
  )

  const lights = LIGHTING.filter((light) => lightingCompatible(light, place))
  if (lights.length === 0) return null
  const lighting = rng.weightedPick(lights, (light) => {
    let score = 0.8
    for (const tag of light.tags) {
      if (place.tags.includes(tag)) score += 1.2
    }
    if (primaryStudy === "lighting") score += 0.8
    return score
  })
  const accents = lighting.accents.filter((accent) => accentCompatible(accent, place, living))
  const lightingAccent =
    accents.length > 0 ? rng.pick(accents) : "a restrained secondary bounce"

  const locationTemplate = situation.locationTemplate ?? (place.interior ? "inside {env}" : "in {env}")
  const where = fillTemplate(locationTemplate, { env: environmentPhrase(environment) })
  const vars = {
    subject: entity.what,
    noun: entity.noun,
    where,
    features: joinFeatures(place.features),
    ecoAction: creature ? ecoAction(creature.ecoRole.id) : "",
    role: character?.role.label.toLowerCase() ?? entity.function ?? entity.type,
  }
  let hook = fillTemplate(situation.hook, vars)
  if (character && situation.id === "mid-labor") {
    hook = `${entity.what} ${roleWork(character.role.id, character.role.label)} ${where}. Tools, posture and the surrounding mess explain the job.`
  }
  const composed = composePremise(entity.what, entity.placement, where, hook, args.subject)

  const taxonomy = living
    ? finishLivingTaxonomy(rng, {
        study: primaryStudy,
        difficulty: args.difficulty,
        environment,
        character,
        creature,
      })
    : null

  const placeNoun = environment.name
    .split(/\s+/)
    .filter((word) => word.length > 3 && !word.includes("'"))
    .slice(-1)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))

  const titleNouns = unique([
    ...entity.titleNouns,
    ...(situation.titleNouns ?? []),
    ...placeNoun,
  ])

  const extraConstraints = taxonomy?.extraConstraints ?? []
  const constraints = pickConstraintsForModel(
    rng,
    primaryStudy,
    studyCtx.materials,
    args.difficulty,
    extraConstraints,
    scaleProblem
  )

  const model: SceneModel = {
    visualPremise: composed.visualPremise,
    what: entity.what,
    where,
    happening: composed.happening,
    subject: {
      category: args.subject,
      type: entity.type,
      subtype: entity.subtype,
      role: entity.function ?? entity.role ?? character?.role.label,
      physicalDescription: entity.physicalDescription,
      noun: entity.noun,
      elements: unique([...entity.elements, ...(situation.extraElements ?? [])]),
      tags: entity.tags,
    },
    setting: {
      environmentId: environment.id,
      environmentName: environment.name,
      placeLabel: environmentPhrase(environment),
      location: where,
      environmentalCondition: place.condition,
      tags: place.tags,
      features: place.features,
      wet: place.wet,
      vegetation: place.vegetation,
      interior: place.interior,
    },
    narrative: {
      situationId: situation.id,
      situationLabel: situation.label,
      relationshipToEnvironment: fillTemplate(situation.relationship, vars),
      storyHook: composed.happening,
    },
    visualGoal: {
      primaryStudy,
      secondaryStudies,
      camera,
      lighting,
      lightingAccent,
      materials: studyCtx.materials,
    },
    constraints: {
      studyConstraint: constraints[0] ?? STUDY_CONSTRAINTS[primaryStudy][0],
      extraConstraints: constraints.slice(1),
      artDirectionConstraint: pickArtDirection(rng, args.subject, entity, args.difficulty),
    },
    being: taxonomy?.being,
    realismAnchor: taxonomy?.realismAnchor,
    anatomyDirection: taxonomy?.anatomyDirection,
    titleNouns,
    scaleProblem,
    scaleCue: entity.scaleCue,
    vegetationCentral,
    color: args.color,
    difficulty: args.difficulty,
  }

  if (validateModel(model)) return null
  return model
}

export function buildSceneModel(
  rng: SeededRng,
  args: {
    subject: Subject
    color: ColorIdentity
    difficulty: Difficulty
    lockedStudy?: Study
  }
): SceneModel {
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const model = tryBuildSceneModel(rng, args)
    if (model) return model
  }

  const fallbackEntity = SCENE_ENTITIES[0]
  const fallbackEnv = ENVIRONMENTS.find((env) => env.id === "salt-marsh") ?? ENVIRONMENTS[0]
  const place = describePlace(fallbackEnv)
  const camera = CAMERAS[0]
  const lighting = LIGHTING[0]
  return {
    visualPremise: `${fallbackEntity.what} stands in ${environmentPhrase(fallbackEnv)}. Local plants are overtaking it.`,
    what: fallbackEntity.what,
    where: `in ${environmentPhrase(fallbackEnv)}`,
    happening: "Local plants are overtaking it.",
    subject: {
      category: args.subject,
      type: fallbackEntity.type,
      physicalDescription: fallbackEntity.physicalDescription,
      noun: fallbackEntity.noun,
      elements: fallbackEntity.elements,
      tags: fallbackEntity.tags,
    },
    setting: {
      environmentId: fallbackEnv.id,
      environmentName: fallbackEnv.name,
      placeLabel: environmentPhrase(fallbackEnv),
      location: `in ${environmentPhrase(fallbackEnv)}`,
      tags: place.tags,
      features: place.features,
      wet: place.wet,
      vegetation: place.vegetation,
      interior: place.interior,
    },
    narrative: {
      situationId: "overtaken-by-plants",
      situationLabel: "Overtaken by growth",
      relationshipToEnvironment: "Plant growth shares the same space as the constructed object.",
      storyHook: "Local plants are overtaking it.",
    },
    visualGoal: {
      primaryStudy: args.lockedStudy ?? "foliage",
      secondaryStudies: [],
      camera,
      lighting,
      lightingAccent: lighting.accents[0],
      materials: collectMaterials(fallbackEntity, place, SITUATIONS[0], []).slice(0, 3),
    },
    constraints: {
      studyConstraint: STUDY_CONSTRAINTS[args.lockedStudy ?? "foliage"][0],
      extraConstraints: [],
    },
    titleNouns: fallbackEntity.titleNouns,
    scaleProblem: false,
    vegetationCentral: true,
    color: args.color,
    difficulty: args.difficulty,
  }
}
