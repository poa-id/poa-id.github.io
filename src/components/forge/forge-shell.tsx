"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  GardenEntryFromForgeEdge,
  GardenReturnFromForgeInline,
} from "@/components/cube-edge-tabs"
import { useCubeFaceThemeForSlug } from "@/hooks/use-cube-face-theme"
import { getForgeProject } from "@/lib/forge-content"

export function ForgeShell({ children }: { children: React.ReactNode }) {
  const theme = useCubeFaceThemeForSlug("forge")
  const pathname = usePathname()
  const project = getForgeProject(pathname)

  if (pathname.startsWith("/forge/lineforge") || pathname.startsWith("/forge/rule-of-life")) {
    return <>{children}</>
  }

  return (
    <div
      className="h-screen w-full flex flex-col"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <GardenEntryFromForgeEdge />

      <div className="lg:hidden px-6 pt-4 flex items-center justify-between shrink-0 gap-4">
        <div className="flex flex-wrap items-center gap-4 min-w-0">
          <GardenReturnFromForgeInline />
          {project && (
            <Link
              href="/forge"
              className="text-sm uppercase tracking-wide [font-family:var(--font-disket)] opacity-80 hover:opacity-100"
            >
              ← Forge
            </Link>
          )}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {!project && (
            <span className="text-sm uppercase tracking-wide [font-family:var(--font-disket-bold)]">
              Forge
            </span>
          )}
          <ThemeToggle />
        </div>
      </div>

      <header
        className="hidden lg:flex items-center justify-between px-6 py-4 border-b shrink-0"
        style={{ borderColor: theme.border }}
      >
        {project ? (
          <Link
            href="/forge"
            className="text-sm uppercase tracking-wide [font-family:var(--font-disket)] opacity-80 hover:opacity-100"
          >
            ← Forge
          </Link>
        ) : (
          <div>
            <p
              className="text-[10px] uppercase tracking-widest leading-none [font-family:var(--font-disket)]"
              style={{ color: theme.textMuted }}
            >
              The Builder
            </p>
            <h1 className="text-sm uppercase tracking-wide [font-family:var(--font-disket-bold)]">
              Forge
            </h1>
          </div>
        )}
        <ThemeToggle />
      </header>

      <main
        className="flex-1 overflow-y-auto px-6 py-8 lg:py-12 content-scroll min-h-0"
        style={{ backgroundColor: theme.hover }}
      >
        {children}
      </main>
    </div>
  )
}
