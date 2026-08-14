export const SUBJECT_IDS = [
  "character",
  "creature",
  "beast",
  "plant-fungus",
  "artifact",
  "weapon-tool",
  "architecture",
  "environment-land",
  "construct-machine",
  "group-scene",
  "spell-moment",
] as const

export type Subject = (typeof SUBJECT_IDS)[number]

export const STUDY_IDS = [
  "human-anatomy",
  "creature-anatomy",
  "gesture",
  "materials",
  "texture",
  "perspective",
  "foreshortening",
  "composition",
  "lighting",
  "color",
  "scale",
  "atmosphere",
  "visual-storytelling",
  "foliage",
  "architecture",
] as const

export type Study = (typeof STUDY_IDS)[number]

export const DIFFICULTY_IDS = ["apprentice", "journeyman", "master"] as const

export type Difficulty = (typeof DIFFICULTY_IDS)[number]

export const COLOR_IDS = [
  "white",
  "blue",
  "black",
  "red",
  "green",
  "white-blue",
  "blue-black",
  "black-red",
  "red-green",
  "green-white",
  "white-black",
  "blue-red",
  "black-green",
  "red-white",
  "green-blue",
  "colorless",
] as const

export type ColorIdentity = (typeof COLOR_IDS)[number]

export type CommissionStatus = "generated" | "accepted" | "completed"

export type SubjectRole = "being" | "object" | "place" | "event"

export interface CommissionLocks {
  subject?: Subject
  primaryStudy?: Study
  difficulty?: Difficulty
}

export interface CharacterTaxonomy {
  kind: "character"
  species: string
  age: string
  build: string
  role: string
  summary: string
}

export interface CreatureTaxonomy {
  kind: "creature"
  family: string
  bodyPlan: string
  ecologicalRole: string
  adaptation: string
  summary: string
}

export type BeingTaxonomy = CharacterTaxonomy | CreatureTaxonomy

export interface IllustrationCommission {
  id: string
  seed: string
  title: string
  subject: Subject
  subjectLabel: string
  colorIdentity: ColorIdentity
  colorLabel: string
  difficulty: Difficulty
  difficultyLabel: string

  artBrief: string

  primaryStudy: Study
  primaryStudyLabel: string
  secondaryStudies: string[]

  being?: BeingTaxonomy
  realismAnchor?: string
  anatomyDirection?: string

  scene: string
  environment: string
  composition: string
  lighting: string

  materials: string[]
  constraints: string[]
  artDirection?: string

  status: CommissionStatus
  createdAt: string
  acceptedAt?: string
  locks?: CommissionLocks
}

/** Future Art → Cards record. Not used by the generator UI yet. */
export interface CommissionArtwork {
  commissionId: string
  seed: string
  title: string
  completedAt: string
  subject: Subject
  colorIdentity: ColorIdentity
  primaryStudy: Study
  difficulty: Difficulty
  originalBrief: string
  finalArtwork?: string
  processImages?: string[]
  artStationUrl?: string
}
