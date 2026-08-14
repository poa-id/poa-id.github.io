export interface LightingDef {
  id: string
  name: string
  accents: string[]
  tags: string[]
}

export const LIGHTING: LightingDef[] = [
  {
    id: "overcast",
    name: "Overcast daylight",
    accents: ["soft terrain bounce", "a single warmer interior leak", "wet-ground reflection"],
    tags: ["overcast", "day", "atmospheric"],
  },
  {
    id: "golden-hour",
    name: "Golden hour",
    accents: ["long ground shadows", "cool open-sky fill", "dust in the beam"],
    tags: ["dawn", "day", "atmospheric"],
  },
  {
    id: "dawn",
    name: "Cloudy dawn",
    accents: ["small warm lantern accents", "cold remaining night in the hollows", "breath or low mist"],
    tags: ["dawn", "overcast", "atmospheric"],
  },
  {
    id: "moonlight",
    name: "Moonlight",
    accents: ["a single warm indoor leak", "wet-stone speculars", "very conservative fill"],
    tags: ["moon", "night", "atmospheric"],
  },
  {
    id: "firelight",
    name: "Firelight",
    accents: ["a cooler moon or night fill", "ember spill on nearby metal", "smoke as a dimmer"],
    tags: ["fire", "night", "interior-low", "industrial"],
  },
  {
    id: "candlelight",
    name: "Candlelight",
    accents: ["multiple weak sources of similar temperature", "a colder hallway beyond", "wax and hand speculars"],
    tags: ["interior-warm", "interior-low", "night"],
  },
  {
    id: "backlight",
    name: "Strong backlight",
    accents: ["a thin rim and a restrained bounce", "translucent edges in fabric or leaves", "a darker midground mass"],
    tags: ["day", "dawn", "atmospheric"],
  },
  {
    id: "dapple",
    name: "Dappled forest light",
    accents: ["moving leaf-shadow on a simple large form", "a cooler open glade beyond", "wet leaf speculars"],
    tags: ["dapple", "day", "forest"],
  },
  {
    id: "noon",
    name: "Harsh noon",
    accents: ["small hard shadows", "bleached ground bounce", "deep localized shade under structures"],
    tags: ["harsh", "day"],
  },
  {
    id: "storm",
    name: "Storm light",
    accents: ["a brief brighter opening in the cloud", "wet surfaces doing extra work", "wind-driven rain as value, not streaks"],
    tags: ["storm", "overcast", "atmospheric"],
  },
  {
    id: "bioluminescence",
    name: "Bioluminescent fill",
    accents: ["the glow kept local and biological", "a separate cooler skylight", "almost no sparkle"],
    tags: ["bioluminescent", "night", "underground"],
  },
  {
    id: "water-bounce",
    name: "Reflected water light",
    accents: ["caustic movement kept secondary", "a darker overhead canopy or architecture", "wet verticals picking up the bounce"],
    tags: ["water", "day", "atmospheric"],
  },
  {
    id: "fog-lamp",
    name: "Lamplight in fog",
    accents: ["a short throw and rapid falloff", "silhouettes beyond the lit pocket", "moisture on near surfaces"],
    tags: ["atmospheric", "night", "interior-low"],
  },
  {
    id: "forge-glow",
    name: "Forge-glow",
    accents: ["a much cooler doorway or clerestory", "heat shimmer used sparingly", "dark shop walls as a value sink"],
    tags: ["fire", "industrial", "interior-low"],
  },
  {
    id: "shaft",
    name: "Single aperture light",
    accents: ["dust or moisture only where the beam is earned", "deep surrounding interior", "one bounced secondary on the floor"],
    tags: ["interior-low", "interior-warm", "underground", "sacred"],
  },
  {
    id: "snow-glare",
    name: "Overcast snow glare",
    accents: ["upward bounce stronger than the sky", "narrow dark accents in wood, iron or cloth", "almost no true black except in cavities"],
    tags: ["overcast", "cold", "day", "harsh"],
  },
  {
    id: "after-rain",
    name: "Clearing light after rain",
    accents: ["puddle mirrors", "still-dark wet tree masses", "a colder remaining cloud-bank"],
    tags: ["day", "water", "atmospheric"],
  },
  {
    id: "subterranean",
    name: "Subterranean lamp or vent-light",
    accents: ["stratified darkness", "a distant second source for scale", "mineral speculars"],
    tags: ["underground", "interior-low", "industrial"],
  },
  {
    id: "hearth-interior",
    name: "Kitchen / hearth interior",
    accents: ["a cooler window as the second speaker", "grease and ceramic highlights", "faces not fully lit"],
    tags: ["interior-warm", "day", "domestic"],
  },
  {
    id: "cold-morning",
    name: "Cold morning",
    accents: ["long blue shadows", "a delayed warm strike on one plane", "visible breath if bodies are present"],
    tags: ["dawn", "cold", "day"],
  },
  {
    id: "underwater",
    name: "Shallow underwater / flooded light",
    accents: ["caustics kept structural", "silty falloff", "a brighter broken surface above"],
    tags: ["water", "atmospheric"],
  },
  {
    id: "procession-lamps",
    name: "Lantern procession",
    accents: ["many similar warm points", "a larger cooler night around them", "faces mostly lost except near a lamp"],
    tags: ["night", "interior-warm", "civic"],
  },
  {
    id: "workshop-window",
    name: "Dusty workshop window",
    accents: ["the window as a blown-out rectangle", "interior bounce from pale walls or shavings", "tools going quickly to half-light"],
    tags: ["day", "industrial", "interior-warm"],
  },
  {
    id: "twilight",
    name: "Polar or winter twilight",
    accents: ["almost no direct sun", "a long horizon glow", "interior warmth as a small opposing note"],
    tags: ["cold", "dawn", "atmospheric"],
  },
  {
    id: "smoke-sun",
    name: "Smoke-filtered sun",
    accents: ["reduced contrast", "orange or brown air as a unifier", "one cleaner plane in the foreground"],
    tags: ["fire", "atmospheric", "industrial", "harsh"],
  },
  {
    id: "wet-bounce",
    name: "Wet stone bounce",
    accents: ["ground as a second light source", "darker dry upper planes", "careful specularity on metal and skin"],
    tags: ["water", "overcast", "day"],
  },
]
