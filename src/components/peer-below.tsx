"use client"

import Link from "next/link"

export function PeerBelowLink({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/mines"
      className={`text-xs text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors [font-family:var(--font-disket)] ${className}`}
    >
      Peer below
    </Link>
  )
}
