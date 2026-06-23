/** Scroll icons — inline SVG so currentColor follows the theme. */

const SCROLL_CLOSED = "/images/map-scroll-closed.png"
const SCROLL_OPEN = "/images/map-scroll-open.png"

function ScrollArt({
  src,
  maskId,
  className = "h-7 w-7",
}: {
  src: string
  maskId: string
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 150 150"
      className={`shrink-0 ${className}`}
      aria-hidden
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="150" height="150">
          <image href={src} width="150" height="150" />
        </mask>
      </defs>
      <rect width="150" height="150" fill="currentColor" mask={`url(#${maskId})`} />
    </svg>
  )
}

export function MapScrollIcon({
  open,
  className = "h-7 w-7",
}: {
  open: boolean
  className?: string
}) {
  return (
    <ScrollArt
      src={open ? SCROLL_OPEN : SCROLL_CLOSED}
      maskId={open ? "map-scroll-open" : "map-scroll-closed"}
      className={className}
    />
  )
}
