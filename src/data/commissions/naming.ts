import type { ColorIdentity, Subject } from "@/lib/commissions/types"
import type { SeededRng } from "@/lib/commissions/random"

const ADJECTIVES = [
  "Moss-Crowned",
  "Hollow",
  "Last",
  "Bronze",
  "Ashen",
  "Quiet",
  "Low",
  "Long",
  "Salt",
  "Tin",
  "Wicker",
  "Wet",
  "Spare",
  "Old",
  "Second",
  "Narrow",
  "Uncounted",
  "Common",
  "Late",
  "Hidden",
  "Measured",
  "Borrowed",
  "Unlit",
  "Upright",
  "Bent",
  "Far",
  "Inner",
  "Outer",
  "Winter",
  "Harvest",
]

const NOUNS = [
  "Tithe",
  "Bell",
  "Keeper",
  "Shepherd",
  "Abbey",
  "Orchard",
  "Weir",
  "Kiln",
  "Ledger",
  "Ford",
  "Hearth",
  "Gate",
  "Measure",
  "Offering",
  "Cut",
  "Watch",
  "Threshing",
  "Cairn",
  "Net",
  "Quarry",
  "Vestry",
  "Mill",
  "Dike",
  "Reliquary",
  "Drove",
  "Stillroom",
  "Tally",
  "Landing",
  "Byre",
  "Spit",
]

const ROLES = [
  "Keeper",
  "Shepherd",
  "Pilgrim",
  "Surveyor",
  "Bell-ringer",
  "Warden",
  "Carrier",
  "Tither",
  "Miller",
  "Watch",
  "Drover",
  "Copyist",
  "Ferryman",
  "Orchardist",
  "Mason",
  "Tanner",
  "Beekeeper",
  "Saltwife",
  "Quarryman",
  "Novice",
]

const PLACES = [
  "Karden",
  "the Mere",
  "the Abbey",
  "the Hollow Road",
  "Ashford",
  "the Low Fields",
  "Vell",
  "the Cut",
  "Saltgate",
  "the Weirs",
  "Red Kiln",
  "the Long Barn",
  "Barley Bridge",
  "the Stacks",
  "Cold Kitchen",
  "West Dike",
  "the Tithe-yard",
  "Grey Coppice",
  "the Inner Ward",
  "Hallow Fen",
  "the Old Quay",
  "Mile Cross",
  "the Upper Fold",
  "Lamp Row",
]

const VERBS = [
  "Remembers",
  "Waits",
  "Turns",
  "Keeps",
  "Returns",
  "Thins",
  "Holds",
  "Breaks",
  "Gathers",
  "Settles",
  "Listens",
  "Opens",
]

const COLOR_NAME_BIAS: Partial<Record<ColorIdentity, string[]>> = {
  white: ["Bell", "Tithe", "Abbey", "Measure", "Ward", "Vestry"],
  blue: ["Mere", "Weir", "Measure", "Ledger", "Quay", "Net"],
  black: ["Tithe", "Ledger", "Cairn", "Stillroom", "Reliquary", "Cut"],
  red: ["Kiln", "Quarry", "Spit", "Watch", "Cut", "Forge"],
  green: ["Orchard", "Shepherd", "Coppice", "Drove", "Tithe", "Byre"],
  colorless: ["Measure", "Quarry", "Kiln", "Stacks", "Cut", "Gate"],
}

const SUBJECT_NAME_BIAS: Partial<Record<Subject, string[]>> = {
  character: ["Keeper", "Shepherd", "Pilgrim", "Surveyor", "Novice"],
  creature: ["Shepherd", "Offering", "Watch", "Mere", "Hollow"],
  beast: ["Drove", "Shepherd", "Fold", "Byre", "Orchard"],
  "plant-fungus": ["Orchard", "Coppice", "Tithe", "Stillroom", "Harvest"],
  artifact: ["Reliquary", "Ledger", "Measure", "Bell", "Tally"],
  "weapon-tool": ["Cut", "Quarry", "Spit", "Watch", "Measure"],
  architecture: ["Abbey", "Gate", "Mill", "Ward", "Kiln"],
  "environment-land": ["Mere", "Ford", "Dike", "Orchard", "Fen"],
  "construct-machine": ["Mill", "Kiln", "Measure", "Stacks", "Wheel"],
  "group-scene": ["Tithe", "Procession", "Watch", "Harvest", "Drove"],
  "spell-moment": ["Bell", "Turning", "Weather", "Opening", "Quiet"],
}

function maybeColorWord(rng: SeededRng, color: ColorIdentity): string | null {
  const pool = COLOR_NAME_BIAS[color]
  if (!pool || !rng.chance(0.35)) return null
  return rng.pick(pool)
}

export function generateTitle(
  rng: SeededRng,
  ctx: { subject: Subject; color: ColorIdentity; environmentName: string }
): string {
  const colorWord = maybeColorWord(rng, ctx.color)
  const subjectPool = SUBJECT_NAME_BIAS[ctx.subject] ?? NOUNS
  const adj = rng.pick(ADJECTIVES)
  const noun = rng.pick(NOUNS.filter((item) => item.toLowerCase() !== adj.toLowerCase()))
  const role = rng.pick(ROLES)
  const place = rng.pick(PLACES)
  const subjectWord = rng.pick(
    subjectPool.filter((item) => item.toLowerCase() !== adj.toLowerCase())
  ) || noun

  const pattern = rng.int(8)

  switch (pattern) {
    case 0:
      return `The ${adj} ${noun}`
    case 1:
      return `The ${adj} ${subjectWord} of ${place}`
    case 2: {
      const placeNoun = rng.pick(["Orchard", "Abbey", "Gate", "Weir", "Kiln", "Fold", "Mill"])
      return `${placeNoun} ${role}`
    }
    case 3:
      return `${noun} Beneath the ${rng.pick(["Abbey", "Mill", "Ward", "Orchard", "Stacks", "Quay"])}`
    case 4:
      return `${role} of the ${adj} ${rng.pick(["Road", "Mere", "Fold", "Cut", "Yard", "Fen"])}`
    case 5:
      return `The ${colorWord ?? rng.pick(["Bronze", "Tin", "Ashen", "Wicker", "Salt"])} ${role}`
    case 6:
      return `Where the ${rng.pick(["River", "Bell", "Orchard", "Road", "Mere", "Kiln"])} ${rng.pick(VERBS)}`
    default: {
      const envBit = ctx.environmentName.split(" ").slice(-1)[0] ?? "Road"
      const titled = envBit.charAt(0).toUpperCase() + envBit.slice(1)
      return rng.chance(0.5)
        ? `The Last ${noun} of ${place}`
        : `${adj} ${titled}`
    }
  }
}
