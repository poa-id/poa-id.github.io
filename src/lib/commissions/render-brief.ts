import { STUDY_BY_ID } from "@/data/commissions/studies"
import { emergingContact, overlapContact } from "@/lib/commissions/anatomy"
import { articleFor, countOf, impliedPhrase, occupies, withArticle } from "@/lib/commissions/grammar"
import { joinFeatures, sentence } from "@/lib/commissions/compatibility"
import type { SeededRng } from "@/lib/commissions/random"
import type { SceneModel, VisibleMaterial } from "@/lib/commissions/scene-model"
import type { Study } from "@/lib/commissions/types"

const TITLE_ADJECTIVES = [
  "Low",
  "Wet",
  "Old",
  "Spare",
  "Salt",
  "Tin",
  "Quiet",
  "Late",
  "Narrow",
  "Common",
  "Borrowed",
  "Upright",
  "Bent",
  "Winter",
  "Harvest",
]

interface TitleNickname {
  name: string
  requireTags: string[]
  hook: string
}

const NICKNAMES: TitleNickname[] = [
  {
    name: "Saltwife",
    requireTags: ["coastal"],
    hook: "People who work this shore call {noun} the Saltwife.",
  },
  {
    name: "Fen Bell",
    requireTags: ["wetland"],
    hook: "The nearest houses still call {noun} the Fen Bell.",
  },
  {
    name: "Dike Watch",
    requireTags: ["water", "rural"],
    hook: "The path past {noun} is known locally as the Dike Watch.",
  },
]

const PLACE_GLOSS: Record<string, string> = {
  coppice: "a working coppice where trees are harvested in rotation for poles and firewood",
  "temperate-forest": "a temperate forest with understory, leaf litter and mixed stands",
  "ancient-woodland": "an ancient woodland of mixed age, deadfall and deep shade",
  swamp: "an alder swamp of standing water, roots and soft mud",
  "flooded-forest": "a flooded forest with water standing between the trunks",
  "peat-cuttings": "a peat cutting, with wet banks and stacked turves",
  desert: "a stony desert of bare ground and hard light",
  "oasis-camp": "a used oasis camp around a working water source",
  mountains: "a broken mountain shoulder of rock, scree and thin air",
  "alpine-valley": "an alpine valley still in agricultural use",
  scree: "a scree field of loose talus",
  ruins: "an inhabited ruin, patched and lived in rather than abandoned to romance",
  monastery: "a working monastery",
  "abbey-precinct": "an abbey precinct with kitchen gardens and outbuildings still in use",
  fortress: "a frontier fortress built for a practical defense",
  gatehouse: "a gatehouse yard with traffic, stores and a working threshold",
  workshop: "a cluttered workshop mid-job",
  forge: "a village forge",
  "kiln-yard": "a brick kiln yard of stacked ware, ash and heat-stained masonry",
  cave: "an inhabited cave mouth used as shelter",
  mine: "a working mine adit",
  quarry: "a hillside quarry with a working face and cut blocks",
  coastline: "a working coastline of boats, gear and tide line",
  "fishing-village": "a fishing village",
  saltworks: "coastal saltworks of pans, crates and drying grounds",
  "medieval-city": "a tight medieval city street",
  "back-courtyard": "a laundry courtyard",
  farmland: "a strip of farmland still in ordinary cultivation",
  orchard: "a flooded orchard with water standing between the rows",
  vineyard: "a terraced vineyard",
  grassland: "grazed grassland kept as pasture",
  hedgerow: "a deep hedgerow lane, laid and ditched as a working boundary",
  frozen: "a frozen river margin",
  "snow-farm": "a snowed-in farmyard",
  volcanic: "volcanic waste of ash, clinker and broken ground",
  "hot-spring": "a worked hot spring",
  "underground-city": "an underground street",
  temple: "a repaired temple interior",
  abandoned: "an abandoned settlement with work traces still on the ground",
  "shrine-road": "a wayside shrine road",
  "mill-race": "a mill race and wheel still built for work",
  boathouse: "a leaking boathouse",
  "scriptorium-yard": "a copyists' yard",
  "archive-cellar": "a damp archive cellar",
  granary: "a raised granary on staddlestones",
  apiary: "an orchard apiary",
  tannery: "a riverside tannery",
  "slaughter-yard": "a slaughter yard",
  graveyard: "a parish graveyard still in use",
  ossuary: "a hill ossuary",
  "marsh-boardwalk": "a marsh boardwalk over wet ground",
  reedbed: "a reedbed fishery of channels, traps and cut bundles",
  "cliff-nests": "a cliff nesting ground",
  karst: "a limestone sinkhole",
  "mushroom-cellar": "a mushroom cellar of damp beds and harvest",
  "rope-bridge": "a repaired rope crossing",
  "watch-post": "a timber watch post",
  "charcoal-camp": "a charcoal burners' camp",
  "ice-house": "an ice house",
  "bath-house": "a public bath house",
  "well-court": "a village well court",
  "flood-plain": "a settled floodplain",
  "ash-field": "a field of last year's burn, coming back in mixed growth",
  "coral-pool": "a tidal pool shelf",
  glassworks: "a glassworks shed",
  "bell-tower": "an open bell chamber",
  "root-cellar": "a root cellar",
  weir: "a fish weir",
  "plague-house": "a marked sickhouse",
  "stone-circle": "a reused stone circle",
  "log-drive": "a river log drive",
  "salt-marsh": "a flooded coastal salt marsh of reed beds, mud and standing water",
  irrigation: "a clay irrigation ditch cutting through worked fields",
  kitchen: "a working kitchen",
  "tidal-inlet": "a tidal inlet of muddy banks, mooring posts and working boats",
  farmyard: "a working farmyard of packed earth, fencing and stacked tools",
  "wooded-ridge": "a wooded ridge with a view over fields",
}

const BODY_PLAN_PREFIX: Record<string, string> = {
  Hexapodal: "six-legged ",
  Octopodal: "eight-legged ",
  Serpentine: "serpentine ",
  Winged: "winged ",
  Flightless: "flightless ",
  Arboreal: "",
  Burrowing: "",
  Amphibious: "amphibious ",
  Aquatic: "aquatic ",
  Gliding: "gliding ",
  Climbing: "",
  "Heavy terrestrial": "large ",
  "Long-legged wader": "long-legged ",
  Bipedal: "",
  Quadrupedal: "",
}

function titleCase(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

function cap(text: string): string {
  if (!text) return text
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function leadNoun(what: string): string {
  const comma = what.indexOf(",")
  if (comma > 24) return what.slice(0, comma)
  return what
}

function placeGloss(model: SceneModel): string {
  return PLACE_GLOSS[model.setting.environmentId] ?? model.setting.placeLabel
}

function featurePhrase(model: SceneModel, count = 3): string {
  return joinFeatures(model.setting.features.slice(0, count))
}

function creatureLead(model: SceneModel): string {
  const being = model.being
  if (being?.kind !== "creature") return leadNoun(model.what)
  const family = being.family.toLowerCase()
  const role = being.ecologicalRole.toLowerCase()
  const prefix = BODY_PLAN_PREFIX[being.bodyPlan] ?? ""
  const prefixed = prefix && !family.startsWith(prefix.trim()) ? `${prefix}${family} ${role}` : `${family} ${role}`
  return withArticle(prefixed.replace(/\s+/g, " ").trim())
}

function characterLead(model: SceneModel): string {
  const being = model.being
  if (being?.kind !== "character") return leadNoun(model.what)
  if (model.subject.category === "group-scene") {
    return model.what.replace(/[.!?]$/, "")
  }
  const species = being.species.replace(/\s+humanoid$/i, "").toLowerCase()
  const role = being.role.toLowerCase().replace(/ crew$/, "")
  const age = being.age.toLowerCase()
  const build = being.build.toLowerCase()
  return withArticle(`${age} ${build} ${species} ${role}`)
}

function compositionName(model: SceneModel): string {
  if (model.being?.kind === "character") {
    const role = model.being.role.toLowerCase().replace(/ crew$/, "")
    return model.subject.category === "group-scene" ? `the ${role} crew` : `the ${role}`
  }
  return model.subject.noun
}

function objectLead(model: SceneModel): string {
  return leadNoun(model.what)
}

function localContextPhrase(model: SceneModel): string {
  return joinFeatures((model.setting.localContext.length > 0 ? model.setting.localContext : model.setting.features).slice(0, 3))
}

function sceneParagraph(model: SceneModel): string {
  const place = placeGloss(model)
  const features = featurePhrase(model)
  const context = localContextPhrase(model)
  const situation = model.narrative.situationId
  const category = model.subject.category
  const number = model.grammaticalNumber

  if (category === "creature" || category === "beast") {
    const lead = creatureLead(model)
    if (situation === "moving-through-cover") {
      return sentence(`${lead} moves through ${place}, picking a path among ${features}`)
    }
    if (situation === "feeding-in-place") {
      const feeding = model.feeding?.action ?? "feeds"
      return sentence(`${lead} ${feeding} among ${features} in ${place}`)
    }
    if (situation === "drinking-at-water") {
      return sentence(`${lead} drinks and wades at the water in ${place}`)
    }
    if (situation === "nested-in-structure") {
      return sentence(`${lead} uses a built structure in ${place} as shelter, hunting ground or a place to feed`)
    }
    return sentence(`${lead} ${occupies(number)} ${place}, among ${features}`)
  }

  if (category === "character" || category === "group-scene") {
    const lead = characterLead(model)
    const role = model.being?.kind === "character" ? model.being.role.toLowerCase().replace(/ crew$/, "") : model.subject.role?.toLowerCase()
    if (category === "group-scene") {
      const variation = "Their ages and builds vary, but tools and clothing belong to the same trade"
      if (situation === "crew-at-task" || situation === "mid-labor") {
        return sentence(`${lead} shares one job in ${place}. ${variation}`)
      }
      return sentence(`${lead} works in ${place}. ${variation}`)
    }
    if (situation === "carrying-through") {
      return sentence(`${lead} carries a real load through ${place}`)
    }
    if (situation === "paused-in-work") {
      return sentence(`${lead} has stopped mid-task in ${place}. The unfinished work is still in the hands or on the ground`)
    }
    if (situation === "weather-labor") {
      return sentence(`${lead} is still working in ${place}, in weather that tells on clothing, skin and ground`)
    }
    if (situation === "tending-place") {
      return sentence(`${lead} tends ${place} as a job, attention on a specific object or patch of ground`)
    }
    return sentence(`${lead} is mid-work in ${place}${role ? `, doing the ordinary labor of ${articleFor(role)} ${role}` : ""}`)
  }

  if (category === "environment-land") {
    if (situation === "after-flood-land") {
      return sentence(
        `${cap(place)} still holds flood water. Stranded tools, paths and plants show how the land is used when it is dry`
      )
    }
    if (situation === "harvest-pause-land") {
      return sentence(`${cap(place)} is between jobs. Cut and uncut growth, tools and a path make the land readable as a crop`)
    }
    if (situation === "abandoned-tools-land") {
      return sentence(`${cap(place)} was left mid-work. Tools, a barrow or an unfinished cut still occupy the ground`)
    }
    if (situation === "animals-at-water-land") {
      return sentence(`An ordinary working animal drinks or crosses at the water in ${place}`)
    }
    if (situation === "weather-changing-land") {
      return sentence(`Weather is rewriting ${place}: wet ground, moving air and a change in the light`)
    }
    if (situation === "interior-workplace-land") {
      return sentence(`${cap(place)} is mid-use. Heat, water, stores or tools show the trade that belongs here`)
    }
    return sentence(`${cap(place)}, with ${features}`)
  }

  const lead = objectLead(model)
  const detail = model.what.includes(",") ? model.what.slice(model.what.indexOf(",") + 1).trim().replace(/[.!?]$/, "") : ""

  if (category === "architecture") {
    const located = `${leadNoun(model.what)} stands ${place.startsWith("a ") || place.startsWith("an ") ? `at the edge of ${place}` : `in ${place}`}`
    const extras = detail ? `, ${detail}` : `, among ${context}`
    if (situation === "repaired-in-place") {
      return sentence(`${located}${extras}. Generations of repair are visible in mismatched braces, replaced boards and altered joints`)
    }
    if (situation === "still-in-use") {
      return sentence(`${located}${extras}, kept in service through weekly use`)
    }
    return sentence(`${located}${extras}`)
  }

  if (situation === "overtaken-by-plants") {
    return sentence(`${lead} stands in ${place}, partly claimed by local growth among ${features}`)
  }
  if (situation === "half-submerged") {
    return sentence(`${lead} stands in ${place}, with a clear waterline on every surface the flood has reached`)
  }
  if (situation === "still-in-use") {
    return sentence(`${lead} stands in ${place} and is still in weekly use`)
  }
  if (situation === "left-after-work") {
    return sentence(`${lead} has been left in ${place} where the last job stopped`)
  }
  if (situation === "repaired-in-place") {
    return sentence(`${lead} stands in ${place}, kept going with visible, makeshift repairs`)
  }
  if (situation === "path-and-marker") {
    return sentence(`${lead} stands beside a worn path in ${place}`)
  }
  if (situation === "weather-on-object") {
    return sentence(`${lead} sits in ${place}, with the local weather readable on every surface`)
  }
  if (situation === "plant-occupies") {
    return sentence(`${lead} ${occupies(number)} ${place}, meeting ground, water or timber as living structure`)
  }
  if (situation === "machine-in-use") {
    return sentence(`${lead} stands in ${place}, mid-work or just stopped`)
  }
  if (category === "spell-moment") {
    return sentence(`${lead} happens in ${place}`)
  }
  return sentence(`${lead} stands in ${place}, among ${features}`)
}

function narrativeParagraph(model: SceneModel): string | undefined {
  const situation = model.narrative.situationId
  const name = model.subject.noun
  const features = featurePhrase(model)
  const category = model.subject.category
  const anatomy = model.anatomy

  if (category === "creature" || category === "beast") {
    if (situation === "moving-through-cover") {
      return sentence(
        anatomy
          ? overlapContact(anatomy)
          : "Dense growth overlaps the body so the animal is physically embedded in the undergrowth"
      )
    }
    if (situation === "feeding-in-place") {
      return model.feeding ? sentence(`The available food here is ${model.feeding.food}`) : undefined
    }
    if (situation === "drinking-at-water") {
      const hide = anatomy?.hasExoskeleton ? "shell" : anatomy?.hasFins ? "wet skin" : "hide"
      return sentence(`Weight, reflection and the meeting of ${hide} and water are the moment, in mud or shallows that can actually hold the body`)
    }
    if (situation === "nested-in-structure") {
      return sentence(`The animal and the construction share contact points and scale. The structure looks built; the body uses it`)
    }
    if (model.feeding) return sentence(`It ${model.feeding.action} here, using ${model.anatomy?.feedingNoun ?? "the mouth and the ground"}`)
    return sentence(`The creature is using this ground, not posing on it`)
  }

  if (category === "group-scene") {
    return sentence(
      "Bodies answer one another around one job: different ages, loads and attention, the same trade and community"
    )
  }

  if (category === "character") {
    if (situation === "carrying-through") {
      return sentence(`The load and the ground together explain the walk: a specific carried object, and clothing worn for work rather than display`)
    }
    if (situation === "paused-in-work") {
      return sentence(`Weight is shifted, the load not yet set down, attention elsewhere. Hands and tools still belong to the interrupted job`)
    }
    if (situation === "weather-labor") {
      return sentence(`Wet, cold or dust tells in cloth, hair and the ground underfoot, not only in the sky`)
    }
    return sentence(`Useful hands, weight through the pelvis and feet, and clothing worn for this job`)
  }

  if (situation === "overtaken-by-plants") {
    return sentence(`Plant masses wrap and break the silhouette of ${name}, sharing the same space rather than wreathing a prop`)
  }
  if (situation === "half-submerged") {
    return sentence(`A hard waterline cuts ${name} and ${features}. Wet and dry materials meet on the same objects`)
  }
  if (situation === "still-in-use") {
    return sentence(`A recent offering, repair or work mark proves someone was here this week`)
  }
  if (situation === "left-after-work") {
    return sentence(`The last user is gone, but the unfinished job is still visible around ${name}`)
  }
  if (situation === "repaired-in-place") {
    if (category === "architecture") return undefined
    return sentence(`Mismatched timber, extra nails or a later brace make the repair history readable`)
  }
  if (situation === "path-and-marker") {
    return sentence(`A worn path and a small object at the near edge establish human traffic and scale`)
  }
  if (situation === "machine-in-use") {
    return sentence(`Wet, dust, heat or tension shows that the machine functions. Parts, load and site explain the mechanism`)
  }
  if (situation === "plant-occupies") {
    return sentence(`Growth direction and overlap meet ground, water or structure as volume, not wallpaper`)
  }
  if (category === "environment-land") {
    return sentence(
      model.setting.interior
        ? "This is a room with a trade, not an empty stage set"
        : `${cap(features)} do the describing, not a generic wilderness vista`
    )
  }
  if (category === "spell-moment") {
    return sentence(`The change is physical: materials, air and temperature. If the moment were removed, the place would still be a specific workplace`)
  }
  if (model.establishedLight) {
    return sentence(model.establishedLight.cue)
  }
  return undefined
}

function studyParagraph(model: SceneModel): string {
  const study = model.visualGoal.primaryStudy
  const name = model.subject.noun
  const features = featurePhrase(model)
  const place = placeGloss(model)

  switch (study) {
    case "foliage":
      if (model.setting.environmentId === "coppice" || /stool|shoot|pole/.test(features)) {
        return sentence(
          `Build the vegetation as overlapping three-dimensional masses. Show several stages of managed woodland growth and allow branches and shoots to partially obscure ${name} so it feels physically embedded in the coppice`
        )
      }
      if (model.setting.tags.includes("coastal") || model.setting.environmentId === "salt-marsh") {
        return sentence(
          `Build reed and salt-plant masses through clustering, overlap and variation in height. Show how they meet mud, standing water and ${name}`
        )
      }
      if (model.setting.tags.includes("wetland") || model.setting.tags.includes("swamp")) {
        return sentence(
          `Build plant masses as volumes: clustering, overlap and variation in height. Show how roots, reeds and wet ground meet ${name}`
        )
      }
      return sentence(
        `Treat the vegetation as three-dimensional masses ${name} must share space with, not as a decorative backdrop. Cluster, overlap and vary scale, and show how plants meet ${features}`
      )
    case "creature-anatomy":
      return ""
    case "human-anatomy":
      return sentence(
        `Age and labor should be visible in the body, including hands, neck and the contact with the ground. Clothing must obey the structure underneath`
      )
    case "gesture":
      return sentence(
        `The pose should explain the job before costume or rendering does. Capture a body in use, not a display stance`
      )
    case "materials":
      return sentence(
        `Differentiate the surfaces by roughness, wear and specularity. ${cap(joinFeatures(presentMaterials(model).map((item) => item.toLowerCase())))} should remain separable in grayscale`
      )
    case "texture":
      return sentence(
        `Texture should turn with the form. Use it to explain growth, wear or manufacture on ${name}, not to fill empty areas`
      )
    case "perspective":
      return sentence(
        `Construct the ground plane through ${place}. ${cap(name)} must occupy believable volume, with a consistent recession rather than stacked cutouts`
      )
    case "foreshortening":
      return sentence(
        `Commit to a compressed major form. Explain it with overlapping masses and value, not with a heavier outline`
      )
    case "composition":
      return sentence(
        `Design a clear focal hierarchy. ${cap(name)} and ${features} should organize the picture at thumbnail size`
      )
    case "lighting":
      return lightingStudyNote(model)
    case "color":
      return sentence(
        `Keep a limited local palette. Let temperature shifts describe ${place}, and reserve higher chroma for a small, intentional accent`
      )
    case "scale":
      return sentence(
        `Prove size with ${model.scaleCue ?? "a measurable object already in the scene"}. Camera, overlap and atmospheric reduction should support the claim`
      )
    case "atmosphere":
      return sentence(
        `Distance through ${place} should change contrast, edges and color on every plane, including ${name}. Keep the farthest forms simple`
      )
    case "visual-storytelling":
      return sentence(
        `A viewer should infer the previous action and the next one from bodies, objects and ${features}, without a caption`
      )
    case "architecture":
      return sentence(
        `${cap(name)} looks built: mismatched braces, replaced boards and later joints sit in a structure that still has a job`
      )
    default:
      return ""
  }
}

function lightingStudyNote(model: SceneModel): string {
  return sentence(
    `${model.visualGoal.lighting.name} should organize the values. Use ${model.visualGoal.lightingAccent} without breaking the silhouette of ${model.subject.noun}`
  )
}

function compositionText(model: SceneModel): string {
  const name = compositionName(model)
  const features = model.setting.features
  const foreground = features[0]
  const supporting = features.slice(1, 3)
  const place = model.setting.placeLabel
  const camera = model.visualGoal.camera.id
  const living = model.subject.category === "creature" || model.subject.category === "beast" || model.subject.category === "character"
  const vegetation = living && (model.vegetationCentral || model.visualGoal.primaryStudy === "foliage")

  const useFeatures = supporting.length > 0
    ? `Use ${joinFeatures(features.slice(0, 3))} to stage ${place}`
    : foreground
      ? `Use ${foreground} to anchor the near ground`
      : `Use the near ground to establish ${place}`

  if (model.subject.category === "environment-land") {
    const land: Record<string, string> = {
      "eye-level": `Keep the camera at standing height. Let ${foreground ?? "the near ground"} occupy the first plane, with the rest of ${place} receding in clear layers.`,
      "low-angle": `Keep the camera low so ${place} recedes as ground, not as a painted drop.`,
      "high-angle": model.setting.interior
        ? `Look down enough to explain the layout of ${place}: work surfaces, circulation and stored tools.`
        : `Look down enough to explain the layout of ${place}: path, work traces and weather.`,
      establishing: `Show ${place} as a system. ${cap(useFeatures)}.`,
      "stacked-planes": `Build three depth bands through ${place}. The land itself is the subject.`,
      "intimate-interior": `The room is close. Let walls, work surfaces and ${foreground ?? "stored objects"} explain the trade.`,
      "close-up": `Crop into the working surfaces of ${place}. Imply the wider room at the edges.`,
    }
    return sentence(land[camera] ?? `Show ${place} with weather and use visible on every plane. ${cap(useFeatures)}.`)
  }

  if (vegetation && (camera === "establishing" || camera === "eye-level" || camera === "undergrowth" || camera === "low-angle")) {
    const emerge = model.anatomy ? emergingContact(model.anatomy) : "the head"
    return sentence(
      `Place ${name} in the middle distance, partially obscured by foreground growth, with ${emerge} emerging into a clearer area. ${cap(useFeatures)}.`
    )
  }

  const staging: Record<string, string> = {
    "eye-level": `Keep the camera at standing height. Place ${name} in the middle distance, with ${foreground ?? "the near ground"} overlapping in front. ${cap(useFeatures)}.`,
    "low-angle": `Keep the camera low. ${cap(name)} occupies the middle distance, with ${foreground ?? "the ground plane"} leading toward it.`,
    "high-angle": `Look down enough to explain how ${name} sits among ${joinFeatures(features.slice(0, 2) || [place])}. Keep bodies from flattening into symbols.`,
    "birds-eye": `The ground plan of ${place} is the picture. ${cap(name)} is a specific occupant of that plan, not a marker.`,
    "worms-eye": model.setting.interior
      ? `Push the camera to the floor. ${cap(name)} recedes vertically; the ceiling becomes a major plane.`
      : `Push the camera to the dirt, water or floor. ${cap(name)} recedes vertically; sky or ceiling becomes a major plane.`,
    "close-up": `Crop tightly on ${name}. Surface, joint and local light carry the picture; ${impliedPhrase(foreground ?? "the wider place")} at the edges.`,
    establishing: `Give ${place} real depth. Place ${name} among ${foreground ?? "the near ground"}, overlapping the first plane rather than standing in front of a backdrop. ${cap(useFeatures)}.`,
    "over-shoulder": `Let ${foreground ?? model.subject.elements[0] ?? "a near form"} occupy a large share of the frame and reveal ${name} beyond it. Draw both.`,
    telephoto: `Compress the planes of ${place}. ${cap(name)} and ${supporting[0] ?? foreground ?? "the nearer ground"} should overlap rather than recede into deep space.`,
    "foreground-frame": `${countOf(foreground ?? "foreground object") === "plural" ? cap(foreground ?? "Near forms") : `A large, specific ${foreground ?? "foreground object"}`} ${occupies(countOf(foreground ?? "foreground object"))} the near edge. ${cap(name)} sits beyond it. Both must be drawn.`,
    "three-point": `Commit to a third vanishing point. ${cap(name)} and the major volumes of ${place} recede vertically as well as in plan.`,
    diagonal: `A dominant diagonal through ${name} and ${foreground ?? "the ground"} carries the eye. Counter it with one stable mass.`,
    aperture: `Look through ${foreground ?? "a doorway, wheel, branches or window"} toward ${name}. The frame needs thickness.`,
    reflection: `A substantial readable area lives in the water. ${cap(name)} and ${foreground ?? "the near ground"} must obey the same reflection.`,
    "profile-silhouette": `Read ${name} first as a side-on shape against a simpler field. Keep the contour accurate.`,
    "stacked-planes": `Build three depth bands through ${place}. ${cap(name)} owns only one of them.`,
    "intimate-interior": `The room is close. Walls, beams and objects press in around ${name}. Keep the spatial box readable.`,
    "figure-for-scale": `Place ${name} so its size is proven by ${model.scaleCue ?? "a measurable object already in the scene"}.`,
    "cropped-action": `Cut the frame through the action around ${name}. The event should feel larger than the picture.`,
    "negative-space": `Give ${name} a large quiet field. The empty area is structural, not leftover.`,
    undergrowth: `Look through near vegetation. Keep ${foreground ?? "plant stems"} as volumes in the foreground; ${name} is revealed in the gaps.`,
    "two-shot": `Two comparable masses share the frame: ${name} and ${supporting.join(" and ") || foreground || "the nearest major form"}. Their spatial relationship is the subject.`,
    "crowd-texture": `Many bodies or objects form a rhythmic field in ${place}. ${cap(name)} is only slightly more distinct.`,
    "cross-section": `Reveal interior and exterior of ${name} in one constructed view. The cut should feel built.`,
    "long-horizontal": `Use a long path through ${place}, with ${name} delayed along that path.`,
  }

  return sentence(staging[camera] ?? `Place ${name} in ${place}. ${cap(useFeatures)}.`)
}

function lightingText(model: SceneModel): string {
  const name = model.subject.noun
  const id = model.visualGoal.lighting.id
  const canopy = model.setting.tags.includes("forest") || model.setting.environmentId === "coppice"
  const cue = model.establishedLight?.cue

  const notes: Record<string, string> = {
    dapple: canopy
      ? `Dappled daylight filtering through the canopy. Patches of light and shadow describe ${name}'s larger forms without losing its silhouette.`
      : `Broken daylight. Patches of light and shadow describe larger forms without losing the silhouette of ${name}.`,
    overcast: `Soft overcast daylight. Values stay close; form reads through temperature and edge rather than hard shadow.`,
    "golden-hour": `Low golden-hour light. Long ground shadows; ${name} stays readable against the warmer strike.`,
    dawn: `Cloudy dawn. A little remaining night in the hollows, with only small warmer accents.`,
    moonlight: `Moonlight with very conservative fill. ${cap(name)} reads as large value shapes, not as a night-time catalogue of detail.`,
    firelight: cue
      ? `${cap(cue)}. Watch falloff against a cooler night or doorway.`
      : `Firelight as the dominant source, with a cooler night or doorway as the second speaker. Watch falloff.`,
    candlelight: cue
      ? `${cap(cue)}. Faces need not be fully lit.`
      : `Candlelight: several weak sources of similar temperature. Faces need not be fully lit.`,
    backlight: `Strong backlight. A thin rim and a restrained bounce so ${name} does not collapse into a void.`,
    noon: `Harsh noon. Small hard shadows and bleached ground bounce; shade under structures or growth.`,
    storm: `Storm light. A brief brighter opening in the cloud; wet surfaces do extra work.`,
    "water-bounce": `Light bouncing off water. Caustics stay structural, and wet verticals pick up the bounce.`,
    "fog-lamp": cue
      ? `${cap(cue)}. Rapid falloff, and silhouettes beyond the lit pocket.`
      : `Lamplight in fog: a short throw, rapid falloff, and silhouettes beyond the lit pocket.`,
    "forge-glow": cue
      ? `${cap(cue)}, against a much cooler doorway or clerestory.`
      : `Forge-glow against a much cooler doorway or clerestory. Heat shimmer only if earned.`,
    shaft: `A single aperture of light into surrounding dark. Dust or moisture only where the beam is earned.`,
    "snow-glare": `Overcast snow glare, with upward bounce stronger than the sky. True darks stay in cavities.`,
    "after-rain": `Clearing light after rain. Puddles and wet masses mirror the sky; remaining cloud stays colder.`,
    subterranean: cue
      ? `${cap(cue)}. Stratified darkness, with a distant second source only if it earns scale.`
      : `Subterranean lamp or vent-light. Stratified darkness, with a distant second source only if it earns scale.`,
    "hearth-interior": `Kitchen or hearth light, with a cooler window as the second speaker. Faces need not be fully lit.`,
    "cold-morning": `Cold morning light: long blue shadows and a delayed warm strike on one plane.`,
    underwater: `Shallow flooded light. Caustics stay structural, with silty falloff toward a brighter broken surface above.`,
    "procession-lamps": cue
      ? `${cap(cue)}. Faces mostly lost except near a lamp.`
      : `Many similar warm lamps in a larger cooler night. Faces mostly lost except near a lamp.`,
    "workshop-window": `A dusty workshop window as a blown-out rectangle. Tools go quickly to half-light.`,
    twilight: `Winter twilight. Almost no direct sun; a long horizon glow, with interior warmth as a small opposing note.`,
    "smoke-sun": `Smoke-filtered sun. Reduced contrast, brown or orange air as a unifier, and one cleaner plane in the foreground.`,
    "wet-bounce": `Wet ground as a second light source. Dry upper planes stay darker, and specularity stays material-specific.`,
    bioluminescence: cue
      ? `${cap(cue)}.`
      : `Bioluminescent fill kept local and biological, with a separate cooler skylight.`,
  }

  return notes[id] ?? sentence(`${model.visualGoal.lighting.name}. ${cue ? cap(cue) : `Use ${model.visualGoal.lightingAccent} to describe ${name} without breaking the silhouette.`}`)
}
function presentMaterials(model: SceneModel): string[] {
  const ids = new Set(model.visualGoal.materials.map((item) => item.id))
  const names: string[] = []
  const add = (name: string) => {
    if (!names.includes(name)) names.push(name)
  }

  const rename = (material: VisibleMaterial): string[] => {
    switch (material.id) {
      case "foliage":
        if (model.setting.tags.includes("wetland") || model.setting.tags.includes("swamp")) return ["Leaves", "Reeds"]
        return ["Leaves"]
      case "wood":
        if (model.setting.environmentId === "coppice" || /stool|pole|shoot/.test(featurePhrase(model, 5))) {
          return ["Fresh-cut wood", "Bark"]
        }
        return ["Weathered wood"]
      case "bark":
        return ["Bark"]
      case "fur":
      case "wet-fur":
        return material.id === "wet-fur" ? ["Wet hide"] : ["Hide"]
      case "leather":
        return ["Leather"]
      case "bronze":
        return model.setting.tags.includes("coastal") || ids.has("verdigris") ? ["Oxidized bronze"] : ["Bronze"]
      case "iron":
        return ids.has("rust") ? ["Oxidized iron"] : ["Iron"]
      case "rust":
        return ["Oxidized iron"]
      case "verdigris":
        return ["Oxidized bronze"]
      case "wet-surfaces":
        if (model.setting.tags.includes("mountain") || ids.has("wet-stone") || ids.has("rough-stone")) return ["Wet stone"]
        if (ids.has("wood") || ids.has("rotten-wood")) return ["Wet wood"]
        return model.setting.wet ? ["Wet stone"] : []
      case "shallow-water":
      case "deep-water":
        return ["Standing water"]
      case "rotten-wood":
        return ["Rotten wood"]
      case "charred-wood":
        return ["Charred wood"]
      case "thatch":
        return ["Thatch"]
      case "paper-vellum":
        return ["Vellum"]
      default:
        return [material.name]
    }
  }

  for (const material of model.visualGoal.materials) {
    if (material.id === "foliage" && model.visualGoal.primaryStudy === "foliage") {
      for (const name of rename(material)) add(name)
      continue
    }
    if (material.id === "foliage") {
      for (const name of rename(material)) add(name)
      continue
    }
    for (const name of rename(material)) add(name)
  }

  if (
    (ids.has("foliage") || ids.has("wood") || ids.has("bark")) &&
    (model.setting.environmentId === "coppice" || /stool|pole/.test(featurePhrase(model, 5)))
  ) {
    add("Bark")
    add("Fresh-cut wood")
    add("Leaves")
  }

  return names.filter((name) => name.toLowerCase() !== "foliage").slice(0, 4)
}

function renderConstraintText(model: SceneModel): string[] {
  const study = model.visualGoal.primaryStudy
  const features = featurePhrase(model, 3)
  const name = model.subject.noun

  if (study === "foliage") {
    if (model.setting.environmentId === "coppice" || /stool|shoot|pole/.test(features)) {
      return ["Show at least three distinct stages of woodland growth: recently cut stools, young shoots and mature stems."]
    }
    if (model.setting.tags.includes("wetland") || model.setting.tags.includes("swamp")) {
      return ["Show how plants meet mud, standing water and the main subject. Do not wallpaper leaves."]
    }
    return [`Show more than one growth state, and a clear meeting between plants and ${name}.`]
  }

  if (study === "creature-anatomy") {
    const limb = model.anatomy?.limbNoun ?? "body"
    return [`The creature must convincingly support its own weight through the ${limb}. Silhouette remains readable at thumbnail size.`]
  }
  if (study === "human-anatomy") {
    return ["Hands must be fully designed and structurally useful, not hidden or mittened."]
  }
  if (study === "materials") {
    const listed = presentMaterials(model)
    if (listed.length >= 2) {
      return [`${listed.slice(0, 3).join(", ").replace(/, ([^,]*)$/, " and $1")} must read as different substances in grayscale.`]
    }
  }
  if (study === "architecture") {
    return ["Every major structural member must appear to carry or transfer load plausibly."]
  }
  if (study === "perspective") {
    return ["The ground plane must remain consistent under every object."]
  }
  if (study === "lighting") {
    return ["Use a single dominant light source. Shadow shapes should be designed, not merely the absence of light."]
  }

  const stored = [model.constraints.studyConstraint, ...model.constraints.extraConstraints].filter(Boolean)
  return stored.slice(0, 2)
}

export function titleFromModel(rng: SeededRng, model: SceneModel): { title: string; hook?: string } {
  const nouns = model.titleNouns.filter((word) => word.length > 3 && !word.includes("'"))
  const noun = rng.pick(nouns.length > 0 ? nouns : ["Keeper"])
  const placeWord = titleCase(
    model.setting.environmentName
      .split(/\s+/)
      .filter((word) => word.length > 3 && !word.includes("'"))
      .slice(-1)[0] ?? "Yard"
  )
  const adjective = rng.pick(TITLE_ADJECTIVES)

  const nickname = NICKNAMES.find((item) => item.requireTags.every((tag) => model.setting.tags.includes(tag)))
  if (nickname && rng.chance(0.22)) {
    return {
      title: `${nickname.name} of the ${placeWord}`,
      hook: nickname.hook.replace("{noun}", model.subject.noun),
    }
  }

  if (noun.toLowerCase() === placeWord.toLowerCase()) {
    return { title: `The ${adjective} ${noun}` }
  }

  const pattern = rng.int(5)
  switch (pattern) {
    case 0:
      return { title: `The ${adjective} ${noun}` }
    case 1:
      return { title: `${noun} at the ${placeWord}` }
    case 2:
      return { title: `The ${noun} of the ${placeWord}` }
    case 3:
      return { title: `${adjective} ${placeWord}` }
    default:
      return { title: `The ${noun}` }
  }
}

export function renderArtBrief(model: SceneModel, titleHook?: string): string {
  const paragraphs = [sceneParagraph(model)]
  const narrative = narrativeParagraph(model)
  if (narrative) paragraphs.push(narrative)
  if (titleHook) paragraphs.push(sentence(titleHook))
  return paragraphs.slice(0, 3).join("\n\n")
}

export function renderComposition(model: SceneModel): string {
  return compositionText(model)
}

export function renderLighting(model: SceneModel): string {
  return lightingText(model)
}

export function renderMaterials(model: SceneModel): string[] {
  const presented = presentMaterials(model)
  if (presented.length > 0) return presented
  return model.visualGoal.materials
    .map((material) => material.name)
    .filter((name) => name.toLowerCase() !== "foliage")
}

export function renderConstraints(model: SceneModel): string[] {
  return renderConstraintText(model)
}

export function secondaryLabels(studies: Study[]): string[] {
  return studies.map((study) => STUDY_BY_ID[study].label)
}
