import { dateKey } from "@/lib/rule-of-life/dates"
import {
  DEFAULT_SETTINGS,
  SYMBOLS,
  type Collection,
  type DailyReflection,
  type EntrySymbol,
  type Frequency,
  type FrequencyType,
  type JournalEntry,
  type MainScreen,
  type Observation,
  type Pillar,
  type PillarMode,
  type QuantityConfig,
  type RuleOfLifeSettings,
  type RuleOfLifeStore,
  type TextSize,
  type ThemePreference,
  type WeeklyExamen,
} from "@/lib/rule-of-life/types"

export const BACKUP_FORMAT = "rule-of-life-backup" as const
export const BACKUP_VERSION = 1

export interface RuleOfLifeBackup {
  format: typeof BACKUP_FORMAT
  version: typeof BACKUP_VERSION
  exportedAt: string
  data: {
    pillars: Pillar[]
    observations: Observation[]
    journal: JournalEntry[]
    collections: Collection[]
    reflections: DailyReflection[]
    examens: WeeklyExamen[]
    settings: RuleOfLifeSettings
  }
}

export type BackupParseFailure = "invalid" | "unsupported"
export type BackupParseResult =
  | { ok: true; store: RuleOfLifeStore }
  | { ok: false; reason: BackupParseFailure }

const FREQUENCY_TYPES = new Set<FrequencyType>(["daily", "weekly", "monthly"])
const PILLAR_MODES = new Set<PillarMode>(["simple", "quantity"])
const THEMES = new Set<ThemePreference>(["system", "light", "night"])
const TEXT_SIZES = new Set<TextSize>(["small", "medium", "large"])
const MAIN_SCREENS = new Set<MainScreen>(["today", "pillars", "journal", "review"])
const ENTRY_SYMBOLS = new Set<EntrySymbol>(Object.keys(SYMBOLS) as EntrySymbol[])

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value)
}

function readString(value: unknown): string | null {
  return typeof value === "string" ? value : null
}

function parseFrequency(value: unknown): Frequency | null {
  if (!isRecord(value)) return null
  const type = value.type
  if (typeof type !== "string" || !FREQUENCY_TYPES.has(type as FrequencyType)) return null
  const frequency: Frequency = { type: type as FrequencyType }
  if (Array.isArray(value.days)) {
    if (!value.days.every((day) => isFiniteNumber(day))) return null
    frequency.days = value.days
  }
  if (value.date !== undefined) {
    if (!isFiniteNumber(value.date)) return null
    frequency.date = value.date
  }
  if (value.nthWeekday !== undefined) {
    if (!isRecord(value.nthWeekday)) return null
    const week = value.nthWeekday.week
    const day = value.nthWeekday.day
    if (!isFiniteNumber(week) || !isFiniteNumber(day)) return null
    frequency.nthWeekday = { week, day }
  }
  return frequency
}

function parseQuantityConfig(value: unknown): QuantityConfig | undefined | "invalid" {
  if (value === undefined) return undefined
  if (!isRecord(value)) return "invalid"
  const unit = readString(value.unit)
  if (!unit || !isFiniteNumber(value.target)) return "invalid"
  const config: QuantityConfig = { unit, target: value.target }
  if (value.steps !== undefined) {
    if (
      !Array.isArray(value.steps) ||
      !value.steps.every(
        (step) => isRecord(step) && typeof step.label === "string" && isFiniteNumber(step.value)
      )
    ) {
      return "invalid"
    }
    config.steps = value.steps as QuantityConfig["steps"]
  }
  return config
}

function parsePillar(value: unknown): Pillar | null {
  if (!isRecord(value)) return null
  const id = readString(value.id)
  const title = readString(value.title)
  const description = readString(value.description)
  const createdAt = readString(value.createdAt)
  const frequency = parseFrequency(value.frequency)
  if (!id || !title || description === null || !createdAt || !frequency) return null
  if (typeof value.mode !== "string" || !PILLAR_MODES.has(value.mode as PillarMode)) return null
  if (typeof value.isFocus !== "boolean") return null
  const quantityConfig = parseQuantityConfig(value.quantityConfig)
  if (quantityConfig === "invalid") return null
  return {
    id,
    title,
    description,
    mode: value.mode as PillarMode,
    frequency,
    ...(quantityConfig ? { quantityConfig } : {}),
    isFocus: value.isFocus,
    createdAt,
  }
}

function parseObservation(value: unknown): Observation | null {
  if (!isRecord(value)) return null
  const id = readString(value.id)
  const pillarId = readString(value.pillarId)
  const date = readString(value.date)
  if (!id || !pillarId || !date || typeof value.observed !== "boolean") return null
  const observation: Observation = { id, pillarId, date, observed: value.observed }
  if (value.quantity !== undefined) {
    if (!isFiniteNumber(value.quantity)) return null
    observation.quantity = value.quantity
  }
  if (value.note !== undefined) {
    const note = readString(value.note)
    if (note === null) return null
    observation.note = note
  }
  return observation
}

function parseJournalEntry(value: unknown): JournalEntry | null {
  if (!isRecord(value)) return null
  const id = readString(value.id)
  const date = readString(value.date)
  const content = readString(value.content)
  const createdAt = readString(value.createdAt)
  if (!id || !date || content === null || !createdAt) return null
  if (typeof value.symbol !== "string" || !ENTRY_SYMBOLS.has(value.symbol as EntrySymbol)) return null
  const entry: JournalEntry = {
    id,
    date,
    symbol: value.symbol as EntrySymbol,
    content,
    createdAt,
  }
  if (value.isChecked !== undefined) {
    if (typeof value.isChecked !== "boolean") return null
    entry.isChecked = value.isChecked
  }
  if (value.hasCheckbox !== undefined) {
    if (typeof value.hasCheckbox !== "boolean") return null
    entry.hasCheckbox = value.hasCheckbox
  }
  if (value.linkedCollections !== undefined) {
    if (!Array.isArray(value.linkedCollections) || !value.linkedCollections.every((id) => typeof id === "string")) {
      return null
    }
    entry.linkedCollections = value.linkedCollections
  }
  return entry
}

function parseCollection(value: unknown): Collection | null {
  if (!isRecord(value)) return null
  const id = readString(value.id)
  const name = readString(value.name)
  const createdAt = readString(value.createdAt)
  if (!id || !name || !createdAt) return null
  return { id, name, createdAt }
}

function parseReflection(value: unknown): DailyReflection | null {
  if (!isRecord(value)) return null
  const date = readString(value.date)
  const content = readString(value.content)
  if (!date || content === null) return null
  return { date, content }
}

function parseExamen(value: unknown): WeeklyExamen | null {
  if (!isRecord(value)) return null
  const weekStart = readString(value.weekStart)
  const content = readString(value.content)
  if (!weekStart || content === null) return null
  return { weekStart, content }
}

function parseSettings(value: unknown): RuleOfLifeSettings | null {
  if (!isRecord(value)) return null
  const settings: RuleOfLifeSettings = { ...DEFAULT_SETTINGS }
  if (value.theme !== undefined) {
    if (typeof value.theme !== "string" || !THEMES.has(value.theme as ThemePreference)) return null
    settings.theme = value.theme as ThemePreference
  }
  if (value.reduceMotion !== undefined) {
    if (typeof value.reduceMotion !== "boolean") return null
    settings.reduceMotion = value.reduceMotion
  }
  if (value.textSize !== undefined) {
    if (typeof value.textSize !== "string" || !TEXT_SIZES.has(value.textSize as TextSize)) return null
    settings.textSize = value.textSize as TextSize
  }
  if (value.weekStartsOn !== undefined) {
    if (!isFiniteNumber(value.weekStartsOn) || value.weekStartsOn < 0 || value.weekStartsOn > 6) return null
    settings.weekStartsOn = value.weekStartsOn
  }
  if (value.defaultSymbol !== undefined) {
    if (typeof value.defaultSymbol !== "string" || !ENTRY_SYMBOLS.has(value.defaultSymbol as EntrySymbol)) {
      return null
    }
    settings.defaultSymbol = value.defaultSymbol as EntrySymbol
  }
  if (value.defaultView !== undefined) {
    if (typeof value.defaultView !== "string" || !MAIN_SCREENS.has(value.defaultView as MainScreen)) return null
    settings.defaultView = value.defaultView as MainScreen
  }
  return settings
}

function parseArray<T>(value: unknown, parseItem: (item: unknown) => T | null): T[] | null {
  if (!Array.isArray(value)) return null
  const items: T[] = []
  for (const item of value) {
    const parsed = parseItem(item)
    if (!parsed) return null
    items.push(parsed)
  }
  return items
}

export function createBackup(store: RuleOfLifeStore, exportedAt = new Date()): RuleOfLifeBackup {
  return {
    format: BACKUP_FORMAT,
    version: BACKUP_VERSION,
    exportedAt: exportedAt.toISOString(),
    data: {
      pillars: store.pillars,
      observations: store.observations,
      journal: store.journal,
      collections: store.collections,
      reflections: store.reflections,
      examens: store.examen,
      settings: store.settings,
    },
  }
}

export function backupFilename(now = new Date()): string {
  return `rule-of-life-backup-${dateKey(now)}.json`
}

export function parseBackup(input: unknown): BackupParseResult {
  if (!isRecord(input)) return { ok: false, reason: "invalid" }
  if (input.format !== BACKUP_FORMAT) return { ok: false, reason: "invalid" }
  if (!isFiniteNumber(input.version)) return { ok: false, reason: "invalid" }
  if (input.version !== BACKUP_VERSION) return { ok: false, reason: "unsupported" }
  if (!isRecord(input.data)) return { ok: false, reason: "invalid" }

  const pillars = parseArray(input.data.pillars, parsePillar)
  const observations = parseArray(input.data.observations, parseObservation)
  const journal = parseArray(input.data.journal, parseJournalEntry)
  const collections = parseArray(input.data.collections, parseCollection)
  const reflections = parseArray(input.data.reflections, parseReflection)
  const examens = parseArray(input.data.examens, parseExamen)
  const settings = parseSettings(input.data.settings)

  if (!pillars || !observations || !journal || !collections || !reflections || !examens || !settings) {
    return { ok: false, reason: "invalid" }
  }

  return {
    ok: true,
    store: {
      pillars,
      observations,
      journal,
      collections,
      reflections,
      examen: examens,
      settings,
    },
  }
}

export function parseBackupJson(text: string): BackupParseResult {
  try {
    return parseBackup(JSON.parse(text.replace(/^\uFEFF/, "")))
  } catch {
    return { ok: false, reason: "invalid" }
  }
}

export function downloadBackup(store: RuleOfLifeStore, now = new Date()): void {
  if (typeof document === "undefined") return
  const payload = JSON.stringify(createBackup(store, now), null, 2)
  const blob = new Blob([payload], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = backupFilename(now)
  link.rel = "noopener"
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
