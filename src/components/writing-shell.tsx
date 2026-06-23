"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { HomeEntryEdge, HomeEntryInline } from "@/components/home-entry"
import { RoomHeader } from "@/components/room-header"
import { useCubeFaceThemeForSlug } from "@/hooks/use-cube-face-theme"
import type { PostMeta } from "@/lib/posts"

interface WritingShellProps {
  posts: PostMeta[]
  children: React.ReactNode
}

export function WritingShell({ posts, children }: WritingShellProps) {
  const pathname = usePathname()
  const theme = useCubeFaceThemeForSlug("scriptorium")

  const activeSlug = pathname.startsWith("/writing/")
    ? pathname.replace("/writing/", "")
    : null

  return (
    <div
      className="h-screen w-full flex flex-col lg:flex-row animate-in fade-in slide-in-from-left-2 duration-500"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <HomeEntryEdge />

      {/* Sidebar — 20% */}
      <aside
        className="w-full lg:w-1/5 lg:min-w-[200px] lg:max-w-xs shrink-0 border-b lg:border-b-0 lg:border-r flex flex-col"
        style={{ borderColor: theme.border }}
      >
        <div
          className="flex items-center justify-between px-4 lg:px-6 py-4 lg:py-6 border-b"
          style={{ borderColor: theme.border }}
        >
          <span className="text-sm uppercase tracking-wide [font-family:var(--font-disket-bold)]">
            Scriptorium
          </span>
          <ThemeToggle />
        </div>

        <div
          className="px-4 lg:px-6 py-4 border-b"
          style={{ borderColor: theme.border }}
        >
          <RoomHeader roomId="scriptorium" textMuted={theme.textMuted} compact />
        </div>

        <nav className="flex-1 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden px-4 lg:px-6 py-4">
          {posts.length === 0 ? (
            <p className="text-sm [font-family:var(--font-disket)]" style={{ color: theme.textMuted }}>
              Nothing here yet.
            </p>
          ) : (
            <ul className="flex lg:flex-col gap-4 lg:gap-6">
              {posts.map((post) => {
                const isActive = activeSlug === post.slug
                return (
                  <li key={post.slug} className="shrink-0 lg:shrink">
                    <Link
                      href={`/writing/${post.slug}`}
                      className="block space-y-1 transition-colors"
                      style={{ color: isActive ? theme.text : theme.textMuted }}
                      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = theme.text }}
                      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = theme.textMuted }}
                    >
                      <p className="text-xs [font-family:var(--font-disket)]">{post.date}</p>
                      <p
                        className={`text-sm lg:text-base leading-snug ${
                          isActive
                            ? "[font-family:var(--font-disket-bold)]"
                            : "[font-family:var(--font-disket)]"
                        }`}
                      >
                        {post.title}
                      </p>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </nav>

        <div
          className="px-4 lg:px-6 py-4 lg:py-6 border-t lg:hidden"
          style={{ borderColor: theme.border }}
        >
          <HomeEntryInline />
        </div>
      </aside>

      {/* Content — 80% */}
      <main className="flex-1 overflow-y-auto" style={{ backgroundColor: theme.hover }}>
        <div className="w-[90%] lg:w-4/5 max-w-3xl mx-auto py-8 lg:py-12 px-4 lg:px-0">
          {children}
        </div>
      </main>
    </div>
  )
}
