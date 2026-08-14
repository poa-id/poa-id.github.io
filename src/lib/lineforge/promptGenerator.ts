import { cultureLibrary } from "@/lib/lineforge/data/cultureLibrary"
import { objectLibrary } from "@/lib/lineforge/data/objectLibrary"
import { shuffleWithSeed } from "@/lib/lineforge/seed"
import type { WeeklyBrief } from "@/lib/lineforge/types/lineforge"

export const SCENARIOS = [
  "in a marketplace at dawn",
  "during a storm",
  "in an abandoned temple",
  "at the edge of a cliff",
  "inside a workshop",
  "on a battlefield aftermath",
  "in a dense forest clearing",
  "at a harbor at sunset",
  "inside a throne room",
  "in a desert oasis",
  "on a rooftop at night",
  "in a cave lit by bioluminescence",
  "at a crossroads shrine",
  "inside a crumbling library",
  "on a frozen lake",
  "in a bustling festival",
  "at a mountain pass",
  "inside an alchemist's lab",
  "on a bridge over a canyon",
  "in a flooded ruin",
] as const

export const MOODS = [
  "tense & dramatic",
  "serene & contemplative",
  "ominous & foreboding",
  "warm & nostalgic",
  "eerie & unsettling",
  "heroic & triumphant",
  "melancholic & quiet",
  "chaotic & energetic",
] as const

export function generateIllustrationBrief(rand: () => number): WeeklyBrief {
  const cats = shuffleWithSeed(objectLibrary, rand)
  const cat1 = cats[0]
  const cat2 = cats[1] ?? cats[0]

  const entries1 = shuffleWithSeed(cat1.entries, rand)
  const entries2 = shuffleWithSeed(cat2.entries, rand)
  const entry1 = entries1[0]
  const entry2 = entries2[0]

  const obj1 =
    entry1.variations.length > 0
      ? shuffleWithSeed(entry1.variations, rand)[0].name
      : entry1.name
  const obj2 =
    entry2.variations.length > 0
      ? shuffleWithSeed(entry2.variations, rand)[0].name
      : entry2.name

  const cultures = shuffleWithSeed(cultureLibrary, rand)
  const culture = cultures[0]
  const period = shuffleWithSeed(culture.periods, rand)[0]

  const scenario = shuffleWithSeed([...SCENARIOS], rand)[0]
  const mood = shuffleWithSeed([...MOODS], rand)[0]

  const allHints = [...period.aesthetics, ...period.motifs, ...period.colors]
  const aestheticHints = shuffleWithSeed(allHints, rand).slice(0, 3)

  const prompt = `Illustration featuring a ${obj1} and ${obj2}, ${scenario}. Inspired by ${culture.name} (${period.name} era) aesthetics. Mood: ${mood}. Design cues: ${aestheticHints.join(", ")}.`

  return {
    objects: [obj1, obj2],
    culture: culture.name,
    culturePeriod: period.name,
    scenario,
    mood,
    aestheticHints,
    prompt,
  }
}
