/** Local calendar date as YYYY-MM-DD. Never use toISOString() for this. */
export function dateKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

/** Parse a stored YYYY-MM-DD at noon local time to avoid timezone off-by-one. */
export function parseDateKey(key: string): Date {
  return new Date(`${key}T12:00:00`)
}

export function addDays(d: Date, n: number): Date {
  const next = new Date(d)
  next.setDate(next.getDate() + n)
  return next
}

export function addDaysToKey(key: string, n: number): string {
  return dateKey(addDays(parseDateKey(key), n))
}

export function startOfWeek(d: Date, weekStartsOn = 0): Date {
  const date = parseDateKey(dateKey(d))
  const diff = (date.getDay() - weekStartsOn + 7) % 7
  return addDays(date, -diff)
}

export function endOfWeek(d: Date, weekStartsOn = 0): Date {
  return addDays(startOfWeek(d, weekStartsOn), 6)
}

export function isSameDay(a: Date, b: Date): boolean {
  return dateKey(a) === dateKey(b)
}

export function formatLongDate(key: string): string {
  return parseDateKey(key).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })
}

export function formatLongDateWithYear(key: string): string {
  return parseDateKey(key).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function formatShortMonthDay(key: string): string {
  return parseDateKey(key).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

export function formatRelativeDateHeader(key: string, today = dateKey()): string {
  if (key === today) return "Today"
  if (key === addDaysToKey(today, -1)) return "Yesterday"
  return formatLongDate(key)
}

export function eachDay(start: Date, end: Date): Date[] {
  const days: Date[] = []
  const cursor = parseDateKey(dateKey(start))
  const last = parseDateKey(dateKey(end))
  while (cursor <= last) {
    days.push(new Date(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }
  return days
}
