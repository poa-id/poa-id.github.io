"use client"

import { useTheme } from "next-themes"
import { useRelics } from "@/contexts/relics-provider"
import { RelicIcon } from "@/components/relic-icons"
import { getThemeForSlug, type ThemedFaceSlug } from "@/lib/cube-face-themes"
import { RELICS_BY_ID, type RelicId } from "@/lib/relics"

const RELIC_FACE: Record<RelicId, ThemedFaceSlug> = {
  die: "shelf",
  key: "hearth",
  lantern: "deep",
}

interface RoomRelicProps {
  id: RelicId
  className?: string
}

export function RoomRelic({ id, className = "" }: RoomRelicProps) {
  const { ready, hasRelic, discover } = useRelics()
  const { resolvedTheme } = useTheme()
  const siteMode = resolvedTheme === "light" ? "light" : "dark"
  const face = RELIC_FACE[id]
  const palette = getThemeForSlug(face, face === "deep" ? "dark" : siteMode)

  if (!ready || hasRelic(id)) return null

  const iconSize =
    id === "lantern" ? "h-7 w-[13px]" : "w-7 h-7"

  return (
    <button
      type="button"
      tabIndex={-1}
      onClick={() => discover(id)}
      className={`opacity-[0.58] hover:opacity-95 active:opacity-100 transition-opacity cursor-pointer border-0 bg-transparent p-0 ${className}`}
      aria-label={RELICS_BY_ID[id].label}
    >
      <RelicIcon
        id={id}
        tone="map"
        mapColor={palette.text}
        className={iconSize}
      />
    </button>
  )
}
