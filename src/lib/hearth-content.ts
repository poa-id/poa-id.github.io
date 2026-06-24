export type HearthSection = "family" | "home" | "cooking" | "rhythms"

export const HEARTH_SECTIONS: { id: HearthSection; label: string }[] = [
  { id: "family", label: "Family" },
  { id: "home", label: "Home" },
  { id: "cooking", label: "Cooking" },
  { id: "rhythms", label: "Rhythms" },
]

export const HEARTH_SECTION_INTROS: Record<HearthSection, string> = {
  family: "Father and husband.",
  home:
    "House projects with my wife. @lacasitapinterest on Instagram for deco, reform, and the garden. Building a cove in a frantic world.",
  cooking:
    "Cooking when there's time. The table as the center of gravity: hospitality, friends, family and seasonal ingredients when possible.",
  rhythms:
    "Morning training, work, making things in the gaps. Seasons, routines, the holy ordinary texture of a life (I think) well lived.",
}
