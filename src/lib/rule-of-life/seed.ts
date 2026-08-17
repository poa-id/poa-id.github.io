import { addDaysToKey, dateKey } from "@/lib/rule-of-life/dates"
import { isScheduled } from "@/lib/rule-of-life/scheduling"
import type {
  Collection,
  DailyReflection,
  JournalEntry,
  Observation,
  Pillar,
  RuleOfLifeStore,
} from "@/lib/rule-of-life/types"
import { DEFAULT_SETTINGS } from "@/lib/rule-of-life/types"

function hashPositive(input: string): number {
  let hash = 0
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

function createdAt(today: string, daysAgo: number): string {
  return `${addDaysToKey(today, -daysAgo)}T12:00:00.000Z`
}

export function createSeedData(now = new Date()): Omit<RuleOfLifeStore, "settings"> {
  const today = dateKey(now)

  const pillars: Pillar[] = [
    {
      id: "pillar-prayer",
      title: "Prayer",
      description: "Morning and evening prayer, a quiet turning toward the divine.",
      mode: "simple",
      frequency: { type: "daily" },
      isFocus: true,
      createdAt: createdAt(today, 48),
    },
    {
      id: "pillar-exercise",
      title: "Exercise",
      description: "Move the body with attention — strength, a walk, or honest sweat.",
      mode: "simple",
      frequency: { type: "weekly", days: [1, 3, 5] },
      isFocus: false,
      createdAt: createdAt(today, 40),
    },
    {
      id: "pillar-reading",
      title: "Reading",
      description: "Pages taken slowly, not as a quota of improvement.",
      mode: "quantity",
      frequency: { type: "daily" },
      quantityConfig: {
        unit: "pages",
        target: 30,
        steps: [
          { label: "+5", value: 5 },
          { label: "+10", value: 10 },
        ],
      },
      isFocus: false,
      createdAt: createdAt(today, 36),
    },
    {
      id: "pillar-fasting",
      title: "Fasting",
      description: "A Friday fast: hunger as a reminder, not a performance.",
      mode: "simple",
      frequency: { type: "weekly", days: [5] },
      isFocus: false,
      createdAt: createdAt(today, 32),
    },
    {
      id: "pillar-journaling",
      title: "Journaling",
      description: "A few honest lines before the day closes.",
      mode: "simple",
      frequency: { type: "daily" },
      isFocus: false,
      createdAt: createdAt(today, 28),
    },
  ]

  const collections: Collection[] = [
    { id: "col-books", name: "Books to Read", createdAt: createdAt(today, 40) },
    { id: "col-prayer", name: "Prayer Intentions", createdAt: createdAt(today, 40) },
    { id: "col-lessons", name: "Lessons Learned", createdAt: createdAt(today, 40) },
    { id: "col-gratitude", name: "Gratitude", createdAt: createdAt(today, 40) },
  ]

  const observations: Observation[] = []
  for (let ago = 1; ago <= 28; ago += 1) {
    const date = addDaysToKey(today, -ago)
    const day = new Date(`${date}T12:00:00`)

    for (const pillar of pillars) {
      if (!isScheduled(pillar.frequency, day)) continue
      const chance = hashPositive(`${pillar.id}:${date}`) % 10
      if (pillar.mode === "quantity") {
        const quantity = chance > 2 ? 20 + (chance % 4) * 5 : chance * 5
        observations.push({
          id: `obs-${pillar.id}-${date}`,
          pillarId: pillar.id,
          date,
          observed: false,
          quantity,
        })
      } else if (chance > 2) {
        observations.push({
          id: `obs-${pillar.id}-${date}`,
          pillarId: pillar.id,
          date,
          observed: true,
        })
      }
    }
  }

  const journal: JournalEntry[] = [
    {
      id: "je-today-1",
      date: today,
      symbol: "note",
      content: "Morning light through the window reminded me of childhood summers.",
      createdAt: createdAt(today, 0),
    },
    {
      id: "je-today-2",
      date: today,
      symbol: "prayer",
      content: "For patience with the children",
      linkedCollections: ["col-prayer"],
      createdAt: createdAt(today, 0),
    },
    {
      id: "je-1-1",
      date: addDaysToKey(today, -1),
      symbol: "insight",
      content: "Silence is not absence but presence.",
      linkedCollections: ["col-lessons"],
      createdAt: createdAt(today, 1),
    },
    {
      id: "je-1-2",
      date: addDaysToKey(today, -1),
      symbol: "task",
      content: "The Brothers Karamazov",
      hasCheckbox: true,
      isChecked: false,
      linkedCollections: ["col-books"],
      createdAt: createdAt(today, 1),
    },
    {
      id: "je-1-3",
      date: addDaysToKey(today, -1),
      symbol: "note",
      content: "Walked without headphones. The river was louder than I remembered.",
      linkedCollections: ["col-gratitude"],
      createdAt: createdAt(today, 1),
    },
    {
      id: "je-2-1",
      date: addDaysToKey(today, -2),
      symbol: "event",
      content: "Vespers with the parish. Stood at the back and did not hurry.",
      createdAt: createdAt(today, 2),
    },
    {
      id: "je-2-2",
      date: addDaysToKey(today, -2),
      symbol: "task",
      content: "Write to M. about the retreat",
      hasCheckbox: true,
      isChecked: true,
      createdAt: createdAt(today, 2),
    },
    {
      id: "je-3-1",
      date: addDaysToKey(today, -3),
      symbol: "prayer",
      content: "For those who keep vigil when no one sees.",
      linkedCollections: ["col-prayer"],
      createdAt: createdAt(today, 3),
    },
    {
      id: "je-3-2",
      date: addDaysToKey(today, -3),
      symbol: "note",
      content: "Resisted the urge to fill the evening. Left a chair empty on purpose.",
      createdAt: createdAt(today, 3),
    },
    {
      id: "je-5-1",
      date: addDaysToKey(today, -5),
      symbol: "insight",
      content: "Faithfulness is mostly returning, not arriving.",
      linkedCollections: ["col-lessons"],
      createdAt: createdAt(today, 5),
    },
    {
      id: "je-5-2",
      date: addDaysToKey(today, -5),
      symbol: "note",
      content: "Bread, olives, and a slow psalm. Enough.",
      linkedCollections: ["col-gratitude"],
      createdAt: createdAt(today, 5),
    },
    {
      id: "je-5-3",
      date: addDaysToKey(today, -5),
      symbol: "task",
      content: "Four Quartets",
      hasCheckbox: true,
      isChecked: false,
      linkedCollections: ["col-books"],
      createdAt: createdAt(today, 5),
    },
  ]

  const reflections: DailyReflection[] = [
    {
      date: addDaysToKey(today, -1),
      content:
        "I noticed how quickly I reach for noise when the day thins out. The walk by the river felt like a small returning. Gratitude for unhurried light.",
    },
    {
      date: addDaysToKey(today, -2),
      content:
        "The evening held more resistance than I wanted to admit. Still, I stood through vespers. Offer the rest without needing it to look finished.",
    },
  ]

  return { pillars, observations, journal, collections, reflections, examen: [] }
}

export function createInitialStore(now = new Date()): RuleOfLifeStore {
  return {
    ...createSeedData(now),
    settings: { ...DEFAULT_SETTINGS },
  }
}
