import { getAllDefaultCards } from "@/lib/lineforge/data/defaultDecks"
import type {
  AppSettings,
  CardSchedule,
  DailySession,
  DayLog,
  PracticeCard,
  ProgressNote,
  Rating,
  WeeklyPhase,
} from "@/lib/lineforge/types/lineforge"
import { DEFAULT_SETTINGS, STORAGE_KEYS, WEEKLY_PHASES } from "@/lib/lineforge/types/lineforge"
import type { LabSettings } from "@/lib/lineforge/types/lab"
import { DEFAULT_LAB_SETTINGS } from "@/lib/lineforge/types/lab"
import type { SavedRoll } from "@/lib/lineforge/types/library"

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined"
}

export function load<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function save<T>(key: string, data: T): void {
  if (!canUseStorage()) return
  try {
    window.localStorage.setItem(key, JSON.stringify(data))
  } catch {
    // quota / private mode — fail locally
  }
}

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

export function addDaysIso(dateStr: string, days: number): string {
  const d = new Date(`${dateStr}T00:00:00.000Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

export function getCards(): PracticeCard[] {
  const defaults = getAllDefaultCards()
  if (!canUseStorage()) return defaults

  const raw = window.localStorage.getItem(STORAGE_KEYS.cards)
  if (!raw) {
    save(STORAGE_KEYS.cards, defaults)
    return defaults
  }

  let stored: PracticeCard[] = []
  try {
    stored = JSON.parse(raw) as PracticeCard[]
    if (!Array.isArray(stored)) stored = []
  } catch {
    save(STORAGE_KEYS.cards, defaults)
    return defaults
  }

  const defaultById = new Map(defaults.map((card) => [card.id, card]))
  const merged = stored.map((card) => {
    const def = defaultById.get(card.id)
    if (!def) return card
    return {
      ...card,
      tips: card.tips ?? def.tips,
      referenceUrl: card.referenceUrl ?? def.referenceUrl,
    }
  })

  const storedIds = new Set(merged.map((card) => card.id))
  for (const def of defaults) {
    if (!storedIds.has(def.id)) merged.push(def)
  }

  save(STORAGE_KEYS.cards, merged)
  return merged
}

export function getSchedules(): CardSchedule[] {
  return load<CardSchedule[]>(STORAGE_KEYS.schedules, [])
}

export function saveSchedules(schedules: CardSchedule[]): void {
  save(STORAGE_KEYS.schedules, schedules)
}

export function rateCard(cardId: string, rating: Rating): CardSchedule {
  const today = todayIso()
  const schedules = getSchedules()
  let schedule = schedules.find((item) => item.cardId === cardId)
  if (!schedule) {
    schedule = { cardId, dueDate: today, streak: 0 }
    schedules.push(schedule)
  }

  schedule.lastRating = rating
  schedule.lastPracticed = today

  if (rating === "again") {
    schedule.streak = 0
    schedule.dueDate = addDaysIso(today, 1)
  } else if (rating === "good") {
    schedule.streak += 1
    schedule.dueDate = addDaysIso(today, Math.min(3 + schedule.streak, 7))
  } else if (rating === "easy") {
    schedule.streak += 2
    schedule.dueDate = addDaysIso(today, Math.min(10 + schedule.streak * 2, 21))
  }
  // skip: streak and dueDate unchanged

  saveSchedules(schedules)
  return schedule
}

export function getLogs(): DayLog[] {
  return load<DayLog[]>(STORAGE_KEYS.logs, [])
}

export function logDay(entry: DayLog): void {
  const logs = getLogs()
  const index = logs.findIndex((item) => item.date === entry.date)
  if (index >= 0) logs[index] = entry
  else logs.push(entry)
  save(STORAGE_KEYS.logs, logs)
}

export function getStreak(): number {
  const dates = new Set(getLogs().map((log) => log.date))
  const today = todayIso()
  let streak = 0
  for (let i = 0; i < 365; i++) {
    const key = addDaysIso(today, -i)
    if (dates.has(key)) {
      streak += 1
    } else if (i === 0) {
      continue
    } else {
      break
    }
  }
  return streak
}

export function getSession(): DailySession | null {
  const session = load<DailySession | null>(STORAGE_KEYS.session, null)
  if (!session) return null
  session.blocks = session.blocks.filter((block) => (block.type as string) !== "warmup")
  return session
}

export function saveSession(session: DailySession): void {
  save(STORAGE_KEYS.session, session)
}

export function getNotes(): ProgressNote[] {
  return load<ProgressNote[]>(STORAGE_KEYS.notes, [])
}

export function saveNotes(notes: ProgressNote[]): void {
  save(STORAGE_KEYS.notes, notes)
}

export function getSettings(): AppSettings {
  const stored = load<Partial<AppSettings> | null>(STORAGE_KEYS.settings, null)
  if (!stored) return { ...DEFAULT_SETTINGS, viewer: { ...DEFAULT_SETTINGS.viewer } }
  return {
    ...DEFAULT_SETTINGS,
    ...stored,
    viewer: { ...DEFAULT_SETTINGS.viewer, ...stored.viewer },
  }
}

export function saveSettings(settings: AppSettings): void {
  save(STORAGE_KEYS.settings, settings)
}

export function getWeeklyCard(): { card: PracticeCard; week: string } | null {
  const card = load<PracticeCard | null>(STORAGE_KEYS.weeklyCard, null)
  const week = load<string | null>(STORAGE_KEYS.weeklyWeek, null)
  if (!card || !week) return null
  return { card, week }
}

export function saveWeeklyCard(card: PracticeCard, week: string): void {
  save(STORAGE_KEYS.weeklyCard, card)
  save(STORAGE_KEYS.weeklyWeek, week)
}

export function getISOWeek(date: Date): { year: number; week: number } {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const year = d.getUTCFullYear()
  const jan4 = new Date(Date.UTC(year, 0, 4))
  const week1Day = jan4.getUTCDay() || 7
  const week1Thursday = new Date(jan4)
  week1Thursday.setUTCDate(jan4.getUTCDate() + (4 - week1Day))
  const week = 1 + Math.round((d.getTime() - week1Thursday.getTime()) / 604800000)
  return { year, week }
}

export function isoWeekKey(date: Date = new Date()): string {
  const { year, week } = getISOWeek(date)
  return `${year}-W${String(week).padStart(2, "0")}`
}

export function getWeeklyPhaseForDay(date: Date = new Date()): WeeklyPhase {
  const day = date.getDay()
  if (day === 0) return "polish"
  return WEEKLY_PHASES[Math.max(0, Math.min(day - 1, 5))]
}

export function getLabSettings(): LabSettings {
  const stored = load<Partial<LabSettings> | null>(STORAGE_KEYS.labSettings, null)
  if (!stored) return { ...DEFAULT_LAB_SETTINGS }
  return { ...DEFAULT_LAB_SETTINGS, ...stored }
}

export function saveLabSettings(settings: LabSettings): void {
  save(STORAGE_KEYS.labSettings, settings)
}

export function getDiceRolls(): SavedRoll[] {
  return load<SavedRoll[]>(STORAGE_KEYS.diceRolls, [])
}

export function saveDiceRolls(rolls: SavedRoll[]): void {
  save(STORAGE_KEYS.diceRolls, rolls.slice(0, 50))
}

export function isWeekend(date: Date = new Date()): boolean {
  const day = date.getDay()
  return day === 0 || day === 6
}
