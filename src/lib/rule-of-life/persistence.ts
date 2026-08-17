import { DEFAULT_SETTINGS, STORAGE_KEYS, STORAGE_VERSION } from "@/lib/rule-of-life/types"
import type { RuleOfLifeStore, StorageMeta } from "@/lib/rule-of-life/types"
import { createInitialStore } from "@/lib/rule-of-life/seed"

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined"
}

function readJson<T>(key: string): T | null {
  if (!canUseStorage()) return null
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

function writeJson(key: string, value: unknown): void {
  if (!canUseStorage()) return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // quota / private mode
  }
}

export function hasPersistedData(): boolean {
  if (!canUseStorage()) return false
  return Boolean(
    window.localStorage.getItem(STORAGE_KEYS.meta) ||
      window.localStorage.getItem(STORAGE_KEYS.pillars)
  )
}

export function loadStore(): RuleOfLifeStore | null {
  if (!hasPersistedData()) return null

  const pillars = readJson<RuleOfLifeStore["pillars"]>(STORAGE_KEYS.pillars) ?? []
  const observations = readJson<RuleOfLifeStore["observations"]>(STORAGE_KEYS.observations) ?? []
  const journal = readJson<RuleOfLifeStore["journal"]>(STORAGE_KEYS.journal) ?? []
  const collections = readJson<RuleOfLifeStore["collections"]>(STORAGE_KEYS.collections) ?? []
  const reflections = readJson<RuleOfLifeStore["reflections"]>(STORAGE_KEYS.reflections) ?? []
  const examen = readJson<RuleOfLifeStore["examen"]>(STORAGE_KEYS.examen) ?? []
  const settings = {
    ...DEFAULT_SETTINGS,
    ...(readJson<RuleOfLifeStore["settings"]>(STORAGE_KEYS.settings) ?? {}),
  }

  return { pillars, observations, journal, collections, reflections, examen, settings }
}

export function saveStore(store: RuleOfLifeStore): void {
  writeJson(STORAGE_KEYS.pillars, store.pillars)
  writeJson(STORAGE_KEYS.observations, store.observations)
  writeJson(STORAGE_KEYS.journal, store.journal)
  writeJson(STORAGE_KEYS.collections, store.collections)
  writeJson(STORAGE_KEYS.reflections, store.reflections)
  writeJson(STORAGE_KEYS.examen, store.examen)
  writeJson(STORAGE_KEYS.settings, store.settings)
  writeJson(STORAGE_KEYS.meta, { version: STORAGE_VERSION, seeded: true } satisfies StorageMeta)
}

export function loadOrSeedStore(now = new Date()): RuleOfLifeStore {
  const existing = loadStore()
  if (existing) return existing
  const seeded = createInitialStore(now)
  saveStore(seeded)
  return seeded
}
