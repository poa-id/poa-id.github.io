import { ROOMS } from "@/lib/room-content"

export interface CubeFaceStubContent {
  label: string
  archetype: string
  question: string
  body: string
  topics: string[]
}

function stubFromRoom(roomId: "garden" | "forge" | "hearth"): CubeFaceStubContent {
  const room = ROOMS[roomId]
  return {
    label: room.label,
    archetype: room.archetype,
    question: room.question,
    body: room.body,
    topics: room.topics ?? [],
  }
}

export const CUBE_FACE_STUBS: Record<"garden" | "forge" | "hearth", CubeFaceStubContent> = {
  garden: stubFromRoom("garden"),
  forge: stubFromRoom("forge"),
  hearth: stubFromRoom("hearth"),
}
