import { redirect } from "next/navigation"
import { getAllPosts } from "@/lib/posts"

export default function WritingIndex() {
  const posts = getAllPosts()

  if (posts.length > 0) {
    redirect(`/writing/${posts[0].slug}`)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl lg:text-4xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">
        Scriptorium
      </h1>
      <p className="text-base text-muted-foreground [font-family:var(--font-disket)]">
        Nothing here yet.
      </p>
    </div>
  )
}
