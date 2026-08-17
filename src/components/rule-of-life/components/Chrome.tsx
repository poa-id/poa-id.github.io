import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function TallyMarks({
  history,
  compact = false,
}: {
  history: boolean[]
  compact?: boolean
}) {
  if (history.length === 0) {
    return <p className="text-xs italic text-rol-muted-foreground/60 font-serif">No observances yet.</p>
  }

  return (
    <div className="flex items-center justify-between w-full" aria-hidden="true">
      {history.map((observed, index) => (
        <div key={index} className="flex-1 flex justify-center">
          {observed ? (
            <span className={cn(compact ? "tally-strike-compact" : "tally-strike")} />
          ) : (
            <span className="tally-dot" />
          )}
        </div>
      ))}
    </div>
  )
}

export function DividerFlourish({ className }: { className?: string }) {
  return <div className={cn("divider-flourish", className)} />
}

export function PageHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string
  title: string
  action?: ReactNode
}) {
  return (
    <header className="mb-8">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs uppercase tracking-widest text-rol-muted-foreground/70">{eyebrow}</p>
        {action}
      </div>
      <h1 className="font-serif text-2xl text-rol-foreground">{title}</h1>
      <DividerFlourish className="mt-4" />
    </header>
  )
}

export function PageShell({
  children,
  vellum = true,
  withNav: _withNav = false,
  className,
}: {
  children: ReactNode
  vellum?: boolean
  withNav?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "rol-page w-full px-5 sm:px-8 pt-6 min-h-full pb-10",
        vellum ? "vellum-texture" : "bg-rol-background",
        className
      )}
    >
      {children}
    </div>
  )
}

export function BackLink({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-6 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-rol-muted-foreground hover:text-rol-foreground transition-colors duration-200"
    >
      <span aria-hidden="true">←</span>
      {label}
    </button>
  )
}
