"use client"

import { useEffect, useRef, useState } from "react"
import { CommissionBrief } from "@/components/forge/CommissionBrief"
import { SUBJECTS } from "@/data/commissions/subjects"
import { STUDIES } from "@/data/commissions/studies"
import { useCubeFaceThemeForSlug } from "@/hooks/use-cube-face-theme"
import { generateCommission } from "@/lib/commissions/generator"
import { formatCommissionAsText } from "@/lib/commissions/format"
import { loadStoredCommission, saveStoredCommission } from "@/lib/commissions/storage"
import type { Difficulty, IllustrationCommission, Study, Subject } from "@/lib/commissions/types"

type Mode = "random" | "practice"
type SubjectChoice = "random" | Subject
type StudyChoice = "random" | Study
type DifficultyChoice = "random" | Difficulty

function ForgeButton({
  children,
  onClick,
  disabled,
  border,
  text,
  hover,
  type = "button",
}: {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  border: string
  text: string
  hover: string
  type?: "button" | "submit"
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center px-5 h-11 text-sm tracking-wide [font-family:var(--font-disket)] border transition-colors disabled:opacity-40 disabled:cursor-not-allowed [&:hover:not(:disabled)]:bg-[var(--forge-btn-text)] [&:hover:not(:disabled)]:text-[var(--forge-btn-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        borderColor: border,
        color: text,
        backgroundColor: "transparent",
        outlineColor: text,
        "--forge-btn-text": text,
        "--forge-btn-hover": hover,
      } as React.CSSProperties}
    >
      {children}
    </button>
  )
}

function FieldSelect({
  id,
  label,
  value,
  onChange,
  children,
  muted,
  border,
  text,
  bg,
  disabled,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  children: React.ReactNode
  muted: string
  border: string
  text: string
  bg: string
  disabled?: boolean
}) {
  return (
    <label className="flex flex-col gap-2 min-w-0" htmlFor={id}>
      <span
        className="text-[10px] uppercase tracking-[0.2em] [font-family:var(--font-disket)]"
        style={{ color: muted }}
      >
        {label}
      </span>
      <select
        id={id}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full border bg-transparent px-3 text-sm [font-family:var(--font-disket)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          borderColor: border,
          color: text,
          backgroundColor: bg,
          outlineColor: text,
        }}
      >
        {children}
      </select>
    </label>
  )
}

export function IllustrationCommissionGenerator() {
  const theme = useCubeFaceThemeForSlug("forge")
  const briefRef = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<Mode>("random")
  const [subject, setSubject] = useState<SubjectChoice>("random")
  const [study, setStudy] = useState<StudyChoice>("random")
  const [difficulty, setDifficulty] = useState<DifficultyChoice>("random")
  const [commission, setCommission] = useState<IllustrationCommission | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setCommission(loadStoredCommission())
  }, [])

  useEffect(() => {
    if (!copied) return
    const timeout = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(timeout)
  }, [copied])

  const accepted = commission?.status === "accepted"

  const persist = (next: IllustrationCommission | null) => {
    setCommission(next)
    saveStoredCommission(next)
  }

  const draw = () => {
    if (accepted) return
    const next = generateCommission(
      mode === "practice"
        ? {
            subject: subject === "random" ? undefined : subject,
            primaryStudy: study === "random" ? undefined : study,
            difficulty: difficulty === "random" ? undefined : difficulty,
          }
        : {}
    )
    persist(next)
    window.requestAnimationFrame(() => {
      briefRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  const accept = () => {
    if (!commission || accepted) return
    persist({
      ...commission,
      status: "accepted",
      acceptedAt: new Date().toISOString(),
    })
  }

  const release = () => {
    if (!commission || !accepted) return
    persist({
      ...commission,
      status: "generated",
      acceptedAt: undefined,
    })
  }

  const copy = async () => {
    if (!commission) return
    try {
      await navigator.clipboard.writeText(formatCommissionAsText(commission))
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p
          className="text-xs uppercase tracking-widest [font-family:var(--font-disket)]"
          style={{ color: theme.textMuted }}
        >
          Illustration Commissions
        </p>
        <p className="text-sm leading-relaxed [font-family:var(--font-disket)] opacity-85">
          A practice tool for fantasy illustration.
        </p>
      </header>

      <div className="space-y-6">
        <div
          role="tablist"
          aria-label="Commission mode"
          className="flex gap-6 border-b"
          style={{ borderColor: theme.border }}
        >
          {([
            ["random", "Random"],
            ["practice", "Practice"],
          ] as const).map(([id, label]) => {
            const selected = mode === id
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setMode(id)}
                className="pb-2 text-xs uppercase tracking-[0.18em] [font-family:var(--font-disket)] border-b-2 -mb-px transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  color: selected ? theme.text : theme.textMuted,
                  borderColor: selected ? theme.text : "transparent",
                  outlineColor: theme.text,
                }}
              >
                {label}
              </button>
            )
          })}
        </div>

        {mode === "random" ? (
          <ForgeButton
            onClick={draw}
            disabled={accepted}
            border={theme.border}
            text={theme.text}
            hover={theme.hover}
          >
            Draw a Commission
          </ForgeButton>
        ) : (
          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault()
              draw()
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FieldSelect
                id="commission-subject"
                label="Subject"
                value={subject}
                onChange={(value) => setSubject(value as SubjectChoice)}
                muted={theme.textMuted}
                border={theme.border}
                text={theme.text}
                bg={theme.bg}
                disabled={accepted}
              >
                <option value="random">Random</option>
                {SUBJECTS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </FieldSelect>

              <FieldSelect
                id="commission-study"
                label="Primary Study"
                value={study}
                onChange={(value) => setStudy(value as StudyChoice)}
                muted={theme.textMuted}
                border={theme.border}
                text={theme.text}
                bg={theme.bg}
                disabled={accepted}
              >
                <option value="random">Random</option>
                {STUDIES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </FieldSelect>

              <FieldSelect
                id="commission-difficulty"
                label="Difficulty"
                value={difficulty}
                onChange={(value) => setDifficulty(value as DifficultyChoice)}
                muted={theme.textMuted}
                border={theme.border}
                text={theme.text}
                bg={theme.bg}
                disabled={accepted}
              >
                <option value="random">Random</option>
                <option value="apprentice">Apprentice</option>
                <option value="journeyman">Journeyman</option>
                <option value="master">Master</option>
              </FieldSelect>
            </div>

            <ForgeButton
              type="submit"
              disabled={accepted}
              border={theme.border}
              text={theme.text}
              hover={theme.hover}
            >
              Generate Brief
            </ForgeButton>
          </form>
        )}

        {accepted && (
          <p
            className="text-xs [font-family:var(--font-disket)]"
            style={{ color: theme.textMuted }}
          >
            This commission is locked. Release it before drawing another.
          </p>
        )}
      </div>

      {commission && (
        <div ref={briefRef} className="space-y-4">
          <CommissionBrief commission={commission} theme={theme} />

          <div className="flex flex-wrap gap-2">
            {accepted ? (
              <ForgeButton
                onClick={release}
                border={theme.border}
                text={theme.text}
                hover={theme.hover}
              >
                Release Commission
              </ForgeButton>
            ) : (
              <>
                <ForgeButton
                  onClick={draw}
                  border={theme.border}
                  text={theme.text}
                  hover={theme.hover}
                >
                  Reroll
                </ForgeButton>
                <ForgeButton
                  onClick={accept}
                  border={theme.text}
                  text={theme.text}
                  hover={theme.hover}
                >
                  Accept Commission
                </ForgeButton>
              </>
            )}
            <ForgeButton
              onClick={copy}
              border={theme.border}
              text={theme.text}
              hover={theme.hover}
            >
              {copied ? "Copied" : "Copy Brief"}
            </ForgeButton>
          </div>
        </div>
      )}
    </div>
  )
}
