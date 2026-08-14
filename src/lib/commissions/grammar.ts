const IRREGULAR_PLURALS: Record<string, string> = {
  human: "humans",
  dwarf: "dwarves",
  elf: "elves",
  orc: "orcs",
  staff: "staves",
  leaf: "leaves",
  goose: "geese",
  mouse: "mice",
  child: "children",
  person: "people",
  man: "men",
  woman: "women",
  foot: "feet",
  tooth: "teeth",
  ox: "oxen",
  calf: "calves",
  loaf: "loaves",
  thief: "thieves",
  wolf: "wolves",
  life: "lives",
  fungus: "fungi",
  cactus: "cacti",
  index: "indexes",
}

const IRREGULAR_SINGULARS: Record<string, string> = Object.fromEntries(
  Object.entries(IRREGULAR_PLURALS).map(([singular, plural]) => [plural, singular])
)

const ALWAYS_PLURAL = new Set([
  "reeds",
  "reed beds",
  "tree trunks",
  "cut stools",
  "new shoots",
  "stacked poles",
  "stacked tools",
  "mooring posts",
  "working boats",
  "fish traps",
  "fruit trees",
  "clay banks",
  "irrigation tools",
  "crocks and pans",
  "mushroom beds",
  "the reeds",
  "the mushroom beds",
  "hands",
  "feet",
  "clothes",
])

const MASS_NOUNS = new Set([
  "water",
  "mud",
  "growth",
  "undergrowth",
  "leaf litter",
  "ash",
  "snow",
  "ice",
  "timber",
  "weather",
  "light",
  "fog",
  "haze",
])

const STOPWORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "of",
  "in",
  "on",
  "at",
  "to",
  "for",
  "with",
  "from",
  "into",
  "over",
  "under",
])

export type GrammaticalNumber = "singular" | "plural"

export function articleFor(word: string): "a" | "an" {
  const first = word.trim().split(/\s+/)[0] ?? word
  if (/^an?\b/i.test(word.trim())) return /^an\b/i.test(word.trim()) ? "an" : "a"
  return /^(?:[aeiou]|honest|hour)/i.test(first) ? "an" : "a"
}

export function withArticle(rest: string, number: GrammaticalNumber = "singular"): string {
  const trimmed = rest.trim()
  if (!trimmed) return trimmed
  if (number === "plural" || ALWAYS_PLURAL.has(trimmed.toLowerCase())) {
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
  }
  if (/^an?\s/i.test(trimmed)) return trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
  return `${articleFor(trimmed) === "an" ? "An" : "A"} ${trimmed}`
}

export function headNoun(phrase: string): string {
  const cleaned = phrase
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  const words = cleaned.split(" ").filter((word) => word && !STOPWORDS.has(word))
  return words[words.length - 1] ?? cleaned
}

export function significantTokens(phrase: string): string[] {
  return phrase
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/-/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3 && !STOPWORDS.has(word))
}

export function countOf(phrase: string): GrammaticalNumber {
  const trimmed = phrase.trim().toLowerCase().replace(/^(an?|the)\s+/, "")
  if (!trimmed) return "singular"
  if (MASS_NOUNS.has(trimmed)) return "singular"
  if (ALWAYS_PLURAL.has(trimmed) || ALWAYS_PLURAL.has(phrase.trim().toLowerCase())) return "plural"
  if (/^\d|^[a-z]+ to [a-z]+ |^several |^many |^four |^five |^six |^three /.test(trimmed)) {
    return "plural"
  }
  const head = headNoun(trimmed)
  if (IRREGULAR_SINGULARS[head]) return "plural"
  if (IRREGULAR_PLURALS[head]) return "singular"
  if (/(people|children|men|women|teeth|feet|mice|geese)$/.test(head)) return "plural"
  if (/(ss|us|is|ness)$/.test(head)) return "singular"
  if (/s$/.test(head) && !/(ss|us|is)$/.test(head)) return "plural"
  return "singular"
}

export function pluralize(noun: string): string {
  const trimmed = noun.trim()
  if (!trimmed) return trimmed
  const lower = trimmed.toLowerCase()
  if (ALWAYS_PLURAL.has(lower) || countOf(trimmed) === "plural") return trimmed
  const words = trimmed.split(/\s+/)
  const last = words[words.length - 1]
  const lastLower = last.toLowerCase()
  const irregular = IRREGULAR_PLURALS[lastLower]
  const pluralLast = irregular
    ? last[0] === last[0].toUpperCase()
      ? irregular.charAt(0).toUpperCase() + irregular.slice(1)
      : irregular
    : lastLower.endsWith("s") || lastLower.endsWith("x") || lastLower.endsWith("ch") || lastLower.endsWith("sh")
      ? `${last}es`
      : lastLower.endsWith("y") && !/[aeiou]y$/i.test(lastLower)
        ? `${last.slice(0, -1)}ies`
        : `${last}s`
  return [...words.slice(0, -1), pluralLast].join(" ")
}

export function isAre(number: GrammaticalNumber): "is" | "are" {
  return number === "plural" ? "are" : "is"
}

export function thisThese(number: GrammaticalNumber): "this" | "these" {
  return number === "plural" ? "these" : "this"
}

export function occupies(number: GrammaticalNumber): "occupies" | "occupy" {
  return number === "plural" ? "occupy" : "occupies"
}

export function stands(number: GrammaticalNumber): "stands" | "stand" {
  return number === "plural" ? "stand" : "stands"
}

export function agree(number: GrammaticalNumber, singular: string, plural: string): string {
  return number === "plural" ? plural : singular
}

export function impliedPhrase(noun: string): string {
  const number = countOf(noun)
  return `${noun} ${isAre(number)} implied`
}
