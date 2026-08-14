import { STUDY_BY_ID } from "@/data/commissions/studies"
import { articleFor, joinFeatures, sentence, withArticle } from "@/lib/commissions/compatibility"
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

function feedingContact(model: SceneModel): string {
  const family = model.being?.kind === "creature" ? model.being.family.toLowerCase() : ""
  if (/avian|raptor/.test(family)) return "beak, talons and the ground"
  if (/piscine|cetacean/.test(family)) return "the mouth and the water"
  if (/insect|arachnid/.test(family)) return "mouthparts and the limbs among the growth"
  return "muzzle, neck and feet"
}

function creatureLead(model: SceneModel): string {
  const being = model.being
  if (being?.kind !== "creature") return leadNoun(model.what)
  const family = being.family.toLowerCase()
  const role = being.ecologicalRole.toLowerCase()
  const prefix = BODY_PLAN_PREFIX[being.bodyPlan] ?? ""
  return withArticle(`${prefix}${family} ${role}`.replace(/\s+/g, " ").trim())
}

function characterLead(model: SceneModel): string {
  const being = model.being
  if (being?.kind !== "character") return leadNoun(model.what)
  const species = being.species.replace(/\s+humanoid$/i, "").toLowerCase()
  const role = being.role.toLowerCase()
  const age = being.age.toLowerCase()
  const build = being.build.toLowerCase()
  if (model.subject.category === "group-scene") {
    return withArticle(`${role} crew of ${age} ${build} ${species}`)
  }
  return withArticle(`${age} ${build} ${species} ${role}`)
}

function compositionName(model: SceneModel): string {
  if (model.being?.kind === "character") {
    const role = model.being.role.toLowerCase()
    return model.subject.category === "group-scene" ? `the ${role} crew` : `the ${role}`
  }
  return model.subject.noun
}

function objectLead(model: SceneModel): string {
  return leadNoun(model.what)
}

function sceneParagraph(model: SceneModel): string {
  const place = placeGloss(model)
  const features = featurePhrase(model)
  const situation = model.narrative.situationId
  const category = model.subject.category

  if (category === "creature" || category === "beast") {
    const lead = creatureLead(model)
    if (situation === "moving-through-cover") {
      return sentence(
        `${lead} moves through ${place}. It picks its way among ${features}`
      )
    }
    if (situation === "feeding-in-place") {
      return sentence(`${lead} feeds among ${features} in ${place}`)
    }
    if (situation === "drinking-at-water") {
      return sentence(`${lead} drinks and wades at the water in ${place}`)
    }
    if (situation === "nested-in-structure") {
      return sentence(`${lead} uses a human structure in ${place} as perch, shelter or hunting ground`)
    }
    return sentence(`${lead} occupies ${place}, among ${features}`)
  }

  if (category === "character" || category === "group-scene") {
    const lead = characterLead(model)
    const role = model.being?.kind === "character" ? model.being.role.toLowerCase() : model.subject.role?.toLowerCase()
    if (situation === "carrying-through") {
      return sentence(`${lead} carries a real load through ${place}`)
    }
    if (situation === "paused-in-work") {
      return sentence(`${lead} has stopped mid-task in ${place}. The unfinished work is still in the hands or on the ground`)
    }
    if (situation === "weather-labor") {
      return sentence(
        `${lead} is still working in ${place}, in weather that tells on clothing, skin and ground`
      )
    }
    if (situation === "tending-place") {
      return sentence(`${lead} tends ${place} as a job, attention on a specific object or patch of ground`)
    }
    if (situation === "crew-at-task") {
      return sentence(`${lead} shares one job in ${place}. Bodies should answer one another rather than pose as a row of portraits`)
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
  if (situation === "overtaken-by-plants") {
    return sentence(
      `${lead} stands in ${place}, partly claimed by local growth among ${features}`
    )
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
  if (situation === "harvest-pause-land") {
    return sentence(`${lead} stands in ${place} among ${features}, with cut and uncut growth still readable as a crop`)
  }
  if (situation === "plant-occupies") {
    return sentence(`${lead} occupy ${place}, meeting ground, water or timber as living structure`)
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
  const being = model.being

  if (category === "creature" || category === "beast") {
    const locomotion =
      being?.kind === "creature"
        ? locomotionFor(being.bodyPlan, being.ecologicalRole)
        : "standing, walking, turning and feeding"
    if (situation === "moving-through-cover") {
      return sentence(
        `Dense growth should overlap the animal's legs and body so it feels physically embedded in the undergrowth. Its anatomy must convincingly support ${locomotion}`
      )
    }
    if (situation === "feeding-in-place") {
      return sentence(
        `Show how this animal actually feeds here: ${feedingContact(model)} working among ${features}. The body must support ${locomotion}`
      )
    }
    if (situation === "drinking-at-water") {
      return sentence(
        `Weight, reflection and the meeting of hide and water are the moment. The stance has to make sense in mud or shallows, and the body must support ${locomotion}`
      )
    }
    if (situation === "nested-in-structure") {
      return sentence(
        `The animal and the construction must share contact points and scale. Keep the structure looking built, and the body able to ${locomotion.split(" and ")[0]}`
      )
    }
    return sentence(`The creature should feel adapted to this ground. Its anatomy must support ${locomotion}`)
  }

  if (category === "character" || category === "group-scene") {
    if (situation === "carrying-through") {
      return sentence(
        `The load and the ground together explain the walk. Show weight through the feet, a specific carried object, and clothing worn for work rather than display`
      )
    }
    if (situation === "paused-in-work") {
      return sentence(
        `Read the pause in the body: weight shifted, the load not yet set down, attention elsewhere. Hands and tools should still belong to the interrupted job`
      )
    }
    if (situation === "weather-labor") {
      return sentence(
        `Weather is a working condition. Wet, cold or dust should tell in cloth, hair and the ground underfoot, not only in the sky`
      )
    }
    if (situation === "crew-at-task") {
      return sentence(
        `Treat the group as a working unit. Variation in age, load and attention matters more than matching faces`
      )
    }
    return sentence(
      `Show the labor in the body: useful hands, weight through the pelvis and feet, and clothing that has been worn for this job`
    )
  }

  if (situation === "overtaken-by-plants") {
    return sentence(
      `Let plant masses wrap and break the silhouette of ${name}. The growth is not a wreath around a prop; it shares the same space as the object`
    )
  }
  if (situation === "half-submerged") {
    return sentence(
      `Keep a hard waterline. Wet and dry materials must meet convincingly on ${name} and on ${features}`
    )
  }
  if (situation === "still-in-use") {
    return sentence(
      `A recent offering, repair or work mark should prove that someone was here this week. Keep ${name} looking like a tool in a living place`
    )
  }
  if (situation === "left-after-work") {
    return sentence(
      `The last user is gone, but the unfinished job is still visible around ${name}`
    )
  }
  if (situation === "repaired-in-place") {
    return sentence(
      `Show the repair as mismatched timber, extra nails or a later brace. The history should be readable in the joints`
    )
  }
  if (situation === "path-and-marker") {
    return sentence(
      `A worn path and a small object at the near edge establish human traffic and scale`
    )
  }
  if (situation === "machine-in-use") {
    return sentence(
      `Parts, load and site have to explain how the machine works. Wet, dust, heat or tension should show that it functions`
    )
  }
  if (situation === "plant-occupies") {
    return sentence(
      `Show growth direction, overlap and a clear meeting with ground, water or structure. Plant masses are volumes`
    )
  }
  if (category === "environment-land") {
    return sentence(
      `Keep it specific and worked. ${model.setting.interior ? "This is a room with a trade, not an empty stage set" : cap(features) + " should do the describing, not a generic wilderness vista"}`
    )
  }
  if (category === "spell-moment") {
    return sentence(
      `The change is physical: materials, air and temperature. If the moment were removed, the place would still be a specific workplace`
    )
  }
  if (model.subject.physicalDescription && !/must be readable|not for display|Build an? /.test(model.subject.physicalDescription)) {
    return sentence(model.subject.physicalDescription)
  }
  return undefined
}

function locomotionFor(bodyPlan: string, role: string): string {
  const feeding = /grazer|browser|forager/i.test(role)
    ? "grazing"
    : /predator|hunter/i.test(role)
      ? "hunting"
      : "feeding"
  if (/wader/i.test(bodyPlan)) return `wading, turning and ${feeding}`
  if (/winged|gliding/i.test(bodyPlan)) return `perching, launching and ${feeding}`
  if (/serpentine/i.test(bodyPlan)) return `moving, turning and ${feeding}`
  if (/aquatic|amphibious/i.test(bodyPlan)) return `moving between water and ground, and ${feeding}`
  if (/burrowing/i.test(bodyPlan)) return `digging, emerging and ${feeding}`
  return `standing, walking, turning and ${feeding}`
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
      return sentence(
        `Keep the whole body readable: weight through the legs, a believable joint logic, and locomotion that fits this ground. Avoid assembling a costume of parts`
      )
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
        `${cap(name)} must look built: load paths, joinery, later repairs and human use should be visible`
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
    return sentence(
      `Place ${name} partially obscured by foreground growth, with the head and shoulders emerging into a clearer area. ${cap(useFeatures)}.`
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
    "close-up": `Crop tightly on ${name}. Surface, joint and local light carry the picture; ${foreground ?? "the wider place"} is implied at the edges.`,
    establishing: `Give ${place} real depth. Place ${name} among ${foreground ?? "the near ground"}, overlapping the first plane rather than standing in front of a backdrop. ${cap(useFeatures)}.`,
    "over-shoulder": `Let ${foreground ?? model.subject.elements[0] ?? "a near form"} occupy a large share of the frame and reveal ${name} beyond it. Draw both.`,
    telephoto: `Compress the planes of ${place}. ${cap(name)} and ${supporting[0] ?? foreground ?? "the nearer ground"} should overlap rather than recede into deep space.`,
    "foreground-frame": `A large, specific ${foreground ?? "foreground object"} occupies the near edge. ${cap(name)} sits beyond it. Both must be drawn.`,
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

  const notes: Record<string, string> = {
    dapple: canopy
      ? `Dappled daylight filtering through the canopy. Use patches of light and shadow to describe ${name}'s larger forms without losing its silhouette.`
      : `Broken daylight. Use patches of light and shadow to describe larger forms without losing the silhouette of ${name}.`,
    overcast: `Soft overcast daylight. Keep values close and let form read through temperature and edge rather than hard shadow.`,
    "golden-hour": `Low golden-hour light. Long ground shadows; keep ${name} readable against the warmer strike.`,
    dawn: `Cloudy dawn. Hold a little remaining night in the hollows, with only small warmer accents.`,
    moonlight: `Moonlight with very conservative fill. Let ${name} read as large value shapes, not as a night-time catalogue of detail.`,
    firelight: `Firelight as the dominant source, with a cooler night or doorway as the second speaker. Watch falloff.`,
    candlelight: `Candlelight: several weak sources of similar temperature. Faces need not be fully lit.`,
    backlight: `Strong backlight. Keep a thin rim and a restrained bounce so ${name} does not collapse into a void.`,
    noon: `Harsh noon. Small hard shadows and bleached ground bounce; find shade under structures or growth.`,
    storm: `Storm light. A brief brighter opening in the cloud; wet surfaces should do extra work.`,
    "water-bounce": `Light bouncing off water. Keep caustics structural, and let wet verticals pick up the bounce.`,
    "fog-lamp": `Lamplight in fog: a short throw, rapid falloff, and silhouettes beyond the lit pocket.`,
    "forge-glow": `Forge-glow against a much cooler doorway or clerestory. Heat shimmer only if earned.`,
    shaft: `A single aperture of light into surrounding dark. Dust or moisture only where the beam is earned.`,
    "snow-glare": `Overcast snow glare, with upward bounce stronger than the sky. Keep true darks for cavities.`,
    "after-rain": `Clearing light after rain. Puddles and wet masses should mirror the sky; keep remaining cloud colder.`,
    subterranean: `Subterranean lamp or vent-light. Stratified darkness, with a distant second source only if it earns scale.`,
    "hearth-interior": `Kitchen or hearth light, with a cooler window as the second speaker. Faces need not be fully lit.`,
    "cold-morning": `Cold morning light: long blue shadows and a delayed warm strike on one plane.`,
    underwater: `Shallow flooded light. Keep caustics structural, with silty falloff toward a brighter broken surface above.`,
    "procession-lamps": `Many similar warm lamps in a larger cooler night. Faces mostly lost except near a lamp.`,
    "workshop-window": `A dusty workshop window as a blown-out rectangle. Tools go quickly to half-light.`,
    twilight: `Winter twilight. Almost no direct sun; a long horizon glow, with interior warmth as a small opposing note.`,
    "smoke-sun": `Smoke-filtered sun. Reduced contrast, brown or orange air as a unifier, and one cleaner plane in the foreground.`,
    "wet-bounce": `Wet ground as a second light source. Keep dry upper planes darker, and specularity material-specific.`,
  }

  return notes[id] ?? sentence(`${model.visualGoal.lighting.name}. Use ${model.visualGoal.lightingAccent} to describe ${name} without breaking the silhouette.`)
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
    return ["The creature must convincingly support its own weight. Silhouette remains readable at thumbnail size."]
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
    return ["The structure must look built: joints, load, repairs and human use should be visible."]
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
  const study = studyParagraph(model)
  if (study && study !== narrative) paragraphs.push(study)
  if (titleHook) paragraphs.push(sentence(titleHook))
  return paragraphs.slice(0, 4).join("\n\n")
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
