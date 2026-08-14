export interface CreatureFamilyDef {
  id: string
  label: string
  adjective: string
  beastly: boolean
  anchors: string[]
  bodyPlanBias: Record<string, number>
  roleBias: Record<string, number>
  materialTags: string[]
}

export interface BodyPlanDef {
  id: string
  label: string
  adjective: string
  extraAnchors: string[]
}

export interface EcoRoleDef {
  id: string
  label: string
  noun: string
}

export interface AdaptationDef {
  id: string
  label: string
  envTags: string[]
}

export const BODY_PLANS: BodyPlanDef[] = [
  { id: "bipedal", label: "Bipedal", adjective: "bipedal", extraAnchors: ["Ostrich", "Kangaroo"] },
  { id: "quadrupedal", label: "Quadrupedal", adjective: "quadrupedal", extraAnchors: ["Wolf", "Horse"] },
  { id: "hexapodal", label: "Hexapodal", adjective: "hexapodal", extraAnchors: ["Beetle", "Ant"] },
  { id: "octopodal", label: "Octopodal", adjective: "octopodal", extraAnchors: ["Octopus", "Crab"] },
  { id: "serpentine", label: "Serpentine", adjective: "serpentine", extraAnchors: ["Python", "Eel"] },
  { id: "winged", label: "Winged", adjective: "winged", extraAnchors: ["Albatross", "Bat"] },
  { id: "flightless", label: "Flightless", adjective: "flightless", extraAnchors: ["Cassowary", "Kiwi"] },
  { id: "arboreal", label: "Arboreal", adjective: "arboreal", extraAnchors: ["Gibbon", "Tree kangaroo"] },
  { id: "burrowing", label: "Burrowing", adjective: "burrowing", extraAnchors: ["Mole", "Wombat"] },
  { id: "amphibious", label: "Amphibious", adjective: "amphibious", extraAnchors: ["Crocodile", "Seal"] },
  { id: "aquatic", label: "Aquatic", adjective: "aquatic", extraAnchors: ["Tuna", "Otter"] },
  { id: "gliding", label: "Gliding", adjective: "gliding", extraAnchors: ["Flying squirrel", "Colugo"] },
  { id: "climbing", label: "Climbing", adjective: "climbing", extraAnchors: ["Goat", "Woodpecker"] },
  { id: "heavy-terrestrial", label: "Heavy terrestrial", adjective: "heavy terrestrial", extraAnchors: ["Hippopotamus", "Rhinoceros"] },
  { id: "wader", label: "Long-legged wader", adjective: "long-legged wading", extraAnchors: ["Heron", "Flamingo"] },
]

export const ECO_ROLES: EcoRoleDef[] = [
  { id: "apex", label: "Apex predator", noun: "apex predator" },
  { id: "ambush", label: "Ambush predator", noun: "ambush predator" },
  { id: "scavenger", label: "Scavenger", noun: "scavenger" },
  { id: "grazer", label: "Grazer", noun: "grazer" },
  { id: "browser", label: "Browser", noun: "browser" },
  { id: "omnivore", label: "Omnivore", noun: "omnivore" },
  { id: "filter", label: "Filter feeder", noun: "filter feeder" },
  { id: "parasite", label: "Parasite", noun: "parasite" },
  { id: "symbiont", label: "Symbiotic organism", noun: "symbiont" },
  { id: "burrower-role", label: "Burrower", noun: "burrower" },
  { id: "pack", label: "Pack hunter", noun: "pack hunter" },
  { id: "solitary", label: "Solitary hunter", noun: "solitary hunter" },
  { id: "carrion", label: "Carrion feeder", noun: "carrion feeder" },
  { id: "pollinator", label: "Pollinator", noun: "pollinator" },
  { id: "seed", label: "Seed disperser", noun: "seed disperser" },
  { id: "forager", label: "Forager", noun: "forager" },
  { id: "detritivore", label: "Detritivore", noun: "detritivore" },
  { id: "kleptoparasite", label: "Kleptoparasite", noun: "kleptoparasite" },
]

export const ADAPTATIONS: AdaptationDef[] = [
  { id: "alpine", label: "Alpine", envTags: ["mountain"] },
  { id: "arctic", label: "Arctic", envTags: ["cold"] },
  { id: "desert", label: "Desert", envTags: ["harsh"] },
  { id: "temperate-forest", label: "Temperate forest", envTags: ["forest"] },
  { id: "rainforest", label: "Rainforest", envTags: ["forest", "growth"] },
  { id: "swamp", label: "Swamp", envTags: ["swamp", "wetland"] },
  { id: "grassland", label: "Grassland", envTags: ["agricultural", "rural"] },
  { id: "underground", label: "Underground", envTags: ["underground"] },
  { id: "coastal", label: "Coastal", envTags: ["coastal"] },
  { id: "deep-water", label: "Deep water", envTags: ["water"] },
  { id: "volcanic", label: "Volcanic", envTags: ["volcanic", "fire"] },
  { id: "urban", label: "Urban", envTags: ["civic"] },
  { id: "farmland", label: "Farmland", envTags: ["agricultural"] },
  { id: "ruins", label: "Ruins", envTags: ["ruin", "ancient"] },
  { id: "riverine", label: "Riverine", envTags: ["water"] },
  { id: "intertidal", label: "Intertidal", envTags: ["coastal", "water"] },
  { id: "canopy", label: "Canopy", envTags: ["forest"] },
  { id: "cave", label: "Cave", envTags: ["underground"] },
]

const DEFAULT_BODY: Record<string, number> = Object.fromEntries(BODY_PLANS.map((plan) => [plan.id, 0.35]))
const DEFAULT_ROLE: Record<string, number> = Object.fromEntries(ECO_ROLES.map((role) => [role.id, 0.45]))

function body(overrides: Record<string, number>): Record<string, number> {
  return { ...DEFAULT_BODY, ...overrides }
}

function roles(overrides: Record<string, number>): Record<string, number> {
  return { ...DEFAULT_ROLE, ...overrides }
}

export const CREATURE_FAMILIES: CreatureFamilyDef[] = [
  {
    id: "mammalian",
    label: "Mammalian",
    adjective: "mammalian",
    beastly: true,
    anchors: ["Wolf", "Tapir", "Hyena", "Capybara"],
    bodyPlanBias: body({ quadrupedal: 2.4, "heavy-terrestrial": 1.8, burrowing: 1.2, bipedal: 0.4 }),
    roleBias: roles({ grazer: 1.4, omnivore: 1.6, scavenger: 1.3, pack: 1.3 }),
    materialTags: ["fur", "leather"],
  },
  {
    id: "feline",
    label: "Feline",
    adjective: "feline",
    beastly: true,
    anchors: ["Lion", "Lynx", "Clouded leopard", "Caracal"],
    bodyPlanBias: body({ quadrupedal: 2.6, climbing: 1.8, arboreal: 1.6, gliding: 0.5 }),
    roleBias: roles({ ambush: 2.2, solitary: 2, apex: 1.6, pack: 0.6, grazer: 0.2 }),
    materialTags: ["fur"],
  },
  {
    id: "canine",
    label: "Canine",
    adjective: "canine",
    beastly: true,
    anchors: ["Wolf", "Dhole", "African wild dog", "Maned wolf"],
    bodyPlanBias: body({ quadrupedal: 2.6, "heavy-terrestrial": 1.2 }),
    roleBias: roles({ pack: 2.2, scavenger: 1.6, omnivore: 1.4, solitary: 1.1 }),
    materialTags: ["fur"],
  },
  {
    id: "ursine",
    label: "Ursine",
    adjective: "ursine",
    beastly: true,
    anchors: ["Brown bear", "Sloth bear", "Sun bear"],
    bodyPlanBias: body({ quadrupedal: 2, "heavy-terrestrial": 2.4, climbing: 1.2, bipedal: 0.8 }),
    roleBias: roles({ omnivore: 2, scavenger: 1.6, apex: 1.3, forager: 1.5 }),
    materialTags: ["fur"],
  },
  {
    id: "bovine",
    label: "Bovine",
    adjective: "bovine",
    beastly: true,
    anchors: ["Gaur", "Muskox", "Water buffalo", "Yak"],
    bodyPlanBias: body({ quadrupedal: 2.4, "heavy-terrestrial": 2.6 }),
    roleBias: roles({ grazer: 2.4, browser: 1.4, apex: 0.2, ambush: 0.25 }),
    materialTags: ["fur", "horn", "leather"],
  },
  {
    id: "cervine",
    label: "Cervine",
    adjective: "cervine",
    beastly: true,
    anchors: ["Red deer", "Moose", "Muntjac"],
    bodyPlanBias: body({ quadrupedal: 2.4, wader: 1.1 }),
    roleBias: roles({ browser: 2.2, grazer: 1.8, seed: 1.2, apex: 0.2 }),
    materialTags: ["fur", "antler"],
  },
  {
    id: "caprine",
    label: "Caprine",
    adjective: "caprine",
    beastly: true,
    anchors: ["Ibex", "Markhor", "Tahr"],
    bodyPlanBias: body({ quadrupedal: 2.2, climbing: 2.6 }),
    roleBias: roles({ grazer: 2, browser: 1.8, forager: 1.3 }),
    materialTags: ["fur", "wool"],
  },
  {
    id: "equine",
    label: "Equine",
    adjective: "equine",
    beastly: true,
    anchors: ["Horse", "Onager", "Grevy's zebra"],
    bodyPlanBias: body({ quadrupedal: 2.6, wader: 0.6 }),
    roleBias: roles({ grazer: 2.2, browser: 1.2, pack: 0.7 }),
    materialTags: ["fur", "leather"],
  },
  {
    id: "rodent",
    label: "Rodent",
    adjective: "rodent",
    beastly: true,
    anchors: ["Capybara", "Porcupine", "Beaver", "Mara"],
    bodyPlanBias: body({ quadrupedal: 2, burrowing: 2.2, amphibious: 1.4, climbing: 1.2 }),
    roleBias: roles({ forager: 2, seed: 1.8, detritivore: 1.4, grazer: 1.3 }),
    materialTags: ["fur"],
  },
  {
    id: "mustelid",
    label: "Mustelid",
    adjective: "mustelid",
    beastly: true,
    anchors: ["Otter", "Badger", "Wolverine", "Tayra"],
    bodyPlanBias: body({ quadrupedal: 1.8, burrowing: 2, amphibious: 2, aquatic: 1.4, climbing: 1.2 }),
    roleBias: roles({ scavenger: 1.6, solitary: 1.7, omnivore: 1.6, ambush: 1.3 }),
    materialTags: ["fur", "wet-fur"],
  },
  {
    id: "reptilian",
    label: "Reptilian",
    adjective: "reptilian",
    beastly: true,
    anchors: ["Monitor lizard", "Tegu", "Crocodile", "Tuatara"],
    bodyPlanBias: body({ quadrupedal: 2, amphibious: 1.6, climbing: 1.4, burrowing: 1.2 }),
    roleBias: roles({ ambush: 2, scavenger: 1.5, solitary: 1.7, apex: 1.3 }),
    materialTags: ["scales"],
  },
  {
    id: "serpentine",
    label: "Serpentine",
    adjective: "serpentine",
    beastly: true,
    anchors: ["Python", "Cobra", "Anaconda", "Pipefish"],
    bodyPlanBias: body({ serpentine: 3, aquatic: 1.6, burrowing: 1.5, climbing: 1.3, quadrupedal: 0.2 }),
    roleBias: roles({ ambush: 2.2, solitary: 2, parasite: 0.8, grazer: 0.2 }),
    materialTags: ["scales"],
  },
  {
    id: "amphibian",
    label: "Amphibian",
    adjective: "amphibian",
    beastly: true,
    anchors: ["Bullfrog", "Giant salamander", "Caecilian"],
    bodyPlanBias: body({ amphibious: 2.6, aquatic: 2, burrowing: 1.3, quadrupedal: 1.2 }),
    roleBias: roles({ ambush: 1.8, forager: 1.5, scavenger: 1.2, filter: 1.1 }),
    materialTags: ["wet-surfaces"],
  },
  {
    id: "avian",
    label: "Avian",
    adjective: "avian",
    beastly: true,
    anchors: ["Heron", "Cassowary", "Vulture", "Hornbill"],
    bodyPlanBias: body({ winged: 2.4, flightless: 1.6, wader: 2, bipedal: 1.8, gliding: 1.4 }),
    roleBias: roles({ scavenger: 1.5, carrion: 1.6, solitary: 1.3, seed: 1.4, pollinator: 1.2 }),
    materialTags: ["feathers"],
  },
  {
    id: "insectoid",
    label: "Insectoid",
    adjective: "insectoid",
    beastly: false,
    anchors: ["Mantis", "Beetle", "Locust", "Dragonfly"],
    bodyPlanBias: body({ hexapodal: 2.8, winged: 2, climbing: 1.6, burrowing: 1.3, quadrupedal: 0.25 }),
    roleBias: roles({ pollinator: 1.8, scavenger: 1.4, ambush: 1.5, parasite: 1.2, detritivore: 1.5 }),
    materialTags: ["chitin"],
  },
  {
    id: "arachnid",
    label: "Arachnid",
    adjective: "arachnid",
    beastly: false,
    anchors: ["Tarantula", "Whip spider", "Scorpion"],
    bodyPlanBias: body({ octopodal: 2.8, burrowing: 1.8, climbing: 1.6, hexapodal: 0.3 }),
    roleBias: roles({ ambush: 2.4, solitary: 2, parasite: 1.2, grazer: 0.15 }),
    materialTags: ["chitin"],
  },
  {
    id: "crustacean",
    label: "Crustacean",
    adjective: "crustacean",
    beastly: true,
    anchors: ["Coconut crab", "Mantis shrimp", "Isopod"],
    bodyPlanBias: body({ octopodal: 1.6, hexapodal: 1.4, aquatic: 2.2, amphibious: 2, climbing: 1.2 }),
    roleBias: roles({ scavenger: 2, filter: 1.6, ambush: 1.4, detritivore: 1.5 }),
    materialTags: ["chitin", "shell"],
  },
  {
    id: "molluscan",
    label: "Molluscan",
    adjective: "molluscan",
    beastly: false,
    anchors: ["Snail", "Nudibranch", "Chiton", "Clam"],
    bodyPlanBias: body({ aquatic: 2, amphibious: 1.5, serpentine: 1.2, climbing: 1.1 }),
    roleBias: roles({ grazer: 1.6, filter: 2, detritivore: 1.6, scavenger: 1.3 }),
    materialTags: ["shell", "wet-surfaces"],
  },
  {
    id: "piscine",
    label: "Piscine",
    adjective: "piscine",
    beastly: true,
    anchors: ["Sturgeon", "Moray", "Grouper", "Ray"],
    bodyPlanBias: body({ aquatic: 3, amphibious: 0.6, serpentine: 1.2, quadrupedal: 0.15 }),
    roleBias: roles({ filter: 1.6, ambush: 1.7, scavenger: 1.3, apex: 1.2 }),
    materialTags: ["scales", "wet-surfaces"],
  },
  {
    id: "cephalopod",
    label: "Cephalopod",
    adjective: "cephalopod",
    beastly: false,
    anchors: ["Octopus", "Cuttlefish", "Nautilus"],
    bodyPlanBias: body({ aquatic: 3, octopodal: 2.4, amphibious: 0.7, quadrupedal: 0.2 }),
    roleBias: roles({ ambush: 2, solitary: 1.8, scavenger: 1.3, filter: 0.8 }),
    materialTags: ["wet-surfaces"],
  },
  {
    id: "wormlike",
    label: "Worm-like",
    adjective: "worm-like",
    beastly: false,
    anchors: ["Caecilian", "Hagfish", "Earthworm", "Amphisbaena"],
    bodyPlanBias: body({ serpentine: 2.6, burrowing: 2.6, aquatic: 1.5, quadrupedal: 0.15 }),
    roleBias: roles({ detritivore: 2, parasite: 1.6, "burrower-role": 2, scavenger: 1.3 }),
    materialTags: ["wet-surfaces"],
  },
  {
    id: "fungal",
    label: "Fungal",
    adjective: "fungal",
    beastly: false,
    anchors: ["Bracket fungus", "Cordyceps host insect", "Lichen"],
    bodyPlanBias: body({ burrowing: 1.6, climbing: 1.4, hexapodal: 1.1, quadrupedal: 0.8, serpentine: 1.2 }),
    roleBias: roles({ parasite: 2.2, symbiont: 2, detritivore: 1.8, scavenger: 1.4 }),
    materialTags: ["fungus", "rotten-wood"],
  },
  {
    id: "botanical",
    label: "Botanical",
    adjective: "botanical",
    beastly: false,
    anchors: ["Mandrake", "Pitcher plant", "Strangler fig"],
    bodyPlanBias: body({ climbing: 1.8, arboreal: 1.5, serpentine: 1.4, quadrupedal: 0.6, bipedal: 0.7 }),
    roleBias: roles({ ambush: 1.6, symbiont: 1.7, seed: 1.5, parasite: 1.4 }),
    materialTags: ["foliage", "bark", "wood"],
  },
  {
    id: "mineral",
    label: "Mineral",
    adjective: "mineral",
    beastly: false,
    anchors: ["Pangolin", "Armadillo", "Trilobite"],
    bodyPlanBias: body({ quadrupedal: 1.4, burrowing: 1.8, "heavy-terrestrial": 1.7, hexapodal: 1.1 }),
    roleBias: roles({ grazer: 1.2, detritivore: 1.4, scavenger: 1.3, "burrower-role": 1.6 }),
    materialTags: ["rough-stone", "polished-stone"],
  },
  {
    id: "construct-creature",
    label: "Construct",
    adjective: "constructed",
    beastly: false,
    anchors: ["Anatomy mannequin", "Bird of prey", "Stag beetle"],
    bodyPlanBias: body({ quadrupedal: 1.4, bipedal: 1.4, winged: 1.1, hexapodal: 1.2, "heavy-terrestrial": 1.3 }),
    roleBias: roles({ scavenger: 1.2, pack: 1.1, solitary: 1.2, grazer: 0.6 }),
    materialTags: ["bronze", "iron", "ceramic"],
  },
  {
    id: "hybrid",
    label: "Hybrid",
    adjective: "hybrid",
    beastly: false,
    anchors: ["Platypus", "Lungfish", "Hoatzin"],
    bodyPlanBias: body({ amphibious: 1.6, quadrupedal: 1.4, winged: 1.2, aquatic: 1.3, arboreal: 1.2 }),
    roleBias: roles({ omnivore: 1.6, forager: 1.5, ambush: 1.3, filter: 1.1 }),
    materialTags: ["fur", "scales", "feathers"],
  },
]

export const CREATURE_ANATOMY_NOTES = [
  "Anatomy should show how it moves, how it supports its weight, what it eats, and how it lives in this habitat.",
  "Fantasy anatomy should exaggerate or recombine believable natural structures rather than replace them with decoration.",
  "If a joint, jaw or limb cannot explain feeding or locomotion, redesign it before adding surface detail.",
]

export const ANATOMY_PROHIBITIONS = [
  "No arbitrary spikes.",
  "No decorative horns without a functional logic (display, defense, digging, heat, or sound).",
  "No excessive armor plating that would prevent bending or heat loss.",
  "No glowing anatomy.",
  "No humanoid musculature on a non-humanoid creature.",
  "Do not add wings unless the shoulder girdle and rest posture can support them.",
]

export const ANCHOR_NOTE =
  "These are anatomical starting points for study, not instructions to literally fuse the animals."
