import { getMadeObjectsForRealm } from "@/lib/made-objects"

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
    "Japanese maples, ginkgo, chrysanthemums, zinnias, apricots, plums, almonds, planted for color through the seasons. My wife runs @lacasitapinterest documenting the house and garden.",
  training:
    "Muay Thai and kickboxing a couple times a week, plus kettlebells and mobility. Less about performance, more about staying durable. I have a daughter and we're planning on more.",
  trades:
    "A firewood cart is the first welding project I designed and finished on my own. Scouting a shipping container for a workshop/gym. Knifemaking is coming back now that there's a house with a yard. Smithing got dropped in the apartment years.",
  skills:
    "Concept art practice right now: drawing my friends' D&D characters. Tattoo apprenticeship ongoing. Things that compound slowly if you show up.",
  stewardship:
    "Intentional slow living. Reducing noise and clutter in the house and otherwise. Taking care of land, tools, body. The unglamorous maintenance work.",
}

export interface GardenJournalParagraph {
  text: string
  emphasis?: string[]
}

export interface GardenJournalImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface GardenJournalEntry {
  slug: string
  section: GardenSection
  title: string
  date: string
  sortDate: string
  meta: string
  body: GardenJournalParagraph[]
  images?: GardenJournalImage[]
}

export const GARDEN_JOURNAL_ENTRIES: GardenJournalEntry[] = [
  {
    slug: "learning-to-shape-trees",
    section: "gardening",
    title: "Learning to Shape Trees",
    date: "Spring 2026",
    sortDate: "2026-10-01",
    meta: "Pruning / Tree training",
    body: [
      { text: "Learning that growing a tree and shaping one are different skills." },
      {
        text: "I've started studying how to prune and train my trees rather than simply letting them grow: understanding structure, selecting branches, removing competing growth and thinking several seasons ahead before making a cut.",
      },
      {
        text: "At the same time, I finally acquired one of my dream trees: an Acer palmatum 'Sango-kaku', the coral-bark Japanese maple.",
        emphasis: ["Acer palmatum 'Sango-kaku'"],
      },
      {
        text: "It will become part of the Japanese garden I'm slowly building at home. For now, the work is mostly restraint: learning the tree, watching how it grows, and understanding what should be left alone before deciding what to change.",
      },
      { text: "Trees work on a different clock. That's part of the appeal." },
    ],
    images: [
      {
        src: "/garden/gardening/learning-to-shape-trees/sango-kaku-full.jpeg",
        alt: "A young Acer palmatum 'Sango-kaku' shown at its full height, with its coral-red branches and spring foliage visible.",
        width: 960,
        height: 1280,
      },
      {
        src: "/garden/gardening/learning-to-shape-trees/sango-kaku-detail.jpeg",
        alt: "Close view of the Sango-kaku's coral-red stems beneath bright green palmate leaves.",
        width: 960,
        height: 1280,
      },
      {
        src: "/garden/gardening/learning-to-shape-trees/bonsai-and-prebonsai.jpeg",
        alt: "A small collection of bonsai and prebonsai trees growing in pots on an outdoor bench.",
        width: 960,
        height: 1280,
      },
      {
        src: "/garden/gardening/learning-to-shape-trees/young-acer-palmatum.jpeg",
        alt: "A young Acer palmatum planted in the garden during its early structural development.",
        width: 960,
        height: 1280,
      },
    ],
  },
  {
    slug: "spring-vegetable-garden",
    section: "gardening",
    title: "Spring Vegetable Garden",
    date: "Spring 2026",
    sortDate: "2026-10-01",
    meta: "Vegetable garden / Hydroponics",
    body: [
      {
        text: "The vegetable garden entering another spring: raised beds in production, climbing frames ready, and the hydroponic tower running among them.",
      },
      {
        text: "It is still an evolving system rather than a finished garden. Each season teaches me what belongs where, what needs more support, and which parts of the routine can be made simpler.",
      },
    ],
    images: [
      {
        src: "/garden/gardening/spring-vegetable-garden/raised-beds.jpeg",
        alt: "The home vegetable garden in spring, with productive raised beds, climbing frames, and a hydroponic tower.",
        width: 960,
        height: 1280,
      },
    ],
  },
]

export const GARDEN_SECTION_TOPICS: Record<GardenSection, string> = {
  gardening: "Gardening & bonsai",
  training: "Muay Thai & kettlebells",
  trades: "Welding, knifemaking",
  skills: "Concept art, tattoo",
  stewardship: "Slow living, land & tools",
}

export function getGardenTradeProjects() {
  return getMadeObjectsForRealm("garden")
    .filter((object) => object.garden)
    .sort((a, b) => b.garden!.sortDate.localeCompare(a.garden!.sortDate))
}

export function getGardenJournalEntries(section: GardenSection) {
  return GARDEN_JOURNAL_ENTRIES.filter((entry) => entry.section === section).sort(
    (a, b) => b.sortDate.localeCompare(a.sortDate),
  )
}
