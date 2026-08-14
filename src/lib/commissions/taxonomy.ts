import {
  AGES,
  BUILDS,
  CHARACTER_ANATOMY_NOTES,
  HYBRID_ANATOMY_NOTES,
  ROLES,
  SPECIES,
  type AgeId,
  type BuildId,
  type RoleDef,
  type SpeciesDef,
} from "@/data/commissions/character-taxonomy"
import {
  ADAPTATIONS,
  ANATOMY_PROHIBITIONS,
  BODY_PLANS,
  CREATURE_ANATOMY_NOTES,
  CREATURE_FAMILIES,
  ECO_ROLES,
  type AdaptationDef,
  type BodyPlanDef,
  type CreatureFamilyDef,
  type EcoRoleDef,
} from "@/data/commissions/creature-taxonomy"
import type { EnvironmentDef } from "@/data/commissions/environments"
import type { SeededRng } from "@/lib/commissions/random"
import type {
  BeingTaxonomy,
  CharacterTaxonomy,
  ColorIdentity,
  CreatureTaxonomy,
  Difficulty,
  Study,
  Subject,
} from "@/lib/commissions/types"

export interface TaxonomyResult {
  being: BeingTaxonomy
  phrase: string
  realismAnchor?: string
  anatomyDirection?: string
  materialTags: string[]
  extraConstraints: string[]
}

function withArticle(rest: string): string {
  const first = rest.trim().split(/\s+/)[0] ?? rest
  const article = /^[aeiou]/i.test(first) ? "An" : "A"
  return `${article} ${rest}`
}

function article(word: string): "a" | "an" {
  return /^[aeiou]/i.test(word.trim()) ? "an" : "a"
}

function envOverlap(tags: string[] | undefined, env: EnvironmentDef): number {
  if (!tags || tags.length === 0) return 1
  const hits = tags.filter((tag) => env.tags.includes(tag)).length
  if (hits === 0) return 1
  return 1 + hits * 0.28
}

function pickSpecies(rng: SeededRng, color: ColorIdentity): SpeciesDef {
  return rng.weightedPick(SPECIES, (species) => {
    if (!species.colorBias || species.colorBias.length === 0) return 1
    return species.colorBias.includes(color) ? 1.55 : 0.85
  })
}

function pickRole(rng: SeededRng, species: SpeciesDef, env?: EnvironmentDef): RoleDef {
  return rng.weightedPick(ROLES, (role) => {
    let weight = env ? envOverlap(role.envTags, env) : 1
    if (species.stereotypeRoles.includes(role.id)) weight *= 0.16
    return weight
  })
}

function pickAge(rng: SeededRng, role: RoleDef, species: SpeciesDef): AgeId {
  return rng.weightedPick(
    AGES.map((age) => age.id),
    (id) => (AGES.find((age) => age.id === id)?.weight ?? 1) * (role.age[id] ?? 1) * (species.ageBias?.[id] ?? 1)
  )
}

function pickBuild(rng: SeededRng, species: SpeciesDef, age: AgeId): BuildId {
  return rng.weightedPick(
    BUILDS.map((build) => build.id),
    (id) => {
      let weight = species.buildBias[id] ?? 1
      if (age === "child" && (id === "powerful" || id === "broad")) weight *= 0.45
      if (age === "child" && (id === "small" || id === "frail" || id === "compact")) weight *= 1.4
      if (age === "elderly" && (id === "weathered" || id === "hunched" || id === "frail")) weight *= 1.25
      if (age === "ancient" && (id === "gaunt" || id === "weathered" || id === "hunched")) weight *= 1.2
      if (age === "adolescent" && (id === "lanky" || id === "wiry" || id === "small")) weight *= 1.2
      return weight
    }
  )
}

function characterPhrase(species: SpeciesDef, age: AgeId, build: BuildId, role: RoleDef): string {
  const ageDef = AGES.find((item) => item.id === age)!
  const buildDef = BUILDS.find((item) => item.id === build)!
  const roleLabel = role.label.toLowerCase()

  if (age === "child") {
    return withArticle(`${buildDef.adjective} ${species.noun} child working as ${article(roleLabel)} ${roleLabel}`)
  }
  if (age === "adolescent") {
    return withArticle(`${buildDef.adjective} ${species.noun} adolescent ${roleLabel}`)
  }
  return withArticle(`${ageDef.adjective} ${buildDef.adjective} ${species.noun} ${roleLabel}`)
}

function groupPhrase(species: SpeciesDef, age: AgeId, build: BuildId, role: RoleDef): string {
  const ageDef = AGES.find((item) => item.id === age)!
  const buildDef = BUILDS.find((item) => item.id === build)!
  const roleLabel = role.label.toLowerCase()
  if (age === "child") {
    return withArticle(`${roleLabel} crew of ${buildDef.adjective} ${species.noun} children`)
  }
  return withArticle(`${roleLabel} crew of ${ageDef.adjective} ${buildDef.adjective} ${species.plural}`)
}

function pickCharacter(
  rng: SeededRng,
  color: ColorIdentity,
  env: EnvironmentDef,
  grouped: boolean
): { taxonomy: CharacterTaxonomy; phrase: string; species: SpeciesDef } {
  const species = pickSpecies(rng, color)
  const role = pickRole(rng, species, env)
  const age = pickAge(rng, role, species)
  const build = pickBuild(rng, species, age)
  const ageLabel = AGES.find((item) => item.id === age)!.label
  const buildLabel = BUILDS.find((item) => item.id === build)!.label

  return {
    species,
    taxonomy: {
      kind: "character",
      species: species.label,
      age: ageLabel,
      build: buildLabel,
      role: role.label,
      summary: `${species.label} · ${ageLabel} · ${buildLabel} · ${role.label}`,
    },
    phrase: grouped
      ? groupPhrase(species, age, build, role)
      : characterPhrase(species, age, build, role),
  }
}

function pickFamily(rng: SeededRng, beastly: boolean): CreatureFamilyDef {
  const pool = beastly ? CREATURE_FAMILIES.filter((family) => family.beastly) : CREATURE_FAMILIES
  return rng.pick(pool.length > 0 ? pool : CREATURE_FAMILIES)
}

function pickBodyPlan(rng: SeededRng, family: CreatureFamilyDef): BodyPlanDef {
  return rng.weightedPick(BODY_PLANS, (plan) => family.bodyPlanBias[plan.id] ?? 0.35)
}

function pickEcoRole(rng: SeededRng, family: CreatureFamilyDef, body: BodyPlanDef): EcoRoleDef {
  return rng.weightedPick(ECO_ROLES, (role) => {
    let weight = family.roleBias[role.id] ?? 0.45
    if (body.id === "wader" && (role.id === "filter" || role.id === "forager")) weight *= 1.5
    if (body.id === "burrowing" && role.id === "burrower-role") weight *= 1.8
    if ((body.id === "winged" || body.id === "gliding") && role.id === "pollinator") weight *= 1.4
    if (body.id === "aquatic" && role.id === "filter") weight *= 1.5
    if (body.id === "heavy-terrestrial" && (role.id === "grazer" || role.id === "browser")) weight *= 1.3
    if (body.id === "serpentine" && role.id === "grazer") weight *= 0.35
    return weight
  })
}

function pickAdaptation(rng: SeededRng, env: EnvironmentDef): AdaptationDef {
  return rng.weightedPick(ADAPTATIONS, (adaptation) => {
    const hits = adaptation.envTags.filter((tag) => env.tags.includes(tag)).length
    return hits > 0 ? 2.4 + hits : 0.55
  })
}

function adaptationMatches(adaptation: AdaptationDef, env: EnvironmentDef): boolean {
  return adaptation.envTags.some((tag) => env.tags.includes(tag))
}

function creaturePhrase(
  family: CreatureFamilyDef,
  body: BodyPlanDef,
  role: EcoRoleDef,
  adaptation: AdaptationDef,
  env: EnvironmentDef
): string {
  const core = `${body.adjective} ${family.adjective} ${role.noun}`
  if (adaptationMatches(adaptation, env)) return withArticle(core)
  return withArticle(`${core} adapted to ${adaptation.label.toLowerCase()} conditions`)
}

function pickCreature(
  rng: SeededRng,
  env: EnvironmentDef,
  beastly: boolean
): { taxonomy: CreatureTaxonomy; phrase: string; family: CreatureFamilyDef; body: BodyPlanDef } {
  const family = pickFamily(rng, beastly)
  const body = pickBodyPlan(rng, family)
  const role = pickEcoRole(rng, family, body)
  const adaptation = pickAdaptation(rng, env)

  return {
    family,
    body,
    taxonomy: {
      kind: "creature",
      family: family.label,
      bodyPlan: body.label,
      ecologicalRole: role.label,
      adaptation: adaptation.label,
      summary: `${family.label} · ${body.label} · ${role.label} · ${adaptation.label}`,
    },
    phrase: creaturePhrase(family, body, role, adaptation, env),
  }
}

function pickAnchor(
  rng: SeededRng,
  args: {
    study: Study
    difficulty: Difficulty
    hybrid: boolean
    character: boolean
    familyAnchors?: string[]
    extraAnchors?: string[]
    sourceAnimals?: string[]
  }
): string | undefined {
  const anatomyStudy = args.study === "creature-anatomy" || args.study === "human-anatomy" || args.study === "gesture"
  const base = anatomyStudy ? 0.42 : 0.22
  const difficultyBoost = args.difficulty === "master" ? 0.22 : args.difficulty === "journeyman" ? 0.12 : 0
  const hybridBoost = args.hybrid ? 0.18 : 0
  if (!rng.chance(Math.min(0.82, base + difficultyBoost + hybridBoost))) return undefined

  if (args.character) {
    const animals = (args.sourceAnimals ?? []).filter((item) => item !== "Human")
    if (args.hybrid && animals.length > 0) {
      const count = Math.min(animals.length, rng.chance(0.45) ? 2 : 1)
      const picked = rng.pickN(animals, count)
      return [...picked, "Human"].join(" + ")
    }
    if (animals.length >= 1 && rng.chance(0.4)) {
      return rng.pickN([...animals, "Human"], 2).join(" + ")
    }
    return undefined
  }

  const pool = [...new Set([...(args.familyAnchors ?? []), ...(args.extraAnchors ?? [])])]
  if (pool.length < 2) return pool[0]
  const count = rng.chance(0.35) && pool.length >= 3 ? 3 : 2
  return rng.pickN(pool, count).join(" + ")
}

function composeAnatomyDirection(
  rng: SeededRng,
  args: {
    character: boolean
    hybrid: boolean
    study: Study
  }
): string | undefined {
  const relevant =
    args.study === "creature-anatomy" ||
    args.study === "human-anatomy" ||
    args.study === "gesture" ||
    args.study === "foreshortening"
  if (!relevant && !rng.chance(0.28)) return undefined

  if (args.character && args.hybrid) return rng.pick(HYBRID_ANATOMY_NOTES)
  if (args.character) return rng.pick(CHARACTER_ANATOMY_NOTES)
  return rng.pick(CREATURE_ANATOMY_NOTES)
}

export function generateTaxonomy(
  rng: SeededRng,
  args: {
    subject: Subject
    color: ColorIdentity
    environment: EnvironmentDef
    study: Study
    difficulty: Difficulty
  }
): TaxonomyResult | null {
  const { subject } = args
  if (subject === "character" || subject === "group-scene") {
    const picked = pickCharacter(rng, args.color, args.environment, subject === "group-scene")
    const anatomyDirection = composeAnatomyDirection(rng, {
      character: true,
      hybrid: picked.species.hybrid,
      study: args.study,
    })
    const extraConstraints: string[] = []
    if (picked.species.hybrid && rng.chance(args.difficulty === "apprentice" ? 0.28 : 0.42)) {
      extraConstraints.push(rng.pick(ANATOMY_PROHIBITIONS.filter((item) => !item.includes("non-humanoid"))))
    }
    return {
      being: picked.taxonomy,
      phrase: picked.phrase,
      realismAnchor: pickAnchor(rng, {
        study: args.study,
        difficulty: args.difficulty,
        hybrid: picked.species.hybrid,
        character: true,
        sourceAnimals: picked.species.sourceAnimals,
      }),
      anatomyDirection,
      materialTags: picked.species.materialTags,
      extraConstraints,
    }
  }

  if (subject === "creature" || subject === "beast") {
    const picked = pickCreature(rng, args.environment, subject === "beast")
    const anatomyDirection = composeAnatomyDirection(rng, {
      character: false,
      hybrid: picked.family.id === "hybrid",
      study: args.study,
    })
    const extraConstraints: string[] = []
    if (rng.chance(args.difficulty === "apprentice" ? 0.3 : 0.4)) {
      extraConstraints.push(rng.pick(ANATOMY_PROHIBITIONS))
    }
    return {
      being: picked.taxonomy,
      phrase: picked.phrase,
      realismAnchor: pickAnchor(rng, {
        study: args.study,
        difficulty: args.difficulty,
        hybrid: picked.family.id === "hybrid",
        character: false,
        familyAnchors: picked.family.anchors,
        extraAnchors: picked.body.extraAnchors,
      }),
      anatomyDirection,
      materialTags: picked.family.materialTags,
      extraConstraints,
    }
  }

  return null
}

export { ANCHOR_NOTE } from "@/data/commissions/creature-taxonomy"

export const BODY_ENV_TAGS: Record<string, string[]> = {
  aquatic: ["water"],
  amphibious: ["water", "swamp", "coastal", "wetland"],
  wader: ["water", "swamp", "wetland", "coastal"],
  arboreal: ["forest", "growth"],
  gliding: ["forest"],
  burrowing: ["agricultural", "rural", "wilderness", "underground"],
  climbing: ["forest", "mountain", "civic"],
  winged: ["sky", "wilderness", "rural"],
  flightless: ["agricultural", "rural", "wilderness"],
  serpentine: ["swamp", "forest", "underground", "water"],
  octopodal: ["water", "coastal", "underground"],
  hexapodal: ["forest", "agricultural", "underground", "growth"],
  "heavy-terrestrial": ["agricultural", "wilderness", "rural"],
  bipedal: [],
  quadrupedal: [],
}

export const ECO_ENV_TAGS: Record<string, string[]> = {
  filter: ["water", "coastal", "wetland"],
  pollinator: ["agricultural", "growth", "forest"],
  "burrower-role": ["agricultural", "rural", "underground", "wilderness"],
}

export interface CharacterIdentity {
  taxonomy: CharacterTaxonomy
  phrase: string
  species: SpeciesDef
  role: RoleDef
  preferredEnvTags: string[]
  materialTags: string[]
  hybrid: boolean
  sourceAnimals: string[]
}

export interface CreatureIdentity {
  phraseCore: string
  family: CreatureFamilyDef
  body: BodyPlanDef
  ecoRole: EcoRoleDef
  preferredEnvTags: string[]
  materialTags: string[]
}

export function pickCharacterIdentity(
  rng: SeededRng,
  color: ColorIdentity,
  grouped: boolean
): CharacterIdentity {
  const species = pickSpecies(rng, color)
  const role = pickRole(rng, species)
  const age = pickAge(rng, role, species)
  const build = pickBuild(rng, species, age)
  const ageLabel = AGES.find((item) => item.id === age)!.label
  const buildLabel = BUILDS.find((item) => item.id === build)!.label

  return {
    species,
    role,
    taxonomy: {
      kind: "character",
      species: species.label,
      age: ageLabel,
      build: buildLabel,
      role: role.label,
      summary: `${species.label} · ${ageLabel} · ${buildLabel} · ${role.label}`,
    },
    phrase: grouped
      ? groupPhrase(species, age, build, role)
      : characterPhrase(species, age, build, role),
    preferredEnvTags: role.envTags ?? [],
    materialTags: species.materialTags,
    hybrid: species.hybrid,
    sourceAnimals: species.sourceAnimals,
  }
}

export function pickCreatureIdentity(rng: SeededRng, beastly: boolean): CreatureIdentity {
  const family = pickFamily(rng, beastly)
  const body = pickBodyPlan(rng, family)
  const ecoRole = pickEcoRole(rng, family, body)
  const preferredEnvTags = [
    ...new Set([...(BODY_ENV_TAGS[body.id] ?? []), ...(ECO_ENV_TAGS[ecoRole.id] ?? [])]),
  ]

  return {
    family,
    body,
    ecoRole,
    phraseCore: `${body.adjective} ${family.adjective} ${ecoRole.noun}`,
    preferredEnvTags,
    materialTags: family.materialTags,
  }
}

export function finishLivingTaxonomy(
  rng: SeededRng,
  args: {
    study: Study
    difficulty: Difficulty
    environment: EnvironmentDef
    character?: CharacterIdentity
    creature?: CreatureIdentity
  }
): TaxonomyResult {
  if (args.character) {
    return {
      being: args.character.taxonomy,
      phrase: args.character.phrase,
      realismAnchor: pickAnchor(rng, {
        study: args.study,
        difficulty: args.difficulty,
        hybrid: args.character.hybrid,
        character: true,
        sourceAnimals: args.character.sourceAnimals,
      }),
      anatomyDirection: composeAnatomyDirection(rng, {
        character: true,
        hybrid: args.character.hybrid,
        study: args.study,
      }),
      materialTags: args.character.materialTags,
      extraConstraints:
        args.character.hybrid && rng.chance(args.difficulty === "apprentice" ? 0.28 : 0.42)
          ? [rng.pick(ANATOMY_PROHIBITIONS.filter((item) => !item.includes("non-humanoid")))]
          : [],
    }
  }

  const creature = args.creature!
  const matching = ADAPTATIONS.filter((adaptation) =>
    adaptation.envTags.some((tag) => args.environment.tags.includes(tag))
  )
  const ranked = matching.length > 0 ? matching : ADAPTATIONS
  const adaptation = rng.weightedPick(ranked, (item) => {
    const envHits = item.envTags.filter((tag) => args.environment.tags.includes(tag)).length
    const bodyHits = creature.preferredEnvTags.filter((tag) => item.envTags.includes(tag)).length
    return 0.2 + envHits * 2 + bodyHits * 1.6
  })

  return {
    being: {
      kind: "creature",
      family: creature.family.label,
      bodyPlan: creature.body.label,
      ecologicalRole: creature.ecoRole.label,
      adaptation: adaptation.label,
      summary: `${creature.family.label} · ${creature.body.label} · ${creature.ecoRole.label} · ${adaptation.label}`,
    },
    phrase: withArticle(creature.phraseCore),
    realismAnchor: pickAnchor(rng, {
      study: args.study,
      difficulty: args.difficulty,
      hybrid: creature.family.id === "hybrid",
      character: false,
      familyAnchors: creature.family.anchors,
      extraAnchors: creature.body.extraAnchors,
    }),
    anatomyDirection: composeAnatomyDirection(rng, {
      character: false,
      hybrid: creature.family.id === "hybrid",
      study: args.study,
    }),
    materialTags: creature.family.materialTags,
    extraConstraints: rng.chance(args.difficulty === "apprentice" ? 0.3 : 0.4)
      ? [rng.pick(ANATOMY_PROHIBITIONS)]
      : [],
  }
}
