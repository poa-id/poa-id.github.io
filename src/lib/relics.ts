export type RelicId = "die" | "key" | "lantern"

export interface RelicDefinition {
  id: RelicId
  label: string
  foundIn: string
  narratorText: string
  marginalia: string
}

export type RelicsState = Record<RelicId, boolean>

export const RELIC_STORAGE_KEY = "poa-house-relics"

export const DEFAULT_RELICS_STATE: RelicsState = {
  die: false,
  key: false,
  lantern: false,
}

export const RELIC_LIST: RelicDefinition[] = [
  {
    id: "die",
    label: "Die",
    foundIn: "The Shelf",
    narratorText:
      "You pocket the die.\n\nIts corners have been worn smooth by years of handling.",
    marginalia: "Worn smooth by years of handling.",
  },
  {
    id: "key",
    label: "Key",
    foundIn: "The Hearth",
    narratorText:
      "You pocket the key.\n\nIts lock is nowhere to be found.",
    marginalia: "Its lock is nowhere to be found.",
  },
  {
    id: "lantern",
    label: "Lantern",
    foundIn: "The Deep",
    narratorText:
      "You lift the lantern.\n\nSomeone came down here before you.",
    marginalia: "Someone came down here before you.",
  },
]

export const RELICS_BY_ID = Object.fromEntries(
  RELIC_LIST.map((relic) => [relic.id, relic])
) as Record<RelicId, RelicDefinition>
