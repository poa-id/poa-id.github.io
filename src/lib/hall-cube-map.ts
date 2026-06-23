import { CUBE_FACES, type CubeDirection } from "@/lib/cube-faces"
import { getRoomMarginalia } from "@/lib/room-content"

export type MapDirection = CubeDirection | "deep"

export type MapCellType = "room" | "corridor" | "descent"

export interface MapCell {
  type: MapCellType
  direction?: MapDirection
  row: number
  col: number
}

export const MAP_COLS = 8
export const MAP_ROWS = 5
export const MAP_CELL_SIZE = "3.25rem"

export const CUBE_ROOM_COUNT = 6

/** Center spine col 3. Deep descends from Forge (col 7), not Hearth. */
export const HALL_MAP_CELLS: MapCell[] = [
  { type: "room", direction: "top", row: 0, col: 3 },
  { type: "corridor", row: 1, col: 3 },
  { type: "room", direction: "left", row: 2, col: 0 },
  { type: "corridor", row: 2, col: 1 },
  { type: "corridor", row: 2, col: 2 },
  { type: "room", direction: "front", row: 2, col: 3 },
  { type: "corridor", row: 2, col: 4 },
  { type: "room", direction: "right", row: 2, col: 5 },
  { type: "corridor", row: 2, col: 6 },
  { type: "room", direction: "back", row: 2, col: 7 },
  { type: "corridor", row: 3, col: 3 },
  { type: "room", direction: "bottom", row: 4, col: 3 },
  { type: "descent", row: 3, col: 7 },
  { type: "room", direction: "deep", row: 4, col: 7 },
]

export const ROOM_ANNOTATIONS: Record<MapDirection, string> = {
  front: getRoomMarginalia("front"),
  left: getRoomMarginalia("left"),
  right: getRoomMarginalia("right"),
  back: getRoomMarginalia("back"),
  bottom: getRoomMarginalia("bottom"),
  top: getRoomMarginalia("top"),
  deep: getRoomMarginalia("deep"),
}

export function getRoomLabel(direction: MapDirection): string {
  if (direction === "deep") return "The Deep"
  const face = CUBE_FACES.find((f) => f.direction === direction)
  if (!face) return "?"
  if (direction === "front") return face.archetype
  return face.label
}

export function getFaceHref(direction: MapDirection): string | null {
  if (direction === "deep") return "/mines"
  return CUBE_FACES.find((f) => f.direction === direction)?.href ?? null
}

export function getRoomState(
  direction: MapDirection,
  visitedFaces: CubeDirection[],
  deepMapUnlocked: boolean
): "hidden" | "discovered" {
  if (direction === "deep") {
    return deepMapUnlocked ? "discovered" : "hidden"
  }
  if (direction === "front") return "discovered"
  return visitedFaces.includes(direction) ? "discovered" : "hidden"
}

export function shouldRenderDeepCells(deepMapUnlocked: boolean): boolean {
  return deepMapUnlocked
}
