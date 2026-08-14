import type { Subject, SubjectRole, Study } from "@/lib/commissions/types"
import { STUDY_IDS } from "@/lib/commissions/types"

export interface SubjectDef {
  id: Subject
  label: string
  role: SubjectRole
}

export const SUBJECTS: SubjectDef[] = [
  { id: "character", label: "Character", role: "being" },
  { id: "creature", label: "Creature", role: "being" },
  { id: "beast", label: "Beast", role: "being" },
  { id: "plant-fungus", label: "Plant / Fungus", role: "object" },
  { id: "artifact", label: "Artifact", role: "object" },
  { id: "weapon-tool", label: "Weapon / Tool", role: "object" },
  { id: "architecture", label: "Architecture", role: "place" },
  { id: "environment-land", label: "Environment / Land", role: "place" },
  { id: "construct-machine", label: "Construct / Machine", role: "object" },
  { id: "group-scene", label: "Group Scene", role: "being" },
  { id: "spell-moment", label: "Spell / Moment", role: "event" },
]

export const SUBJECT_BY_ID: Record<Subject, SubjectDef> = Object.fromEntries(
  SUBJECTS.map((subject) => [subject.id, subject])
) as Record<Subject, SubjectDef>

const DEFAULT_STUDY_WEIGHT = 1

const SUBJECT_STUDY_OVERRIDES: Record<Subject, Partial<Record<Study, number>>> = {
  character: {
    "human-anatomy": 6,
    gesture: 5,
    foreshortening: 3.4,
    composition: 2.4,
    lighting: 2.2,
    "visual-storytelling": 3.2,
    color: 1.8,
    materials: 1.6,
    "creature-anatomy": 0.25,
    foliage: 0.7,
    architecture: 0.8,
    scale: 1.4,
  },
  creature: {
    "creature-anatomy": 6.5,
    texture: 3.2,
    scale: 3.4,
    materials: 2.4,
    composition: 2.8,
    gesture: 2.6,
    lighting: 2,
    atmosphere: 2.2,
    "human-anatomy": 0.2,
    foliage: 1.8,
    architecture: 0.6,
    foreshortening: 2.2,
  },
  beast: {
    "creature-anatomy": 5.8,
    gesture: 3.6,
    scale: 3.2,
    texture: 3,
    foliage: 2.4,
    composition: 2.2,
    "human-anatomy": 0.15,
    materials: 1.8,
    atmosphere: 2,
    architecture: 0.5,
  },
  "plant-fungus": {
    foliage: 6.4,
    texture: 4.2,
    materials: 3.2,
    color: 3.4,
    atmosphere: 2.6,
    composition: 2.2,
    lighting: 2.4,
    scale: 2,
    "creature-anatomy": 0.7,
    "human-anatomy": 0.2,
    gesture: 0.6,
    perspective: 1.4,
    architecture: 0.8,
  },
  artifact: {
    materials: 6.2,
    texture: 4.4,
    lighting: 3.2,
    color: 2.4,
    composition: 2.6,
    perspective: 2.2,
    "creature-anatomy": 0.35,
    "human-anatomy": 0.4,
    foliage: 0.7,
    gesture: 0.5,
    architecture: 1.2,
    scale: 1.8,
  },
  "weapon-tool": {
    materials: 5.6,
    texture: 3.8,
    foreshortening: 3.4,
    lighting: 2.8,
    composition: 2.4,
    "human-anatomy": 1.6,
    gesture: 1.8,
    "creature-anatomy": 0.4,
    foliage: 0.6,
    architecture: 0.7,
  },
  architecture: {
    perspective: 6.6,
    architecture: 6.4,
    composition: 4.2,
    lighting: 3.2,
    atmosphere: 2.8,
    scale: 3.4,
    materials: 2.8,
    "visual-storytelling": 2,
    "human-anatomy": 1.2,
    "creature-anatomy": 0.4,
    foliage: 1.6,
    gesture: 0.7,
    foreshortening: 2.2,
  },
  "environment-land": {
    atmosphere: 5.6,
    perspective: 4.4,
    lighting: 4.6,
    composition: 4.2,
    color: 3.4,
    foliage: 3.2,
    scale: 3,
    architecture: 2.2,
    "visual-storytelling": 2.4,
    "human-anatomy": 0.6,
    "creature-anatomy": 0.8,
    gesture: 0.7,
    materials: 2,
  },
  "construct-machine": {
    materials: 5.4,
    perspective: 4.2,
    texture: 3.4,
    scale: 3.2,
    architecture: 2.8,
    lighting: 2.6,
    composition: 2.4,
    "creature-anatomy": 1.2,
    "human-anatomy": 0.7,
    foliage: 0.6,
    gesture: 0.8,
  },
  "group-scene": {
    "visual-storytelling": 6.4,
    composition: 5.4,
    gesture: 4.4,
    scale: 3.2,
    "human-anatomy": 3.4,
    lighting: 2.8,
    atmosphere: 2.4,
    "creature-anatomy": 1.4,
    perspective: 2.6,
    color: 2.2,
    foliage: 1.2,
    architecture: 1.8,
  },
  "spell-moment": {
    lighting: 5.6,
    composition: 5.2,
    color: 4.4,
    atmosphere: 4.2,
    "visual-storytelling": 3.6,
    gesture: 2.4,
    materials: 2.2,
    texture: 2,
    scale: 2.2,
    perspective: 2,
    "human-anatomy": 1.6,
    "creature-anatomy": 1.4,
    foliage: 1.4,
    architecture: 1.6,
  },
}

export const SUBJECT_STUDY_WEIGHTS: Record<Subject, Record<Study, number>> =
  Object.fromEntries(
    SUBJECTS.map((subject) => {
      const overrides = SUBJECT_STUDY_OVERRIDES[subject.id]
      const weights = Object.fromEntries(
        STUDY_IDS.map((study) => [study, overrides[study] ?? DEFAULT_STUDY_WEIGHT])
      ) as Record<Study, number>
      return [subject.id, weights]
    })
  ) as Record<Subject, Record<Study, number>>
