import Image from "next/image"
import type { RelicId } from "@/lib/relics"

export const RELIC_ICON_ASSETS: Record<
  RelicId,
  { src: string; width: number; height: number }
> = {
  die: { src: "/images/relics/dice.svg", width: 32, height: 32 },
  key: { src: "/images/relics/key.svg", width: 32, height: 32 },
  lantern: { src: "/images/relics/lamp.svg", width: 28, height: 48 },
}

/** Map modal accent — matches hall-cube-map titles and current room */
export const MAP_RELIC_GOLD = "#c4a882"

export function RelicIcon({
  id,
  className = "w-5 h-5",
  invertOnLight = false,
  tone = "default",
  mapColor = MAP_RELIC_GOLD,
}: {
  id: RelicId
  className?: string
  invertOnLight?: boolean
  tone?: "default" | "map"
  mapColor?: string
}) {
  const asset = RELIC_ICON_ASSETS[id]

  if (tone === "map") {
    return (
      <span
        aria-hidden
        className={`inline-block shrink-0 ${className}`}
        style={{
          backgroundColor: mapColor,
          maskImage: `url(${asset.src})`,
          WebkitMaskImage: `url(${asset.src})`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      />
    )
  }

  const toneClass = invertOnLight ? "invert dark:invert-0" : ""

  return (
    <Image
      src={asset.src}
      alt=""
      width={asset.width}
      height={asset.height}
      className={`object-contain ${toneClass} ${className}`}
      aria-hidden
    />
  )
}
