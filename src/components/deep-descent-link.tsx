"use client"

import Link from "next/link"
import Image from "next/image"
import { useCubeFaceThemeForSlug } from "@/hooks/use-cube-face-theme"
import { useGamification } from "@/contexts/gamification-provider"

export function DeepDescentLink({ className = "" }: { className?: string }) {
  const theme = useCubeFaceThemeForSlug("forge")
  const { unlockDeepMap } = useGamification()

  const handleClick = () => {
    unlockDeepMap()
  }

  return (
    <Link
      href="/mines"
      onClick={handleClick}
      className={`inline-flex items-center justify-center p-3 border transition-opacity opacity-50 hover:opacity-100 ${className}`}
      style={{ borderColor: theme.border }}
      aria-label="Peer below — descend to The Deep"
      title="Peer below"
    >
      <Image
        src="/images/dwarf-helmet.png"
        alt=""
        width={28}
        height={28}
        className="h-7 w-7 dark:invert"
      />
    </Link>
  )
}
