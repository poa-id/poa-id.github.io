"use client"

import { cn } from "@/lib/utils"

export function Switch({
  checked,
  onCheckedChange,
  label,
}: {
  checked: boolean
  onCheckedChange: (next: boolean) => void
  label?: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors duration-200",
        checked ? "bg-rol-primary border-rol-primary" : "bg-rol-muted border-rol-border/60"
      )}
    >
      <span
        className={cn(
          "pointer-events-none block h-3.5 w-3.5 rounded-full bg-rol-background shadow-soft transition-transform duration-200",
          checked ? "translate-x-[18px]" : "translate-x-0.5"
        )}
      />
    </button>
  )
}

export function Checkbox({
  checked,
  onCheckedChange,
  className,
}: {
  checked?: boolean
  onCheckedChange?: (next: boolean) => void
  className?: string
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={Boolean(checked)}
      onClick={(event) => {
        event.stopPropagation()
        onCheckedChange?.(!checked)
      }}
      className={cn(
        "mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border border-rol-muted-foreground/50 transition-colors duration-200",
        checked && "bg-rol-primary border-rol-primary",
        className
      )}
    >
      {checked ? (
        <span className="block h-1.5 w-2 border-b border-l border-rol-primary-foreground -rotate-45 translate-y-[-1px]" />
      ) : null}
    </button>
  )
}
