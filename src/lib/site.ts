/** Canonical site URL for absolute links in feeds and metadata. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://poa.ar"

export const SITE_AUTHOR = "Pedro Ossorio Arana"

export const SCRIPTORIUM_FEED = {
  title: `${SITE_AUTHOR} — Scriptorium`,
  description: "Essays, notes, and thoughts worth keeping.",
  language: "en",
  path: "/rss.xml",
} as const

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}
