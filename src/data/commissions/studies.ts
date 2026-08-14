import type { Study } from "@/lib/commissions/types"

export interface StudyDef {
  id: Study
  label: string
}

export const STUDIES: StudyDef[] = [
  { id: "human-anatomy", label: "Human Anatomy" },
  { id: "creature-anatomy", label: "Creature Anatomy" },
  { id: "gesture", label: "Gesture" },
  { id: "materials", label: "Materials" },
  { id: "texture", label: "Texture" },
  { id: "perspective", label: "Perspective" },
  { id: "foreshortening", label: "Foreshortening" },
  { id: "composition", label: "Composition" },
  { id: "lighting", label: "Lighting" },
  { id: "color", label: "Color" },
  { id: "scale", label: "Scale" },
  { id: "atmosphere", label: "Atmosphere" },
  { id: "visual-storytelling", label: "Visual Storytelling" },
  { id: "foliage", label: "Foliage / Vegetation" },
  { id: "architecture", label: "Architecture" },
]

export const STUDY_BY_ID: Record<Study, StudyDef> = Object.fromEntries(
  STUDIES.map((study) => [study.id, study])
) as Record<Study, StudyDef>

export const STUDY_DIRECTION: Record<Study, string[]> = {
  "human-anatomy": [
    "The figure must read as a specific body under weight, age and fatigue—not a costume on a mannequin.",
    "Prioritize bony landmarks, joint logic and how clothing is supported by the body underneath.",
    "Hands, neck and weight-bearing legs are not optional; they must carry as much conviction as the face.",
  ],
  "creature-anatomy": [
    "The creature should feel supernatural through believable anatomy, scale and behavior rather than overt magical effects.",
    "Invent a body that could actually stand, turn and feed. If a joint cannot explain itself, redesign it.",
    "Avoid assembling a creature from human parts with extra attachments. Build a different skeleton first.",
  ],
  gesture: [
    "The pose must communicate intent before costume or rendering does. If the silhouette is idle, the picture fails.",
    "Capture a body in transition—mid-shift, mid-reach, mid-recovery—not a display stance.",
    "Let the line of action run through the whole figure, including the head and the weight of whatever is carried.",
  ],
  materials: [
    "Differentiate surfaces by value, edge quality and specularity—not hue alone.",
    "Each material must occupy a distinct band of roughness and reflectance so they remain separable in grayscale.",
    "Paint how the material is aging: wear, staining, polish and damage should do as much work as the material itself.",
  ],
  texture: [
    "Texture must describe form. Pattern that ignores volume is decoration, not observation.",
    "Vary density: tight detail at the focal point, broader marks in secondary surfaces.",
    "Use texture to explain growth, wear or manufacture—not to fill empty areas.",
  ],
  perspective: [
    "Treat space as the primary subject. If the perspective is vague, no amount of detail will save the picture.",
    "Establish a clear ground plane and vanishing structure before placing figures or ornaments.",
    "Architecture and terrain must occupy believable volume; avoid floating planes and stacked flat cutouts.",
  ],
  foreshortening: [
    "Commit to the compression. A timid foreshortening reads as a drawing error.",
    "Use overlapping forms and value, not outline, to explain what comes forward.",
    "The shortened axis must still contain convincing joints and thickness.",
  ],
  composition: [
    "Design the picture so it remains readable at thumbnail size. If the silhouette collapses, start over.",
    "The focal point must be earned by contrast, isolation and directional structure—not by placing it in the center.",
    "Use foreground, midground and background as distinct planes with a clear path for the eye.",
  ],
  lighting: [
    "One dominant light must organize the values. Additional sources may accent, not compete.",
    "The subject should remain readable mostly through value grouping, even if color is later removed.",
    "Light has a direction, a color temperature and a falloff. Decide all three before rendering surfaces.",
  ],
  color: [
    "Limit the palette and let temperature shifts, not extra hues, create richness.",
    "Color must support form and atmosphere. Saturated accents are allowed only where they serve the focal point.",
    "Build a clear relationship between local color, light color and the color of shadow.",
  ],
  scale: [
    "Scale must be proven, not claimed. Include at least one measurable reference the viewer can trust.",
    "The large thing should feel large through camera, atmosphere and the smallness of nearby forms.",
    "Avoid making everything medium-sized. Commit to a decisive difference in magnitude.",
  ],
  atmosphere: [
    "Air is a material. Distance must change contrast, edge sharpness and color, not just size.",
    "Weather and depth should affect every plane, including the subject, rather than sitting as a backdrop.",
    "Keep the farthest forms simple. Atmosphere is a reduction problem as much as a painting problem.",
  ],
  "visual-storytelling": [
    "A viewer should be able to infer what just happened and what might happen next without a caption.",
    "Story lives in bodies, objects and spatial relationships. Faces are secondary.",
    "Choose one clear narrative beat. Extra incidents dilute the picture.",
  ],
  foliage: [
    "Vegetation must have species logic: growth direction, branching, seasonal state and how it occupies space.",
    "Do not wallpaper leaves. Cluster, overlap and vary scale so plant masses read as volumes.",
    "Dead, wet, young and mature growth should not be painted with the same edge and value treatment.",
  ],
  architecture: [
    "Buildings must look constructed: load paths, joints, later repairs and human use should be visible.",
    "Architecture occupies at least half the picture and must hold together as a spatial object, not a facade stamp.",
    "Show how people or weather have used the structure. Unused architecture reads as a concept sketch.",
  ],
}
