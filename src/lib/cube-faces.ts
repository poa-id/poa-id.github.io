import { ROOMS } from "@/lib/room-content"

export type CubeDirection = "front" | "left" | "right" | "back" | "top" | "bottom"

export type FaceStatus = "available" | "locked"

export interface CubeFace {
  direction: CubeDirection
  label: string
  archetype: string
  question: string
  inscription: string
  href: string | null
  status: FaceStatus
  description: string
  dieValue: number
}

export const CUBE_FACES: CubeFace[] = [
  {
    direction: "front",
    label: ROOMS.hall.label,
    archetype: ROOMS.hall.archetype,
    question: ROOMS.hall.question,
    inscription: ROOMS.hall.marginalia,
    href: "/",
    status: "available",
    description: ROOMS.hall.body,
    dieValue: 1,
  },
  {
    direction: "left",
    label: ROOMS.scriptorium.label,
    archetype: ROOMS.scriptorium.archetype,
    question: ROOMS.scriptorium.question,
    inscription: ROOMS.scriptorium.marginalia,
    href: "/writing",
    status: "available",
    description: ROOMS.scriptorium.body,
    dieValue: 2,
  },
  {
    direction: "right",
    label: ROOMS.garden.label,
    archetype: ROOMS.garden.archetype,
    question: ROOMS.garden.question,
    inscription: ROOMS.garden.marginalia,
    href: "/garden",
    status: "available",
    description: ROOMS.garden.body,
    dieValue: 3,
  },
  {
    direction: "back",
    label: ROOMS.forge.label,
    archetype: ROOMS.forge.archetype,
    question: ROOMS.forge.question,
    inscription: ROOMS.forge.marginalia,
    href: "/forge",
    status: "available",
    description: ROOMS.forge.body,
    dieValue: 4,
  },
  {
    direction: "top",
    label: ROOMS.shelf.label,
    archetype: ROOMS.shelf.archetype,
    question: ROOMS.shelf.question,
    inscription: ROOMS.shelf.marginalia,
    href: "/shelf",
    status: "available",
    description: ROOMS.shelf.body,
    dieValue: 5,
  },
  {
    direction: "bottom",
    label: ROOMS.hearth.label,
    archetype: ROOMS.hearth.archetype,
    question: ROOMS.hearth.question,
    inscription: ROOMS.hearth.marginalia,
    href: "/hearth",
    status: "available",
    description: ROOMS.hearth.body,
    dieValue: 6,
  },
]

const PATH_FACE_MAP: [string, CubeDirection][] = [
  ["/writing", "left"],
  ["/garden", "right"],
  ["/forge", "back"],
  ["/shelf", "top"],
  ["/hearth", "bottom"],
]

export function isDeepPath(pathname: string): boolean {
  return pathname.startsWith("/mines")
}

export function getFaceForPath(pathname: string): CubeFace {
  if (isDeepPath(pathname)) {
    return CUBE_FACES.find((f) => f.direction === "front")!
  }
  for (const [prefix, direction] of PATH_FACE_MAP) {
    if (pathname.startsWith(prefix)) {
      return CUBE_FACES.find((f) => f.direction === direction)!
    }
  }
  return CUBE_FACES.find((f) => f.direction === "front")!
}

export function getFaceByDirection(direction: CubeDirection): CubeFace {
  return CUBE_FACES.find((f) => f.direction === direction)!
}
