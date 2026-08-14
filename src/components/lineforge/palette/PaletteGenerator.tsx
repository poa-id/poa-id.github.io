"use client"

import { useState } from "react"
import { Copy, Lock, Shuffle, Unlock, X } from "lucide-react"
import {
  generatePalette,
  hslToCss,
  hslToHex,
  mergeLocked,
  PALETTE_MODES,
  randHSL,
  type PaletteMode,
  type Swatch,
} from "@/lib/lineforge/palette"
import { cn } from "@/lib/utils"

export function PaletteGenerator({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<PaletteMode>("random")
  const [grayCount, setGrayCount] = useState(5)
  const [swatches, setSwatches] = useState<Swatch[]>(() =>
    generatePalette("random", 5).map((color) => ({ color, locked: false }))
  )
  const [copied, setCopied] = useState<string | null>(null)

  const regenerate = (nextMode = mode, nextGray = grayCount) => {
    setSwatches((existing) => {
      const count = nextMode === "grayscale" ? nextGray : 5
      const base = existing.find((item) => item.locked)?.color ?? randHSL()
      const generated = generatePalette(nextMode, count, base)
      return mergeLocked(generated, existing)
    })
  }

  const copyHex = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex)
      setCopied(hex)
      window.setTimeout(() => setCopied(null), 800)
    } catch {
      setCopied(null)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] bg-background overflow-y-auto">
      <div className="max-w-lg mx-auto px-4 pb-24 pt-4">
        <header className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-mono uppercase tracking-wider">Palette</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 border border-border text-muted-foreground hover:text-foreground min-h-11 min-w-11"
            aria-label="Close palette"
          >
            <X className="size-4" strokeWidth={1.5} />
          </button>
        </header>

        <div className="flex flex-wrap gap-1 mb-3">
          {PALETTE_MODES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setMode(item.id)
                regenerate(item.id, grayCount)
              }}
              className={cn(
                "text-[10px] font-mono uppercase tracking-wider px-2 py-1 border",
                mode === item.id ? "border-primary text-primary" : "border-border text-muted-foreground"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {mode === "grayscale" && (
          <div className="flex gap-1 mb-3">
            {[1, 2, 3, 5].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => {
                  setGrayCount(count)
                  regenerate(mode, count)
                }}
                className={cn(
                  "text-[10px] font-mono px-2 py-1 border",
                  grayCount === count ? "border-primary text-primary" : "border-border text-muted-foreground"
                )}
              >
                {count}
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => regenerate()}
          className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1.5 border border-primary text-primary inline-flex items-center gap-1.5 mb-4 min-h-11"
        >
          <Shuffle className="size-3.5" strokeWidth={1.5} />
          Regenerate
        </button>

        <div className="grid grid-cols-1 gap-px">
          {swatches.map((swatch, index) => {
            const hex = hslToHex(swatch.color)
            return (
              <div key={index} className="flex items-stretch border border-border">
                <div className="w-16 shrink-0" style={{ background: hslToCss(swatch.color) }} />
                <div className="flex-1 flex items-center justify-between px-3 py-2 bg-card">
                  <span className="text-xs font-mono">{hex}</span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        setSwatches((prev) =>
                          prev.map((item, i) => (i === index ? { ...item, locked: !item.locked } : item))
                        )
                      }
                      className="p-1.5 border border-border text-muted-foreground hover:text-foreground"
                      aria-label={swatch.locked ? "Unlock swatch" : "Lock swatch"}
                    >
                      {swatch.locked ? (
                        <Lock className="size-3.5 text-primary" strokeWidth={1.5} />
                      ) : (
                        <Unlock className="size-3.5" strokeWidth={1.5} />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => copyHex(hex)}
                      className="p-1.5 border border-border text-muted-foreground hover:text-foreground"
                      aria-label={`Copy ${hex}`}
                    >
                      <Copy className="size-3.5" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
                {copied === hex && (
                  <span className="sr-only" aria-live="polite">
                    Copied
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
