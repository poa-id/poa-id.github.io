import { generateRssFeed } from "@/lib/rss"

export const dynamic = "force-static"

export async function GET() {
  const feed = generateRssFeed()

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  })
}
