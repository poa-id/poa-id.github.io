import ReactMarkdown from "react-markdown"
import type { Post } from "@/lib/posts"

const proseClasses =
  "space-y-4 [font-family:var(--font-disket)] text-base text-muted-foreground leading-relaxed [&_h2]:text-foreground [&_h2]:text-2xl [&_h2]:uppercase [&_h2]:tracking-wide [&_h2]:[font-family:var(--font-disket-bold)] [&_h2]:pt-4 [&_h3]:text-foreground [&_h3]:text-xl [&_h3]:[font-family:var(--font-disket-bold)] [&_h3]:pt-2 [&_strong]:text-foreground [&_strong]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:hover:opacity-70 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1 [&_p]:mb-2"

export function WritingArticle({ post }: { post: Post }) {
  return (
    <article className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm text-muted-foreground [font-family:var(--font-disket)]">
          {post.date}
        </p>
        <h1 className="text-3xl lg:text-4xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">
          {post.title}
        </h1>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-card border border-border dark:border-gray-800 rounded-md text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className={proseClasses}>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  )
}
