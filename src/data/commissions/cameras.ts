import type { Difficulty, Study } from "@/lib/commissions/types"

export interface CameraDef {
  id: string
  label: string
  instruction: string
  studyWeights: Partial<Record<Study, number>>
  difficultyBias: Record<Difficulty, number>
}

export const CAMERAS: CameraDef[] = [
  {
    id: "eye-level",
    label: "Eye-level horizontal composition",
    instruction: "Keep the camera honest and slightly observational. Depth comes from overlapping planes, not from a clever angle.",
    studyWeights: { composition: 1.2, "visual-storytelling": 1.3, gesture: 1.2 },
    difficultyBias: { apprentice: 1.6, journeyman: 1.1, master: 0.7 },
  },
  {
    id: "low-angle",
    label: "Low-angle composition",
    instruction: "The subject occupies the middle distance while foreground matter creates a path toward it. Let the ground plane recede.",
    studyWeights: { scale: 1.6, "creature-anatomy": 1.3, architecture: 1.2, composition: 1.2 },
    difficultyBias: { apprentice: 1.1, journeyman: 1.3, master: 1.2 },
  },
  {
    id: "high-angle",
    label: "High-angle composition",
    instruction: "Look down enough to explain layout and relationships, but not so far that bodies flatten into symbols.",
    studyWeights: { composition: 1.4, "visual-storytelling": 1.4, perspective: 1.3 },
    difficultyBias: { apprentice: 1.1, journeyman: 1.3, master: 1.2 },
  },
  {
    id: "birds-eye",
    label: "Bird's-eye composition",
    instruction: "The ground plan is the picture. Figures become scale and traffic. Keep them anatomically specific even from above.",
    studyWeights: { perspective: 1.8, composition: 1.5, architecture: 1.5, scale: 1.3 },
    difficultyBias: { apprentice: 0.5, journeyman: 1.1, master: 1.6 },
  },
  {
    id: "worms-eye",
    label: "Worm's-eye composition",
    instruction: "Push the camera to the dirt, water or floor. Verticals must recede. The sky or ceiling becomes a major actor.",
    studyWeights: { perspective: 1.8, foreshortening: 1.6, scale: 1.6, architecture: 1.4 },
    difficultyBias: { apprentice: 0.5, journeyman: 1.2, master: 1.7 },
  },
  {
    id: "close-up",
    label: "Close-up study",
    instruction: "Crop tightly. The picture lives in surface, joint and local light. The wider world is implied by edges and fragments.",
    studyWeights: { materials: 1.7, texture: 1.8, "human-anatomy": 1.3, "creature-anatomy": 1.3 },
    difficultyBias: { apprentice: 1.3, journeyman: 1.2, master: 0.9 },
  },
  {
    id: "establishing",
    label: "Wide establishing shot",
    instruction: "The place must be readable as a system. The subject is located in it, not pasted on it. Keep a clear value hierarchy across distance.",
    studyWeights: { atmosphere: 1.7, perspective: 1.5, composition: 1.4, lighting: 1.3 },
    difficultyBias: { apprentice: 1.2, journeyman: 1.3, master: 1.3 },
  },
  {
    id: "over-shoulder",
    label: "Over-the-shoulder composition",
    instruction: "A near form occupies a large share of the frame and frames the true subject. Keep the near form specific, not a generic blur.",
    studyWeights: { composition: 1.6, "visual-storytelling": 1.5, foreshortening: 1.3, scale: 1.2 },
    difficultyBias: { apprentice: 0.9, journeyman: 1.3, master: 1.3 },
  },
  {
    id: "telephoto",
    label: "Compressed telephoto composition",
    instruction: "Stack planes. Reduce deep recession. Let overlapping silhouettes and compressed scale do the spatial work.",
    studyWeights: { composition: 1.6, atmosphere: 1.3, scale: 1.3 },
    difficultyBias: { apprentice: 0.6, journeyman: 1.2, master: 1.6 },
  },
  {
    id: "foreground-frame",
    label: "Extreme foreground framing",
    instruction: "A large, sharply present object or body occupies the near edge. The subject sits beyond it. Both must be drawn, not one faked.",
    studyWeights: { composition: 1.7, foreshortening: 1.5, materials: 1.3, scale: 1.3 },
    difficultyBias: { apprentice: 0.7, journeyman: 1.3, master: 1.5 },
  },
  {
    id: "three-point",
    label: "Three-point perspective",
    instruction: "Commit to a third vanishing point. Architecture or large bodies must recede vertically as well as in plan.",
    studyWeights: { perspective: 2.2, architecture: 2, foreshortening: 1.4, scale: 1.3 },
    difficultyBias: { apprentice: 0.25, journeyman: 1.1, master: 1.8 },
  },
  {
    id: "diagonal",
    label: "Strong diagonal composition",
    instruction: "A dominant diagonal carries the eye. Counter it with one stable mass so the picture does not slide off the page.",
    studyWeights: { composition: 1.8, gesture: 1.4, "visual-storytelling": 1.3 },
    difficultyBias: { apprentice: 1.1, journeyman: 1.3, master: 1.2 },
  },
  {
    id: "aperture",
    label: "View through an aperture",
    instruction: "Look through a doorway, wheel, branches, ribs or window. The frame is part of the subject and must have thickness.",
    studyWeights: { composition: 1.6, architecture: 1.4, lighting: 1.4, atmosphere: 1.2 },
    difficultyBias: { apprentice: 1, journeyman: 1.3, master: 1.3 },
  },
  {
    id: "reflection",
    label: "Reflection-led composition",
    instruction: "A substantial part of the readable image lives in water, metal, wet stone or glass. The reflection must obey the same space.",
    studyWeights: { composition: 1.3, lighting: 1.5, materials: 1.5, atmosphere: 1.3 },
    difficultyBias: { apprentice: 0.6, journeyman: 1.2, master: 1.5 },
  },
  {
    id: "profile-silhouette",
    label: "Profile silhouette composition",
    instruction: "The primary read is a side-on shape against a simpler field. Interior modeling is secondary to the contour's accuracy.",
    studyWeights: { composition: 1.5, "creature-anatomy": 1.4, gesture: 1.4, lighting: 1.3 },
    difficultyBias: { apprentice: 1.4, journeyman: 1.1, master: 0.8 },
  },
  {
    id: "stacked-planes",
    label: "Stacked spatial planes",
    instruction: "Build the picture in three distinct depth bands. Each band has its own contrast range. The subject owns only one of them.",
    studyWeights: { composition: 1.6, atmosphere: 1.5, perspective: 1.3, color: 1.2 },
    difficultyBias: { apprentice: 1, journeyman: 1.3, master: 1.4 },
  },
  {
    id: "intimate-interior",
    label: "Intimate interior composition",
    instruction: "The room is close. Walls, beams and objects press in. Manage overlapping furniture and bodies without losing the spatial box.",
    studyWeights: { perspective: 1.5, architecture: 1.5, lighting: 1.4, materials: 1.2 },
    difficultyBias: { apprentice: 1, journeyman: 1.3, master: 1.3 },
  },
  {
    id: "figure-for-scale",
    label: "Figure-as-scale composition",
    instruction: "A small trustworthy figure or animal proves the size of the main mass. Do not hide the scale cue in decoration.",
    studyWeights: { scale: 2.2, architecture: 1.6, atmosphere: 1.3, perspective: 1.4 },
    difficultyBias: { apprentice: 1.1, journeyman: 1.3, master: 1.4 },
  },
  {
    id: "cropped-action",
    label: "Cropped mid-action composition",
    instruction: "Cut the frame through moving forms. The crop should feel intentional, as if the event is larger than the picture.",
    studyWeights: { gesture: 1.7, composition: 1.5, foreshortening: 1.5, "visual-storytelling": 1.4 },
    difficultyBias: { apprentice: 0.8, journeyman: 1.3, master: 1.4 },
  },
  {
    id: "negative-space",
    label: "Negative-space dominant composition",
    instruction: "A large empty or quiet field is structural, not leftover. The subject must hold against it without crowding the edges.",
    studyWeights: { composition: 1.8, atmosphere: 1.4, color: 1.3, lighting: 1.2 },
    difficultyBias: { apprentice: 1.2, journeyman: 1.2, master: 1.1 },
  },
  {
    id: "undergrowth",
    label: "Low view through undergrowth",
    instruction: "Near vegetation occludes and reveals. Leaves and stems are volumes in space, not a texture overlay.",
    studyWeights: { foliage: 2, composition: 1.4, atmosphere: 1.3, "creature-anatomy": 1.2 },
    difficultyBias: { apprentice: 0.9, journeyman: 1.3, master: 1.3 },
  },
  {
    id: "two-shot",
    label: "Two-mass confrontation",
    instruction: "Two comparable masses share the frame. Their spatial relationship is the subject. Avoid centering either one.",
    studyWeights: { composition: 1.6, "visual-storytelling": 1.6, scale: 1.3, gesture: 1.2 },
    difficultyBias: { apprentice: 1.1, journeyman: 1.3, master: 1.2 },
  },
  {
    id: "crowd-texture",
    label: "Crowd-as-texture with small focus",
    instruction: "Many figures or objects form a rhythmic field. One slightly distinct unit is the focal point. Resist portrait isolation.",
    studyWeights: { "visual-storytelling": 1.7, composition: 1.6, gesture: 1.4, scale: 1.2 },
    difficultyBias: { apprentice: 0.5, journeyman: 1.2, master: 1.7 },
  },
  {
    id: "cross-section",
    label: "Cutaway / sectional composition",
    instruction: "Reveal interior and exterior in one constructed view. The cut must feel architectural or anatomical, not like a diagram sticker.",
    studyWeights: { architecture: 1.8, perspective: 1.7, composition: 1.2 },
    difficultyBias: { apprentice: 0.3, journeyman: 1, master: 1.8 },
  },
  {
    id: "long-horizontal",
    label: "Wide horizontal procession",
    instruction: "Use a long format logic even inside a standard frame: repeated beats, a path, and a delayed focal point.",
    studyWeights: { composition: 1.5, "visual-storytelling": 1.4, atmosphere: 1.3 },
    difficultyBias: { apprentice: 1, journeyman: 1.3, master: 1.3 },
  },
]
