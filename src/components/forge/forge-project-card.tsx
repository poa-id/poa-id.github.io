"use client"

import Link from "next/link"
import type { CubeFaceTheme } from "@/lib/cube-face-themes"
import {
  FORGE_PROJECT_STATUS_LABEL,
  type ForgeProject,
} from "@/lib/forge-content"

export function ForgeProjectCard({
  project,
  theme,
}: {
  project: ForgeProject
  theme: CubeFaceTheme
}) {
  const action = project.actionLabel ?? "Enter"

  return (
    <Link
      href={project.href}
      {...(project.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="group flex flex-col justify-between gap-8 border p-5 sm:p-6 transition-colors hover:border-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        backgroundColor: theme.bg,
        borderColor: theme.border,
        color: theme.text,
        outlineColor: theme.text,
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <p
          className="text-[10px] uppercase tracking-[0.22em] [font-family:var(--font-disket)]"
          style={{ color: theme.textMuted }}
        >
          Project {project.number}
        </p>
        <p
          className="text-[10px] uppercase tracking-[0.18em] [font-family:var(--font-disket)]"
          style={{ color: theme.textMuted }}
        >
          {FORGE_PROJECT_STATUS_LABEL[project.status]}
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg uppercase tracking-wide [font-family:var(--font-disket-bold)] leading-snug">
          {project.title}
        </h2>
        {project.descriptor && (
          <p
            className="text-[10px] uppercase tracking-[0.18em] [font-family:var(--font-disket)]"
            style={{ color: theme.textMuted }}
          >
            {project.descriptor}
          </p>
        )}
        <p className="text-sm leading-relaxed [font-family:var(--font-disket)] opacity-85">
          {project.lede}
        </p>
        {project.supporting && (
          <p
            className="text-xs leading-relaxed [font-family:var(--font-disket)]"
            style={{ color: theme.textMuted }}
          >
            {project.supporting}
          </p>
        )}
      </div>

      <p
        className="text-[10px] uppercase tracking-[0.22em] [font-family:var(--font-disket)] transition-opacity group-hover:opacity-100 opacity-70"
        style={{ color: theme.text }}
      >
        {action}
      </p>
    </Link>
  )
}
