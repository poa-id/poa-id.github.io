"use client"

import Link from "next/link"
import { Nav } from "@/components/nav"
import { Linkedin, Mail, ArrowLeft } from "lucide-react"
import { useState } from "react"

export default function CorrespondencePage() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText("pjoa93@gmail.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <Nav />

      <main className="flex-1 flex items-center justify-center px-6 py-12 pt-32 lg:pt-36">
        <div className="max-w-md w-full space-y-10">
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors [font-family:var(--font-disket)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to the Hall
            </Link>
            <h1 className="text-2xl lg:text-3xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">
              Correspondence
            </h1>
            <p className="text-sm italic text-muted-foreground [font-family:var(--font-disket)]">
              A mailbox outside the house.
            </p>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground [font-family:var(--font-disket)]">
            If something here resonated with you — a piece of work, an essay, a room
            you wandered into — feel free to write. This isn&apos;t a newsletter funnel
            or a creator platform. It&apos;s an invitation to reach out.
          </p>

          <div className="space-y-3">
            <button
              onClick={copyEmail}
              className="w-full flex items-center gap-4 px-5 py-4 border border-border dark:border-gray-800 hover:bg-muted/50 transition-colors text-left"
            >
              <Mail className="h-5 w-5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm [font-family:var(--font-disket-bold)]">Email</p>
                <p className="text-sm text-muted-foreground [font-family:var(--font-disket)]">
                  {copied ? "Copied to clipboard" : "pjoa93@gmail.com — click to copy"}
                </p>
              </div>
            </button>

            <Link
              href="https://www.linkedin.com/in/pedro-ossorio-arana/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-4 px-5 py-4 border border-border dark:border-gray-800 hover:bg-muted/50 transition-colors"
            >
              <Linkedin className="h-5 w-5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm [font-family:var(--font-disket-bold)]">LinkedIn</p>
                <p className="text-sm text-muted-foreground [font-family:var(--font-disket)]">
                  Professional correspondence
                </p>
              </div>
            </Link>
          </div>

          <div className="pt-4 border-t border-border dark:border-gray-800 space-y-2">
            <p className="text-xs uppercase tracking-wide text-muted-foreground [font-family:var(--font-disket)]">
              Eventually
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 [font-family:var(--font-disket)] opacity-70">
              <li>· RSS feed for the Scriptorium</li>
              <li>· Optional low-frequency notes</li>
              <li>· Guestbook — if it ever feels right</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
