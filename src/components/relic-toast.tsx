"use client"

import { useEffect } from "react"
import { useRelics } from "@/contexts/relics-provider"

export function RelicToast() {
  const { recentDiscovery, dismissDiscovery } = useRelics()

  useEffect(() => {
    if (!recentDiscovery) return
    const timer = setTimeout(dismissDiscovery, 4500)
    return () => clearTimeout(timer)
  }, [recentDiscovery, dismissDiscovery])

  if (!recentDiscovery) return null

  return (
    <div
      className="fixed bottom-28 left-8 z-50 max-w-[14rem] animate-in slide-in-from-bottom-2 fade-in duration-300 pointer-events-none"
      role="status"
      aria-live="polite"
    >
      <button
        type="button"
        onClick={dismissDiscovery}
        className="w-full text-left px-3 py-2.5 border border-[#3d3830]/80 bg-[#0e0c0a]/95 backdrop-blur-sm shadow-sm pointer-events-auto"
      >
        <p className="text-[9px] uppercase tracking-widest text-[#6a6258] [font-family:var(--font-disket)] leading-none mb-2">
          Narrator
        </p>
        <p className="text-[11px] leading-relaxed text-[#c4a882]/90 [font-family:var(--font-disket)] whitespace-pre-line">
          {recentDiscovery.narratorText}
        </p>
      </button>
    </div>
  )
}
