export type CardCategory = "easy" | "hard"
export type DeckName =
  | "drills"
  | "targeted"
  | "personal"
  | "master"
  | "weekly"
  | "hard_surface"
  | "environment"
  | "anatomy"
  | "creature"
  | "character"
  | "grimdark"
export type SessionMode = "daily" | "master_study" | "weekly_piece"
export type Rating = "again" | "good" | "easy" | "skip"
export type WeeklyPhase = "thumbnails" | "line" | "values" | "color" | "render" | "polish"

export interface PracticeCard {
  id: string
  deckName: DeckName
  title: string
  prompt: string
  tags: string[]
  difficulty: number
  category: CardCategory
  estimatedMinutes: number
  referenceUrl?: string
  tools?: string[]
  tips?: string[]
  domain?: string
  style?: string
  theme?: string
  portfolioGoal?: boolean | number
}

export interface CardSchedule {
  cardId: string
  dueDate: string
  streak: number
  lastRating?: Rating
  lastPracticed?: string
}

export interface SessionBlock {
  id: string
  type: "drills" | "targeted" | "personal" | "master_study" | "weekly_piece"
  label: string
  durationMinutes: number
  cards: PracticeCard[]
  rating?: Rating
  completed: boolean
  elapsedSeconds?: number
}

export interface WeeklyBrief {
  objects: string[]
  culture: string
  culturePeriod: string
  scenario: string
  mood: string
  aestheticHints: string[]
  prompt: string
}

export interface DailySession {
  date: string
  mode: SessionMode
  totalMinutes: number
  blocks: SessionBlock[]
  seed: number
  completed: boolean
  masterTags?: string[]
  weeklyPhase?: WeeklyPhase
  weeklyBrief?: WeeklyBrief
}

export interface DayLog {
  date: string
  minutesPracticed: number
  actualSeconds?: number
  blocksCompleted: number
  mode: SessionMode
}

export interface ProgressNote {
  id: string
  date: string
  text: string
  tags: string[]
}

export interface TrackFocus {
  domains?: string[]
  styles?: string[]
  themes?: string[]
  preferPortfolio?: boolean
  strength?: number
}

export interface SessionWeights {
  personalTrack?: TrackFocus
  deckOverrides?: Partial<Record<SessionBlock["type"], DeckName[]>>
}

export interface ViewerSettings {
  lightAzimuth: number
  lightElevation: number
  lightIntensity: number
  perspective: boolean
  groundPlane: boolean
  castShadow: boolean
  primitive: "cube" | "sphere" | "cylinder" | "house" | "tree" | "airplane"
  fov: number
  perspectiveMode: "1pt" | "2pt" | "3pt" | "5pt" | "free"
}

export interface AppSettings {
  longSessionBias: boolean
  easyHardRatio: "50/50" | "30/70"
  autoAdvance: boolean
  viewer: ViewerSettings
  activeTrack?: TrackFocus
}

export const DEFAULT_SETTINGS: AppSettings = {
  longSessionBias: true,
  easyHardRatio: "50/50",
  autoAdvance: false,
  viewer: {
    lightAzimuth: 45,
    lightElevation: 45,
    lightIntensity: 1,
    perspective: true,
    groundPlane: true,
    castShadow: true,
    primitive: "cube",
    fov: 50,
    perspectiveMode: "free",
  },
}

export const TIME_OPTIONS = [30, 45, 60, 90, 120] as const

export const MASTER_STUDY_TAGS = [
  "Light",
  "Value",
  "Color",
  "Edges",
  "Composition",
  "Portrait",
  "Figure",
  "Anatomy",
  "Line",
  "Shape",
  "Illustration",
  "Narrative",
  "Design",
  "Rendering",
  "Painting",
] as const

export const WEEKLY_PHASES: WeeklyPhase[] = [
  "thumbnails",
  "line",
  "values",
  "color",
  "render",
  "polish",
]

export const FOCUS_DECKS: Array<DeckName | null> = [
  null,
  "hard_surface",
  "environment",
  "anatomy",
  "creature",
  "character",
  "grimdark",
]

export const STORAGE_KEYS = {
  cards: "lineforge_cards",
  schedules: "lineforge_schedules",
  session: "lineforge_session",
  logs: "lineforge_logs",
  notes: "lineforge_notes",
  settings: "lineforge_settings",
  weeklyCard: "lineforge_weekly_card",
  weeklyWeek: "lineforge_weekly_week",
  labSettings: "lineforge_lab_settings",
  diceRolls: "lineforge_dice_rolls",
} as const

export type LineforgeTab = "today" | "decks" | "dice" | "lab" | "library" | "history"
