import { COLOR_BY_ID, COLOR_IDENTITIES, COLOR_SUBJECT_WEIGHTS } from "@/data/commissions/colors"
import { STUDY_BY_ID } from "@/data/commissions/studies"
import { SUBJECTS, SUBJECT_BY_ID } from "@/data/commissions/subjects"
import { SeededRng, createSeed, idFromSeed } from "@/lib/commissions/random"
import {
  renderArtBrief,
  renderComposition,
  renderConstraints,
  renderLighting,
  renderMaterials,
  secondaryLabels,
  titleFromModel,
} from "@/lib/commissions/render-brief"
import { buildSceneModel } from "@/lib/commissions/scene-model"
import type {
  ColorIdentity,
  CommissionLocks,
  Difficulty,
  IllustrationCommission,
  Study,
  Subject,
} from "@/lib/commissions/types"

export interface GenerateOptions extends CommissionLocks {
  seed?: string
}

const DIFFICULTY_WEIGHTS: Record<Difficulty, number> = {
  apprentice: 1.15,
  journeyman: 1.35,
  master: 0.85,
}

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  apprentice: "Apprentice",
  journeyman: "Journeyman",
  master: "Master",
}

function pickDifficulty(rng: SeededRng, locked?: Difficulty): Difficulty {
  if (locked) return locked
  return rng.weightedPick(
    ["apprentice", "journeyman", "master"] as Difficulty[],
    (id) => DIFFICULTY_WEIGHTS[id]
  )
}

function pickColor(rng: SeededRng): ColorIdentity {
  return rng.weightedPick(COLOR_IDENTITIES, (color) => color.pickWeight).id
}

function pickSubject(rng: SeededRng, color: ColorIdentity, locked?: Subject): Subject {
  if (locked) return locked
  return rng.weightedPick(SUBJECTS, (subject) => COLOR_SUBJECT_WEIGHTS[color][subject.id]).id
}

export function generateCommission(options: GenerateOptions = {}): IllustrationCommission {
  const seed = options.seed ?? createSeed()
  const rng = new SeededRng(seed)

  const difficulty = pickDifficulty(rng, options.difficulty)
  const color = pickColor(rng)
  const subject = pickSubject(rng, color, options.subject)
  const model = buildSceneModel(rng, {
    subject,
    color,
    difficulty,
    lockedStudy: options.primaryStudy,
  })

  const titled = titleFromModel(rng, model)
  const artBrief = renderArtBrief(model, titled.hook)
  const subjectDef = SUBJECT_BY_ID[subject]
  const primaryStudy = model.visualGoal.primaryStudy

  const locks: CommissionLocks = {}
  if (options.subject) locks.subject = options.subject
  if (options.primaryStudy) locks.primaryStudy = options.primaryStudy
  if (options.difficulty) locks.difficulty = options.difficulty

  return {
    id: idFromSeed(seed),
    seed,
    title: titled.title,
    subject,
    subjectLabel: `${subjectDef.label} Illustration`,
    colorIdentity: color,
    colorLabel: COLOR_BY_ID[color].label,
    difficulty,
    difficultyLabel: DIFFICULTY_LABEL[difficulty],
    artBrief,
    primaryStudy,
    primaryStudyLabel: STUDY_BY_ID[primaryStudy].label,
    secondaryStudies: secondaryLabels(model.visualGoal.secondaryStudies),
    being: model.being,
    realismAnchor: model.realismAnchor,
    anatomyDirection: model.anatomyDirection,
    scene: model.narrative.situationLabel,
    environment: model.setting.environmentName,
    composition: renderComposition(model),
    lighting: renderLighting(model),
    materials: renderMaterials(model),
    constraints: renderConstraints(model),
    artDirection: model.constraints.artDirectionConstraint,
    status: "generated",
    createdAt: new Date().toISOString(),
    locks: Object.keys(locks).length > 0 ? locks : undefined,
  }
}

export function regenerateFromCommission(commission: IllustrationCommission): IllustrationCommission {
  return generateCommission({
    seed: commission.seed,
    ...commission.locks,
  })
}
