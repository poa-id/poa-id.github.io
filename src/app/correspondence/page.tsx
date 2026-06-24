"use client"

import Link from "next/link"
import { ArrowLeft, Instagram, Linkedin, Mail, Rss } from "lucide-react"
import { useState } from "react"
import { Nav } from "@/components/nav"

const EMAIL = "pjoa93@gmail.com"

const iconLinkClass =
  "inline-flex items-center justify-center w-9 h-9 border border-border dark:border-gray-800 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"

export default function CorrespondencePage() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <Nav />

      <main className="flex-1 flex items-center justify-center px-6 py-12 pt-32 lg:pt-36">
        <div className="max-w-md w-full space-y-10">
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors [font-family:var(--font-disket)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to the Hall
            </Link>

            <div className="space-y-2">
              <h1 className="text-2xl lg:text-3xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">
                Correspondence
              </h1>
              <p className="text-sm italic text-muted-foreground [font-family:var(--font-disket)]">
                A letter left at the gate.
              </p>
            </div>

            <div className="space-y-3 text-sm leading-relaxed text-muted-foreground [font-family:var(--font-disket)]">
              <p>
                If something here resonated with you—a piece of work, an essay, an
                idea, or simply a room you found yourself returning to—you&apos;re
                welcome to write.
              </p>
              <p>I read all correspondence</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground [font-family:var(--font-disket)]">
              Leave a Letter
            </h2>

            <button
              type="button"
              onClick={copyEmail}
              className="w-full text-left space-y-1 py-1 group"
            >
              <p className="text-base text-foreground group-hover:opacity-80 transition-opacity [font-family:var(--font-disket-bold)]">
                {EMAIL}
              </p>
              <p className="text-xs text-muted-foreground [font-family:var(--font-disket)]">
                {copied ? "Copied to clipboard" : "Click to copy"}
              </p>
            </button>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={copyEmail}
                className={iconLinkClass}
                aria-label="Copy email address"
              >
                <Mail className="h-4 w-4" />
              </button>
              <a
                href="https://www.linkedin.com/in/pedro-ossorio-arana/"
                target="_blank"
                rel="noopener noreferrer"
                className={iconLinkClass}
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/poa.craft/"
                target="_blank"
                rel="noopener noreferrer"
                className={iconLinkClass}
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="/rss.xml"
                className={iconLinkClass}
                aria-label="Scriptorium RSS feed"
              >
                <Rss className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
