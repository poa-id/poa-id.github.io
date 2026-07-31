export type SkillCategory = "Craft" | "Discipline" | "Vocation";

export type SkillLevel = number | "??";

/**
 * A dated entry in a skill's progress journal.
 * Entries accumulate over time: when a skill matures and new milestones are
 * written, older ones remain as a timeline of the path taken.
 */
export type SkillJournalMilestone = {
  year: number;
  title: string;
  detail?: string;
  /** Optional skill level at the time of this entry */
  level?: number;
};

export type LifeSkill = {
  id: string;
  name: string;
  level: SkillLevel;
  icon: string;
  category?: SkillCategory;
  rank?: string;
  tooltipLabel?: string;
  description?: string;
  /** Chronological progress journal — append-only story of the skill */
  milestones?: SkillJournalMilestone[];
  countsTowardTotal?: boolean;
  href?: string;
};

export type SkillLevelStage = {
  level: number;
  stage: string;
  description: string;
};

/**
 * Rank thresholds used by tooltips and the "How levels work" reference.
 * Separate from each skill's personal journal milestones.
 */
export const skillLevelStages: SkillLevelStage[] = [
  {
    level: 1,
    stage: "Beginner",
    description:
      "No practical experience. Learning vocabulary, tools, and first principles.",
  },
  {
    level: 5,
    stage: "Initiate",
    description: "Can follow instructions with close guidance.",
  },
  {
    level: 10,
    stage: "Student",
    description:
      "Understands the fundamentals but still depends on examples and correction.",
  },
  {
    level: 20,
    stage: "Novice",
    description:
      "Can complete simple projects independently. Mistakes are frequent but recoverable.",
  },
  {
    level: 30,
    stage: "Advanced Amateur",
    description:
      "A reliable hobbyist producing solid work with growing confidence.",
  },
  {
    level: 40,
    stage: "Practitioner",
    description:
      "Regular practice has become part of life. Comfortable teaching complete beginners.",
  },
  {
    level: 50,
    stage: "Skilled",
    description:
      "Handles most real-world problems without assistance. Produces consistently useful work.",
  },
  {
    level: 60,
    stage: "Professional",
    description:
      "Trusted to deliver quality work. Could earn a living with the skill.",
  },
  {
    level: 70,
    stage: "Expert",
    description:
      "Respected by experienced peers. Solves difficult or unfamiliar problems with confidence.",
  },
  {
    level: 80,
    stage: "Craftsman / Specialist",
    description:
      "Years of deliberate practice have built deep intuition and refined judgment.",
  },
  {
    level: 90,
    stage: "Master",
    description:
      "Shapes others through teaching, mentorship, and original work. Widely respected in the community.",
  },
  {
    level: 95,
    stage: "Grandmaster",
    description:
      "National or international recognition. Work influences the field beyond direct students.",
  },
  {
    level: 99,
    stage: "Legendary Master",
    description:
      "A lifetime devoted to the craft. The sort of person remembered by name long after they're gone.",
  },
];

/**
 * Grid order is row-major: 3 columns × 8 rows.
 * Edit `level` to change displayed values; reorder this array to change positions.
 * Append journal entries to `milestones` — never remove old ones; they form the timeline.
 *
 * Example:
 * milestones: [
 *   { year: 2024, title: "Bought my first house", detail: "..." },
 *   { year: 2028, title: "Finished paying the mortgage", level: 40 },
 * ]
 *
 * Columns (top → bottom):
 * 1. Muay Thai, Strength, Constitution, Ranged, Prayer, Tattooing, Art, Design
 * 2. Experience, Gardening, Cooking, Hearthkeeping, Writing, Music, Homesteading, Commerce
 * 3. Metalworking, Bladesmithing, Woodcutting, Woodworking, Bowmaking, Crafting, Construction, Mentoring
 */
export const skills: LifeSkill[] = [
  { id: "muay-thai", name: "Muay Thai", level: 15, category: "Discipline", icon: "/skills/icons-32/muaythai.png" },
  {
    id: "experience",
    name: "Experience",
    tooltipLabel: "Age",
    level: 33,
    icon: "/skills/icons-32/hitpoints.png",
    countsTowardTotal: false,
  },
  { id: "metalworking", name: "Metalworking", level: 10, category: "Craft", icon: "/skills/icons-32/metalworking.png" },

  { id: "strength", name: "Strength", level: 35, category: "Discipline", icon: "/skills/icons-32/strength.png" },
  { id: "gardening", name: "Gardening", level: 38, category: "Discipline", icon: "/skills/icons-32/gardening.png" },
  { id: "bladesmithing", name: "Bladesmithing", level: 12, category: "Craft", icon: "/skills/icons-32/bladesmithing.png" },

  { id: "constitution", name: "Constitution", level: 32, category: "Discipline", icon: "/skills/icons-32/constitution.png" },
  { id: "cooking", name: "Cooking", level: 36, category: "Craft", icon: "/skills/icons-32/cooking.png" },
  { id: "woodcutting", name: "Woodcutting", level: 30, category: "Craft", icon: "/skills/icons-32/woodcutting.png" },

  { id: "ranged", name: "Ranged", level: 10, category: "Discipline", icon: "/skills/icons-32/archery.png" },
  {
    id: "hearthkeeping",
    name: "Hearthkeeping",
    level: "??",
    category: "Vocation",
    icon: "/skills/icons-32/hearthkeeping.png",
    countsTowardTotal: false,
    description:
      "The lifelong practice of cultivating a home where family, hospitality, order, beauty, and tradition can flourish.",
  },
  { id: "woodworking", name: "Woodworking", level: 18, category: "Craft", icon: "/skills/icons-32/woodworking.png" },

  {
    id: "prayer",
    name: "Prayer",
    level: "??",
    category: "Vocation",
    icon: "/skills/icons-32/prayer.png",
    countsTowardTotal: false,
  },
  { id: "writing", name: "Writing", level: 32, category: "Discipline", icon: "/skills/icons-32/writing.png" },
  { id: "bowmaking", name: "Bowmaking", level: 8, category: "Craft", icon: "/skills/icons-32/bowmaking.png" },

  { id: "tattooing", name: "Tattooing", level: 38, category: "Craft", icon: "/skills/icons-32/tattooing.png" },
  { id: "music", name: "Music", level: 26, category: "Discipline", icon: "/skills/icons-32/music.png" },
  { id: "crafting", name: "Crafting", level: 27, category: "Craft", icon: "/skills/icons-32/crafting.png" },

  { id: "art", name: "Art", level: 28, category: "Discipline", icon: "/skills/icons-32/art.png" },
  {
    id: "homesteading",
    name: "Homesteading",
    level: 35,
    category: "Vocation",
    icon: "/skills/icons-32/homesteading.png",
    description:
      "Cultivating a resilient home through preservation, repair, and self-sufficiency where possible.",
  },
  { id: "construction", name: "Construction", level: 22, category: "Craft", icon: "/skills/icons-32/construction.png" },

  { id: "design", name: "Design", level: 45, category: "Discipline", icon: "/skills/icons-32/design.png" },
  {
    id: "commerce",
    name: "Commerce",
    level: 28,
    category: "Discipline",
    icon: "/skills/icons-32/trading.png",
    description:
      "Creating, exchanging, and stewarding value through trade, entrepreneurship, investing, negotiation, and sound financial judgment.",
  },
  {
    id: "mentoring",
    name: "Mentoring",
    level: 22,
    category: "Vocation",
    icon: "/skills/icons-32/mentoring.png",
    description:
      "Developing people through teaching, coaching, encouragement, and leading by example.",
  },
];

export function getSkillRank(level: number): string {
  let stage = skillLevelStages[0].stage;
  for (const milestone of skillLevelStages) {
    if (level >= milestone.level) stage = milestone.stage;
    else break;
  }
  return stage;
}

export function getTotalLevel(skillList: LifeSkill[] = skills): number {
  return skillList.reduce((sum, skill) => {
    if (skill.countsTowardTotal === false) return sum;
    if (typeof skill.level !== "number") return sum;
    return sum + skill.level;
  }, 0);
}

export function getSkillTooltipLabel(skill: LifeSkill): string | null {
  if (skill.tooltipLabel) return skill.tooltipLabel;
  if (skill.rank) return skill.rank;
  if (typeof skill.level !== "number") return null;
  return getSkillRank(skill.level);
}
