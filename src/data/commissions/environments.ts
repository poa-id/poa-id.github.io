export interface EnvironmentDef {
  id: string
  name: string
  article: string
  tags: string[]
}

export const ENVIRONMENTS: EnvironmentDef[] = [
  { id: "temperate-forest", name: "temperate forest", article: "a", tags: ["wilderness", "forest", "growth"] },
  { id: "ancient-woodland", name: "ancient woodland", article: "an", tags: ["wilderness", "forest", "ancient", "growth"] },
  { id: "coppice", name: "working coppice", article: "a", tags: ["forest", "rural", "agricultural", "growth"] },
  { id: "swamp", name: "alder swamp", article: "an", tags: ["swamp", "water", "wilderness", "decay"] },
  { id: "flooded-forest", name: "flooded forest", article: "a", tags: ["forest", "water", "flood", "wilderness"] },
  { id: "peat-cuttings", name: "peat cutting", article: "a", tags: ["wetland", "rural", "labor", "water"] },
  { id: "desert", name: "stony desert", article: "a", tags: ["wilderness", "harsh", "sky"] },
  { id: "oasis-camp", name: "used oasis camp", article: "a", tags: ["water", "domestic", "wilderness"] },
  { id: "mountains", name: "broken mountain shoulder", article: "a", tags: ["mountain", "wilderness", "sky"] },
  { id: "alpine-valley", name: "alpine valley", article: "an", tags: ["mountain", "agricultural", "rural"] },
  { id: "scree", name: "scree field", article: "a", tags: ["mountain", "harsh", "wilderness"] },
  { id: "ruins", name: "inhabited ruin", article: "an", tags: ["ruin", "civic", "ancient"] },
  { id: "monastery", name: "working monastery", article: "a", tags: ["sacred", "ordered", "interior", "civic"] },
  { id: "abbey-precinct", name: "abbey precinct", article: "an", tags: ["sacred", "ordered", "agricultural"] },
  { id: "fortress", name: "frontier fortress", article: "a", tags: ["fortified", "civic", "mountain"] },
  { id: "gatehouse", name: "gatehouse yard", article: "a", tags: ["fortified", "civic", "ordered"] },
  { id: "workshop", name: "cluttered workshop", article: "a", tags: ["industrial", "interior", "domestic"] },
  { id: "forge", name: "village forge", article: "a", tags: ["industrial", "fire", "rural", "interior"] },
  { id: "kiln-yard", name: "brick kiln yard", article: "a", tags: ["industrial", "fire", "rural"] },
  { id: "cave", name: "inhabited cave mouth", article: "an", tags: ["underground", "wilderness", "shelter"] },
  { id: "mine", name: "working mine adit", article: "a", tags: ["underground", "industrial", "labor"] },
  { id: "quarry", name: "hillside quarry", article: "a", tags: ["industrial", "mountain", "labor"] },
  { id: "coastline", name: "working coastline", article: "a", tags: ["coastal", "water", "sky"] },
  { id: "fishing-village", name: "fishing village", article: "a", tags: ["coastal", "rural", "domestic", "water"] },
  { id: "saltworks", name: "coastal saltworks", article: "a", tags: ["coastal", "industrial", "water"] },
  { id: "medieval-city", name: "tight medieval city street", article: "a", tags: ["civic", "ordered", "interior"] },
  { id: "back-courtyard", name: "laundry courtyard", article: "a", tags: ["civic", "domestic", "ordered"] },
  { id: "farmland", name: "strip of farmland", article: "a", tags: ["agricultural", "rural"] },
  { id: "orchard", name: "flooded orchard", article: "a", tags: ["agricultural", "rural", "growth", "water"] },
  { id: "vineyard", name: "terraced vineyard", article: "a", tags: ["agricultural", "rural", "ordered"] },
  { id: "grassland", name: "grazed grassland", article: "a", tags: ["agricultural", "rural", "wilderness"] },
  { id: "hedgerow", name: "deep hedgerow lane", article: "a", tags: ["rural", "agricultural", "growth"] },
  { id: "frozen", name: "frozen river margin", article: "a", tags: ["cold", "water", "wilderness"] },
  { id: "snow-farm", name: "snowed-in farmyard", article: "a", tags: ["cold", "rural", "domestic", "agricultural"] },
  { id: "volcanic", name: "volcanic waste", article: "a", tags: ["volcanic", "harsh", "fire", "mountain"] },
  { id: "hot-spring", name: "worked hot spring", article: "a", tags: ["volcanic", "water", "rural"] },
  { id: "underground-city", name: "underground street", article: "an", tags: ["underground", "civic", "interior"] },
  { id: "temple", name: "repaired temple interior", article: "a", tags: ["sacred", "interior", "ordered"] },
  { id: "abandoned", name: "abandoned settlement", article: "an", tags: ["ruin", "rural", "decay"] },
  { id: "shrine-road", name: "wayside shrine road", article: "a", tags: ["sacred", "rural", "ordered"] },
  { id: "mill-race", name: "mill race and wheel", article: "a", tags: ["water", "industrial", "rural"] },
  { id: "boathouse", name: "leaking boathouse", article: "a", tags: ["water", "coastal", "domestic", "decay"] },
  { id: "scriptorium-yard", name: "copyists' yard", article: "a", tags: ["scholarly", "sacred", "ordered"] },
  { id: "archive-cellar", name: "damp archive cellar", article: "a", tags: ["scholarly", "underground", "interior", "decay"] },
  { id: "granary", name: "raised granary", article: "a", tags: ["agricultural", "rural", "ordered"] },
  { id: "apiary", name: "orchard apiary", article: "an", tags: ["agricultural", "rural", "growth"] },
  { id: "tannery", name: "riverside tannery", article: "a", tags: ["industrial", "water", "civic", "decay"] },
  { id: "slaughter-yard", name: "slaughter yard", article: "a", tags: ["rural", "death", "labor", "domestic"] },
  { id: "graveyard", name: "parish graveyard", article: "a", tags: ["death", "sacred", "rural"] },
  { id: "ossuary", name: "hill ossuary", article: "a", tags: ["death", "sacred", "underground"] },
  { id: "marsh-boardwalk", name: "marsh boardwalk", article: "a", tags: ["swamp", "water", "rural"] },
  { id: "reedbed", name: "reedbed fishery", article: "a", tags: ["water", "rural", "agricultural", "wetland", "growth"] },
  { id: "cliff-nests", name: "cliff nesting ground", article: "a", tags: ["coastal", "sky", "wilderness"] },
  { id: "karst", name: "limestone sinkhole", article: "a", tags: ["underground", "wilderness", "strange"] },
  { id: "mushroom-cellar", name: "mushroom cellar", article: "a", tags: ["underground", "growth", "interior", "agricultural"] },
  { id: "rope-bridge", name: "repaired rope crossing", article: "a", tags: ["mountain", "wilderness", "rural"] },
  { id: "watch-post", name: "timber watch post", article: "a", tags: ["fortified", "forest", "rural"] },
  { id: "charcoal-camp", name: "charcoal burners' camp", article: "a", tags: ["forest", "industrial", "fire", "rural"] },
  { id: "ice-house", name: "ice house", article: "an", tags: ["cold", "interior", "domestic", "ordered"] },
  { id: "bath-house", name: "public bath house", article: "a", tags: ["civic", "water", "interior", "ordered"] },
  { id: "well-court", name: "village well court", article: "a", tags: ["civic", "rural", "domestic", "water"] },
  { id: "flood-plain", name: "settled floodplain", article: "a", tags: ["water", "agricultural", "rural"] },
  { id: "ash-field", name: "field of last year's burn", article: "a", tags: ["fire", "agricultural", "growth"] },
  { id: "coral-pool", name: "tidal pool shelf", article: "a", tags: ["coastal", "water", "strange"] },
  { id: "glassworks", name: "glassworks shed", article: "a", tags: ["industrial", "fire", "interior"] },
  { id: "bell-tower", name: "open bell chamber", article: "an", tags: ["sacred", "civic", "sky", "interior"] },
  { id: "root-cellar", name: "root cellar", article: "a", tags: ["domestic", "underground", "agricultural", "interior"] },
  { id: "weir", name: "fish weir", article: "a", tags: ["water", "rural", "agricultural"] },
  { id: "plague-house", name: "marked sickhouse", article: "a", tags: ["death", "civic", "domestic", "unsettling"] },
  { id: "stone-circle", name: "reused stone circle", article: "a", tags: ["ancient", "sacred", "rural"] },
  { id: "log-drive", name: "river log drive", article: "a", tags: ["water", "forest", "labor", "industrial"] },
  { id: "salt-marsh", name: "flooded coastal salt marsh", article: "a", tags: ["coastal", "water", "swamp", "growth", "wetland"] },
  { id: "irrigation", name: "clay irrigation ditch", article: "a", tags: ["agricultural", "water", "rural"] },
  { id: "kitchen", name: "working kitchen", article: "a", tags: ["domestic", "interior", "civic"] },
]

export function environmentPhrase(env: EnvironmentDef): string {
  return `${env.article} ${env.name}`
}

const WET_TAGS = ["water", "swamp", "wetland", "flood", "coastal"]

const FEATURES_BY_TAG: Record<string, string[]> = {
  water: ["standing water", "wet ground"],
  swamp: ["reed beds", "soft mud", "alder roots"],
  wetland: ["reed beds", "peat banks"],
  flood: ["flooded ground", "stranded debris"],
  forest: ["tree trunks", "leaf litter", "undergrowth"],
  growth: ["living plants"],
  agricultural: ["worked soil", "farm tools left in reach"],
  coastal: ["tide line", "salt crust"],
  rural: ["a packed path"],
  interior: ["walls", "a used floor", "work surfaces"],
  industrial: ["iron fittings", "tools of the trade"],
  fire: ["ash", "heat-darkened surfaces"],
  sacred: ["worn thresholds", "small offerings"],
  civic: ["paving", "nearby walls"],
  mountain: ["broken stone", "a steep grade"],
  cold: ["packed snow", "ice at the edges"],
  underground: ["rough rock", "a low ceiling"],
  decay: ["rot", "repairs that have started to fail"],
  domestic: ["household objects still in use"],
  labor: ["signs of recent work"],
}

const MATERIALS_BY_TAG: Record<string, string[]> = {
  water: ["shallow-water", "wet-surfaces"],
  swamp: ["mud", "rotten-wood", "foliage"],
  wetland: ["mud", "foliage"],
  forest: ["bark", "foliage", "wood", "moss"],
  growth: ["foliage", "moss"],
  agricultural: ["wood", "wicker", "mud"],
  coastal: ["wet-stone", "rope", "salt-crust", "wood"],
  industrial: ["iron", "rust"],
  fire: ["charred-wood", "ash", "iron"],
  sacred: ["wood", "wax", "fabric"],
  civic: ["brick", "plaster", "iron"],
  cold: ["snow", "ice", "wool"],
  underground: ["rough-stone", "wet-stone"],
  decay: ["rotten-wood", "moss", "mud"],
  domestic: ["ceramic", "wood", "fabric"],
  mountain: ["rough-stone", "iron"],
}

const MATERIAL_WHERE_BY_ID: Record<string, string> = {
  "shallow-water": "standing or slow water in the scene",
  "wet-surfaces": "anything close to the ground that has stayed wet",
  mud: "wet earth where feet, wheels or roots meet the ground",
  "rotten-wood": "timber that has stayed damp too long",
  foliage: "the living plants that occupy this place",
  bark: "tree trunks and larger limbs",
  wood: "worked timber belonging to this place",
  moss: "growth on damp wood, stone or soil",
  wicker: "baskets or woven work left in use",
  "wet-stone": "stone darkened by water",
  rope: "cordage used for work here",
  "salt-crust": "salt dried onto wood, stone or fittings",
  iron: "iron tools, hinges or fittings",
  rust: "iron that has been left to weather",
  "charred-wood": "wood darkened by heat",
  ash: "ash on the ground and on nearby surfaces",
  wax: "candles or sealed joints",
  fabric: "cloth in use, not costume",
  brick: "brickwork in the walls or paving",
  plaster: "plaster on interior walls",
  snow: "snow on the ground and on upper surfaces",
  ice: "ice along water, eaves or packed earth",
  wool: "wool clothing or stored fleece",
  "rough-stone": "unfinished stone in the structure or ground",
  ceramic: "crocks, jars or tiles actually in the scene",
}

const PLACE_OVERRIDES: Record<
  string,
  {
    features?: string[]
    materials?: string[]
    materialWhere?: Record<string, string>
    condition?: string
  }
> = {
  "salt-marsh": {
    features: ["reed beds", "salt-tolerant plants", "standing water", "soft mud"],
    materials: ["foliage", "shallow-water", "mud", "wood"],
    materialWhere: {
      foliage: "reeds and salt-tolerant plants around the subject",
      "shallow-water": "flood water standing between the reeds",
      mud: "coastal mud at the base of the subject",
      wood: "timber that has been standing in salt air",
    },
    condition: "after years of seasonal flooding",
  },
  irrigation: {
    features: ["clay banks", "slow ditch water", "irrigation tools"],
    materials: ["clay", "shallow-water", "mud"],
    materialWhere: {
      clay: "the packed clay banks of the ditch",
      "shallow-water": "water moving slowly through the channel",
      mud: "wet silt at the waterline",
    },
  },
  kitchen: {
    features: ["hearth", "crocks and pans", "a used work table"],
    materials: ["ceramic", "iron", "wood", "fabric"],
    materialWhere: {
      ceramic: "crocks, bowls and jars on the table and shelves",
      iron: "pots, hooks and hearth furniture",
      wood: "the table, shelves and boarded walls",
      fabric: "cloths, sacks or hanging herbs in cloth",
    },
  },
  orchard: {
    features: ["fruit trees in rows", "standing water between the trunks", "baskets"],
    materials: ["bark", "foliage", "shallow-water", "wicker"],
    materialWhere: {
      bark: "the orchard trunks",
      foliage: "wet leaves and low growth between the rows",
      "shallow-water": "flood water standing between the trees",
      wicker: "gathering baskets left in the water or mud",
    },
    condition: "while the orchard is still flooded",
  },
  reedbed: {
    features: ["dense reeds", "narrow water channels", "fish traps"],
    materials: ["foliage", "shallow-water", "wood", "rope"],
  },
  coppice: {
    features: ["cut stools", "new shoots", "stacked poles"],
    materials: ["wood", "bark", "foliage"],
  },
  workshop: {
    features: ["benches", "tools in active use", "shavings or offcuts"],
    materials: ["wood", "iron", "leather"],
  },
  forge: {
    features: ["hearth", "anvil", "darkened shop walls"],
    materials: ["iron", "steel", "charred-wood", "ash"],
  },
}

export interface PlaceContext {
  env: EnvironmentDef
  tags: string[]
  wet: boolean
  vegetation: boolean
  interior: boolean
  open: boolean
  features: string[]
  materials: string[]
  materialWhere: Record<string, string>
  condition?: string
}

function uniqueStrings(items: string[]): string[] {
  return [...new Set(items.filter(Boolean))]
}

export function describePlace(env: EnvironmentDef): PlaceContext {
  const tags = [...env.tags]
  const wet = tags.some((tag) => WET_TAGS.includes(tag))
  const vegetation =
    tags.some((tag) => ["forest", "growth", "swamp", "wetland"].includes(tag)) ||
    (tags.includes("agricultural") && !tags.includes("interior"))
  if (wet && !tags.includes("wet")) tags.push("wet")
  if (vegetation && !tags.includes("vegetation")) tags.push("vegetation")
  if (!tags.includes("interior")) tags.push("open")

  const override = PLACE_OVERRIDES[env.id]
  const features = uniqueStrings([
    ...(override?.features ?? []),
    ...tags.flatMap((tag) => FEATURES_BY_TAG[tag] ?? []),
  ]).slice(0, 5)

  const materials = uniqueStrings([
    ...(override?.materials ?? []),
    ...tags.flatMap((tag) => MATERIALS_BY_TAG[tag] ?? []),
  ])

  const materialWhere = { ...MATERIAL_WHERE_BY_ID, ...override?.materialWhere }

  let condition = override?.condition
  if (!condition && tags.includes("flood")) condition = "after flooding"
  if (!condition && tags.includes("decay")) condition = "after years of neglect"
  if (!condition && tags.includes("cold")) condition = "in hard cold"
  if (!condition && tags.includes("fire")) condition = "with recent heat still in the air"

  return {
    env,
    tags,
    wet,
    vegetation,
    interior: tags.includes("interior"),
    open: !tags.includes("interior"),
    features,
    materials,
    materialWhere,
    condition,
  }
}
