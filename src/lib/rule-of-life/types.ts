export type PillarMode = "simple" | "quantity"
export type FrequencyType = "daily" | "weekly" | "monthly"

export interface Frequency {
  type: FrequencyType
  days?: number[]
  date?: number
  nthWeekday?: { week: number; day: number }
}

export interface QuantityConfig {
  unit: string
  target: number
  steps?: { label: string; value: number }[]
}

export interface Pillar {
  id: string
  title: string
  description: string
  mode: PillarMode
  frequency: Frequency
  quantityConfig?: QuantityConfig
  isFocus: boolean
  createdAt: string
}

export interface Observation {
  id: string
  pillarId: string
  date: string
  observed: boolean
  quantity?: number
  note?: string
}

export interface ContinuityStats {
  current: number
  longest: number
  history: boolean[]
}

export type EntrySymbol = "task" | "event" | "note" | "insight" | "prayer"

export const SYMBOLS: Record<EntrySymbol, string> = {
  task: "•",
  event: "○",
  note: "–",
  insight: "✦",
  prayer: "✝",
}

export const SYMBOL_LABELS: Record<EntrySymbol, string> = {
  task: "Task",
  event: "Event",
  note: "Note",
  insight: "Insight",
  prayer: "Prayer",
}

export interface JournalEntry {
  id: string
  date: string
  symbol: EntrySymbol
  content: string
  isChecked?: boolean
  hasCheckbox?: boolean
  linkedCollections?: string[]
  createdAt: string
}

export interface Collection {
  id: string
  name: string
  createdAt: string
}

export interface DailyReflection {
  date: string
  content: string
}

export interface WeeklyExamen {
  weekStart: string
  content: string
}

export type ThemePreference = "system" | "light" | "night"
export type TextSize = "small" | "medium" | "large"
export type MainScreen = "today" | "pillars" | "journal" | "review"

export interface RuleOfLifeSettings {
  theme: ThemePreference
  reduceMotion: boolean
  textSize: TextSize
  weekStartsOn: number
  defaultSymbol: EntrySymbol
  defaultView: MainScreen
}

export const DEFAULT_SETTINGS: RuleOfLifeSettings = {
  theme: "system",
  reduceMotion: false,
  textSize: "medium",
  weekStartsOn: 0,
  defaultSymbol: "note",
  defaultView: "today",
}

export type ViewState =
  | { type: "main"; screen: MainScreen }
  | { type: "detail"; pillarId: string }
  | { type: "edit"; pillarId?: string }
  | { type: "dailyDetail"; date: string }
  | { type: "collectionDetail"; collectionId: string }
  | { type: "settings" }

export interface RuleOfLifeStore {
  pillars: Pillar[]
  observations: Observation[]
  journal: JournalEntry[]
  collections: Collection[]
  reflections: DailyReflection[]
  examen: WeeklyExamen[]
  settings: RuleOfLifeSettings
}

export const STORAGE_KEYS = {
  pillars: "poa.rule-of-life.pillars",
  observations: "poa.rule-of-life.observations",
  journal: "poa.rule-of-life.journal",
  collections: "poa.rule-of-life.collections",
  reflections: "poa.rule-of-life.reflections",
  examen: "poa.rule-of-life.examen",
  settings: "poa.rule-of-life.settings",
  meta: "poa.rule-of-life.meta",
} as const

export const STORAGE_VERSION = 1

export interface StorageMeta {
  version: number
  seeded: boolean
}
