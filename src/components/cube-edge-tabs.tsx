"use client"

import Link from "next/link"
import { useCubeFaceThemeForSlug } from "@/hooks/use-cube-face-theme"
import { type ThemedFaceSlug } from "@/lib/cube-face-themes"
import { HALL_LABEL, SURFACE_LABEL } from "@/lib/cube-labels"

const chevron = {
  left: "M15 19l-7-7 7-7",
  right: "M9 5l7 7-7 7",
  up: "M5 15l7-7 7 7",
  down: "M19 9l-7 7-7-7",
} as const

const CENTERED_FIXED = "fixed left-0 right-0 mx-auto w-max z-[60] isolate"

type ThemedFace = "garden" | "forge" | "hearth"

function VerticalEdgeTab({
  href,
  label,
  chevronDir,
  side,
  ariaLabel,
  elevated = false,
}: {
  href: string
  label: string
  chevronDir: "left" | "right"
  side: "left" | "right"
  ariaLabel: string
  elevated?: boolean
}) {
  const border = side === "left" ? "border-r" : "border-l"
  const chevronFirst = chevronDir === "left"

  return (
    <Link
      href={href}
      className={`fixed ${side}-0 top-1/2 hidden lg:flex flex-col items-center gap-3 px-2 py-8 ${border} border-border dark:border-gray-800 bg-white dark:bg-[#0F1015] hover:bg-white dark:hover:bg-[#0F1015] transition-colors group ${
        elevated ? "z-[60] isolate [transform:translateY(-50%)_translateZ(2px)]" : "z-40 -translate-y-1/2"
      }`}
      aria-label={ariaLabel}
    >
      {chevronFirst && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={chevron[chevronDir]} />
        </svg>
      )}
      <span className="text-sm uppercase tracking-wide [font-family:var(--font-disket)] text-muted-foreground group-hover:text-foreground transition-colors" style={{ writingMode: "vertical-rl" }}>
        {label}
      </span>
      {!chevronFirst && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={chevron[chevronDir]} />
        </svg>
      )}
    </Link>
  )
}

function ThemedVerticalEdgeTab({
  href,
  label,
  chevronDir,
  side,
  slug,
  ariaLabel,
}: {
  href: string
  label: string
  chevronDir: "left" | "right"
  side: "left" | "right"
  slug: ThemedFace
  ariaLabel: string
}) {
  const palette = useCubeFaceThemeForSlug(slug)
  const border = side === "left" ? "border-r" : "border-l"
  const chevronFirst = chevronDir === "left"

  return (
    <Link
      href={href}
      className={`fixed ${side}-0 top-1/2 z-[60] hidden lg:flex flex-col items-center gap-3 px-2 py-8 ${border} transition-colors group isolate [transform:translateY(-50%)_translateZ(2px)]`}
      style={{ backgroundColor: palette.bg, borderColor: palette.border }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = palette.hover }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = palette.bg }}
      aria-label={ariaLabel}
    >
      {chevronFirst && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70 group-hover:opacity-100" style={{ color: palette.text }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={chevron[chevronDir]} />
        </svg>
      )}
      <span className="text-sm uppercase tracking-wide [font-family:var(--font-disket)] opacity-70 group-hover:opacity-100" style={{ writingMode: "vertical-rl", color: palette.text }}>
        {label}
      </span>
      {!chevronFirst && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70 group-hover:opacity-100" style={{ color: palette.text }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={chevron[chevronDir]} />
        </svg>
      )}
    </Link>
  )
}

function ThemedHorizontalEdgeTab({
  href,
  label,
  chevronDir,
  position,
  ariaLabel,
  slug,
}: {
  href: string
  label: string
  chevronDir: "up" | "down"
  position: "top" | "bottom"
  ariaLabel: string
  slug: ThemedFaceSlug
}) {
  const palette = useCubeFaceThemeForSlug(slug)
  const isTop = position === "top"
  const positionClass = isTop ? "top-0" : "bottom-0"
  const borderClass = isTop ? "border-b" : "border-t"

  return (
    <Link
      href={href}
      className={`${CENTERED_FIXED} ${positionClass} hidden lg:flex flex-row items-center gap-2 px-4 py-1.5 ${borderClass} transition-colors group [transform:translateZ(2px)]`}
      style={{ backgroundColor: palette.bg, borderColor: palette.border, color: palette.text }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = palette.hover }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = palette.bg }}
      aria-label={ariaLabel}
    >
      {chevronDir === "up" && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" style={{ color: palette.textMuted }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={chevron.up} />
        </svg>
      )}
      <span className="text-sm uppercase tracking-wide [font-family:var(--font-disket)]">{label}</span>
      {chevronDir === "down" && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" style={{ color: palette.textMuted }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={chevron.down} />
        </svg>
      )}
    </Link>
  )
}

function SiteHorizontalEdgeTab({
  href,
  label,
  chevronDir,
  position,
  ariaLabel,
  flushToViewport = false,
}: {
  href: string
  label: string
  chevronDir: "up" | "down"
  position: "top" | "bottom"
  ariaLabel: string
  flushToViewport?: boolean
}) {
  const isTop = position === "top"
  const positionClass = isTop ? (flushToViewport ? "top-0" : "top-24") : "bottom-0"
  const borderClass = isTop ? "border-b" : "border-t"

  return (
    <Link
      href={href}
      className={`${CENTERED_FIXED} ${positionClass} hidden lg:flex flex-row items-center gap-2 px-4 py-1.5 ${borderClass} border-border dark:border-gray-800 bg-white dark:bg-[#0F1015] hover:bg-white dark:hover:bg-[#0F1015] transition-colors group [transform:translateZ(2px)]`}
      aria-label={ariaLabel}
    >
      {chevronDir === "up" && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={chevron.up} />
        </svg>
      )}
      <span className="text-sm uppercase tracking-wide [font-family:var(--font-disket)] text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
      {chevronDir === "down" && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={chevron.down} />
        </svg>
      )}
    </Link>
  )
}

function InlineCubeLink({ href, label, chevronDir }: { href: string; label: string; chevronDir: "left" | "right" | "up" | "down" }) {
  return (
    <Link href={href} className="lg:hidden inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors [font-family:var(--font-disket)]">
      {(chevronDir === "left" || chevronDir === "up") && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={chevron[chevronDir]} />
        </svg>
      )}
      {label}
      {(chevronDir === "right" || chevronDir === "down") && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={chevron[chevronDir]} />
        </svg>
      )}
    </Link>
  )
}

function ThemedVerticalReturnEdge({ slug }: { slug: ThemedFace }) {
  const palette = useCubeFaceThemeForSlug(slug)
  return (
    <Link
      href="/"
      className="fixed left-0 top-1/2 z-[60] hidden lg:flex flex-col items-center gap-3 px-2 py-8 border-r transition-colors group isolate [transform:translateY(-50%)_translateZ(2px)]"
      style={{ backgroundColor: palette.bg, borderColor: palette.border }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = palette.hover }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = palette.bg }}
      aria-label={`Return to ${HALL_LABEL}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70 group-hover:opacity-100" style={{ color: palette.text }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={chevron.left} />
      </svg>
      <span className="text-sm uppercase tracking-wide [font-family:var(--font-disket)] opacity-70 group-hover:opacity-100" style={{ writingMode: "vertical-rl", color: palette.text }}>
        {HALL_LABEL}
      </span>
    </Link>
  )
}

export function GardenEntryEdge() {
  return <VerticalEdgeTab href="/garden" label="The Garden" chevronDir="right" side="right" ariaLabel="Enter the Garden" elevated />
}

export function GardenEntryInline() {
  return <InlineCubeLink href="/garden" label="The Garden" chevronDir="right" />
}

export function ShelfEntryEdge() {
  return (
    <SiteHorizontalEdgeTab
      href="/shelf"
      label="Shelf"
      chevronDir="up"
      position="top"
      ariaLabel="Ascend to the Shelf"
      flushToViewport
    />
  )
}

export function ShelfEntryInline() {
  return <InlineCubeLink href="/shelf" label="Shelf" chevronDir="up" />
}

export function HearthEntryEdge() {
  return <SiteHorizontalEdgeTab href="/hearth" label="Hearth" chevronDir="down" position="bottom" ariaLabel="Descend to the Hearth" />
}

export function HearthEntryInline() {
  return <InlineCubeLink href="/hearth" label="Hearth" chevronDir="down" />
}

export function ForgeEntryFromGardenEdge() {
  return <ThemedVerticalEdgeTab href="/forge" label="Forge" chevronDir="right" side="right" slug="garden" ariaLabel="Pass through to the Forge" />
}

export function GardenEntryFromForgeEdge() {
  return <ThemedVerticalEdgeTab href="/garden" label="The Garden" chevronDir="left" side="left" slug="forge" ariaLabel="Return to the Garden" />
}

export function GardenReturnFromForgeInline() {
  return <InlineCubeLink href="/garden" label="The Garden" chevronDir="left" />
}

export function ForgeEntryInline() {
  return <InlineCubeLink href="/forge" label="Forge" chevronDir="right" />
}

export function ShelfReturnEdge() {
  return <ThemedHorizontalEdgeTab href="/" label={HALL_LABEL} chevronDir="down" position="bottom" ariaLabel={`Return to ${HALL_LABEL}`} slug="shelf" />
}

export function ShelfReturnInline() {
  return <InlineCubeLink href="/" label={HALL_LABEL} chevronDir="down" />
}

export function HallReturnEdge({
  chevronDir = "left",
  theme = "site",
}: {
  chevronDir?: "left" | "down" | "up"
  theme?: "site" | "hearth" | "garden"
}) {
  if (chevronDir === "up") {
    return <ThemedHorizontalEdgeTab href="/" label={HALL_LABEL} chevronDir="up" position="top" ariaLabel={`Return to ${HALL_LABEL}`} slug="hearth" />
  }
  if (chevronDir === "down") {
    return <ThemedHorizontalEdgeTab href="/" label={HALL_LABEL} chevronDir="down" position="bottom" ariaLabel={`Return to ${HALL_LABEL}`} slug="hearth" />
  }
  if (theme === "garden") return <ThemedVerticalReturnEdge slug="garden" />
  return <VerticalEdgeTab href="/" label={HALL_LABEL} chevronDir="left" side="left" ariaLabel={`Return to ${HALL_LABEL}`} />
}

export function HallReturnInline({ chevronDir = "left" }: { chevronDir?: "left" | "down" | "up" }) {
  return <InlineCubeLink href="/" label={HALL_LABEL} chevronDir={chevronDir} />
}

export function SurfaceEntryEdge() {
  return (
    <ThemedHorizontalEdgeTab
      href="/"
      label={SURFACE_LABEL}
      chevronDir="up"
      position="top"
      ariaLabel={`Return to ${SURFACE_LABEL}`}
      slug="deep"
    />
  )
}

export function SurfaceEntryInline() {
  return <InlineCubeLink href="/" label={SURFACE_LABEL} chevronDir="up" />
}
