import { WritingShell } from "@/components/writing-shell"
import { getAllPosts } from "@/lib/posts"

export default function WritingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const posts = getAllPosts()

  return <WritingShell posts={posts}>{children}</WritingShell>
}
