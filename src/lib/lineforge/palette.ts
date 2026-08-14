export interface HSL {
  h: number
  s: number
  l: number
}

export interface Swatch {
  color: HSL
  locked: boolean
}

export type PaletteMode =
  | "random"
  | "monochrome"
  | "grayscale"
  | "complementary"
  | "analogous"
  | "triadic"
  | "split-complementary"
  | "warm"
  | "cool"

export const PALETTE_MODES: { id: PaletteMode; label: string }[] = [
  { id: "random", label: "Rand" },
  { id: "monochrome", label: "Mono" },
  { id: "grayscale", label: "Gray" },
  { id: "complementary", label: "Comp" },
  { id: "analogous", label: "Analog" },
  { id: "triadic", label: "Triad" },
  { id: "split-complementary", label: "Split" },
  { id: "warm", label: "Warm" },
  { id: "cool", label: "Cool" },
]

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randHSL(): HSL {
  return { h: randInt(0, 360), s: randInt(40, 95), l: randInt(30, 70) }
}

export function wrapHue(h: number): number {
  return ((h % 360) + 360) % 360
}

export function hslToCss(color: HSL): string {
  return `hsl(${Math.round(color.h)} ${Math.round(color.s)}% ${Math.round(color.l)}%)`
}

export function hslToHex(color: HSL): string {
  const h = color.h
  const s = color.s / 100
  const l = color.l / 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const value = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * value)
      .toString(16)
      .padStart(2, "0")
  }
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase()
}

function withHue(base: HSL, h: number, s?: number, l?: number): HSL {
  return {
    h: wrapHue(h),
    s: clamp(s ?? base.s, 0, 100),
    l: clamp(l ?? base.l, 0, 100),
  }
}

export function generatePalette(mode: PaletteMode, count: number, base?: HSL): HSL[] {
  const b = base ?? randHSL()
  const n = Math.max(1, count)

  switch (mode) {
    case "random":
      return Array.from({ length: 5 }, () => randHSL())
    case "monochrome": {
      const mid = Math.floor(n / 2)
      return Array.from({ length: n }, (_, i) => ({
        h: b.h,
        s: clamp(b.s + (i - mid) * 12, 15, 100),
        l: clamp(20 + (60 / (n + 1)) * (i + 1), 10, 90),
      }))
    }
    case "grayscale":
      if (n === 1) return [{ h: 0, s: 0, l: 50 }]
      return Array.from({ length: n }, (_, i) => ({
        h: 0,
        s: 0,
        l: (i / (n - 1)) * 90 + 5,
      }))
    case "complementary":
      return [
        withHue(b, b.h, b.s, b.l - 15),
        b,
        withHue(b, b.h, b.s - 25, b.l + 15),
        withHue(b, b.h + 180),
        withHue(b, b.h + 180, b.s - 25, b.l + 15),
      ]
    case "analogous":
      return [-30, -15, 0, 15, 30].map((offset, i) =>
        withHue(b, b.h + offset, b.s + (i % 2 === 0 ? -10 : 5), b.l + (i - 2) * 8)
      )
    case "triadic":
      return [
        b,
        withHue(b, b.h, b.s - 20, b.l + 15),
        withHue(b, b.h + 120),
        withHue(b, b.h + 240),
        withHue(b, b.h + 240, b.s - 15, b.l - 12),
      ]
    case "split-complementary":
      return [
        withHue(b, b.h, b.s, b.l - 12),
        b,
        withHue(b, b.h, b.s - 20, b.l + 15),
        withHue(b, b.h + 150),
        withHue(b, b.h + 210, undefined, b.l + 10),
      ]
    case "warm":
      return Array.from({ length: 5 }, () => ({
        h: randInt(0, 60),
        s: randInt(50, 100),
        l: randInt(30, 70),
      }))
    case "cool":
      return Array.from({ length: 5 }, () => ({
        h: randInt(180, 270),
        s: randInt(40, 90),
        l: randInt(30, 70),
      }))
  }
}

export function mergeLocked(generated: HSL[], existing: Swatch[]): Swatch[] {
  const length = Math.max(generated.length, existing.length)
  return Array.from({ length }, (_, i) => {
    if (existing[i]?.locked) return existing[i]
    return { color: generated[i] ?? randHSL(), locked: false }
  })
}
