import { describe, expect, it } from "vitest"
import { backupFilename, createBackup, parseBackup, parseBackupJson } from "@/lib/rule-of-life/backup"
import { addDays, dateKey, parseDateKey, startOfWeek } from "@/lib/rule-of-life/dates"
import { isScheduled } from "@/lib/rule-of-life/scheduling"
import { calculateContinuity, calculateWeeklyObservance } from "@/lib/rule-of-life/observance"
import { DEFAULT_SETTINGS, type Observation, type Pillar, type RuleOfLifeStore } from "@/lib/rule-of-life/types"

function atNoon(isoDate: string): Date {
  return new Date(`${isoDate}T12:00:00`)
}

function simplePillar(overrides: Partial<Pillar> = {}): Pillar {
  return {
    id: "p1",
    title: "Prayer",
    description: "",
    mode: "simple",
    frequency: { type: "daily" },
    isFocus: false,
    createdAt: "2026-06-01T12:00:00.000Z",
    ...overrides,
  }
}

function obs(date: string, extra: Partial<Observation> = {}): Observation {
  return {
    id: `obs-${date}`,
    pillarId: "p1",
    date,
    observed: true,
    ...extra,
  }
}

describe("dateKey / parseDateKey", () => {
  it("uses local calendar fields across the whole local day", () => {
    expect(dateKey(new Date(2026, 7, 15, 0, 15, 0))).toBe("2026-08-15")
    expect(dateKey(new Date(2026, 7, 15, 23, 45, 0))).toBe("2026-08-15")
  })

  it("parses stored keys at noon to avoid timezone off-by-one", () => {
    const parsed = parseDateKey("2026-08-15")
    expect(parsed.getFullYear()).toBe(2026)
    expect(parsed.getMonth()).toBe(7)
    expect(parsed.getDate()).toBe(15)
  })
})

describe("isScheduled", () => {
  it("treats daily as every day", () => {
    expect(isScheduled({ type: "daily" }, atNoon("2026-08-15"))).toBe(true)
  })

  it("matches selected weekdays", () => {
    const friday = atNoon("2026-08-14")
    const saturday = atNoon("2026-08-15")
    expect(isScheduled({ type: "weekly", days: [5] }, friday)).toBe(true)
    expect(isScheduled({ type: "weekly", days: [5] }, saturday)).toBe(false)
  })

  it("matches monthly by date", () => {
    expect(isScheduled({ type: "monthly", date: 12 }, atNoon("2026-08-12"))).toBe(true)
    expect(isScheduled({ type: "monthly", date: 12 }, atNoon("2026-08-13"))).toBe(false)
  })

  it("matches first Saturday", () => {
    expect(isScheduled({ type: "monthly", nthWeekday: { week: 1, day: 6 } }, atNoon("2026-08-01"))).toBe(true)
    expect(isScheduled({ type: "monthly", nthWeekday: { week: 1, day: 6 } }, atNoon("2026-08-08"))).toBe(false)
  })

  it("matches third Monday", () => {
    expect(isScheduled({ type: "monthly", nthWeekday: { week: 3, day: 1 } }, atNoon("2026-08-17"))).toBe(true)
    expect(isScheduled({ type: "monthly", nthWeekday: { week: 3, day: 1 } }, atNoon("2026-08-10"))).toBe(false)
  })

  it("matches last Friday", () => {
    expect(isScheduled({ type: "monthly", nthWeekday: { week: 5, day: 5 } }, atNoon("2026-08-28"))).toBe(true)
    expect(isScheduled({ type: "monthly", nthWeekday: { week: 5, day: 5 } }, atNoon("2026-08-21"))).toBe(false)
  })
})

describe("calculateContinuity", () => {
  it("counts current continuity over consecutive scheduled days", () => {
    const pillar = simplePillar()
    const asOf = atNoon("2026-08-15")
    const observations = [obs("2026-08-13"), obs("2026-08-14"), obs("2026-08-15")]
    const stats = calculateContinuity(pillar, observations, { asOf })
    expect(stats.current).toBe(3)
  })

  it("does not kill current continuity when today is not yet observed", () => {
    const pillar = simplePillar()
    const asOf = atNoon("2026-08-15")
    const observations = [obs("2026-08-13"), obs("2026-08-14")]
    const stats = calculateContinuity(pillar, observations, { asOf })
    expect(stats.current).toBe(2)
  })

  it("breaks on a missed scheduled day", () => {
    const pillar = simplePillar()
    const asOf = atNoon("2026-08-15")
    const observations = [obs("2026-08-13"), obs("2026-08-15")]
    const stats = calculateContinuity(pillar, observations, { asOf })
    expect(stats.current).toBe(1)
  })

  it("ignores unscheduled days when walking continuity", () => {
    const pillar = simplePillar({ frequency: { type: "weekly", days: [1, 3, 5] } })
    const asOf = atNoon("2026-08-14")
    const observations = [obs("2026-08-10"), obs("2026-08-12"), obs("2026-08-14")]
    const stats = calculateContinuity(pillar, observations, { asOf })
    expect(stats.current).toBe(3)
  })

  it("treats quantity completion as observed when quantity >= target", () => {
    const pillar = simplePillar({
      mode: "quantity",
      quantityConfig: { unit: "pages", target: 30 },
    })
    const asOf = atNoon("2026-08-15")
    const observations = [
      obs("2026-08-14", { observed: false, quantity: 30 }),
      obs("2026-08-15", { observed: false, quantity: 10 }),
    ]
    const stats = calculateContinuity(pillar, observations, { asOf })
    expect(stats.current).toBe(1)
  })

  it("records longest run across history", () => {
    const pillar = simplePillar()
    const asOf = atNoon("2026-08-10")
    const observations = [obs("2026-08-01"), obs("2026-08-02"), obs("2026-08-03"), obs("2026-08-09")]
    const stats = calculateContinuity(pillar, observations, { asOf })
    expect(stats.longest).toBe(3)
    expect(stats.current).toBe(1)
  })
})

describe("calculateWeeklyObservance", () => {
  it("counts scheduled and observed days in the week window", () => {
    const pillar = simplePillar({ frequency: { type: "weekly", days: [1, 3, 5] } })
    const weekStart = startOfWeek(atNoon("2026-08-12"), 0)
    const weekEnd = addDays(weekStart, 6)
    const observations = [obs("2026-08-10"), obs("2026-08-12")]
    const result = calculateWeeklyObservance(pillar, observations, weekStart, weekEnd)
    expect(result.scheduled).toBe(3)
    expect(result.observed).toBe(2)
  })

  it("sums quantity across the week", () => {
    const pillar = simplePillar({
      mode: "quantity",
      quantityConfig: { unit: "pages", target: 30 },
    })
    const weekStart = atNoon("2026-08-09")
    const weekEnd = atNoon("2026-08-15")
    const observations = [
      obs("2026-08-10", { observed: false, quantity: 12 }),
      obs("2026-08-11", { observed: false, quantity: 20 }),
    ]
    const result = calculateWeeklyObservance(pillar, observations, weekStart, weekEnd)
    expect(result.quantity).toBe(32)
  })
})

function sampleStore(): RuleOfLifeStore {
  return {
    pillars: [simplePillar({ id: "pillar-prayer", title: "Prayer" })],
    observations: [obs("2026-08-15", { pillarId: "pillar-prayer" })],
    journal: [
      {
        id: "je-1",
        date: "2026-08-15",
        symbol: "note",
        content: "A quiet morning.",
        createdAt: "2026-08-15T12:00:00.000Z",
      },
    ],
    collections: [{ id: "col-1", name: "Letters", createdAt: "2026-08-01T12:00:00.000Z" }],
    reflections: [{ date: "2026-08-15", content: "Grateful." }],
    examen: [{ weekStart: "2026-08-09", content: "The week held still." }],
    settings: { ...DEFAULT_SETTINGS, theme: "night", weekStartsOn: 1 },
  }
}

describe("Rule of Life backup", () => {
  it("exports a versioned document independent of storage keys", () => {
    const backup = createBackup(sampleStore(), new Date("2026-08-16T13:24:00.000Z"))
    expect(backup.format).toBe("rule-of-life-backup")
    expect(backup.version).toBe(1)
    expect(backup.exportedAt).toBe("2026-08-16T13:24:00.000Z")
    expect(backup.data.examens).toHaveLength(1)
    expect(JSON.stringify(backup)).not.toContain("poa.rule-of-life")
  })

  it("names the file with the local calendar date", () => {
    expect(backupFilename(new Date(2026, 7, 16, 23, 45))).toBe("rule-of-life-backup-2026-08-16.json")
  })

  it("round-trips a valid backup into store shape", () => {
    const original = sampleStore()
    const result = parseBackup(createBackup(original))
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.store.pillars[0].title).toBe("Prayer")
    expect(result.store.examen[0].content).toBe("The week held still.")
    expect(result.store.settings.theme).toBe("night")
    expect(result.store.settings.weekStartsOn).toBe(1)
  })

  it("fills missing settings with defaults", () => {
    const backup = createBackup(sampleStore())
    const result = parseBackup({
      ...backup,
      data: { ...backup.data, settings: { theme: "light" } },
    })
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.store.settings.theme).toBe("light")
    expect(result.store.settings.defaultView).toBe("today")
    expect(result.store.settings.reduceMotion).toBe(false)
  })

  it("rejects unknown formats before any restore would occur", () => {
    expect(parseBackup({ format: "not-this", version: 1, data: {} }).ok).toBe(false)
    expect(parseBackupJson("not json").ok).toBe(false)
    expect(parseBackupJson('{"format":"rule-of-life-backup","version":1}').ok).toBe(false)
  })

  it("rejects unsupported future versions without interpreting the payload", () => {
    const backup = createBackup(sampleStore())
    const result = parseBackup({ ...backup, version: 2 })
    expect(result).toEqual({ ok: false, reason: "unsupported" })
  })

  it("rejects malformed collections", () => {
    const backup = createBackup(sampleStore())
    const result = parseBackup({
      ...backup,
      data: { ...backup.data, pillars: [{ title: "Broken" }] },
    })
    expect(result).toEqual({ ok: false, reason: "invalid" })
  })
})
