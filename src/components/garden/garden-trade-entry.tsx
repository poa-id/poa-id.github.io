"use client"

import Image from "next/image"
import type { CubeFaceTheme } from "@/lib/cube-face-themes"
import type { MadeObject } from "@/lib/made-objects"

export function GardenTradeEntry({
  object,
  theme,
}: {
  object: MadeObject
  theme: CubeFaceTheme
}) {
  const garden = object.garden
  if (!garden) return null

  return (
    <article className="space-y-6 border-t pt-8" style={{ borderColor: theme.border }}>
      <header className="space-y-2">
        <p
          className="text-[10px] uppercase tracking-[0.18em] [font-family:var(--font-disket)]"
          style={{ color: theme.textMuted }}
        >
          {object.trades.join(" / ")}
        </p>
        <h3 className="text-lg uppercase tracking-wide [font-family:var(--font-disket-bold)] leading-snug">
          {object.title}
        </h3>
        <p
          className="text-[10px] uppercase tracking-[0.18em] [font-family:var(--font-disket)]"
          style={{ color: theme.textMuted }}
        >
          {object.year} · {garden.meta}
        </p>
      </header>

      {garden.body[0] ? (
        <p className="text-sm leading-relaxed [font-family:var(--font-disket)] opacity-85">
          {garden.body[0]}
        </p>
      ) : null}

      {object.images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {object.images.map((image) => (
            <figure
              key={image.src}
              className="border overflow-hidden"
              style={{ borderColor: theme.border }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="w-full h-auto block"
              />
            </figure>
          ))}
        </div>
      ) : null}

      {garden.body.slice(1).length > 0 ? (
        <div className="space-y-4">
          {garden.body.slice(1).map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              className="text-sm leading-relaxed [font-family:var(--font-disket)] opacity-85"
            >
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}

      {garden.lessons && garden.lessons.length > 0 ? (
        <div className="space-y-3">
          <p
            className="text-[10px] uppercase tracking-[0.18em] [font-family:var(--font-disket)]"
            style={{ color: theme.textMuted }}
          >
            What I learned
          </p>
          <ul className="space-y-3">
            {garden.lessons.map((lesson) => (
              <li
                key={lesson.slice(0, 48)}
                className="text-sm leading-relaxed border-l-2 pl-4 [font-family:var(--font-disket)]"
                style={{ borderColor: theme.border, color: theme.textMuted }}
              >
                {lesson}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {garden.next ? (
        <div className="space-y-3">
          <p
            className="text-[10px] uppercase tracking-[0.18em] [font-family:var(--font-disket)]"
            style={{ color: theme.textMuted }}
          >
            Next time
          </p>
          <p className="text-sm leading-relaxed [font-family:var(--font-disket)] opacity-85">
            {garden.next}
          </p>
        </div>
      ) : null}
    </article>
  )
}
