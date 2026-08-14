import type { BodyPlanDef, CreatureFamilyDef, EcoRoleDef } from "@/data/commissions/creature-taxonomy"

export type AnatomyFamily =
  | "quadruped-vertebrate"
  | "biped-vertebrate"
  | "serpentine"
  | "arthropod"
  | "avian"
  | "aquatic"
  | "mollusc"
  | "worm"
  | "other"

export interface AnatomyCapabilities {
  anatomyFamily: AnatomyFamily
  limbCount?: number
  hasLegs: boolean
  hasFeet: boolean
  hasShoulders: boolean
  hasNeck: boolean
  hasWings: boolean
  hasExoskeleton: boolean
  hasFins: boolean
  feedingStructures: string[]
  locomotionModes: string[]
  weightSupport: string[]
  limbNoun: string
  feedingNoun: string
}

export interface FeedingBehavior {
  action: string
  food: string
  contact: string
  sentence: string
}

const QUADRUPED: AnatomyCapabilities = {
  anatomyFamily: "quadruped-vertebrate",
  limbCount: 4,
  hasLegs: true,
  hasFeet: true,
  hasShoulders: true,
  hasNeck: true,
  hasWings: false,
  hasExoskeleton: false,
  hasFins: false,
  feedingStructures: ["jaw", "muzzle"],
  locomotionModes: ["walking", "running", "turning"],
  weightSupport: ["legs", "spine", "shoulder girdle", "pelvis"],
  limbNoun: "legs",
  feedingNoun: "muzzle, neck and feet",
}

const FAMILY_ANATOMY: Record<string, AnatomyCapabilities> = {
  mammalian: QUADRUPED,
  feline: QUADRUPED,
  canine: QUADRUPED,
  ursine: { ...QUADRUPED, locomotionModes: ["walking", "turning", "rearing"] },
  bovine: { ...QUADRUPED, locomotionModes: ["walking", "turning", "lowering the head"] },
  cervine: QUADRUPED,
  caprine: { ...QUADRUPED, locomotionModes: ["walking", "climbing", "turning"] },
  equine: { ...QUADRUPED, locomotionModes: ["walking", "trotting", "turning"] },
  rodent: QUADRUPED,
  mustelid: { ...QUADRUPED, locomotionModes: ["walking", "bounding", "turning"] },
  reptilian: {
    ...QUADRUPED,
    feedingStructures: ["jaw"],
    feedingNoun: "jaw, neck and the contact with the ground",
  },
  serpentine: {
    anatomyFamily: "serpentine",
    hasLegs: false,
    hasFeet: false,
    hasShoulders: false,
    hasNeck: false,
    hasWings: false,
    hasExoskeleton: false,
    hasFins: false,
    feedingStructures: ["jaw"],
    locomotionModes: ["slithering", "lateral undulation"],
    weightSupport: ["body curves", "ventral scales"],
    limbNoun: "coils",
    feedingNoun: "jaw and the coils that brace the strike",
  },
  amphibian: {
    ...QUADRUPED,
    feedingStructures: ["jaw", "tongue"],
    locomotionModes: ["walking", "swimming", "launching"],
    feedingNoun: "mouth, throat and the wet ground",
  },
  avian: {
    anatomyFamily: "avian",
    limbCount: 2,
    hasLegs: true,
    hasFeet: true,
    hasShoulders: true,
    hasNeck: true,
    hasWings: true,
    hasExoskeleton: false,
    hasFins: false,
    feedingStructures: ["beak"],
    locomotionModes: ["flying", "perching", "walking"],
    weightSupport: ["legs", "pelvis", "keel"],
    limbNoun: "legs",
    feedingNoun: "beak, talons and the ground",
  },
  insectoid: {
    anatomyFamily: "arthropod",
    limbCount: 6,
    hasLegs: true,
    hasFeet: false,
    hasShoulders: false,
    hasNeck: false,
    hasWings: false,
    hasExoskeleton: true,
    hasFins: false,
    feedingStructures: ["mouthparts"],
    locomotionModes: ["walking", "climbing"],
    weightSupport: ["segmented limbs", "exoskeleton"],
    limbNoun: "segmented limbs",
    feedingNoun: "mouthparts and the articulated limbs",
  },
  arachnid: {
    anatomyFamily: "arthropod",
    limbCount: 8,
    hasLegs: true,
    hasFeet: false,
    hasShoulders: false,
    hasNeck: false,
    hasWings: false,
    hasExoskeleton: true,
    hasFins: false,
    feedingStructures: ["mouthparts", "chelicerae"],
    locomotionModes: ["walking", "climbing"],
    weightSupport: ["segmented limbs", "cephalothorax"],
    limbNoun: "segmented limbs",
    feedingNoun: "mouthparts and the leading limbs",
  },
  crustacean: {
    anatomyFamily: "arthropod",
    limbCount: 10,
    hasLegs: true,
    hasFeet: false,
    hasShoulders: false,
    hasNeck: false,
    hasWings: false,
    hasExoskeleton: true,
    hasFins: false,
    feedingStructures: ["mouthparts", "claws"],
    locomotionModes: ["walking", "climbing", "scuttling"],
    weightSupport: ["segmented limbs", "carapace"],
    limbNoun: "segmented limbs",
    feedingNoun: "mouthparts, claws and the carapace",
  },
  molluscan: {
    anatomyFamily: "mollusc",
    hasLegs: false,
    hasFeet: true,
    hasShoulders: false,
    hasNeck: false,
    hasWings: false,
    hasExoskeleton: false,
    hasFins: false,
    feedingStructures: ["radula", "mouth"],
    locomotionModes: ["creeping", "clinging"],
    weightSupport: ["foot", "shell"],
    limbNoun: "foot",
    feedingNoun: "the rasping mouth and the foot",
  },
  piscine: {
    anatomyFamily: "aquatic",
    hasLegs: false,
    hasFeet: false,
    hasShoulders: false,
    hasNeck: false,
    hasWings: false,
    hasExoskeleton: false,
    hasFins: true,
    feedingStructures: ["jaw", "mouth"],
    locomotionModes: ["swimming"],
    weightSupport: ["body", "fins"],
    limbNoun: "fins",
    feedingNoun: "the mouth and the water",
  },
  cephalopod: {
    anatomyFamily: "aquatic",
    limbCount: 8,
    hasLegs: false,
    hasFeet: false,
    hasShoulders: false,
    hasNeck: false,
    hasWings: false,
    hasExoskeleton: false,
    hasFins: true,
    feedingStructures: ["beak", "arms"],
    locomotionModes: ["swimming", "crawling"],
    weightSupport: ["arms", "mantle"],
    limbNoun: "arms",
    feedingNoun: "beak and the grasping arms",
  },
  wormlike: {
    anatomyFamily: "worm",
    hasLegs: false,
    hasFeet: false,
    hasShoulders: false,
    hasNeck: false,
    hasWings: false,
    hasExoskeleton: false,
    hasFins: false,
    feedingStructures: ["mouth"],
    locomotionModes: ["burrowing", "undulation"],
    weightSupport: ["body"],
    limbNoun: "body",
    feedingNoun: "the mouth and the burrow wall",
  },
  fungal: {
    anatomyFamily: "other",
    hasLegs: false,
    hasFeet: false,
    hasShoulders: false,
    hasNeck: false,
    hasWings: false,
    hasExoskeleton: false,
    hasFins: false,
    feedingStructures: ["hyphae"],
    locomotionModes: ["spreading"],
    weightSupport: ["substrate"],
    limbNoun: "fruiting bodies",
    feedingNoun: "the contact with wood, soil or a host",
  },
  botanical: {
    anatomyFamily: "other",
    hasLegs: false,
    hasFeet: false,
    hasShoulders: false,
    hasNeck: false,
    hasWings: false,
    hasExoskeleton: false,
    hasFins: false,
    feedingStructures: ["roots"],
    locomotionModes: ["growing"],
    weightSupport: ["stem", "roots"],
    limbNoun: "stems",
    feedingNoun: "roots, stems and the ground they occupy",
  },
  mineral: {
    ...QUADRUPED,
    hasExoskeleton: true,
    feedingStructures: ["jaw"],
    feedingNoun: "the mouth and the armored body",
  },
  "construct-creature": {
    anatomyFamily: "other",
    hasLegs: true,
    hasFeet: true,
    hasShoulders: true,
    hasNeck: true,
    hasWings: false,
    hasExoskeleton: false,
    hasFins: false,
    feedingStructures: ["jaw"],
    locomotionModes: ["walking"],
    weightSupport: ["joints", "frame"],
    limbNoun: "limbs",
    feedingNoun: "the working joints and the ground contact",
  },
  hybrid: QUADRUPED,
}

const BODY_USEFUL_WITH: Record<string, string[] | undefined> = {
  flightless: ["avian", "hybrid", "construct-creature", "insectoid"],
  winged: [
    "avian",
    "hybrid",
    "insectoid",
    "construct-creature",
    "feline",
    "reptilian",
    "mustelid",
    "rodent",
  ],
  gliding: ["avian", "hybrid", "feline", "rodent", "mustelid", "reptilian", "insectoid"],
}

const BODY_INCOMPATIBLE: Record<string, string[]> = {
  flightless: ["piscine", "cephalopod", "molluscan", "wormlike", "fungal", "botanical"],
  winged: ["piscine", "wormlike", "molluscan", "fungal"],
  quadrupedal: ["piscine", "cephalopod", "wormlike", "serpentine"],
  bipedal: ["piscine", "cephalopod", "wormlike", "molluscan"],
  hexapodal: ["piscine", "cervine", "equine", "bovine", "canine", "feline"],
  "heavy-terrestrial": ["piscine", "cephalopod", "insectoid", "arachnid"],
}

const BODY_REDUNDANT: Record<string, string[]> = {
  serpentine: ["serpentine", "wormlike"],
  aquatic: ["piscine", "cephalopod"],
  winged: ["avian"],
  hexapodal: ["insectoid"],
  octopodal: ["arachnid", "cephalopod"],
  "burrower-role": [],
}

function overlayBodyPlan(base: AnatomyCapabilities, bodyId: string): AnatomyCapabilities {
  switch (bodyId) {
    case "serpentine":
      return {
        ...base,
        anatomyFamily: "serpentine",
        hasLegs: false,
        hasFeet: false,
        hasShoulders: false,
        hasNeck: false,
        locomotionModes: ["slithering", "lateral undulation"],
        weightSupport: ["body curves"],
        limbNoun: "coils",
        feedingNoun: base.feedingStructures.includes("jaw")
          ? "jaw and the coils that brace against the ground"
          : `${base.feedingNoun} and the undulating body`,
      }
    case "winged":
      return {
        ...base,
        hasWings: true,
        hasShoulders: true,
        locomotionModes: uniqueModes([...base.locomotionModes.filter((mode) => mode !== "swimming"), "flying", "perching"]),
      }
    case "flightless":
      return {
        ...base,
        hasWings: base.anatomyFamily === "avian" || base.hasWings,
        locomotionModes: uniqueModes(["walking", "running", "turning"]),
      }
    case "aquatic":
      return {
        ...base,
        anatomyFamily: base.anatomyFamily === "arthropod" ? "arthropod" : "aquatic",
        hasFins: !base.hasExoskeleton,
        locomotionModes: uniqueModes(["swimming", ...base.locomotionModes.filter((mode) => mode !== "running")]),
        limbNoun: base.hasExoskeleton ? base.limbNoun : "fins",
        feedingNoun: base.hasExoskeleton ? base.feedingNoun : "the mouth and the water",
      }
    case "amphibious":
      return {
        ...base,
        locomotionModes: uniqueModes(["walking", "swimming", "hauling out"]),
      }
    case "burrowing":
      return {
        ...base,
        locomotionModes: uniqueModes(["digging", "emerging", ...base.locomotionModes.slice(0, 1)]),
      }
    case "arboreal":
    case "climbing":
      return {
        ...base,
        locomotionModes: uniqueModes(["climbing", "gripping", ...base.locomotionModes.slice(0, 1)]),
      }
    case "gliding":
      return {
        ...base,
        hasWings: base.hasWings,
        locomotionModes: uniqueModes(["gliding", "climbing", "landing"]),
      }
    case "wader":
      return {
        ...base,
        hasLegs: true,
        hasFeet: true,
        locomotionModes: uniqueModes(["wading", "stepping", "turning"]),
        limbNoun: "legs",
      }
    case "bipedal":
      return {
        ...base,
        anatomyFamily: base.anatomyFamily === "avian" ? "avian" : "biped-vertebrate",
        limbCount: 2,
        hasLegs: true,
        hasFeet: true,
        locomotionModes: uniqueModes(["walking", "turning"]),
      }
    case "hexapodal":
      return {
        ...base,
        anatomyFamily: "arthropod",
        limbCount: 6,
        hasLegs: true,
        hasExoskeleton: true,
        hasShoulders: false,
        limbNoun: "segmented limbs",
        feedingNoun: "mouthparts and the articulated limbs",
      }
    case "octopodal":
      return {
        ...base,
        anatomyFamily: base.anatomyFamily === "aquatic" ? "aquatic" : "arthropod",
        limbCount: 8,
        hasLegs: base.anatomyFamily !== "aquatic",
        limbNoun: base.anatomyFamily === "aquatic" ? "arms" : "segmented limbs",
      }
    case "heavy-terrestrial":
      return {
        ...base,
        locomotionModes: uniqueModes(["walking", "turning", "bearing weight"]),
      }
    default:
      return base
  }
}

function uniqueModes(modes: string[]): string[] {
  return [...new Set(modes)]
}

export function familyCapabilities(familyId: string): AnatomyCapabilities {
  return FAMILY_ANATOMY[familyId] ?? QUADRUPED
}

export function mergeCapabilities(family: CreatureFamilyDef, body: BodyPlanDef): AnatomyCapabilities {
  return overlayBodyPlan(familyCapabilities(family.id), body.id)
}

export function bodyPlanWeight(family: CreatureFamilyDef, body: BodyPlanDef): number {
  const base = family.bodyPlanBias[body.id]
  if (base === undefined) return 0.08
  if (BODY_INCOMPATIBLE[body.id]?.includes(family.id)) return 0
  const useful = BODY_USEFUL_WITH[body.id]
  if (useful && !useful.includes(family.id)) return 0
  if (BODY_REDUNDANT[body.id]?.includes(family.id)) return base * 0.04
  return base
}

export function isRedundantBodyPlan(family: CreatureFamilyDef, body: BodyPlanDef): boolean {
  if (BODY_REDUNDANT[body.id]?.includes(family.id)) return true
  if (family.label.toLowerCase() === body.label.toLowerCase()) return true
  if (family.adjective === body.adjective) return true
  return false
}

export function visibleBodyPlanLabel(family: CreatureFamilyDef, body: BodyPlanDef): string | undefined {
  if (isRedundantBodyPlan(family, body)) return undefined
  return body.label
}

export function anatomyDirectionFor(capabilities: AnatomyCapabilities, familyId: string): string {
  switch (capabilities.anatomyFamily) {
    case "serpentine":
      return "The body must describe how the creature pushes against the ground and redirects its mass through curves. Avoid treating the torso as a decorative tube."
    case "arthropod":
      return familyId === "crustacean"
        ? "Articulated limbs must connect plausibly to the carapace and explain how the creature supports itself, feeds and moves across this terrain. Claws, mouthparts and jointed legs are machinery, not costume."
        : "Articulated limbs must connect plausibly to the body and explain how the creature supports itself, feeds and moves across this terrain."
    case "avian":
      return capabilities.locomotionModes.includes("flying")
        ? "Wing attachment, shoulder structure, balance and leg placement should reflect whether the animal flies, runs, wades or climbs."
        : "Even if it does not fly, the wings, keel and legs must explain how this bird stands, turns and feeds. Do not treat the wings as unused decoration."
    case "aquatic":
      return "Body profile, propulsion surfaces and steering structures should make its movement through water believable."
    case "mollusc":
      return "The foot, shell or mantle must explain how the animal clings, creeps and feeds. Do not give it a vertebrate skeleton."
    case "worm":
      return "The body must explain burrowing or undulation through compression and extension. Do not add decorative limbs."
    case "biped-vertebrate":
      return "Make the weight distribution through the legs believable. Hips, spine and feet should explain how the animal stands, turns and feeds."
    case "quadruped-vertebrate":
      return "Make the weight distribution through the limbs believable. The spine, shoulder and pelvic structure should explain how the animal stands, turns and lowers itself to feed."
    default:
      return "Fantasy anatomy must have an internally believable mechanical logic: how it stands, how it feeds, and how it occupies this ground."
  }
}

function foodForPlace(tags: string[]): string {
  if (tags.includes("coastal") || tags.includes("wetland") || tags.includes("swamp")) {
    return "algae, wet plants and detritus along the waterline"
  }
  if (tags.includes("water")) return "aquatic plants, silt and whatever the current brings"
  if (tags.includes("forest")) return "browse, mast and litter on the woodland floor"
  if (tags.includes("agricultural")) return "grasses, crop edges and what the ground still holds"
  if (tags.includes("underground")) return "fungus, detritus and whatever lives in the damp"
  if (tags.includes("civic")) return "refuse, stored grain and the edges of human work"
  return "whatever this habitat actually offers"
}

export function feedingBehavior(args: {
  family: CreatureFamilyDef
  body: BodyPlanDef
  role: EcoRoleDef
  capabilities: AnatomyCapabilities
  placeTags: string[]
}): FeedingBehavior {
  const food = foodForPlace(args.placeTags)
  const family = args.family.id
  const role = args.role.id
  const caps = args.capabilities

  let action = "feeds"
  if (role === "grazer") {
    if (family === "crustacean" || caps.anatomyFamily === "arthropod") action = "scrapes algae and film from rock, wood or shell"
    else if (family === "molluscan") action = "rasps the film off wet surfaces"
    else if (family === "piscine") action = "crops plants and algae in the shallows"
    else if (family === "cervine" || family === "bovine" || family === "equine" || family === "caprine") {
      action = args.placeTags.includes("water")
        ? "crops grasses and aquatic vegetation"
        : "crops grasses and low browse"
    } else action = "grazes what this ground actually grows"
  } else if (role === "browser") {
    action = "browses leaves, shoots or hanging growth"
  } else if (role === "filter") {
    action = "filter-feeds from the water or silt"
  } else if (role === "parasite" || role === "kleptoparasite") {
    action =
      family === "piscine"
        ? "attaches, bites or infiltrates a host that can actually carry it"
        : "feeds from a host or a stolen catch that belongs in this place"
  } else if (role === "scavenger" || role === "carrion") {
    action = "works a carcass, leftover or washed-up body"
  } else if (role === "forager" || role === "detritivore") {
    action = "picks through litter, mud or stored matter"
  } else if (role === "ambush" || role === "apex" || role === "solitary" || role === "pack") {
    action = "hunts or waits for prey that uses this ground"
  } else if (role === "pollinator") {
    action = "works flowers, catkins or a crop in bloom"
  } else if (role === "seed") {
    action = "feeds on fruit and seed from plants that actually grow here"
  } else if (role === "symbiont") {
    action = "lives in close contact with a plant, animal or structure of this place"
  } else if (role === "burrower-role") {
    action = "feeds as it digs, taking what the soil or mud holds"
  } else {
    action = `feeds as ${articleA(args.role.noun)} ${args.role.noun}`
  }

  const contact = caps.feedingNoun
  return {
    action,
    food,
    contact,
    sentence: `${action}, using ${contact}. The available food is ${food}`,
  }
}

function articleA(word: string): "a" | "an" {
  return /^[aeiou]/i.test(word.trim()) ? "an" : "a"
}

export function locomotionPhrase(capabilities: AnatomyCapabilities): string {
  const modes = capabilities.locomotionModes.slice(0, 3)
  if (modes.length === 0) return "moving and feeding"
  if (modes.length === 1) return `${modes[0]} and feeding`
  return `${modes.slice(0, -1).join(", ")} and ${modes[modes.length - 1]}`
}

export function overlapContact(capabilities: AnatomyCapabilities): string {
  if (!capabilities.hasLegs) {
    return capabilities.anatomyFamily === "serpentine"
      ? "Dense growth overlaps the coils and body so the animal is physically embedded in the undergrowth"
      : "Dense growth overlaps the body so the animal is physically embedded in the undergrowth"
  }
  if (capabilities.hasExoskeleton) {
    return `Dense growth overlaps the ${capabilities.limbNoun} and carapace so the animal is physically embedded in the undergrowth`
  }
  return `Dense growth overlaps the ${capabilities.limbNoun} and body so the animal is physically embedded in the undergrowth`
}

export function emergingContact(capabilities: AnatomyCapabilities): string {
  if (capabilities.hasShoulders && capabilities.hasNeck) return "the head and shoulders"
  if (capabilities.hasNeck) return "the head and neck"
  if (capabilities.anatomyFamily === "serpentine") return "the head and the leading curve of the body"
  if (capabilities.hasExoskeleton) return "the head and the front of the carapace"
  return "the head"
}
