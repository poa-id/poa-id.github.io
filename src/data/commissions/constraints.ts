import type { Study } from "@/lib/commissions/types"

export const STUDY_CONSTRAINTS: Record<Study, string[]> = {
  "human-anatomy": [
    "The figure must carry weight through the feet and pelvis. No floating contrapposto.",
    "Hands must be fully designed and structurally useful, not hidden or mittened.",
    "Age and labor should be visible in the body, not only in the face.",
    "Clothing must obey the body underneath, including compression, stretch and hanging mass.",
    "Avoid an idealized gymnasium body unless the brief specifically demands an athlete.",
  ],
  "creature-anatomy": [
    "The creature must convincingly support its own weight.",
    "Avoid humanoid anatomy. If it walks on four limbs, those limbs cannot be a human body with extras.",
    "Silhouette must remain readable at thumbnail size.",
    "Show a clear strategy for feeding, breathing and turning the head.",
    "Muscle and fat should follow a skeleton you could diagram, even if you do not draw the diagram.",
  ],
  gesture: [
    "The pose cannot be a symmetrical display stance.",
    "The line of action must run through the whole body, including the head and any carried load.",
    "Capture a transitional moment, not a held theatrical beat.",
    "If multiple figures are present, their gestures must answer one another.",
  ],
  materials: [
    "Do not rely solely on color to differentiate materials.",
    "Each listed material must occupy a distinct roughness and specularity.",
    "Show at least one material in a damaged, wet or worn state.",
    "Reflections and edge highlights must be material-specific, not a generic sheen.",
  ],
  texture: [
    "Texture must turn with the form. Flat pattern is a failure condition.",
    "Reserve the finest marks for the focal area; secondary surfaces should simplify.",
    "Include at least two scales of the same material family (for example bark vs twigs, weave vs seam).",
  ],
  perspective: [
    "Use a constructed vanishing structure. Guessing is not enough.",
    "Architecture or major volumes must occupy at least 50% of the composition.",
    "Include a figure, animal or known object for scale.",
    "The ground plane must remain consistent under every object.",
  ],
  foreshortening: [
    "At least one major form must be strongly compressed toward the camera.",
    "Explain the shortened form with overlapping masses and value, not with a heavier outline.",
    "Joints inside the compressed form must still read as believable machinery.",
  ],
  composition: [
    "The primary focal point cannot be centered.",
    "Use foreground elements to frame the subject.",
    "Maintain readability at thumbnail size.",
    "Establish a clear path for the eye with no more than two competing attractions.",
  ],
  lighting: [
    "Use a single dominant light source.",
    "The subject must remain readable mostly through value grouping.",
    "Shadow shapes should be designed, not merely the absence of light.",
    "Keep a clear lightest light and darkest dark, and do not spend both of them in the same place unless that is the focal point.",
  ],
  color: [
    "Work from a limited palette of no more than five local hues.",
    "Temperature shift must do more narrative work than saturation.",
    "A grayscale read of the picture should still separate subject, ground and sky or interior.",
    "Reserve the highest chroma for a small, intentional accent.",
  ],
  scale: [
    "Prove scale with at least one measurable reference the viewer already understands.",
    "Atmospheric or perspectival reduction must support the size claim.",
    "Do not solve scale by simply drawing a giant version of a familiar animal with no change in camera or air.",
  ],
  atmosphere: [
    "Contrast and edge sharpness must decrease with distance.",
    "The air has a color. Distant forms must take it on.",
    "Keep the farthest plane simple enough to be painted with a large shape.",
  ],
  "visual-storytelling": [
    "A viewer should infer the previous action and the likely next action without text.",
    "Story must live in bodies, objects and spatial relationships more than in facial expression.",
    "Include one specific, non-generic prop that changes the meaning of the scene.",
  ],
  foliage: [
    "Vegetation must have growth direction, overlap and species logic.",
    "Do not wallpaper leaves. Plant masses are volumes.",
    "Include more than one growth state: new, mature, damaged or seasonal.",
    "Show how plants meet the ground, water or architecture.",
  ],
  architecture: [
    "The structure must look built: joints, load, repairs and human use should be visible.",
    "Architecture must occupy at least 50% of the composition.",
    "Include evidence of later alteration—a patched wall, a blocked window, a later roof.",
    "A figure or known object must be present for scale.",
  ],
}

export interface AntiShortcut {
  text: string
  extra?: string
}

export const ANTI_SHORTCUTS: AntiShortcut[] = [
  {
    text: "No glowing eyes.",
    extra: "If the subject is unnatural, show it through proportion, behavior and context.",
  },
  {
    text: "No magical particles.",
    extra: "The supernatural quality must be communicated through scale, anatomy, environment or composition rather than VFX.",
  },
  {
    text: "No floating rocks.",
  },
  {
    text: "No generic plate armor.",
    extra: "If armor is present, it must look locally made, repaired and specific to the body wearing it.",
  },
  {
    text: "No dramatic lightning in the sky.",
  },
  {
    text: "No symmetrical hero pose.",
  },
  {
    text: "No unexplained glowing runes.",
  },
  {
    text: "Avoid excessive ornamental detail.",
    extra: "Spend drawing time on structure, weight and light.",
  },
  {
    text: "Avoid generic medieval European castle imagery.",
    extra: "If a fortification is needed, invent from local materials and a practical plan.",
  },
  {
    text: "No lens flares, energy beams or comic-book speed lines.",
  },
  {
    text: "No perfect unblemished metal.",
    extra: "Every worked surface should show manufacture or use.",
  },
  {
    text: "No conveniently posed dead tree pointing at the subject.",
  },
  {
    text: "No cloak-as-silhouette cheat.",
    extra: "If a cloak is present, it has weight, thickness and a reason to hang that way.",
  },
  {
    text: "No extra pairs of wings unless the anatomy can explain launch, landing and rest.",
  },
  {
    text: "No skulls used as decoration.",
    extra: "Bone may appear if it belongs to a body, a trade or a burial.",
  },
  {
    text: "No glowing crystals as a substitute for lighting design.",
  },
  {
    text: "No identical crowd clones.",
    extra: "Even background figures need variation in age, load and attention.",
  },
  {
    text: "No rumpled 'fantasy map' landscape with a landmark in every quadrant.",
  },
  {
    text: "No antlered helmets or spiked pauldrons unless the brief's culture would actually make them.",
  },
  {
    text: "Supernatural quality must be communicated through scale, anatomy, environment or composition rather than VFX.",
  },
]

export function materialConstraint(materials: string[]): string {
  if (materials.length >= 3) {
    const listed = materials.slice(0, 3).join(", ").replace(/, ([^,]*)$/, " and $1")
    return `${listed} must be clearly distinguishable. Do not rely solely on color to differentiate materials.`
  }
  if (materials.length === 2) {
    return `${materials[0]} and ${materials[1]} must read as different substances in grayscale.`
  }
  return `The handling of ${materials[0] ?? "the primary material"} must be specific enough that a substitution would be obvious.`
}
