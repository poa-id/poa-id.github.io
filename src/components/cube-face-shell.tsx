"use client"

import type { CubeFaceTheme } from "@/lib/cube-face-themes"

interface CubeFaceShellProps {
  theme: CubeFaceTheme
  returnEdge: React.ReactNode
  children: React.ReactNode
  mobileReturn?: React.ReactNode
}

export function CubeFaceShell({
  theme,
  returnEdge,
  children,
  mobileReturn,
}: CubeFaceShellProps) {
  return (
    <div
      className="min-h-screen w-full flex flex-col animate-in fade-in duration-500"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      {returnEdge}

      {mobileReturn && (
        <div className="lg:hidden px-6 pt-4">{mobileReturn}</div>
      )}

      <main className="flex-1 flex items-center justify-center px-6 py-12 lg:pt-16">
        {children}
      </main>
    </div>
  )
}
