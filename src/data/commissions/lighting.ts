export interface LightingEstablish {
  tags: string[]
  feature: string
  element: string
  cue: string
}

export interface LightingDef {
  id: string
  name: string
  accents: string[]
  tags: string[]
  requiresAny?: string[]
  establish?: LightingEstablish
  natural?: boolean
}

export const LIGHTING: LightingDef[] = [
  {
    id: "overcast",
    name: "Overcast daylight",
    accents: ["soft terrain bounce", "a single warmer interior leak", "wet-ground reflection"],
    tags: ["overcast", "day", "atmospheric"],
    natural: true,
  },
  {
    id: "golden-hour",
    name: "Golden hour",
    accents: ["long ground shadows", "cool open-sky fill", "dust in the beam"],
    tags: ["dawn", "day", "atmospheric"],
    natural: true,
  },
  {
    id: "dawn",
    name: "Cloudy dawn",
    accents: ["small warm lantern accents", "cold remaining night in the hollows", "breath or low mist"],
    tags: ["dawn", "overcast", "atmospheric"],
    natural: true,
  },
  {
    id: "moonlight",
    name: "Moonlight",
    accents: ["a single warm indoor leak", "wet-stone speculars", "very conservative fill"],
    tags: ["moon", "night", "atmospheric"],
    natural: true,
  },
  {
    id: "firelight",
    name: "Firelight",
    accents: ["a cooler moon or night fill", "ember spill on nearby metal", "smoke as a dimmer"],
    tags: ["fire", "night", "interior-low", "industrial"],
    requiresAny: ["fire", "forge", "hearth", "camp", "torch"],
    establish: {
      tags: ["fire", "camp"],
      feature: "a small working fire",
      element: "fire",
      cue: "a fire still burning in reach of the subject",
    },
  },
  {
    id: "candlelight",
    name: "Candlelight",
    accents: ["multiple weak sources of similar temperature", "a colder hallway beyond", "wax and hand speculars"],
    tags: ["interior-warm", "interior-low", "night"],
    requiresAny: ["interior", "shrine", "household", "ritual", "religiousSpace", "candle"],
    establish: {
      tags: ["candle", "interior"],
      feature: "candles still in use",
      element: "candles",
      cue: "a few candles actually burning in the scene",
    },
  },
  {
    id: "backlight",
    name: "Strong backlight",
    accents: ["a thin rim and a restrained bounce", "translucent edges in fabric or leaves", "a darker midground mass"],
    tags: ["day", "dawn", "atmospheric"],
    natural: true,
  },
  {
    id: "dapple",
    name: "Dappled forest light",
    accents: ["moving leaf-shadow on a simple large form", "a cooler open glade beyond", "wet leaf speculars"],
    tags: ["dapple", "day", "forest"],
    requiresAny: ["forest", "canopy", "vegetation"],
    natural: true,
  },
  {
    id: "noon",
    name: "Harsh noon",
    accents: ["small hard shadows", "bleached ground bounce", "deep localized shade under structures"],
    tags: ["harsh", "day"],
    natural: true,
  },
  {
    id: "storm",
    name: "Storm light",
    accents: ["a brief brighter opening in the cloud", "wet surfaces doing extra work", "wind-driven rain as value, not streaks"],
    tags: ["storm", "overcast", "atmospheric"],
    natural: true,
  },
  {
    id: "bioluminescence",
    name: "Bioluminescent fill",
    accents: ["the glow kept local and biological", "a separate cooler skylight", "almost no sparkle"],
    tags: ["bioluminescent", "night", "underground"],
    requiresAny: ["bioluminescentOrganism", "bioluminescentMaterial", "explicitFantasyPhenomenon", "fungus"],
    establish: {
      tags: ["bioluminescentOrganism", "fungus"],
      feature: "pale fungal growth along the walls",
      element: "bioluminescent fungus",
      cue: "pale fungal growth providing a weak green-blue fill",
    },
  },
  {
    id: "water-bounce",
    name: "Reflected water light",
    accents: ["caustic movement kept secondary", "a darker overhead canopy or architecture", "wet verticals picking up the bounce"],
    tags: ["water", "day", "atmospheric"],
    requiresAny: ["water", "wet"],
    natural: true,
  },
  {
    id: "fog-lamp",
    name: "Lamplight in fog",
    accents: ["a short throw and rapid falloff", "silhouettes beyond the lit pocket", "moisture on near surfaces"],
    tags: ["atmospheric", "night", "interior-low"],
    requiresAny: ["lamp", "lantern", "carriedLight", "inhabitedInterior", "workingInterior"],
    establish: {
      tags: ["lamp", "lantern", "carriedLight"],
      feature: "a working lantern",
      element: "lantern",
      cue: "a lantern still in use, throwing a short warm pocket of light",
    },
  },
  {
    id: "forge-glow",
    name: "Forge-glow",
    accents: ["a much cooler doorway or clerestory", "heat shimmer used sparingly", "dark shop walls as a value sink"],
    tags: ["fire", "industrial", "interior-low"],
    requiresAny: ["fire", "forge", "industrial"],
    establish: {
      tags: ["fire", "forge"],
      feature: "a lit forge or brazier",
      element: "forge",
      cue: "a forge or brazier still hot",
    },
  },
  {
    id: "shaft",
    name: "Single aperture light",
    accents: ["dust or moisture only where the beam is earned", "deep surrounding interior", "one bounced secondary on the floor"],
    tags: ["interior-low", "interior-warm", "underground", "sacred"],
    requiresAny: ["interior", "underground", "sacred"],
  },
  {
    id: "snow-glare",
    name: "Overcast snow glare",
    accents: ["upward bounce stronger than the sky", "narrow dark accents in wood, iron or cloth", "almost no true black except in cavities"],
    tags: ["overcast", "cold", "day", "harsh"],
    natural: true,
  },
  {
    id: "after-rain",
    name: "Clearing light after rain",
    accents: ["puddle mirrors", "still-dark wet tree masses", "a colder remaining cloud-bank"],
    tags: ["day", "water", "atmospheric"],
    natural: true,
  },
  {
    id: "subterranean",
    name: "Subterranean lamp or vent-light",
    accents: ["stratified darkness", "a distant second source for scale", "mineral speculars"],
    tags: ["underground", "interior-low", "industrial"],
    requiresAny: ["underground", "lamp", "interior"],
    establish: {
      tags: ["lamp"],
      feature: "a lamp or vent of light",
      element: "lamp",
      cue: "a lamp or a vent of daylight actually present in the dark",
    },
  },
  {
    id: "hearth-interior",
    name: "Kitchen / hearth interior",
    accents: ["a cooler window as the second speaker", "grease and ceramic highlights", "faces not fully lit"],
    tags: ["interior-warm", "day", "domestic"],
    requiresAny: ["hearth", "interior", "household", "domestic"],
  },
  {
    id: "cold-morning",
    name: "Cold morning",
    accents: ["long blue shadows", "a delayed warm strike on one plane", "visible breath if bodies are present"],
    tags: ["dawn", "cold", "day"],
    natural: true,
  },
  {
    id: "underwater",
    name: "Shallow underwater / flooded light",
    accents: ["caustics kept structural", "silty falloff", "a brighter broken surface above"],
    tags: ["water", "atmospheric"],
    natural: true,
  },
  {
    id: "procession-lamps",
    name: "Lantern procession",
    accents: ["many similar warm points", "a larger cooler night around them", "faces mostly lost except near a lamp"],
    tags: ["night", "interior-warm", "civic"],
    requiresAny: ["lamp", "lantern"],
    establish: {
      tags: ["lamp", "lantern"],
      feature: "carried lanterns",
      element: "lanterns",
      cue: "several lanterns actually carried through the scene",
    },
  },
  {
    id: "workshop-window",
    name: "Dusty workshop window",
    accents: ["the window as a blown-out rectangle", "interior bounce from pale walls or shavings", "tools going quickly to half-light"],
    tags: ["day", "industrial", "interior-warm"],
    requiresAny: ["interior", "industrial", "workingInterior"],
  },
  {
    id: "twilight",
    name: "Polar or winter twilight",
    accents: ["almost no direct sun", "a long horizon glow", "interior warmth as a small opposing note"],
    tags: ["cold", "dawn", "atmospheric"],
    natural: true,
  },
  {
    id: "smoke-sun",
    name: "Smoke-filtered sun",
    accents: ["reduced contrast", "orange or brown air as a unifier", "one cleaner plane in the foreground"],
    tags: ["fire", "atmospheric", "industrial", "harsh"],
    natural: true,
  },
  {
    id: "wet-bounce",
    name: "Wet stone bounce",
    accents: ["ground as a second light source", "darker dry upper planes", "careful specularity on metal and skin"],
    tags: ["water", "overcast", "day"],
    natural: true,
  },
]
