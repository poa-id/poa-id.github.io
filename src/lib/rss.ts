import { getAllPosts, type PostMeta } from "@/lib/posts"
import { absoluteUrl, SCRIPTORIUM_FEED } from "@/lib/site"

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function toRfc822(date: string): string {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return new Date().toUTCString()
  return parsed.toUTCString()
}

function postExcerpt(post: PostMeta): string | undefined {
  if (post.excerpt?.trim()) return post.excerpt.trim()
  return undefined
}

export function generateRssFeed(): string {
  const posts = getAllPosts()
  const feedUrl = absoluteUrl(SCRIPTORIUM_FEED.path)
  const scriptoriumUrl = absoluteUrl("/writing")

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/writing/${post.slug}`)
      const excerpt = postExcerpt(post)

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${toRfc822(post.date)}</pubDate>${
        excerpt
          ? `
      <description>${escapeXml(excerpt)}</description>`
          : ""
      }
    </item>`
    })
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SCRIPTORIUM_FEED.title)}</title>
    <description>${escapeXml(SCRIPTORIUM_FEED.description)}</description>
    <link>${escapeXml(scriptoriumUrl)}</link>
    <language>${SCRIPTORIUM_FEED.language}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`
}
