"use client"

import { useEffect } from "react"
import { useGamification } from "@/contexts/gamification-provider"

export function AchievementToast() {
  const { recentUnlock, dismissUnlock } = useGamification()

  useEffect(() => {
    if (!recentUnlock) return
    const timer = setTimeout(dismissUnlock, 3500)
    return () => clearTimeout(timer)
  }, [recentUnlock, dismissUnlock])

  if (!recentUnlock) return null

  return (
    <div
      className="fixed bottom-28 right-8 z-50 max-w-[11rem] animate-in slide-in-from-bottom-2 fade-in duration-200 pointer-events-none"
      role="status"
      aria-live="polite"
    >
      <button
        type="button"
        onClick={dismissUnlock}
        className="w-full text-left px-2.5 py-2 border border-border/60 dark:border-gray-800/80 bg-white/90 dark:bg-[#0F1015]/90 backdrop-blur-sm shadow-sm pointer-events-auto rounded-sm"
      >
        <p className="text-[9px] uppercase tracking-widest text-muted-foreground [font-family:var(--font-disket)] leading-none mb-1">
          Unlocked
        </p>
        <p className="text-[11px] leading-snug [font-family:var(--font-disket-bold)]">
          {recentUnlock.title}
        </p>
      </button>
    </div>
  )
}
