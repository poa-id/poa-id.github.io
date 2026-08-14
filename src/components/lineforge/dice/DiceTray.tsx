"use client"

import { Component, useEffect, useRef, useState, type ReactNode } from "react"
import dynamic from "next/dynamic"
import { ChevronDown, Dices, Plus, Save, Trash2 } from "lucide-react"
import { getAllCultures } from "@/lib/lineforge/data/cultureLibrary"
import { getAllObjects } from "@/lib/lineforge/data/objectLibrary"
import { getDiceRolls, saveDiceRolls } from "@/lib/lineforge/storage"
import type { DieResult, SavedRoll } from "@/lib/lineforge/types/library"
import type { DiceSceneHandle } from "@/components/lineforge/dice/DiceScene3D"
import { cn } from "@/lib/utils"

const DiceScene3D = dynamic(
  () => import("@/components/lineforge/dice/DiceScene3D").then((mod) => mod.DiceScene3D),
  { ssr: false, loading: () => <div className="w-full border border-border bg-[#111] h-[420px]" /> }
)

class DiceErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (this.state.failed) {
      return (
        <div className="w-full border border-border bg-[#111] h-[420px] flex items-center justify-center text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-4 text-center">
          Dice physics unavailable. Results still work below.
        </div>
      )
    }
    return this.props.children
  }
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

const OBJECTS = getAllObjects()
const CULTURES = getAllCultures()

function dieEyebrow(index: number): string {
  if (index === 0) return "Object 1"
  if (index === 1) return "Object 2"
  if (index === 2) return "Culture"
  return `Bonus ${index - 2}`
}

function assemblePrompt(results: DieResult[]): string {
  const objects = results.filter((item) => item && item.category !== "Culture")
  const culture = results.find((item) => item?.category === "Culture")
  if (objects.length < 2 || !culture) return ""
  const names = objects.map((item) => item.value)
  let objectPhrase = `a **${names[0]}** and a **${names[1]}**`
  if (names.length === 3) objectPhrase += `, and a **${names[2]}**`
  if (names.length > 3) {
    const middle = names.slice(2, -1).map((name) => `a **${name}**`)
    objectPhrase += `, ${middle.join(", ")}, and a **${names[names.length - 1]}**`
  }
  return `Draw ${objectPhrase}, inspired by **${culture.value}** (${culture.detail}) aesthetics.`
}

export function DiceTray({ onOpenLibraryEntry }: { onOpenLibraryEntry: (name: string) => void }) {
  const sceneRef = useRef<DiceSceneHandle>(null)
  const prePickRef = useRef<DieResult[]>([])
  const [stage, setStage] = useState(0)
  const [results, setResults] = useState<DieResult[]>([])
  const [labels, setLabels] = useState(["?", "?", "?"])
  const [savedRolls, setSavedRolls] = useState<SavedRoll[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [diceCount, setDiceCount] = useState(3)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setSavedRolls(getDiceRolls())
    setHydrated(true)
  }, [])

  const allLanded = results.filter(Boolean).length === diceCount && diceCount >= 3

  const startFullRoll = () => {
    const obj1 = randomFrom(OBJECTS)
    const obj2 = randomFrom(OBJECTS)
    const cult = randomFrom(CULTURES)
    prePickRef.current = [
      { category: obj1.category, value: obj1.name },
      { category: obj2.category, value: obj2.name },
      { category: "Culture", value: cult.name, detail: cult.period },
    ]
    setLabels(prePickRef.current.map((item) => item.value))
    setResults([])
    setDiceCount(3)
    setStage(1)
    window.setTimeout(() => sceneRef.current?.throwAll(), 100)
  }

  const handleAddDie = () => {
    if (!allLanded || diceCount >= 5) return
    const extra = randomFrom(OBJECTS)
    const next = { category: extra.category, value: extra.name }
    prePickRef.current = [...prePickRef.current, next]
    const newIndex = diceCount
    setLabels((prev) => [...prev, next.value])
    setDiceCount((count) => count + 1)
    window.setTimeout(() => sceneRef.current?.throwOne(newIndex), 200)
  }

  const handleDieSettle = (index: number) => {
    const picked = prePickRef.current[index]
    if (!picked) return
    setResults((prev) => {
      const next = [...prev]
      next[index] = picked
      return next
    })
  }

  const handleReset = () => {
    sceneRef.current?.reset()
    setStage(0)
    setResults([])
    setLabels(["?", "?", "?"])
    setDiceCount(3)
    prePickRef.current = []
  }

  const handleSave = () => {
    const dice = prePickRef.current.filter(Boolean)
    if (dice.length < 3) return
    const roll: SavedRoll = {
      id: Date.now().toString(36),
      date: new Date().toISOString(),
      dice,
    }
    const next = [roll, ...savedRolls].slice(0, 50)
    setSavedRolls(next)
    saveDiceRolls(next)
  }

  const handleDelete = (id: string) => {
    const next = savedRolls.filter((item) => item.id !== id)
    setSavedRolls(next)
    saveDiceRolls(next)
  }

  const prompt = assemblePrompt(results.filter(Boolean))

  return (
    <div className="max-w-lg mx-auto px-4 pb-24 pt-6 space-y-4">
      <header>
        <h1 className="text-lg font-mono font-bold tracking-tight">Dice Tray</h1>
        <p className="text-[10px] font-mono text-muted-foreground mt-1">Roll the dice. Draw what you get.</p>
      </header>

      <DiceErrorBoundary>
        {hydrated && (
          <DiceScene3D ref={sceneRef} diceCount={diceCount} labels={labels} onSettle={handleDieSettle} />
        )}
      </DiceErrorBoundary>

      <div className="flex flex-wrap gap-1.5">
        {stage === 0 && (
          <button
            type="button"
            onClick={startFullRoll}
            className="text-[10px] font-mono uppercase tracking-wider px-3 py-2 border border-primary text-primary hover:bg-primary/10 inline-flex items-center gap-1.5 min-h-11"
          >
            <Dices className="size-3.5" strokeWidth={1.5} />
            Throw Dice
          </button>
        )}
        {allLanded && (
          <>
            {diceCount < 5 && (
              <button
                type="button"
                onClick={handleAddDie}
                className="text-[10px] font-mono uppercase tracking-wider px-3 py-2 border border-border text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 min-h-11"
              >
                <Plus className="size-3.5" strokeWidth={1.5} />
                Add Die
              </button>
            )}
            <button
              type="button"
              onClick={handleSave}
              className="text-[10px] font-mono uppercase tracking-wider px-3 py-2 border border-border text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 min-h-11"
            >
              <Save className="size-3.5" strokeWidth={1.5} />
              Save
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="text-[10px] font-mono uppercase tracking-wider px-3 py-2 border border-border text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 min-h-11"
            >
              <Dices className="size-3.5" strokeWidth={1.5} />
              New Roll
            </button>
          </>
        )}
      </div>

      {results.filter(Boolean).length > 0 && (
        <div className="flex flex-wrap gap-3">
          {results.map((result, index) =>
            result ? (
              <div key={`${result.value}-${index}`} className="space-y-1">
                <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
                  {dieEyebrow(index)}
                </p>
                {result.category === "Culture" ? (
                  <p className="text-[10px] font-mono border border-border text-muted-foreground px-2 py-1">
                    {result.value} — {result.detail}
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={() => onOpenLibraryEntry(result.value)}
                    className="text-[10px] font-mono border border-primary/20 text-primary px-2 py-1 underline decoration-primary/30 underline-offset-2"
                  >
                    {result.value}
                  </button>
                )}
              </div>
            ) : null
          )}
        </div>
      )}

      {prompt && (
        <div className="border border-primary/20 bg-surface-elevated p-3">
          <p className="text-[9px] font-mono uppercase tracking-wider text-primary mb-1">Your Prompt</p>
          <p className="text-[11px] font-sans text-muted-foreground leading-relaxed">
            {prompt.split("**").map((chunk, index) =>
              index % 2 === 1 ? (
                <strong key={index} className="text-foreground font-medium">
                  {chunk}
                </strong>
              ) : (
                <span key={index}>{chunk}</span>
              )
            )}
          </p>
        </div>
      )}

      <div>
        <button
          type="button"
          onClick={() => setShowHistory((open) => !open)}
          className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1"
        >
          <ChevronDown className={cn("size-3.5 transition-transform duration-100", showHistory && "rotate-180")} />
          Saved rolls
        </button>
        {showHistory && (
          <div className="max-h-64 overflow-y-auto space-y-px mt-2">
            {savedRolls.map((roll) => (
              <div key={roll.id} className="border border-border bg-card px-3 py-2 flex items-start justify-between gap-2">
                <div>
                  <p className="text-[9px] font-mono text-muted-foreground">
                    {new Date(roll.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {roll.dice.map((die, index) => (
                      <span
                        key={`${die.value}-${index}`}
                        className={cn(
                          "text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 border",
                          die.category === "Culture"
                            ? "border-border text-muted-foreground"
                            : "border-primary/20 text-primary"
                        )}
                      >
                        {die.value}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(roll.id)}
                  className="p-1.5 text-muted-foreground hover:text-destructive"
                  aria-label="Delete saved roll"
                >
                  <Trash2 className="size-3.5" strokeWidth={1.5} />
                </button>
              </div>
            ))}
            {savedRolls.length === 0 && (
              <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">None saved.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
