import { addDays, dateKey, eachDay, parseDateKey } from "@/lib/rule-of-life/dates"
import { isScheduled } from "@/lib/rule-of-life/scheduling"
import type { ContinuityStats, Observation, Pillar } from "@/lib/rule-of-life/types"

export function isObservationComplete(
  pillar: Pillar,
  observation: Observation | undefined
): boolean {
  if (!observation) return false
  if (pillar.mode === "quantity") {
    return (observation.quantity ?? 0) >= (pillar.quantityConfig?.target ?? 0)
  }
  return observation.observed
}

export function findObservation(
  observations: Observation[],
  pillarId: string,
  date: string
): Observation | undefined {
  return observations.find((item) => item.pillarId === pillarId && item.date === date)
}

export function calculateContinuity(
  pillar: Pillar,
  observations: Observation[],
  options: { days?: number; asOf?: Date } = {}
): ContinuityStats {
  const days = options.days ?? 30
  const asOf = options.asOf ?? new Date()
  const asOfKey = dateKey(asOf)
  const created = parseDateKey(dateKey(new Date(pillar.createdAt)))

  const done = (d: Date) =>
    isObservationComplete(pillar, findObservation(observations, pillar.id, dateKey(d)))

  const windowStart = addDays(asOf, -(days - 1))
  const history: boolean[] = []
  for (const day of eachDay(windowStart, asOf)) {
    if (dateKey(day) < dateKey(created)) continue
    if (!isScheduled(pillar.frequency, day)) continue
    history.push(done(day))
  }

  let current = 0
  const walk = new Date(asOf)
  const earliest = created
  while (dateKey(walk) >= dateKey(earliest)) {
    if (isScheduled(pillar.frequency, walk)) {
      const complete = done(walk)
      const isToday = dateKey(walk) === asOfKey
      if (isToday && !complete) {
        // Do not break continuity at the start of a scheduled day.
      } else if (complete) {
        current += 1
      } else {
        break
      }
    }
    walk.setDate(walk.getDate() - 1)
  }

  let longest = 0
  let run = 0
  const scanEnd = asOf
  const scanStart = created
  for (const day of eachDay(scanStart, scanEnd)) {
    if (!isScheduled(pillar.frequency, day)) continue
    const complete = done(day)
    const isToday = dateKey(day) === asOfKey
    if (isToday && !complete) continue
    if (complete) {
      run += 1
      longest = Math.max(longest, run)
    } else {
      run = 0
    }
  }

  longest = Math.max(longest, current)
  return { current, longest, history }
}

export function calculateWeeklyObservance(
  pillar: Pillar,
  observations: Observation[],
  weekStart: Date,
  weekEnd: Date
): { scheduled: number; observed: number; quantity: number } {
  let scheduled = 0
  let observed = 0
  let quantity = 0

  for (const day of eachDay(weekStart, weekEnd)) {
    if (!isScheduled(pillar.frequency, day)) continue
    scheduled += 1
    const record = findObservation(observations, pillar.id, dateKey(day))
    if (isObservationComplete(pillar, record)) observed += 1
    quantity += record?.quantity ?? 0
  }

  return { scheduled, observed, quantity }
}

export function sortFocusFirst<T extends { isFocus: boolean }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    if (a.isFocus && !b.isFocus) return -1
    if (!a.isFocus && b.isFocus) return 1
    return 0
  })
}
