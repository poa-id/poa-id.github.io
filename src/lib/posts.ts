import fs from "fs"
import path from "path"
import matter from "gray-matter"

const POSTS_DIR = path.join(process.cwd(), "content/writing")

export interface PostMeta {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt?: string
}

export interface Post extends PostMeta {
  content: string
}

function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""))
}

export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs()

  const posts = slugs.map((slug) => {
    const fullPath = path.join(POSTS_DIR, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      tags: data.tags || [],
      excerpt: data.excerpt || data.description || undefined,
    }
  })

  // Newest first
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(POSTS_DIR, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    tags: data.tags || [],
    excerpt: data.excerpt || data.description || undefined,
    content,
  }
}