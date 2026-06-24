import Link from "next/link"
import { Mail } from "lucide-react"

const actionBorder =
  "border border-foreground dark:border-foreground hover:bg-foreground hover:text-background dark:hover:bg-gray-300 dark:hover:text-gray-900 transition-all duration-200"

interface HallActionsProps {
  compact?: boolean
  className?: string
}

export function HallActions({ compact = false, className = "" }: HallActionsProps) {
  const height = compact ? "h-9" : "h-11"
  const textSize = compact ? "text-sm" : "text-base"
  const workPadding = compact ? "px-5" : "px-6"
  const iconSize = compact ? "w-9" : "w-11"
  const margin = compact ? "mt-4" : "mt-8"

  return (
    <div className={`flex items-stretch gap-2 ${margin} ${className}`}>
      <Link
        href="/work"
        className={`inline-flex items-center justify-center bg-transparent text-foreground ${height} ${workPadding} ${textSize} ${actionBorder} [font-family:var(--font-disket)]`}
      >
        View My Work
      </Link>
      <Link
        href="/correspondence"
        className={`inline-flex items-center justify-center bg-transparent text-foreground ${height} ${iconSize} shrink-0 ${actionBorder}`}
        aria-label="Correspondence"
      >
        <Mail className="w-4 h-4" />
      </Link>
    </div>
  )
}
