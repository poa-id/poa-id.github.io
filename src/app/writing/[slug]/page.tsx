import { WritingArticle } from "@/components/writing-article"
import { getAllPosts, getPostBySlug } from "@/lib/posts"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function WritingPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return <WritingArticle post={post} />
}
