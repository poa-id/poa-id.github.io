"use client"

import { CubeFaceShell } from "@/components/cube-face-shell"
import { useCubeFaceThemeForSlug } from "@/hooks/use-cube-face-theme"
import type { CubeFaceStubContent } from "@/lib/cube-face-content"

export function CubeStubBody({
  content,
  theme,
}: {
  content: CubeFaceStubContent
  theme: { textMuted: string }
}) {
  return (
    <div className="max-w-md text-center space-y-8">
      <div className="space-y-4">
        <p
          className="text-xs uppercase tracking-widest [font-family:var(--font-disket)]"
          style={{ color: theme.textMuted }}
        >
          {content.archetype}
        </p>
        <h1 className="text-2xl lg:text-3xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">
          {content.label}
        </h1>
        <p className="text-lg [font-family:var(--font-disket)] leading-snug">
          {content.question}
        </p>
      </div>

      <p className="text-sm leading-relaxed [font-family:var(--font-disket)] opacity-85 text-left whitespace-pre-line">
        {content.body}
      </p>

      {content.topics.length > 0 && (
        <ul className="text-left text-sm space-y-2 [font-family:var(--font-disket)] opacity-70">
          {content.topics.map((topic) => (
            <li key={topic} className="flex gap-2">
              <span style={{ color: theme.textMuted }}>·</span>
              <span>{topic}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

interface CubeStubPageProps {
  face: "garden" | "forge" | "hearth"
  content: CubeFaceStubContent
  returnEdge: React.ReactNode
  mobileReturn?: React.ReactNode
}

export function CubeStubPage({
  face,
  content,
  returnEdge,
  mobileReturn,
}: CubeStubPageProps) {
  const theme = useCubeFaceThemeForSlug(face)

  return (
    <CubeFaceShell
      theme={theme}
      returnEdge={returnEdge}
      mobileReturn={mobileReturn}
    >
      <CubeStubBody content={content} theme={theme} />
    </CubeFaceShell>
  )
}
