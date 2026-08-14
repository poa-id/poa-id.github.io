import type { ColorIdentity, Subject } from "@/lib/commissions/types"
import { SUBJECT_IDS } from "@/lib/commissions/types"

export interface ColorDef {
  id: ColorIdentity
  label: string
  parts: Array<"white" | "blue" | "black" | "red" | "green">
  pickWeight: number
}

export const COLOR_IDENTITIES: ColorDef[] = [
  { id: "white", label: "White", parts: ["white"], pickWeight: 3 },
  { id: "blue", label: "Blue", parts: ["blue"], pickWeight: 3 },
  { id: "black", label: "Black", parts: ["black"], pickWeight: 3 },
  { id: "red", label: "Red", parts: ["red"], pickWeight: 3 },
  { id: "green", label: "Green", parts: ["green"], pickWeight: 3 },
  { id: "white-blue", label: "White / Blue", parts: ["white", "blue"], pickWeight: 2 },
  { id: "blue-black", label: "Blue / Black", parts: ["blue", "black"], pickWeight: 2 },
  { id: "black-red", label: "Black / Red", parts: ["black", "red"], pickWeight: 2 },
  { id: "red-green", label: "Red / Green", parts: ["red", "green"], pickWeight: 2 },
  { id: "green-white", label: "Green / White", parts: ["green", "white"], pickWeight: 2 },
  { id: "white-black", label: "White / Black", parts: ["white", "black"], pickWeight: 2 },
  { id: "blue-red", label: "Blue / Red", parts: ["blue", "red"], pickWeight: 2 },
  { id: "black-green", label: "Black / Green", parts: ["black", "green"], pickWeight: 2 },
  { id: "red-white", label: "Red / White", parts: ["red", "white"], pickWeight: 2 },
  { id: "green-blue", label: "Green / Blue", parts: ["green", "blue"], pickWeight: 2 },
  { id: "colorless", label: "Colorless", parts: [], pickWeight: 1.4 },
]

export const COLOR_BY_ID: Record<ColorIdentity, ColorDef> = Object.fromEntries(
  COLOR_IDENTITIES.map((color) => [color.id, color])
) as Record<ColorIdentity, ColorDef>

function fillSubjectWeights(
  overrides: Partial<Record<Subject, number>>
): Record<Subject, number> {
  const weights = {} as Record<Subject, number>
  for (const id of SUBJECT_IDS) weights[id] = overrides[id] ?? 1
  return weights
}

export const COLOR_SUBJECT_WEIGHTS: Record<ColorIdentity, Record<Subject, number>> = {
  white: fillSubjectWeights({
    character: 2.4,
    "group-scene": 2.8,
    architecture: 2.6,
    "environment-land": 1.6,
    artifact: 1.4,
    "weapon-tool": 1.2,
    "spell-moment": 1.3,
    creature: 0.8,
    beast: 0.7,
    "plant-fungus": 0.9,
    "construct-machine": 1.1,
  }),
  blue: fillSubjectWeights({
    creature: 2.2,
    artifact: 2,
    architecture: 2.1,
    "environment-land": 2.3,
    "spell-moment": 2.2,
    "construct-machine": 1.8,
    character: 1.3,
    "plant-fungus": 1.1,
    beast: 0.9,
    "group-scene": 1.1,
    "weapon-tool": 1.2,
  }),
  black: fillSubjectWeights({
    creature: 2.3,
    character: 2,
    artifact: 1.8,
    "environment-land": 1.8,
    "spell-moment": 2,
    architecture: 1.4,
    "plant-fungus": 1.6,
    "group-scene": 1.5,
    beast: 1.2,
    "weapon-tool": 1.3,
    "construct-machine": 1.2,
  }),
  red: fillSubjectWeights({
    character: 2,
    "weapon-tool": 2.2,
    "construct-machine": 2.1,
    "spell-moment": 2.2,
    "environment-land": 1.7,
    architecture: 1.4,
    "group-scene": 1.8,
    beast: 1.5,
    creature: 1.3,
    artifact: 1.4,
    "plant-fungus": 0.7,
  }),
  green: fillSubjectWeights({
    beast: 3,
    "plant-fungus": 3.2,
    creature: 2.6,
    "environment-land": 2.8,
    "group-scene": 1.4,
    character: 1.1,
    architecture: 0.8,
    artifact: 0.8,
    "weapon-tool": 1,
    "construct-machine": 0.6,
    "spell-moment": 1.3,
  }),
  "white-blue": fillSubjectWeights({
    architecture: 2.8,
    character: 2,
    artifact: 2,
    "group-scene": 1.8,
    "spell-moment": 1.6,
    "environment-land": 1.5,
    "construct-machine": 1.5,
    creature: 1.1,
  }),
  "blue-black": fillSubjectWeights({
    creature: 2.4,
    artifact: 2.2,
    "spell-moment": 2.3,
    architecture: 1.8,
    character: 1.7,
    "environment-land": 1.8,
    "construct-machine": 1.6,
  }),
  "black-red": fillSubjectWeights({
    character: 2.2,
    "weapon-tool": 2.2,
    "construct-machine": 2,
    "spell-moment": 2,
    architecture: 1.5,
    "group-scene": 1.7,
    creature: 1.5,
  }),
  "red-green": fillSubjectWeights({
    beast: 2.6,
    creature: 2.2,
    "environment-land": 2.4,
    "spell-moment": 1.8,
    "plant-fungus": 2,
    character: 1.4,
    "weapon-tool": 1.5,
  }),
  "green-white": fillSubjectWeights({
    "plant-fungus": 2.4,
    "environment-land": 2.6,
    "group-scene": 2.4,
    beast: 2,
    architecture: 1.8,
    character: 1.8,
    creature: 1.4,
  }),
  "white-black": fillSubjectWeights({
    "group-scene": 2.6,
    architecture: 2.4,
    character: 2.2,
    artifact: 1.8,
    "spell-moment": 1.8,
    "environment-land": 1.5,
    creature: 1.3,
  }),
  "blue-red": fillSubjectWeights({
    "spell-moment": 2.6,
    "construct-machine": 2.3,
    artifact: 2,
    "environment-land": 2,
    character: 1.6,
    architecture: 1.5,
    creature: 1.4,
  }),
  "black-green": fillSubjectWeights({
    creature: 2.8,
    "plant-fungus": 2.8,
    "environment-land": 2.4,
    beast: 2.2,
    "spell-moment": 1.7,
    character: 1.3,
    architecture: 1.1,
  }),
  "red-white": fillSubjectWeights({
    "group-scene": 2.6,
    architecture: 2.4,
    character: 2.3,
    "weapon-tool": 2,
    "spell-moment": 1.6,
    "construct-machine": 1.5,
    beast: 1.2,
  }),
  "green-blue": fillSubjectWeights({
    creature: 2.6,
    "environment-land": 2.8,
    "plant-fungus": 2.2,
    "spell-moment": 2,
    architecture: 1.6,
    beast: 1.8,
    artifact: 1.5,
  }),
  colorless: fillSubjectWeights({
    artifact: 2.8,
    "construct-machine": 2.8,
    architecture: 2.2,
    "weapon-tool": 2,
    "environment-land": 1.6,
    creature: 1.2,
    "spell-moment": 1.1,
    character: 0.8,
    beast: 0.7,
    "plant-fungus": 0.8,
    "group-scene": 0.7,
  }),
}

export const COLOR_ENV_TAGS: Record<ColorIdentity, Record<string, number>> = {
  white: {
    sacred: 2.4,
    civic: 2.3,
    agricultural: 2,
    domestic: 1.8,
    fortified: 2.1,
    ordered: 2.2,
    rural: 1.6,
  },
  blue: {
    water: 2.8,
    sky: 2.2,
    coastal: 2.3,
    scholarly: 2.2,
    atmospheric: 2.4,
    interior: 1.5,
    strange: 2,
    civic: 1.4,
  },
  black: {
    death: 2.6,
    decay: 2.4,
    swamp: 2.5,
    underground: 2.4,
    unsettling: 2.3,
    interior: 1.6,
    ruin: 1.8,
  },
  red: {
    mountain: 2.4,
    industrial: 2.3,
    fire: 2.6,
    volcanic: 2.3,
    wreckage: 2,
    action: 1.8,
    interior: 1.4,
  },
  green: {
    wilderness: 2.8,
    forest: 2.7,
    growth: 2.4,
    agricultural: 1.8,
    ancient: 2.1,
    rural: 1.9,
    swamp: 1.6,
  },
  "white-blue": { sacred: 2.2, scholarly: 2.4, civic: 2.2, ordered: 2.3, sky: 1.8, coastal: 1.6 },
  "blue-black": { water: 2.4, underground: 2.2, scholarly: 2.1, strange: 2.4, decay: 1.8, atmospheric: 2 },
  "black-red": { industrial: 2.4, underground: 2.2, fire: 2.3, wreckage: 2.2, death: 1.8, mountain: 1.7 },
  "red-green": { wilderness: 2.3, mountain: 2.2, volcanic: 2.2, forest: 1.8, fire: 2, growth: 1.7 },
  "green-white": { agricultural: 2.6, rural: 2.4, sacred: 2, forest: 2, domestic: 1.8, growth: 2.1 },
  "white-black": { sacred: 2.4, death: 2.3, civic: 2, ordered: 2.1, fortified: 1.8, ruin: 1.6 },
  "blue-red": { sky: 2.4, industrial: 2, water: 1.8, atmospheric: 2.2, fire: 1.7, strange: 1.8 },
  "black-green": { swamp: 2.8, forest: 2.4, decay: 2.6, growth: 2.3, underground: 1.8, ancient: 2.1 },
  "red-white": { fortified: 2.5, civic: 2.2, industrial: 1.8, mountain: 1.6, wreckage: 1.7, agricultural: 1.3 },
  "green-blue": { water: 2.6, forest: 2.3, atmospheric: 2.5, strange: 2.2, coastal: 2.1, growth: 1.8 },
  colorless: { underground: 2.2, industrial: 2.1, ruin: 2, ordered: 1.6, mountain: 1.5, interior: 1.5 },
}

export const COLOR_ATMOSPHERE: Record<ColorIdentity, string[]> = {
  white: [
    "Keep the mood civil and deliberate rather than triumphant.",
    "Order should appear as maintenance, ritual and shared labor, not banners and halos.",
  ],
  blue: [
    "Favor distance, reflection and withheld information over spectacle.",
    "The strange quality should sit in atmosphere and anatomy, not in obvious enchantment.",
  ],
  black: [
    "Let ambition, decay or quiet dread sit in the scene without theatrical villainy.",
    "Death and use should look ordinary to the people who live with them.",
  ],
  red: [
    "Heat, impulse and force should be visible in bodies and materials, not only in fire.",
    "Prefer a specific violent or industrial moment over generic rage.",
  ],
  green: [
    "Treat growth, hunger and age as natural processes, including rot.",
    "Wilderness should feel inhabited by its own logic, not staged as a backdrop for a hero.",
  ],
  "white-blue": [
    "The intersection is measured knowledge: archives, law, survey, liturgy, clean construction.",
  ],
  "blue-black": [
    "The intersection is forbidden or costly knowledge: drowned records, autopsy, tide-clocks, secrets kept wet.",
  ],
  "black-red": [
    "The intersection is will turned into damage: mines, kilns, raids, bargains paid in heat and blood.",
  ],
  "red-green": [
    "The intersection is living force: rut, wildfire, calving glaciers, beasts that will not be fenced.",
  ],
  "green-white": [
    "The intersection is tended land: orchards, tithe, hedgerows, harvest law, sacred groves that people still use.",
  ],
  "white-black": [
    "The intersection is formalized death and duty: funerals, oaths, ledgers of the dead, grim public order.",
  ],
  "blue-red": [
    "The intersection is unstable invention: storms, failed engines, experiments that change the air.",
  ],
  "black-green": [
    "The intersection is ecology of rot: fungal woods, flooded orchards, scavengers, growth feeding on remains.",
  ],
  "red-white": [
    "The intersection is organized force: musters, masonry under repair after assault, banners as administration.",
  ],
  "green-blue": [
    "The intersection is living water and odd nature: drowned forest, mist, migratory beasts, slow strange tides.",
  ],
  colorless: [
    "Absence of hue philosophy: mineral, geometric, mute, un-living. Mood comes from material and space.",
  ],
}

export const COLOR_LIGHTING_TAGS: Record<ColorIdentity, string[]> = {
  white: ["day", "overcast", "interior-warm", "dawn"],
  blue: ["overcast", "water", "moon", "atmospheric", "dawn"],
  black: ["night", "interior-low", "overcast", "underground"],
  red: ["fire", "harsh", "storm", "industrial"],
  green: ["dapple", "overcast", "dawn", "bioluminescent"],
  "white-blue": ["day", "overcast", "dawn", "atmospheric"],
  "blue-black": ["moon", "water", "underground", "atmospheric"],
  "black-red": ["fire", "underground", "industrial", "night"],
  "red-green": ["harsh", "dapple", "fire", "storm"],
  "green-white": ["dawn", "dapple", "day", "overcast"],
  "white-black": ["overcast", "interior-warm", "dawn", "night"],
  "blue-red": ["storm", "water", "industrial", "harsh"],
  "black-green": ["dapple", "underground", "bioluminescent", "overcast"],
  "red-white": ["harsh", "day", "fire", "industrial"],
  "green-blue": ["water", "atmospheric", "dapple", "dawn"],
  colorless: ["overcast", "underground", "industrial", "harsh"],
}
