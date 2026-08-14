"use client"

import { useEffect, useMemo, useState } from "react"
import { Plus } from "lucide-react"
import { addDaysIso, getLogs, getNotes, getStreak, saveNotes, todayIso } from "@/lib/lineforge/storage"
import type { DayLog, ProgressNote } from "@/lib/lineforge/types/lineforge"
import { cn } from "@/lib/utils"

type SubTab = "history" | "notes" | "review"

export function HistoryScreen() {
  const [logs, setLogs] = useState<DayLog[]>([])
  const [notes, setNotes] = useState<ProgressNote[]>([])
  const [streak, setStreak] = useState(0)
  const [tab, setTab] = useState<SubTab>("history")
  const [showForm, setShowForm] = useState(false)
  const [text, setText] = useState("")
  const [tagInput, setTagInput] = useState("")
  const [today, setToday] = useState<string | null>(null)

  useEffect(() => {
    setLogs([...getLogs()].sort((a, b) => b.date.localeCompare(a.date)))
    setNotes([...getNotes()].sort((a, b) => b.date.localeCompare(a.date)))
    setStreak(getStreak())
    setToday(todayIso())
  }, [])

  const totalMinutes = logs.reduce((sum, log) => {
    const minutes =
      typeof log.actualSeconds === "number" ? Math.round(log.actualSeconds / 60) : log.minutesPracticed
    return sum + minutes
  }, 0)

  const logByDate = useMemo(() => new Map(logs.map((log) => [log.date, log])), [logs])

  const monthKey = today?.slice(0, 7) ?? ""
  const monthLogs = logs.filter((log) => log.date.startsWith(monthKey))
  const monthMinutes = monthLogs.reduce((sum, log) => {
    const minutes =
      typeof log.actualSeconds === "number" ? Math.round(log.actualSeconds / 60) : log.minutesPracticed
    return sum + minutes
  }, 0)

  const saveNote = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    const tags = tagInput
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
    const next = [
      { id: Date.now().toString(), date: today ?? todayIso(), text: trimmed, tags },
      ...notes,
    ]
    setNotes(next)
    saveNotes(next)
    setText("")
    setTagInput("")
    setShowForm(false)
  }

  return (
    <div className="max-w-lg mx-auto px-4 pb-24 pt-6">
      <div className="flex items-end justify-between mb-4">
        <div>
          <p className="text-xl font-bold font-mono">{streak}</p>
          <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">day streak</p>
        </div>
        <p className="text-xs font-mono text-muted-foreground">{totalMinutes}m total</p>
      </div>

      <div className="flex gap-1.5 mb-4">
        {(
          [
            ["history", "History"],
            ["notes", "Notes"],
            ["review", "Monthly"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              "text-[10px] font-mono uppercase tracking-wider px-2.5 py-1.5 border min-h-11",
              tab === id ? "border-primary text-primary" : "border-border text-muted-foreground"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "history" && (
        <div className="space-y-4">
          <div className="grid grid-cols-7 gap-px">
            {today &&
              Array.from({ length: 14 }, (_, i) => {
                const date = addDaysIso(today, -(13 - i))
                const filled = logByDate.has(date)
                return (
                  <div
                    key={date}
                    title={date}
                    className={cn("aspect-square border border-border", filled ? "bg-primary/40" : "bg-card")}
                  />
                )
              })}
          </div>
          <div className="space-y-px">
            {logs.map((log) => (
              <div key={log.date} className="flex justify-between border border-border bg-card px-3 py-2">
                <span className="text-[10px] font-mono uppercase tracking-wider">{log.date}</span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {typeof log.actualSeconds === "number"
                    ? `${Math.round(log.actualSeconds / 60)}m`
                    : `${log.minutesPracticed}m`}{" "}
                  · {log.blocksCompleted} blk · {log.mode.replaceAll("_", " ")}
                </span>
              </div>
            ))}
            {logs.length === 0 && (
              <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">No logs yet.</p>
            )}
          </div>
        </div>
      )}

      {tab === "notes" && (
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setShowForm((open) => !open)}
            className="p-2 border border-border text-muted-foreground hover:text-foreground hover:border-primary"
            aria-label="Add note"
          >
            <Plus className="size-4" strokeWidth={1.5} />
          </button>
          {showForm && (
            <form
              className="card-surface p-3 space-y-2"
              onSubmit={(event) => {
                event.preventDefault()
                saveNote()
              }}
            >
              <label className="sr-only" htmlFor="lf-note-text">
                Note
              </label>
              <textarea
                id="lf-note-text"
                value={text}
                onChange={(event) => setText(event.target.value)}
                className="w-full bg-background border border-border p-2 text-xs font-sans min-h-24 focus:border-primary outline-none"
              />
              <label className="sr-only" htmlFor="lf-note-tags">
                Tags
              </label>
              <input
                id="lf-note-tags"
                value={tagInput}
                onChange={(event) => setTagInput(event.target.value)}
                placeholder="tags, comma, separated"
                className="w-full bg-background border border-border px-2 py-1.5 text-[10px] font-mono focus:border-primary outline-none"
              />
              <button
                type="submit"
                className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1.5 border border-primary text-primary"
              >
                Save
              </button>
            </form>
          )}
          <div className="space-y-px">
            {notes.map((note) => (
              <article key={note.id} className="border border-border bg-card px-3 py-3 space-y-1">
                <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">{note.date}</p>
                <p className="text-xs font-sans text-foreground leading-relaxed">{note.text}</p>
                {note.tags.length > 0 && (
                  <p className="text-[9px] font-mono uppercase tracking-wider text-primary">
                    {note.tags.join(" · ")}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      )}

      {tab === "review" && (
        <div className="card-surface p-4 space-y-2">
          <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{monthKey}</p>
          <p className="text-sm font-mono">
            {monthMinutes}m across {monthLogs.length} day{monthLogs.length === 1 ? "" : "s"}
          </p>
        </div>
      )}
    </div>
  )
}
