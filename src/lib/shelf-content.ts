export interface ShelfItem {
  title: string
  creator?: string
  note?: string
}

export interface ShelfQuote {
  text: string
  attribution?: string
}

export type ShelfSection = "foundations" | "onMyDesk" | "marginalia"

export const SHELF_SECTIONS: { id: ShelfSection; label: string }[] = [
  { id: "foundations", label: "Foundations" },
  { id: "onMyDesk", label: "On My Desk" },
  { id: "marginalia", label: "Marginalia" },
]

export const SHELF_SECTION_INTROS: Record<ShelfSection, string> = {
  foundations:
    "People and works that continue to shape the way I think.",
  onMyDesk: "Current books, studies, and curiosities.",
  marginalia: "Quotes, fragments, and notes.",
}

export const SHELF_FOUNDATIONS: string[] = [
  "Tolkien",
  "C.S. Lewis",
  "Chesterton",
  "Belloc",
  "Benedict XVI",
  "Christopher Alexander",
  "John Seymour",
  "Matthew Crawford",
]

export const SHELF_CURRENT_BOOKS: ShelfItem[] = [
  { title: "Hooked", creator: "Nir Eyal" },
  { title: "East of Eden", creator: "John Steinbeck" },
  { title: "Refactoring UI", creator: "Adam Wathan & Steve Schoger" },
  {
    title: "The Lord of the Rings",
    creator: "J.R.R. Tolkien",
    note: "Always re-reading",
  },
]

export const SHELF_CURRENT_STUDIES: ShelfItem[] = [
  {
    title: "Data Driven Design: Quantitative Research for UX",
    creator: "Interaction Design Foundation",
  },
]

export const SHELF_CURRENT_CURIOSITIES: ShelfItem[] = []

export const SHELF_MARGINALIA_QUOTES: ShelfQuote[] = []

export const SHELF_MARGINALIA_FRAGMENTS: ShelfQuote[] = []

export const SHELF_MARGINALIA_NOTES: ShelfQuote[] = []

/** @deprecated */
export const SHELF_READING = SHELF_CURRENT_BOOKS
/** @deprecated */
export const SHELF_STUDYING = SHELF_CURRENT_STUDIES
/** @deprecated */
export const SHELF_MARGINALIA = SHELF_MARGINALIA_QUOTES
/** @deprecated */
export const SHELF_CURRENT = SHELF_CURRENT_BOOKS
