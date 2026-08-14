"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Clock, Replace, Shuffle } from "lucide-react"
import { TimerDisplay } from "@/components/lineforge/today/TimerDisplay"
import { RoutineCard } from "@/components/lineforge/today/RoutineCard"
import { RatingDialog } from "@/components/lineforge/today/RatingDialog"
import { generateSession } from "@/lib/lineforge/session"
import {
  getSession,
  getSettings,
  getStreak,
  isWeekend,
  logDay,
  rateCard,
  saveSession,
  saveSettings,
  todayIso,
} from "@/lib/lineforge/storage"
import type {
  DailySession,
  DeckName,
  Rating,
  SessionMode,
} from "@/lib/lineforge/types/lineforge"
import {
  FOCUS_DECKS,
  MASTER_STUDY_TAGS,
  TIME_OPTIONS,
} from "@/lib/lineforge/types/lineforge"
import { cn } from "@/lib/utils"

function formatDeck(deck: DeckName | null): string {
  if (!deck) return "personal"
  return deck.replaceAll("_", " ")
}

export function TodayScreen({
  onOpenLab,
  onOpenLibraryEntry,
}: {
  onOpenLab: () => void
  onOpenLibraryEntry: (name: string) => void
}) {
  const [hydrated, setHydrated] = useState(false)
  const [session, setSession] = useState<DailySession | null>(null)
  const [activeBlockIndex, setActiveBlockIndex] = useState(0)
  const [showRating, setShowRating] = useState(false)
  const [totalMinutes, setTotalMinutes] = useState(60)
  const [mode, setMode] = useState<SessionMode>("daily")
  const [remixCount, setRemixCount] = useState(0)
  const [customTime, setCustomTime] = useState(75)
  const [showCustom, setShowCustom] = useState(false)
  const [masterTags, setMasterTags] = useState<string[]>([])
  const [showMasterTags, setShowMasterTags] = useState(false)
  const [focusDeck, setFocusDeck] = useState<DeckName | null>(null)
  const [showFocusPicker, setShowFocusPicker] = useState(false)
  const [autoAdvance, setAutoAdvance] = useState(false)
  const [streak, setStreak] = useState(0)
  const [today, setToday] = useState("")

  useEffect(() => {
    const settings = getSettings()
    setAutoAdvance(settings.autoAdvance)
    setStreak(getStreak())
    setToday(todayIso())
    setHydrated(true)
  }, [])

  const initSession = useCallback(() => {
    if (!today) return
    const stored = getSession()
    if (
      stored &&
      stored.date === today &&
      stored.mode === mode &&
      stored.totalMinutes === totalMinutes &&
      remixCount === 0
    ) {
      setSession(stored)
      return
    }
    const next = generateSession(today, mode, totalMinutes, remixCount, masterTags, undefined, focusDeck)
    saveSession(next)
    setSession(next)
    setActiveBlockIndex(0)
  }, [today, mode, totalMinutes, remixCount, masterTags, focusDeck])

  useEffect(() => {
    if (!hydrated) return
    initSession()
  }, [hydrated, initSession])

  useEffect(() => {
    if (!hydrated || remixCount === 0) return
    const next = generateSession(today, mode, totalMinutes, remixCount, masterTags, undefined, focusDeck)
    saveSession(next)
    setSession(next)
    setActiveBlockIndex(0)
  }, [remixCount, hydrated, today, mode, totalMinutes, masterTags, focusDeck])

  const dateLabel = useMemo(() => {
    if (!today) return ""
    const [y, m, d] = today.split("-").map(Number)
    return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    })
  }, [today])

  const activeBlock =
    session && activeBlockIndex >= 0 ? session.blocks[activeBlockIndex] : undefined

  const persist = (next: DailySession) => {
    setSession(next)
    saveSession(next)
  }

  const handleRate = (rating: Rating) => {
    if (!session || !activeBlock) return
    const blocks = session.blocks.map((block, index) =>
      index === activeBlockIndex
        ? { ...block, rating, completed: true }
        : block
    )
    blocks[activeBlockIndex]?.cards.forEach((card) => rateCard(card.id, rating))
    const next: DailySession = { ...session, blocks }
    const completed = blocks.filter((block) => block.completed)
    const actualSeconds = completed.reduce(
      (sum, block) => sum + (block.elapsedSeconds ?? block.durationMinutes * 60),
      0
    )
    logDay({
      date: session.date,
      minutesPracticed: Math.round(actualSeconds / 60),
      actualSeconds,
      blocksCompleted: completed.length,
      mode: session.mode,
    })
    setStreak(getStreak())
    setShowRating(false)
    if (activeBlockIndex >= session.blocks.length - 1) {
      persist({ ...next, completed: true })
    } else {
      persist(next)
      setActiveBlockIndex((index) => index + 1)
    }
  }

  const applyDuration = (minutes: number) => {
    setTotalMinutes(minutes)
    setRemixCount(0)
    setShowCustom(false)
  }

  const bumpRemix = () => setRemixCount((count) => count + 1)

  const toggleDeepFocus = () => {
    const settings = getSettings()
    saveSettings({ ...settings, longSessionBias: !settings.longSessionBias })
    bumpRemix()
  }

  const toggleRatio = () => {
    const settings = getSettings()
    saveSettings({
      ...settings,
      easyHardRatio: settings.easyHardRatio === "50/50" ? "30/70" : "50/50",
    })
    bumpRemix()
  }

  const toggleAutoAdvance = () => {
    const settings = getSettings()
    const next = !autoAdvance
    setAutoAdvance(next)
    saveSettings({ ...settings, autoAdvance: next })
  }

  if (!hydrated) {
    return <div className="px-4 py-8 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Loading…</div>
  }

  const settings = getSettings()
  const weekendWarn = isWeekend() && totalMinutes > 120

  return (
    <div className="max-w-lg mx-auto px-4 pb-24">
      <header className="pt-6 pb-4">
        <h1 className="text-lg font-mono font-bold tracking-tight">LINEFORGE</h1>
        <p className="text-[10px] font-mono text-muted-foreground mt-1">
          {dateLabel}
          {streak > 0 && <span className="text-primary"> — {streak}d streak</span>}
        </p>
      </header>

      <section className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          <Clock className="size-3.5" strokeWidth={1.5} />
          Duration
        </div>
        <div className="flex flex-wrap gap-1.5">
          {TIME_OPTIONS.map((minutes) => (
            <button
              key={minutes}
              type="button"
              onClick={() => applyDuration(minutes)}
              className={cn(
                "text-[10px] font-mono uppercase tracking-wider px-2.5 py-1.5 border min-h-11",
                totalMinutes === minutes && !showCustom
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {minutes}m
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowCustom(true)}
            className={cn(
              "text-[10px] font-mono uppercase tracking-wider px-2.5 py-1.5 border min-h-11",
              showCustom ? "border-primary text-primary" : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            Custom
          </button>
        </div>
        {showCustom && (
          <div className="flex items-center gap-2">
            <label className="sr-only" htmlFor="lf-custom-time">
              Custom minutes
            </label>
            <input
              id="lf-custom-time"
              type="number"
              min={15}
              max={300}
              value={customTime}
              onChange={(event) => setCustomTime(Number(event.target.value))}
              className="w-20 bg-card border border-border px-2 py-1.5 text-xs font-mono focus:border-primary outline-none"
            />
            <button
              type="button"
              onClick={() => {
                if (customTime >= 15 && customTime <= 300) applyDuration(customTime)
              }}
              className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1.5 border border-border hover:border-primary"
            >
              Set
            </button>
          </div>
        )}
      </section>

      {weekendWarn && (
        <p className="border border-primary/20 text-primary text-xs font-mono px-3 py-2 mb-4">
          Frequency beats duration. Avoid marathon sessions.
        </p>
      )}

      <div className="flex flex-wrap gap-1.5 mb-4">
        {(
          [
            ["daily", "Daily"],
            ["master_study", "Master Study"],
            ["weekly_piece", "Weekly Piece"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setMode(id)
              setRemixCount(0)
              if (id === "master_study") setShowMasterTags(true)
            }}
            className={cn(
              "text-[10px] font-mono uppercase tracking-wider px-2.5 py-1.5 border min-h-11",
              mode === id ? "border-primary text-primary" : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === "master_study" && showMasterTags && (
        <div className="card-surface p-3 mb-4 space-y-2">
          <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
            Focus tags (2–3):
          </p>
          <div className="flex flex-wrap gap-1">
            {MASTER_STUDY_TAGS.map((tag) => {
              const selected = masterTags.includes(tag)
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setMasterTags((prev) => {
                      if (prev.includes(tag)) return prev.filter((item) => item !== tag)
                      if (prev.length >= 3) return prev
                      return [...prev, tag]
                    })
                    setRemixCount((count) => count + 1)
                  }}
                  className={cn(
                    "text-[10px] font-mono uppercase tracking-wider px-2 py-1 border",
                    selected ? "border-primary text-primary" : "border-border text-muted-foreground"
                  )}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {mode === "daily" && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          <button
            type="button"
            onClick={toggleDeepFocus}
            className={cn(
              "text-[10px] font-mono uppercase tracking-wider px-2.5 py-1.5 border min-h-11",
              settings.longSessionBias ? "border-primary/30 text-primary" : "border-border text-muted-foreground"
            )}
          >
            Deep focus {settings.longSessionBias ? "ON" : "OFF"}
          </button>
          <button
            type="button"
            onClick={toggleRatio}
            className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1.5 border border-border text-muted-foreground hover:text-foreground min-h-11"
          >
            Easy/Hard: {settings.easyHardRatio}
          </button>
          <button
            type="button"
            onClick={() => setShowFocusPicker((open) => !open)}
            className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1.5 border border-border text-muted-foreground hover:text-foreground min-h-11 inline-flex items-center gap-1"
          >
            <Replace className="size-3" strokeWidth={1.5} />
            Focus: {formatDeck(focusDeck)}
          </button>
        </div>
      )}

      {mode === "daily" && showFocusPicker && (
        <div className="flex flex-wrap gap-1 mb-3">
          {FOCUS_DECKS.map((deck) => (
            <button
              key={deck ?? "personal"}
              type="button"
              onClick={() => {
                setFocusDeck(deck)
                bumpRemix()
              }}
              className={cn(
                "text-[10px] font-mono uppercase tracking-wider px-2 py-1 border",
                focusDeck === deck ? "border-primary text-primary" : "border-border text-muted-foreground"
              )}
            >
              {formatDeck(deck)}
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={bumpRemix}
        className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1.5 border border-border text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 mb-2 min-h-11"
      >
        <Shuffle className="size-3" strokeWidth={1.5} />
        Remix
      </button>

      {activeBlock && (
        <TimerDisplay
          key={`${session?.seed}-${activeBlock.id}-${activeBlock.durationMinutes}`}
          totalSeconds={activeBlock.durationMinutes * 60}
          label={activeBlock.label}
          onComplete={() => setShowRating(true)}
          onNext={() => {
            if (!session) return
            if (activeBlockIndex < session.blocks.length - 1) {
              if (autoAdvance) setActiveBlockIndex((index) => index + 1)
              else setShowRating(true)
            } else {
              setShowRating(true)
            }
          }}
          onBack={() => setActiveBlockIndex((index) => Math.max(0, index - 1))}
          autoAdvance={autoAdvance}
          onToggleAutoAdvance={toggleAutoAdvance}
          onStop={(elapsed) => {
            if (!session || !activeBlock) return
            const blocks = session.blocks.map((block, index) =>
              index === activeBlockIndex ? { ...block, elapsedSeconds: elapsed } : block
            )
            persist({ ...session, blocks })
            setShowRating(true)
          }}
        />
      )}

      {session && (
        <div className="space-y-px">
          {session.blocks.map((block, index) => (
            <RoutineCard
              key={block.id}
              block={block}
              isActive={index === activeBlockIndex}
              isCompleted={block.completed}
              expanded={index === activeBlockIndex}
              onClick={() => setActiveBlockIndex((current) => (current === index ? -1 : index))}
              onOpen3D={onOpenLab}
              weeklyBrief={block.type === "weekly_piece" ? session.weeklyBrief : undefined}
              onRerollBrief={block.type === "weekly_piece" ? bumpRemix : undefined}
              onOpenLibraryEntry={onOpenLibraryEntry}
            />
          ))}
        </div>
      )}

      {session?.completed && (
        <p className="border border-primary/20 text-sm font-mono text-primary px-3 py-3 mt-4">
          Session complete.
        </p>
      )}

      {showRating && activeBlock && <RatingDialog block={activeBlock} onRate={handleRate} />}
    </div>
  )
}
