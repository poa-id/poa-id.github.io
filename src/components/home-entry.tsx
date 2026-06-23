"use client"

import Link from "next/link"
import { useCubeFaceThemeForSlug } from "@/hooks/use-cube-face-theme"
import { HALL_LABEL } from "@/lib/cube-labels"

export function HallEntryEdge() {
  const theme = useCubeFaceThemeForSlug("scriptorium")

  return (
    <Link
      href="/"
      className="fixed right-0 top-1/2 z-[60] hidden lg:flex flex-col items-center gap-3 px-2 py-8 border-l transition-colors group isolate [transform:translateY(-50%)_translateZ(2px)]"
      style={{ backgroundColor: theme.bg, borderColor: theme.border }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = theme.hover }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = theme.bg }}
      aria-label={`Return to ${HALL_LABEL}`}
    >
      <span
        className="text-sm uppercase tracking-wide [font-family:var(--font-disket)] opacity-70 group-hover:opacity-100"
        style={{ writingMode: "vertical-rl", color: theme.text }}
      >
        {HALL_LABEL}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 opacity-70 group-hover:opacity-100"
        style={{ color: theme.text }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  )
}

export function HallEntryInline() {
  return (
    <Link href="/" className="lg:hidden inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors [font-family:var(--font-disket)]">
      {HALL_LABEL}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  )
}

export const HomeEntryEdge = HallEntryEdge
export const HomeEntryInline = HallEntryInline
