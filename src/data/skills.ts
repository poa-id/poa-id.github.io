export type SkillCategory = "Craft" | "Discipline" | "Vocation";

export type SkillLevel = number | "??";

/**
 * A dated entry in a skill's progress journal.
 * Entries accumulate over time: when a skill matures and new milestones are
 * written, older ones remain as a timeline of the path taken.
 */
export type SkillJournalMilestone = {
  /** Calendar year, age, era label, or "Present" */
  year: number | string;
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
  /** Label for the skill journal CTA link (requires href) */
  linkLabel?: string;
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
  {
    id: "muay-thai",
    name: "Muay Thai",
    level: 15,
    category: "Discipline",
    icon: "/skills/icons-32/muaythai.png",
    milestones: [
      { year: 2025, title: "Returned to martial arts." },
      { year: 2025, title: "Started training Muay Thai." },
      { year: 2025, title: "First sparring sessions." },
      { year: 2025, title: "Established a consistent training routine." },
    ],
  },
  {
    id: "experience",
    name: "Experience",
    tooltipLabel: "Age",
    level: 33,
    icon: "/skills/icons-32/hitpoints.png",
    countsTowardTotal: false,
  },
  {
    id: "metalworking",
    name: "Metalworking",
    level: 10,
    category: "Craft",
    icon: "/skills/icons-32/metalworking.png",
    milestones: [
      { year: 2018, title: "Built my first forge." },
      { year: 2018, title: "First blacksmithing projects." },
      { year: 2026, title: "New smithy workshop with better tools." },
      { year: "Currently", title: "Learning to weld better." },
    ],
  },

  { id: "strength", name: "Strength", level: 35, category: "Discipline", icon: "/skills/icons-32/strength.png" },
  {
    id: "gardening",
    name: "Gardening",
    level: 38,
    category: "Discipline",
    icon: "/skills/icons-32/gardening.png",
    milestones: [
      { year: 2020, title: "Built my first vegetable garden." },
      { year: 2020, title: "Began cultivating bonsai." },
      { year: 2025, title: "Learned hydroponics." },
      { year: 2025, title: "Planted a home orchard." },
      {
        year: 2026,
        title: "Built raised bed vegetable garden and installed automatic irrigation system.",
      },
      { year: 2026, title: "Planted flower garden." },
      { year: 2026, title: "Greenhouse in the making." },
    ],
  },
  {
    id: "bladesmithing",
    name: "Bladesmithing",
    level: 12,
    category: "Craft",
    icon: "/skills/icons-32/bladesmithing.png",
    milestones: [
      { year: 2018, title: "Forged my first knife." },
      { year: 2026, title: "Studied blade geometry and heat treatment." },
      { year: 2026, title: "Built the foundations of a bladesmithing workshop." },
    ],
  },

  { id: "constitution", name: "Constitution", level: 32, category: "Discipline", icon: "/skills/icons-32/constitution.png" },
  {
    id: "cooking",
    name: "Cooking",
    level: 36,
    category: "Craft",
    icon: "/skills/icons-32/cooking.png",
    milestones: [
      { year: 2019, title: "Worked as a barista." },
      { year: 2021, title: "Discovered Korean cuisine and acquired a big wok." },
      { year: 2023, title: "Discovered East Asian cuisine: Thai, Viet, Balinese." },
      { year: "Present", title: "Currently working on my knife skills." },
    ],
  },
  {
    id: "woodcutting",
    name: "Woodcutting",
    level: 30,
    category: "Craft",
    icon: "/skills/icons-32/woodcutting.png",
    milestones: [
      { year: "", title: "Learned safe chainsaw operation." },
      { year: "", title: "Built a long-term firewood supply." },
      { year: "", title: "Started harvesting timber for future projects." },
      { year: "", title: "Acquired better axes for splitting wood." },
      { year: "", title: "Identifies trees in the area." },
    ],
  },

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
    milestones: [
      { year: 2022, title: "Married my wife." },
      { year: 2025, title: "Established our new home together." },
      { year: 2025, title: "Became a father." },
      { year: 2026, title: "Began building a family workshop." },
      { year: 2026, title: "Built the hearth in the courtyard." },
    ],
  },
  {
    id: "woodworking",
    name: "Woodworking",
    level: 18,
    category: "Craft",
    icon: "/skills/icons-32/woodworking.png",
    milestones: [
      { year: 2026, title: "Built first furniture projects." },
      { year: 2026, title: "Completed a timber framing course." },
      { year: "Currently", title: "Establishing a home workshop." },
    ],
  },

  {
    id: "prayer",
    name: "Prayer",
    level: "??",
    category: "Vocation",
    icon: "/skills/icons-32/prayer.png",
    countsTowardTotal: false,
  },
  {
    id: "writing",
    name: "Writing",
    level: 32,
    category: "Discipline",
    icon: "/skills/icons-32/writing.png",
    milestones: [
      { year: "Highschool", title: "Started writing short stories and essays." },
      { year: 2013, title: "Began writing columns in an online blog." },
      {
        year: 2026,
        title:
          "Participated in a short story contest in a team with my brothers and friends.",
      },
      { year: "Present", title: "Currently writing for this personal website." },
    ],
  },
  { id: "bowmaking", name: "Bowmaking", level: 8, category: "Craft", icon: "/skills/icons-32/bowmaking.png" },

  {
    id: "tattooing",
    name: "Tattooing",
    level: 38,
    category: "Craft",
    icon: "/skills/icons-32/tattooing.png",
    href: "/art?section=tattoos",
    linkLabel: "Check tattoos here",
    milestones: [
      { year: 2020, title: "First tattoo." },
      { year: 2022, title: "Completed the first hundred tattoos." },
      { year: 2024, title: "Entered a traditional tattoo apprenticeship." },
      { year: 2026, title: "Opened a private studio." },
    ],
  },
  {
    id: "music",
    name: "Music",
    level: 26,
    category: "Discipline",
    icon: "/skills/icons-32/music.png",
    milestones: [
      { year: 2006, title: "Started playing drums." },
      { year: 2008, title: "Played first live gigs." },
      { year: 2012, title: "Recorded EP." },
      {
        year: "Present",
        title: "Main focus is acoustic guitar and folklore music.",
      },
    ],
  },
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
    milestones: [
      { year: "", title: "Began designing a long-term family homestead." },
      { year: "", title: "Established a productive garden and orchard." },
      { year: "", title: "Purchased our first family home." },
      {
        year: "",
        title: "Continuously improving the property for future generations.",
      },
    ],
  },
  {
    id: "construction",
    name: "Construction",
    level: 22,
    category: "Craft",
    icon: "/skills/icons-32/construction.png",
    milestones: [
      { year: 2024, title: "Reformed patio." },
      { year: 2024, title: "Built a wooden deck." },
      {
        year: 2025,
        title: "Changed house flooring, pasted microcement finish.",
      },
      { year: 2025, title: "Built a garden fireplace area." },
      { year: 2025, title: "Built veggie garden raised beds." },
      { year: 2026, title: "Completed a timber framing course." },
      { year: 2026, title: "Began building permanent infrastructure." },
      { year: "Currently", title: "Designing a long-term workshop." },
    ],
  },

  {
    id: "design",
    name: "Design",
    level: 45,
    category: "Discipline",
    icon: "/skills/icons-32/design.png",
    milestones: [
      { year: 2017, title: "Began working professionally as a designer." },
      { year: 2020, title: "Transitioned into Product Design." },
      { year: 2023, title: "Joined Nera to design fintech products." },
      {
        year: 2026,
        title: "Expanded into product strategy, communication, and internal tooling.",
      },
    ],
  },
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
