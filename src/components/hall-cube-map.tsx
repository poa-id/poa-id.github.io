"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useGamification } from "@/contexts/gamification-provider"
import {
  HALL_MAP_CELLS,
  MAP_COLS,
  MAP_ROWS,
  MAP_CELL_SIZE,
  getFaceHref,
  getRoomLabel,
  getRoomState,
  shouldRenderDeepCells,
  type MapDirection,
} from "@/lib/hall-cube-map"
import { getFaceForPath, isDeepPath } from "@/lib/cube-faces"

interface HallCubeMapProps {
  onNavigate?: () => void
  selectedDirection: MapDirection | null
  onSelectDirection: (direction: MapDirection | null) => void
}

export function HallCubeMap({
  onNavigate,
  selectedDirection,
  onSelectDirection,
}: HallCubeMapProps) {
  const pathname = usePathname()
  const { visitedFaces, deepMapUnlocked } = useGamification()

  const currentFace = getFaceForPath(pathname)
  const onDeep = isDeepPath(pathname)
  const showDeep = shouldRenderDeepCells(deepMapUnlocked)

  const currentDirection: MapDirection = onDeep ? "deep" : currentFace.direction

  const cells = HALL_MAP_CELLS.filter((cell) => {
    if (cell.direction === "deep" || cell.type === "descent") return showDeep
    return true
  })

  return (
    <div
      className="grid gap-1 shrink-0"
      style={{
        gridTemplateColumns: `repeat(${MAP_COLS}, minmax(0, ${MAP_CELL_SIZE}))`,
        gridTemplateRows: `repeat(${MAP_ROWS}, minmax(0, ${MAP_CELL_SIZE}))`,
      }}
    >
      {cells.map((cell, i) => {
        if (cell.type === "corridor") {
          return (
            <div
              key={`c-${i}`}
              className="flex items-center justify-center"
              style={{ gridRow: cell.row + 1, gridColumn: cell.col + 1 }}
            >
              <div className="w-[85%] h-[85%] max-w-[2rem] max-h-[2rem] rounded-sm bg-[#1a1816] border border-[#3d3830]" />
            </div>
          )
        }

        if (cell.type === "descent") {
          return (
            <div
              key={`d-${i}`}
              className="flex flex-col items-center justify-center text-[#6a4040]"
              style={{ gridRow: cell.row + 1, gridColumn: cell.col + 1 }}
              aria-hidden
            >
              <span className="text-lg leading-none">⇣</span>
              <span className="text-[8px] uppercase tracking-widest [font-family:var(--font-disket)] mt-0.5">
                down
              </span>
            </div>
          )
        }

        const direction = cell.direction!
        const state = getRoomState(direction, visitedFaces, deepMapUnlocked)
        const isHere = direction === currentDirection
        const isSelected = selectedDirection === direction
        const href = getFaceHref(direction)
        const label = getRoomLabel(direction)

        const baseClass =
          "relative flex flex-col items-center justify-center w-full h-full min-h-0 border-2 p-1 transition-all duration-200 [font-family:var(--font-disket)] overflow-hidden cursor-pointer"

        const style =
          state === "discovered"
            ? isHere
              ? "border-[#c4a882] bg-[#1a1814] text-[#e8d4b8] shadow-[0_0_12px_rgba(196,168,130,0.2)]"
              : isSelected
                ? "border-[#c4a882]/70 bg-[#161412] text-[#c4a882]"
                : "border-[#4a5c52] bg-[#141612] text-[#8fa89a] hover:border-[#6a8a7a] hover:text-[#a8c4b4]"
            : "border-[#3d2828]/80 bg-[#100e0e] text-[#5c3030] cursor-default opacity-70"

        const inner =
          state === "discovered" ? (
            <>
              <span className="text-[9px] uppercase tracking-wide leading-tight text-center line-clamp-2 break-words w-full">
                {label}
              </span>
              {isHere && (
                <span className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#c4a882]" />
              )}
            </>
          ) : (
            <span className="text-[10px] uppercase tracking-wide opacity-60">???</span>
          )

        const gridStyle = { gridRow: cell.row + 1, gridColumn: cell.col + 1 }

        if (state === "discovered" && href && !isHere) {
          return (
            <Link
              key={direction}
              href={href}
              onClick={() => onNavigate?.()}
              onMouseEnter={() => onSelectDirection(direction)}
              onFocus={() => onSelectDirection(direction)}
              className={`${baseClass} ${style}`}
              style={gridStyle}
              aria-label={`Enter ${label}`}
              aria-current={isSelected ? "true" : undefined}
            >
              {inner}
            </Link>
          )
        }

        return (
          <button
            key={direction}
            type="button"
            disabled={state !== "discovered"}
            onClick={() => state === "discovered" && onSelectDirection(direction)}
            onMouseEnter={() =>
              state === "discovered" && onSelectDirection(direction)
            }
            onFocus={() =>
              state === "discovered" && onSelectDirection(direction)
            }
            className={`${baseClass} ${style} disabled:cursor-default`}
            style={gridStyle}
            aria-label={
              state === "discovered"
                ? isHere
                  ? `${label} — you are here`
                  : label
                : "Uncharted room"
            }
            aria-current={isHere ? "location" : isSelected ? "true" : undefined}
          >
            {inner}
          </button>
        )
      })}
    </div>
  )
}
