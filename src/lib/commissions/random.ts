export class SeededRng {
  private state: number

  constructor(seed: string) {
    this.state = hashString(seed) || 1
  }

  next(): number {
    this.state += 0x6d2b79f5
    let t = this.state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  float(): number {
    return this.next()
  }

  int(max: number): number {
    if (max <= 0) return 0
    return Math.floor(this.next() * max)
  }

  intRange(min: number, max: number): number {
    if (max <= min) return min
    return min + this.int(max - min + 1)
  }

  chance(probability: number): boolean {
    return this.next() < probability
  }

  pick<T>(items: readonly T[]): T {
    return items[this.int(items.length)] ?? items[0]
  }

  pickN<T>(items: readonly T[], count: number): T[] {
    const pool = this.shuffle([...items])
    return pool.slice(0, Math.max(0, Math.min(count, pool.length)))
  }

  shuffle<T>(items: T[]): T[] {
    const copy = [...items]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = this.int(i + 1)
      const tmp = copy[i]
      copy[i] = copy[j]
      copy[j] = tmp
    }
    return copy
  }

  weightedPick<T>(items: readonly T[], weightOf: (item: T) => number): T {
    if (items.length === 0) {
      throw new Error("weightedPick called with an empty list")
    }

    const weights = items.map((item) => Math.max(0, weightOf(item)))
    const total = weights.reduce((sum, weight) => sum + weight, 0)
    if (total <= 0) return this.pick(items)

    let cursor = this.next() * total
    for (let i = 0; i < items.length; i++) {
      cursor -= weights[i]
      if (cursor <= 0) return items[i]
    }
    return items[items.length - 1]
  }
}

export function hashString(value: string): number {
  let hash = 1779033703 ^ value.length
  for (let i = 0; i < value.length; i++) {
    hash = Math.imul(hash ^ value.charCodeAt(i), 3432918353)
    hash = (hash << 13) | (hash >>> 19)
  }
  return hash >>> 0
}

export function createSeed(): string {
  const bytes = new Uint8Array(8)
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes)
  } else {
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = Math.floor(Math.random() * 256)
    }
  }
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("")
}

export function idFromSeed(seed: string): string {
  const serial = String(hashString(seed) % 1000).padStart(3, "0")
  const mid = String(hashString(`${seed}:mid`) % 100).padStart(2, "0")
  const hex = hashString(`${seed}:hex`).toString(16).toUpperCase().padStart(4, "0").slice(0, 4)
  return `FORGE-${serial}-${mid}-${hex}`
}

export function serialFromId(id: string): string {
  const match = id.match(/^FORGE-(\d{3})-/)
  return match?.[1] ?? "000"
}
