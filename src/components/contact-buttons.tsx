"use client"

import * as React from "react"
import { Mail } from "lucide-react"
import Link from "next/link"

export function ContactButtons() {
  return (
    <div className="fixed bottom-8 right-8 z-40 hidden lg:block">
      <Link
        href="/correspondence"
        className="flex items-center gap-2 px-4 py-3 bg-white/95 hover:bg-white dark:bg-[#0F1015]/95 dark:hover:bg-[#0F1015] border border-border dark:border-gray-800 shadow-sm transition-colors group"
        aria-label="Open correspondence"
      >
        <Mail className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        <span className="text-xs uppercase tracking-wide [font-family:var(--font-disket)] text-muted-foreground group-hover:text-foreground transition-colors hidden sm:inline">
          Correspondence
        </span>
      </Link>
    </div>
  )
}
