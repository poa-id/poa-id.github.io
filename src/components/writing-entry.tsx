"use client"

import Link from "next/link"

export function WritingEntryEdge() {
  return (
    <Link
      href="/writing"
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 px-2 py-8 border-r border-border dark:border-gray-800 bg-background hover:bg-background transition-colors group"
      aria-label="Go to the Scriptorium"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      <span
        className="text-sm uppercase tracking-wide [font-family:var(--font-disket)] text-muted-foreground group-hover:text-foreground transition-colors"
        style={{ writingMode: "vertical-rl" }}
      >
        Scriptorium
      </span>
    </Link>
  )
}

export function WritingEntryInline() {
  return (
    <Link
      href="/writing"
      className="lg:hidden inline-flex items-center gap-2 mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors [font-family:var(--font-disket)]"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      Scriptorium
    </Link>
  )
}
