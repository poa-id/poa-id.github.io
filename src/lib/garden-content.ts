export type GardenSection =
  | "gardening"
  | "training"
  | "trades"
  | "skills"
  | "stewardship"

export const GARDEN_SECTIONS: { id: GardenSection; label: string }[] = [
  { id: "gardening", label: "Gardening" },
  { id: "training", label: "Training" },
  { id: "trades", label: "Trades" },
  { id: "skills", label: "Skills" },
  { id: "stewardship", label: "Stewardship" },
]

export const GARDEN_SECTION_INTROS: Record<GardenSection, string> = {
  gardening:
    "Japanese maples, ginkgo, chrysanthemums, zinnias, apricots, plums, almonds — planted for color through the seasons. My wife runs @lacasitapinterest documenting the house and garden.",
  training:
    "Muay Thai and kickboxing a couple times a week, plus kettlebells and mobility. Less about performance, more about staying durable — I have a daughter and we're planning on more.",
  trades:
    "Welding a wood cart soon. Scouting a shipping container for a workshop/gym. Knifemaking is coming back now that there's a house with a yard — smithing got dropped in the apartment years.",
  skills:
    "Concept art practice right now — drawing my friends' D&D characters. Tattoo apprenticeship ongoing. Things that compound slowly if you show up.",
  stewardship:
    "Intentional slow living. Reducing noise and clutter in the house and otherwise. Taking care of land, tools, body — the unglamorous maintenance work.",
}

export const GARDEN_SECTION_TOPICS: Record<GardenSection, string> = {
  gardening: "Gardening & bonsai",
  training: "Muay Thai & kettlebells",
  trades: "Welding, knifemaking",
  skills: "Concept art, tattoo",
  stewardship: "Slow living, land & tools",
}
