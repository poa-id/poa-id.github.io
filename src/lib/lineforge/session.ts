import { generateIllustrationBrief } from "@/lib/lineforge/promptGenerator"
import { dateSeed, seededRandom, shuffleWithSeed } from "@/lib/lineforge/seed"
import {
  getCards,
  getISOWeek,
  getSchedules,
  getSettings,
  getWeeklyCard,
  getWeeklyPhaseForDay,
  saveWeeklyCard,
} from "@/lib/lineforge/storage"
import type {
  CardSchedule,
  DailySession,
  DeckName,
  PracticeCard,
  SessionBlock,
  SessionWeights,
  TrackFocus,
} from "@/lib/lineforge/types/lineforge"

export function getDrillMinutes(total: number): number {
  if (total <= 30) return 10
  if (total <= 60) return 15
  return Math.min(20, Math.round(15 + ((total - 60) / 60) * 5))
}

export function cardTrackScore(card: PracticeCard, track: TrackFocus): number {
  let score = 0
  if (track.domains && card.domain && track.domains.includes(card.domain)) score += 1
  if (track.styles && card.style && track.styles.includes(card.style)) score += 1
  if (track.themes && card.theme && track.themes.includes(card.theme)) score += 0.5
  if (track.preferPortfolio && card.portfolioGoal) {
    const goalWeight = typeof card.portfolioGoal === "number" ? card.portfolioGoal : 1
    score += goalWeight
  }
  return score * (track.strength ?? 0.5)
}

function scoreSort(
  cards: PracticeCard[],
  rand: () => number,
  track?: TrackFocus
): PracticeCard[] {
  const shuffled = shuffleWithSeed(cards, rand)
  if (!track || track.strength === 0) return shuffled
  return shuffled
    .map((card, index) => ({ card, index, score: cardTrackScore(card, track) }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((item) => item.card)
}

export function pickDueCards(
  deck: DeckName,
  count: number,
  today: string,
  cards: PracticeCard[],
  schedules: CardSchedule[],
  rand: () => number,
  easyHardRatio: "50/50" | "30/70",
  track?: TrackFocus
): PracticeCard[] {
  const deckCards = cards.filter((card) => card.deckName === deck)
  const scheduleById = new Map(schedules.map((item) => [item.cardId, item]))
  const isDue = (card: PracticeCard) => {
    const schedule = scheduleById.get(card.id)
    return !schedule || schedule.dueDate <= today
  }

  const dueEasy = scoreSort(
    deckCards.filter((card) => card.category === "easy" && isDue(card)),
    rand,
    track
  )
  const dueHard = scoreSort(
    deckCards.filter((card) => card.category === "hard" && isDue(card)),
    rand,
    track
  )
  const newEasy = scoreSort(
    deckCards.filter((card) => card.category === "easy" && !isDue(card)),
    rand,
    track
  )
  const newHard = scoreSort(
    deckCards.filter((card) => card.category === "hard" && !isDue(card)),
    rand,
    track
  )

  const ratio = easyHardRatio === "30/70" ? 0.3 : 0.5
  const easyCount = Math.max(1, Math.round(count * ratio))
  const hardCount = count - easyCount

  const picked = [...dueEasy.slice(0, easyCount), ...dueHard.slice(0, hardCount)]
  if (picked.length < count) {
    const pickedIds = new Set(picked.map((card) => card.id))
    const topUp = [...newEasy, ...newHard].filter((card) => !pickedIds.has(card.id))
    picked.push(...topUp.slice(0, count - picked.length))
  }
  return picked.slice(0, count)
}

function pickDrillsWithGesture(
  count: number,
  today: string,
  cards: PracticeCard[],
  schedules: CardSchedule[],
  rand: () => number,
  easyHardRatio: "50/50" | "30/70",
  track?: TrackFocus
): PracticeCard[] {
  const drillCards = cards.filter((card) => card.deckName === "drills")
  const gestureCards = drillCards.filter((card) => card.tags.includes("gesture"))
  const first = shuffleWithSeed(gestureCards, rand)[0]
  const rest = pickDueCards(
    "drills",
    Math.max(0, count - 1),
    today,
    cards,
    schedules,
    rand,
    easyHardRatio,
    track
  ).filter((card) => !card.tags.includes("gesture") && card.id !== first?.id)
  const result: PracticeCard[] = []
  if (first) result.push(first)
  result.push(...rest.slice(0, Math.max(0, count - result.length)))
  return result
}

function titleCaseDeck(deck: DeckName): string {
  return deck
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function weekKeyFromDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number)
  const { year, week } = getISOWeek(new Date(Date.UTC(y, m - 1, d)))
  return `${year}-W${String(week).padStart(2, "0")}`
}

export function generateSession(
  date: string,
  mode: DailySession["mode"],
  totalMinutes: number,
  remixCount = 0,
  masterTags?: string[],
  weights?: SessionWeights,
  focusDeck?: DeckName | null
): DailySession {
  const seed = dateSeed(date, remixCount)
  const rand = seededRandom(seed)
  const cards = getCards()
  const schedules = getSchedules()
  const settings = getSettings()
  const drillTime = getDrillMinutes(totalMinutes)
  const remaining = totalMinutes - drillTime
  const track = weights?.personalTrack ?? settings.activeTrack

  const blocks: SessionBlock[] = []

  if (mode === "daily") {
    blocks.push({
      id: "drills",
      type: "drills",
      label: "Warmup & Drills",
      durationMinutes: drillTime,
      cards: pickDrillsWithGesture(3, date, cards, schedules, rand, settings.easyHardRatio, track),
      completed: false,
    })

    let targetPct = 0.4
    if (settings.longSessionBias && totalMinutes >= 90) {
      const shift = Math.min(0.15, (totalMinutes - 90) / 200)
      targetPct -= shift
    }
    const targetMin = Math.round(remaining * targetPct)
    const personalMin = remaining - targetMin
    const personalDeck: DeckName = focusDeck ?? "personal"

    blocks.push({
      id: "targeted",
      type: "targeted",
      label: "Targeted Studies",
      durationMinutes: targetMin,
      cards: pickDueCards("targeted", 1, date, cards, schedules, rand, settings.easyHardRatio, track),
      completed: false,
    })

    blocks.push({
      id: "personal",
      type: "personal",
      label: focusDeck ? titleCaseDeck(personalDeck) : "Personal Work",
      durationMinutes: personalMin,
      cards: pickDueCards(personalDeck, 1, date, cards, schedules, rand, settings.easyHardRatio, track),
      completed: false,
    })
  } else if (mode === "master_study") {
    blocks.push({
      id: "master",
      type: "master_study",
      label: "Master Study",
      durationMinutes: remaining,
      cards: pickDueCards("master", 1, date, cards, schedules, rand, settings.easyHardRatio, track),
      completed: false,
    })
  } else {
    const weekKey = weekKeyFromDate(date)
    const stored = getWeeklyCard()
    const weeklyDeck = cards.filter((card) => card.deckName === "weekly")
    let weeklyCard = stored && stored.week === weekKey ? stored.card : null
    if (!weeklyCard) {
      weeklyCard = shuffleWithSeed(weeklyDeck, rand)[0]
      if (weeklyCard) saveWeeklyCard(weeklyCard, weekKey)
    }
    const [y, m, d] = date.split("-").map(Number)
    const phase = getWeeklyPhaseForDay(new Date(y, m - 1, d))
    const weeklyBrief = generateIllustrationBrief(rand)

    blocks.push({
      id: "weekly",
      type: "weekly_piece",
      label: `Weekly Piece: ${phase}`,
      durationMinutes: remaining,
      cards: weeklyCard ? [weeklyCard] : [],
      completed: false,
    })

    return {
      date,
      mode,
      totalMinutes,
      blocks,
      seed,
      completed: false,
      weeklyPhase: phase,
      weeklyBrief,
    }
  }

  return {
    date,
    mode,
    totalMinutes,
    blocks,
    seed,
    completed: false,
    masterTags: mode === "master_study" ? masterTags : undefined,
  }
}
