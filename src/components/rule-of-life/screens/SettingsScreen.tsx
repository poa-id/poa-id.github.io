"use client"

import { useRef, useState, type ReactNode } from "react"
import { BookOpen, Calendar, Columns, Download, FileText, Moon, RotateCcw, Sun, Type, Upload } from "lucide-react"
import { BackLink, DividerFlourish, PageShell } from "@/components/rule-of-life/components/Chrome"
import { Switch } from "@/components/rule-of-life/ui/controls"
import { downloadBackup, parseBackupJson } from "@/lib/rule-of-life/backup"
import {
  SYMBOLS,
  type EntrySymbol,
  type MainScreen,
  type RuleOfLifeSettings,
  type RuleOfLifeStore,
  type TextSize,
  type ThemePreference,
} from "@/lib/rule-of-life/types"

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

function SettingSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-8">
      <p className="text-xs uppercase tracking-wider text-rol-muted-foreground/80 mb-2">{title}</p>
      <div className="space-y-1">{children}</div>
    </section>
  )
}

function SettingRow({
  icon,
  label,
  description,
  action,
  onClick,
}: {
  icon: ReactNode
  label: string
  description?: string
  action?: ReactNode
  onClick?: () => void
}) {
  const content = (
    <>
      <span className="text-rol-muted-foreground">{icon}</span>
      <span className="flex-1 text-left">
        <span className="block text-sm">{label}</span>
        {description ? <span className="block text-xs text-rol-muted-foreground mt-0.5">{description}</span> : null}
      </span>
      {action}
    </>
  )

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="w-full flex items-center gap-3 px-3 py-3 rounded-sm hover:bg-rol-muted/40 transition-colors duration-200"
      >
        {content}
      </button>
    )
  }

  return <div className="flex items-center gap-3 px-3 py-3 rounded-sm">{content}</div>
}

function CycleButton({
  value,
  onClick,
}: {
  value: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-xs text-rol-muted-foreground hover:text-rol-foreground transition-colors duration-200"
    >
      {value}
    </button>
  )
}

export function SettingsScreen({
  settings,
  store,
  onChange,
  onBack,
  onManageCollections,
  onRestore,
  onResetObservances,
}: {
  settings: RuleOfLifeSettings
  store: RuleOfLifeStore
  onChange: (patch: Partial<RuleOfLifeSettings>) => void
  onBack: () => void
  onManageCollections: () => void
  onRestore: (next: RuleOfLifeStore) => void
  onResetObservances: () => void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [backupError, setBackupError] = useState<string | null>(null)
  const [backupNotice, setBackupNotice] = useState<string | null>(null)
  const [pendingRestore, setPendingRestore] = useState<RuleOfLifeStore | null>(null)
  const [pendingReset, setPendingReset] = useState(false)

  const cycleTheme = () => {
    const order: ThemePreference[] = ["system", "light", "night"]
    const next = order[(order.indexOf(settings.theme) + 1) % order.length]
    onChange({ theme: next })
  }

  const cycleText = () => {
    const order: TextSize[] = ["small", "medium", "large"]
    const next = order[(order.indexOf(settings.textSize) + 1) % order.length]
    onChange({ textSize: next })
  }

  const cycleView = () => {
    const order: MainScreen[] = ["today", "pillars", "journal", "review"]
    const next = order[(order.indexOf(settings.defaultView) + 1) % order.length]
    onChange({ defaultView: next })
  }

  const cycleSymbol = () => {
    const order: EntrySymbol[] = ["task", "event", "note", "insight", "prayer"]
    const next = order[(order.indexOf(settings.defaultSymbol) + 1) % order.length]
    onChange({ defaultSymbol: next })
  }

  const themeLabel =
    settings.theme === "night" ? "Night Office" : settings.theme === "light" ? "Light" : "System default"

  const viewLabel =
    settings.defaultView === "today"
      ? "Daily Observance"
      : settings.defaultView === "pillars"
        ? "Pillars"
        : settings.defaultView === "journal"
          ? "Journal"
          : "Weekly Examen"

  return (
    <>
    <PageShell vellum>
        <BackLink label="Return" onClick={onBack} />
        <h1 className="font-serif text-2xl mb-8">Settings</h1>

        <SettingSection title="Pillars">
          <SettingRow
            icon={<Columns className="h-4 w-4" />}
            label="Default View"
            action={<CycleButton value={viewLabel} onClick={cycleView} />}
          />
          <SettingRow
            icon={<Calendar className="h-4 w-4" />}
            label="Week Starts On"
            action={
              <CycleButton
                value={WEEKDAYS[settings.weekStartsOn]}
                onClick={() => onChange({ weekStartsOn: (settings.weekStartsOn + 1) % 7 })}
              />
            }
          />
        </SettingSection>

        <SettingSection title="Journal">
          <SettingRow
            icon={<BookOpen className="h-4 w-4" />}
            label="Default Symbol"
            action={
              <CycleButton
                value={
                  settings.defaultSymbol === "task"
                    ? "• Bullet"
                    : `${SYMBOLS[settings.defaultSymbol]} ${settings.defaultSymbol[0].toUpperCase()}${settings.defaultSymbol.slice(1)}`
                }
                onClick={cycleSymbol}
              />
            }
          />
          <SettingRow
            icon={<FileText className="h-4 w-4" />}
            label="Manage Collections"
            onClick={onManageCollections}
            action={<span className="text-rol-muted-foreground">›</span>}
          />
        </SettingSection>

        <DividerFlourish className="mb-8" />

        <SettingSection title="Appearance">
          <SettingRow
            icon={<Sun className="h-4 w-4" />}
            label="Theme"
            action={<CycleButton value={themeLabel} onClick={cycleTheme} />}
          />
          <SettingRow
            icon={<Type className="h-4 w-4" />}
            label="Text Size"
            action={
              <CycleButton
                value={settings.textSize[0].toUpperCase() + settings.textSize.slice(1)}
                onClick={cycleText}
              />
            }
          />
        </SettingSection>

        <SettingSection title="Accessibility">
          <SettingRow
            icon={<Moon className="h-4 w-4" />}
            label="Reduce Motion"
            action={
              <Switch
                checked={settings.reduceMotion}
                onCheckedChange={(reduceMotion) => onChange({ reduceMotion })}
                label="Reduce Motion"
              />
            }
          />
        </SettingSection>

        <DividerFlourish className="mb-8" />

        <SettingSection title="Data">
          <p className="px-3 mb-3 text-sm leading-relaxed text-rol-muted-foreground">
            Your Rule of Life is stored only in this browser. Export a backup to keep a personal copy or move it to another device.
          </p>
          <SettingRow
            icon={<Download className="h-4 w-4" />}
            label="Export Backup"
            onClick={() => {
              setBackupError(null)
              downloadBackup(store)
            }}
          />
          <SettingRow
            icon={<Upload className="h-4 w-4" />}
            label="Restore Backup"
            onClick={() => {
              setBackupError(null)
              setBackupNotice(null)
              fileInputRef.current?.click()
            }}
          />
          <SettingRow
            icon={<RotateCcw className="h-4 w-4" />}
            label="Reset Observances"
            description="Clear tally marks and continuity. Pillars remain."
            onClick={() => {
              setBackupError(null)
              setBackupNotice(null)
              setPendingReset(true)
            }}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            className="hidden"
            aria-hidden="true"
            tabIndex={-1}
            onChange={async (event) => {
              const file = event.target.files?.[0]
              event.target.value = ""
              if (!file) return
              const text = await file.text()
              const result = parseBackupJson(text)
              if (!result.ok) {
                setPendingRestore(null)
                setBackupNotice(null)
                setBackupError("This doesn't appear to be a valid Rule of Life backup.")
                return
              }
              setBackupError(null)
              setPendingRestore(result.store)
            }}
          />
          {backupError ? (
            <p className="px-3 pt-2 text-sm text-rol-muted-foreground" role="status">
              {backupError}
            </p>
          ) : null}
          {backupNotice ? (
            <p className="px-3 pt-2 text-sm text-rol-muted-foreground" role="status">
              {backupNotice}
            </p>
          ) : null}
        </SettingSection>
    </PageShell>
      {pendingRestore ? (
        <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center bg-black/30 px-4 pb-10">
          <div
            role="dialog"
            aria-labelledby="restore-backup-title"
            aria-describedby="restore-backup-copy"
            className="w-full max-w-md rounded bg-rol-card border border-rol-border/50 shadow-card p-5"
          >
            <p id="restore-backup-title" className="font-serif text-lg">
              Restore this backup?
            </p>
            <p id="restore-backup-copy" className="text-sm text-rol-muted-foreground mt-2">
              Your current Pillars, observations and journal will be replaced by the contents of this backup.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                className="h-9 px-3 text-sm rounded hover:bg-rol-muted/50"
                onClick={() => setPendingRestore(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="h-9 px-3 text-sm rounded bg-rol-primary text-rol-primary-foreground"
                onClick={() => {
                  onRestore(pendingRestore)
                  setPendingRestore(null)
                  setBackupError(null)
                  setBackupNotice("Backup restored.")
                }}
              >
                Restore
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {pendingReset ? (
        <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center bg-black/30 px-4 pb-10">
          <div
            role="dialog"
            aria-labelledby="reset-observances-title"
            aria-describedby="reset-observances-copy"
            className="w-full max-w-md rounded bg-rol-card border border-rol-border/50 shadow-card p-5"
          >
            <p id="reset-observances-title" className="font-serif text-lg">
              Reset observances?
            </p>
            <p id="reset-observances-copy" className="text-sm text-rol-muted-foreground mt-2">
              Tally marks and continuity will be cleared. Your Pillars themselves will remain.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                className="h-9 px-3 text-sm rounded hover:bg-rol-muted/50"
                onClick={() => setPendingReset(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="h-9 px-3 text-sm rounded bg-rol-primary text-rol-primary-foreground"
                onClick={() => {
                  onResetObservances()
                  setPendingReset(false)
                  setBackupNotice("Observances cleared.")
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
