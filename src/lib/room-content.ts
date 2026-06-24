import type { CubeDirection } from "@/lib/cube-faces"

export type RoomId =
  | "hall"
  | "scriptorium"
  | "garden"
  | "forge"
  | "shelf"
  | "hearth"
  | "deep"

export interface RoomContent {
  id: RoomId
  label: string
  archetype: string
  /** Frames the room on its page */
  question: string
  /** Short poetic line for the house map marginalia */
  marginalia: string
  body: string
  /** Homepage welcome copy for The Hall */
  homeWelcome?: {
    name: string
    roles: string[]
    paragraphs: string[]
    closing: string
  }
  gameTeaser?: {
    title: string
    description: string
  }
  topics?: string[]
}

/** Single source of truth for room copy. Questions frame each space; marginalia stays poetic. */
export const ROOMS: Record<RoomId, RoomContent> = {
  hall: {
    id: "hall",
    label: "Home",
    archetype: "The Hall",
    question: "Where am I?",
    marginalia: "The crossroads",
    body:
      "A personal domain with a professional facade. Some rooms hold work; others hold what shapes it.",
    homeWelcome: {
      name: "Pedro Ossorio Arana",
      roles: ["Product Designer.", "Artist.", "Builder."],
      paragraphs: [
        "A personal sanctum with a professional facade.",
        "This room contain professional work.\nOthers contain the things that shape it.",
      ],
      closing: "Be welcome and wander freely",
    },
  },
  scriptorium: {
    id: "scriptorium",
    label: "Scriptorium",
    archetype: "The Thinker",
    question: "What do I think?",
    marginalia: "Thoughts worth keeping.",
    body:
      "Essays and notes, rambling and thought. Problems I'm sitting with, things I'm working out in writing.",
  },
  garden: {
    id: "garden",
    label: "The Garden",
    archetype: "The Steward",
    question: "What am I cultivating?",
    marginalia: "What is tended grows.",
    body:
      "A garden changes living things through care.\n\nThis room is about the things that improve slowly through attention.",
    topics: [
      "Gardening & bonsai",
      "Muay Thai & kettlebells",
      "Welding, knifemaking, hands-on craft",
      "Concept art & deliberate practice",
      "Slow living, land, tools",
    ],
  },
  forge: {
    id: "forge",
    label: "Forge",
    archetype: "The Builder",
    question: "What am I building?",
    marginalia: "Here be tinkering and trashing",
    body:
      "Here I tinker. This room contains things I have built, broken, and learned from.",
    topics: [
      "The Guild (practice trackers, writing app)",
      "This portfolio",
      "The Hearth & The Deep",
      "Fireside",
      "Experiments that may not ship",
    ],
  },
  shelf: {
    id: "shelf",
    label: "Shelf",
    archetype: "The Learner",
    question: "What is shaping me?",
    marginalia: "The things that feed the work.",
    body:
      "Is it Tolkien on the nightstand again? Authors that I keep coming back to, books and interests that are on my plate right now.",
  },
  hearth: {
    id: "hearth",
    label: "Hearth",
    archetype: "The Householder",
    question: "What am I building a life around?",
    marginalia: "A life built close to the ground.",
    body:
      "Family first — everything else orbits that. The house projects, meals, the ordinary rhythm of an embodied life close to the ground, but looking upwards.",
    topics: [
      "Father & husband",
      "House & garden projects",
      "Cooking & the table",
      "Daily rhythms",
    ],
  },
  deep: {
    id: "deep",
    label: "The Deep",
    archetype: "The Dreamer",
    question: "What am I dreaming about?",
    marginalia: "The Dream realm",
    body:
      "The Deep is where fascination, myth, imagination, and personal projects take root before they become anything else. This is the faerie realm.",
    gameTeaser: {
      title: "The Hearth & The Deep",
      description:
        "A game about one dwarf, a dead mountain, and color slowly returning. Strike ore, tend the hearth, rekindle. Side project.",
    },
  },
}

const DIRECTION_TO_ROOM: Record<CubeDirection, RoomId> = {
  front: "hall",
  left: "scriptorium",
  right: "garden",
  back: "forge",
  top: "shelf",
  bottom: "hearth",
}

export function getRoomByDirection(direction: CubeDirection): RoomContent {
  return ROOMS[DIRECTION_TO_ROOM[direction]]
}

export function getRoomByMapDirection(
  direction: CubeDirection | "deep"
): RoomContent {
  if (direction === "deep") return ROOMS.deep
  return getRoomByDirection(direction)
}

export function getRoomQuestion(direction: CubeDirection | "deep"): string {
  return getRoomByMapDirection(direction).question
}

export function getRoomMarginalia(direction: CubeDirection | "deep"): string {
  return getRoomByMapDirection(direction).marginalia
}
