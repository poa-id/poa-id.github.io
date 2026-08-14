export interface ObjectVariation {
  name: string
  notes: string
}

export interface ObjectEntry {
  id: string
  name: string
  imageUrl?: string
  keyShapes: string[]
  tips: string[]
  mistakes: string[]
  variations: ObjectVariation[]
}

export interface ObjectCategory {
  id: string
  name: string
  icon: string
  description: string
  imageUrl?: string
  entries: ObjectEntry[]
}

export interface CulturePeriod {
  name: string
  era: string
  imageUrl?: string
  aesthetics: string[]
  architecture: string[]
  clothing: string[]
  weapons: string[]
  motifs: string[]
  colors: string[]
  designNotes: string[]
}

export interface CultureRegion {
  id: string
  name: string
  region: string
  icon: string
  imageUrl?: string
  periods: CulturePeriod[]
}

export interface MaterialData {
  id: string
  name: string
  category: string
  description: string
  albedo: string
  roughness: string
  metalness: string
  specularity: string
  ior: string
  subsurface: string
  valueRange: string
  colorNotes: string[]
  tips: string[]
  mistakes: string[]
  lighting: string[]
}

export interface DieResult {
  category: string
  value: string
  detail?: string
}

export interface SavedRoll {
  id: string
  date: string
  dice: DieResult[]
}

export interface DiceObject {
  name: string
  category: string
}

export interface DiceCulture {
  name: string
  period: string
}
