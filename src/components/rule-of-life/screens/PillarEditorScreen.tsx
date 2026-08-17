"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { BackLink, PageShell } from "@/components/rule-of-life/components/Chrome"
import { Button } from "@/components/rule-of-life/ui/button"
import { Input, Label, Textarea } from "@/components/rule-of-life/ui/fields"
import { Switch } from "@/components/rule-of-life/ui/controls"
import { cn } from "@/lib/utils"
import type { Frequency, FrequencyType, Pillar, PillarMode, QuantityConfig } from "@/lib/rule-of-life/types"

const WEEKDAYS = [
  { label: "S", value: 0 },
  { label: "M", value: 1 },
  { label: "T", value: 2 },
  { label: "W", value: 3 },
  { label: "T", value: 4 },
  { label: "F", value: 5 },
  { label: "S", value: 6 },
]

const NTH_WEEKS = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Last", value: 5 },
]

const FULL_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

function Segmented<T extends string>({
  value,
  options,
  onChange,
  capitalize = false,
}: {
  value: T
  options: { label: string; value: T }[]
  onChange: (value: T) => void
  capitalize?: boolean
}) {
  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "flex-1 h-10 text-sm transition-colors duration-200 rounded",
            capitalize && "capitalize",
            value === option.value
              ? "bg-rol-primary text-rol-primary-foreground"
              : "bg-rol-card border border-rol-border hover:bg-rol-muted"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export function PillarEditorScreen({
  pillar,
  onBack,
  onSave,
}: {
  pillar?: Pillar
  onBack: () => void
  onSave: (data: {
    title: string
    description: string
    mode: PillarMode
    frequency: Frequency
    quantityConfig?: QuantityConfig
    isFocus: boolean
  }) => void
}) {
  const [title, setTitle] = useState(pillar?.title ?? "")
  const [description, setDescription] = useState(pillar?.description ?? "")
  const [mode, setMode] = useState<PillarMode>(pillar?.mode ?? "simple")
  const [frequencyType, setFrequencyType] = useState<FrequencyType>(pillar?.frequency.type ?? "daily")
  const [selectedDays, setSelectedDays] = useState<number[]>(pillar?.frequency.days ?? [])
  const [monthlyMode, setMonthlyMode] = useState<"date" | "nth">(
    pillar?.frequency.nthWeekday ? "nth" : "date"
  )
  const [monthDate, setMonthDate] = useState(pillar?.frequency.date ?? new Date().getDate())
  const [nthWeek, setNthWeek] = useState(pillar?.frequency.nthWeekday?.week ?? 1)
  const [nthDay, setNthDay] = useState(pillar?.frequency.nthWeekday?.day ?? new Date().getDay())
  const [unit, setUnit] = useState(pillar?.quantityConfig?.unit ?? "pages")
  const [target, setTarget] = useState(pillar?.quantityConfig?.target ?? 30)
  const [steps, setSteps] = useState(pillar?.quantityConfig?.steps ?? [{ label: "+5", value: 5 }])
  const [isFocus, setIsFocus] = useState(pillar?.isFocus ?? false)

  const save = () => {
    const frequency: Frequency = { type: frequencyType }
    if (frequencyType === "weekly") frequency.days = [...selectedDays].sort((a, b) => a - b)
    if (frequencyType === "monthly") {
      if (monthlyMode === "nth") frequency.nthWeekday = { week: nthWeek, day: nthDay }
      else frequency.date = monthDate
    }

    onSave({
      title: title.trim(),
      description: description.trim(),
      mode,
      frequency,
      quantityConfig: mode === "quantity" ? { unit: unit.trim() || "units", target: Number(target) || 0, steps } : undefined,
      isFocus,
    })
  }

  return (
    <PageShell vellum={false}>
        <BackLink label="Return" onClick={onBack} />
        <h1 className="font-serif text-xl mb-8">{pillar ? "Edit Pillar" : "New Pillar"}</h1>

        <div className="space-y-6">
          <div className="animate-fade-in space-y-2">
            <Label htmlFor="pillar-title">Title</Label>
            <Input id="pillar-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g., Prayer" />
          </div>

          <div className="animate-fade-in space-y-2" style={{ animationDelay: "50ms" }}>
            <Label htmlFor="pillar-description">Description</Label>
            <Textarea
              id="pillar-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              minLength={0}
              className="min-h-[80px] resize-none"
              placeholder="Why does this pillar matter?"
            />
          </div>

          <div className="animate-fade-in space-y-2" style={{ animationDelay: "100ms" }}>
            <Label>Mode</Label>
            <Segmented
              value={mode}
              onChange={setMode}
              options={[
                { label: "Simple", value: "simple" },
                { label: "Quantity", value: "quantity" },
              ]}
            />
          </div>

          {mode === "quantity" ? (
            <div className="pl-4 border-l-2 border-rol-border space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Input id="unit" value={unit} onChange={(event) => setUnit(event.target.value)} placeholder="pages, minutes, km…" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target">Target</Label>
                <Input
                  id="target"
                  type="number"
                  min={1}
                  value={target}
                  onChange={(event) => setTarget(Number(event.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>Quick Increment Buttons</Label>
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={step.value}
                      onChange={(event) => {
                        const value = Number(event.target.value)
                        setSteps((current) =>
                          current.map((item, itemIndex) =>
                            itemIndex === index ? { label: `+${value}`, value } : item
                          )
                        )
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Remove increment"
                      onClick={() => setSteps((current) => current.filter((_, itemIndex) => itemIndex !== index))}
                    >
                      <X />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSteps((current) => [...current, { label: "+10", value: 10 }])}
                >
                  Add Increment
                </Button>
              </div>
            </div>
          ) : null}

          <div className="animate-fade-in space-y-2" style={{ animationDelay: "150ms" }}>
            <Label>Frequency</Label>
            <Segmented
              value={frequencyType}
              capitalize
              onChange={setFrequencyType}
              options={[
                { label: "daily", value: "daily" },
                { label: "weekly", value: "weekly" },
                { label: "monthly", value: "monthly" },
              ]}
            />
          </div>

          {frequencyType === "weekly" ? (
            <div className="pl-4 border-l-2 border-rol-border animate-fade-in">
              <div className="flex justify-between">
                {WEEKDAYS.map((day) => {
                  const selected = selectedDays.includes(day.value)
                  return (
                    <button
                      key={day.value}
                      type="button"
                      onClick={() =>
                        setSelectedDays((current) =>
                          current.includes(day.value)
                            ? current.filter((item) => item !== day.value)
                            : [...current, day.value].sort((a, b) => a - b)
                        )
                      }
                      className={cn(
                        "w-9 h-9 rounded-full text-sm transition-colors duration-200",
                        selected
                          ? "bg-rol-primary text-rol-primary-foreground"
                          : "bg-rol-card border border-rol-border hover:bg-rol-muted"
                      )}
                    >
                      {day.label}
                    </button>
                  )
                })}
              </div>
            </div>
          ) : null}

          {frequencyType === "monthly" ? (
            <div className="pl-4 border-l-2 border-rol-border space-y-4 animate-fade-in">
              <Segmented
                value={monthlyMode}
                onChange={setMonthlyMode}
                options={[
                  { label: "By date", value: "date" },
                  { label: "Nth weekday", value: "nth" },
                ]}
              />
              {monthlyMode === "date" ? (
                <div className="space-y-2">
                  <Label htmlFor="month-date">Day of each month</Label>
                  <Input
                    id="month-date"
                    type="number"
                    min={1}
                    max={31}
                    value={monthDate}
                    onChange={(event) => setMonthDate(Math.min(31, Math.max(1, Number(event.target.value))))}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={nthWeek}
                    onChange={(event) => setNthWeek(Number(event.target.value))}
                    className="h-10 rounded border border-rol-border bg-rol-card px-2 text-sm"
                  >
                    {NTH_WEEKS.map((week) => (
                      <option key={week.value} value={week.value}>
                        {week.label}
                      </option>
                    ))}
                  </select>
                  <select
                    value={nthDay}
                    onChange={(event) => setNthDay(Number(event.target.value))}
                    className="h-10 rounded border border-rol-border bg-rol-card px-2 text-sm"
                  >
                    {FULL_DAYS.map((name, index) => (
                      <option key={name} value={index}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ) : null}

          <div className="animate-fade-in flex items-center justify-between gap-4" style={{ animationDelay: "200ms" }}>
            <div>
              <p className="text-sm">Set as Focus Pillar</p>
              <p className="text-xs text-rol-muted-foreground mt-1">Highlight this pillar for special attention</p>
            </div>
            <Switch checked={isFocus} onCheckedChange={setIsFocus} label="Set as Focus Pillar" />
          </div>

          <Button className="w-full animate-fade-in" style={{ animationDelay: "250ms" }} disabled={!title.trim()} onClick={save}>
            {pillar ? "Save Changes" : "Create Pillar"}
          </Button>
        </div>
    </PageShell>
  )
}
