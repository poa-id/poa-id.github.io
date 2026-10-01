import Image from "next/image"
import type { CubeFaceTheme } from "@/lib/cube-face-themes"
import type {
  GardenJournalEntry as GardenJournalEntryData,
  GardenJournalParagraph,
} from "@/lib/garden-content"

function JournalParagraph({ paragraph }: { paragraph: GardenJournalParagraph }) {
  const emphasis = paragraph.emphasis ?? []
  if (emphasis.length === 0) return paragraph.text

  const pattern = new RegExp(`(${emphasis.map(escapeRegExp).join("|")})`, "g")
  return paragraph.text.split(pattern).map((part, index) =>
    emphasis.includes(part) ? <em key={`${part}-${index}`}>{part}</em> : part,
  )
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export function GardenJournalEntry({
  entry,
  theme,
}: {
  entry: GardenJournalEntryData
  theme: CubeFaceTheme
}) {
  return (
    <article className="space-y-6 border-t pt-8" style={{ borderColor: theme.border }}>
      <header className="space-y-2">
        <p
          className="text-[10px] uppercase tracking-[0.18em] [font-family:var(--font-disket)]"
          style={{ color: theme.textMuted }}
        >
          {entry.meta}
        </p>
        <h3 className="text-lg uppercase tracking-wide [font-family:var(--font-disket-bold)] leading-snug">
          {entry.title}
        </h3>
        <p
          className="text-[10px] uppercase tracking-[0.18em] [font-family:var(--font-disket)]"
          style={{ color: theme.textMuted }}
        >
          {entry.date}
        </p>
      </header>

      <div className="space-y-4">
        {entry.body.map((paragraph, index) => (
          <p
            key={`${entry.slug}-${index}`}
            className="text-sm leading-relaxed [font-family:var(--font-disket)] opacity-85"
          >
            <JournalParagraph paragraph={paragraph} />
          </p>
        ))}
      </div>

      {entry.images && entry.images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {entry.images.map((image, index) => (
            <figure
              key={image.src}
              className={`border overflow-hidden ${
                entry.images?.length === 1 || index === 0 ? "sm:col-span-2" : ""
              }`}
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
    </article>
  )
}
