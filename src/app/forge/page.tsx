"use client"

import { DeepDescentLink } from "@/components/deep-descent-link"
import { ForgeProjectCard } from "@/components/forge/forge-project-card"
import { useCubeFaceThemeForSlug } from "@/hooks/use-cube-face-theme"
import { FORGE_PROJECTS } from "@/lib/forge-content"
import { ROOMS } from "@/lib/room-content"

export default function ForgePage() {
  const theme = useCubeFaceThemeForSlug("forge")
  const room = ROOMS.forge

  return (
    <div className="w-full max-w-3xl mx-auto space-y-12">
      <header className="space-y-4 max-w-2xl">
        <p
          className="lg:hidden text-xs uppercase tracking-widest [font-family:var(--font-disket)]"
          style={{ color: theme.textMuted }}
        >
          {room.archetype}
        </p>
        <p className="text-lg [font-family:var(--font-disket)] leading-snug">
          {room.question}
        </p>
        <p className="text-sm leading-relaxed [font-family:var(--font-disket)] opacity-85">
          {room.body}
        </p>
      </header>

      <section className="space-y-4" aria-label="Forge projects">
        <p
          className="text-[10px] uppercase tracking-[0.22em] [font-family:var(--font-disket)]"
          style={{ color: theme.textMuted }}
        >
          On the bench
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FORGE_PROJECTS.map((project) => (
            <ForgeProjectCard key={project.slug} project={project} theme={theme} />
          ))}
        </div>
      </section>

      <div className="flex justify-center pt-4">
        <DeepDescentLink />
      </div>
    </div>
  )
}
