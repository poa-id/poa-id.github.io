import type { Frequency } from "@/lib/rule-of-life/types"

const SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const FULL_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const NTH_LABELS = ["First", "Second", "Third", "Fourth", "Last"]

export function isScheduled(frequency: Frequency, d: Date): boolean {
  if (frequency.type === "daily") return true

  if (frequency.type === "weekly") {
    return !!frequency.days?.includes(d.getDay())
  }

  if (frequency.nthWeekday) {
    const { week, day } = frequency.nthWeekday
    if (d.getDay() !== day) return false
    const occurrence = Math.ceil(d.getDate() / 7)
    if (week === 5) {
      const probe = new Date(d)
      probe.setDate(d.getDate() + 7)
      return probe.getMonth() !== d.getMonth()
    }
    return occurrence === week
  }

  return d.getDate() === frequency.date
}

export function formatFrequency(frequency: Frequency): string {
  if (frequency.type === "daily") return "Daily"

  if (frequency.type === "weekly") {
    const days = [...(frequency.days ?? [])].sort((a, b) => a - b)
    if (days.length === 0) return "Weekly"
    return days.map((day) => SHORT_DAYS[day]).join("/")
  }

  if (frequency.nthWeekday) {
    const { week, day } = frequency.nthWeekday
    const nth = NTH_LABELS[week - 1] ?? "Last"
    return `${nth} ${FULL_DAYS[day]}`
  }

  if (frequency.date) return `Day ${frequency.date} of month`
  return "Monthly"
}

export function formatSchedule(frequency: Frequency): string {
  if (frequency.type === "daily") return "Daily"

  if (frequency.type === "weekly") {
    const days = [...(frequency.days ?? [])].sort((a, b) => a - b)
    if (days.length === 0) return "Weekly"
    if (days.length === 1) return `Every ${FULL_DAYS[days[0]]}`
    return days.map((day) => FULL_DAYS[day]).join(", ")
  }

  if (frequency.nthWeekday) {
    const { week, day } = frequency.nthWeekday
    const nth = NTH_LABELS[week - 1] ?? "Last"
    return `${nth} ${FULL_DAYS[day]} of the month`
  }

  if (frequency.date) return `Day ${frequency.date} of each month`
  return "Monthly"
}
