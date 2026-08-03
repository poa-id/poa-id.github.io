"use client";

import { useMemo, useState } from "react";
import localFont from "next/font/local";
import { SkillsPanel } from "@/components/SkillsPanel";
import {
  getSkillTooltipLabel,
  skillLevelStages,
  skills,
  type LifeSkill,
} from "@/data/skills";
import { PROFESSIONAL_PAGE_FRAME } from "@/lib/professional-layout";
import "./skills-page.css";

const runescape = localFont({
  src: [
    {
      path: "../../public/fonts/runescape.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/runescape.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-runescape",
  display: "block",
  adjustFontFallback: false,
  fallback: ["monospace"],
});

const runescapeBold = localFont({
  src: [
    {
      path: "../../public/fonts/runescape_bold.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/runescape_bold.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-runescape-bold",
  display: "block",
  adjustFontFallback: false,
  fallback: ["monospace"],
});

const runescapeSmall = localFont({
  src: [
    {
      path: "../../public/fonts/runescape_small.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/runescape_small.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-runescape-small",
  display: "block",
  adjustFontFallback: false,
  fallback: ["monospace"],
});

type MobileView = "text" | "panel";

function SkillDetail({
  skill,
  onClear,
}: {
  skill: LifeSkill;
  onClear: () => void;
}) {
  const rankLabel = getSkillTooltipLabel(skill);
  const journal = skill.milestones ?? [];

  return (
    <div className="space-y-5">
      <button type="button" className="skillbook-back-btn" onClick={onClear}>
        ← Back to Skillbook
      </button>

      <div className="space-y-2">
        <h2 className="skillbook-subtitle">{skill.name}</h2>
        <p className="skillbook-meta">
          Level {skill.level}
          {rankLabel ? ` · ${rankLabel}` : ""}
        </p>
        {skill.category ? (
          <p
            className={`skillbook-category skillbook-category--${skill.category.toLowerCase()}`}
          >
            {skill.category}
          </p>
        ) : null}
        {skill.description ? (
          <p className="skillbook-desc">{skill.description}</p>
        ) : null}
        {skill.level === "??" ? (
          <p className="skillbook-desc">
            This discipline resists a single number. Its journal still tells the
            story of the practice.
          </p>
        ) : null}
        {skill.href ? (
          <p>
            <a href={skill.href} className="skillbook-levels-btn">
              {skill.linkLabel ?? "See related work"}
            </a>
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <h3 className="skillbook-subtitle" style={{ fontSize: "1.2rem" }}>
          Journal
        </h3>
        {journal.length === 0 ? (
          <p className="skillbook-hint">
            The story of this skill is still being written.
          </p>
        ) : (
          <div className="skillbook-journal pt-1">
            {journal.map((entry, index) => (
              <div
                key={`${entry.year}-${entry.title}-${index}`}
                className="skillbook-journal-entry"
              >
                <div className="skillbook-journal-year">{entry.year}</div>
                <div className="skillbook-journal-body">
                  <div className="skillbook-journal-title">{entry.title}</div>
                  {entry.detail ? (
                    <div className="skillbook-journal-detail">{entry.detail}</div>
                  ) : null}
                  {typeof entry.level === "number" ? (
                    <div className="skillbook-journal-level">
                      Level {entry.level}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function WelcomeCopy({
  levelsOpen,
  onToggleLevels,
}: {
  levelsOpen: boolean;
  onToggleLevels: () => void;
}) {
  return (
    <div className="space-y-5">
      <div className="space-y-4">
        <h1 className="skillbook-title">The Skillbook</h1>
        <p className="skillbook-copy">
          Every discipline here reflects a part of the life I&apos;m trying to
          build. Some are crafts of the hand, others train the body, the mind,
          or the spirit. Some have obvious measures of progress; others, like
          Prayer or Hearthkeeping, resist quantification. Their levels are
          necessarily subjective, this skillbook is simply an honest attempt to
          map a lifetime of learning into a familiar language.
        </p>
        <p className="skillbook-hint hidden lg:block">
          Hover a discipline to see its current level. Click a skill to read its
          journal.
        </p>
        <p className="skillbook-hint lg:hidden">
          Open the skill panel, then tap a discipline for its level and journal.
        </p>
      </div>

      <div>
        <button
          type="button"
          className="skillbook-levels-btn"
          onClick={onToggleLevels}
          aria-expanded={levelsOpen}
        >
          {levelsOpen ? "Hide how levels work" : "How levels work"}
        </button>

        {levelsOpen ? (
          <div className="skillbook-levels-panel">
            <h2 className="skillbook-levels-title">How Levels Work</h2>
            <p className="skillbook-levels-intro">
              The levels aren&apos;t arbitrary. They&apos;re my attempt to
              translate real-world competence into the familiar language
              obviously inspired by OSRS. Advancement is based on independence,
              consistency, teaching, and the quality of work, not simply time
              invested or grind.
            </p>
            <div className="space-y-1">
              {skillLevelStages.map((row) => (
                <div key={row.level} className="skillbook-milestone">
                  <div className="skillbook-milestone-level">{row.level}</div>
                  <div className="skillbook-milestone-body">
                    <div className="skillbook-milestone-stage">{row.stage}</div>
                    <div className="skillbook-milestone-copy">
                      {row.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function SkillsPageContent() {
  const [mobileView, setMobileView] = useState<MobileView>("text");
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [levelsOpen, setLevelsOpen] = useState(false);

  const selectedSkill = useMemo(
    () => skills.find((skill) => skill.id === selectedSkillId) ?? null,
    [selectedSkillId],
  );

  function handleSelectSkill(skillId: string | null) {
    setSelectedSkillId(skillId);
    if (skillId) {
      setLevelsOpen(false);
      setMobileView("text");
    }
  }

  return (
    <div
      className={`${PROFESSIONAL_PAGE_FRAME} overflow-hidden skillbook-shell ${runescape.variable} ${runescapeBold.variable} ${runescapeSmall.variable} ${runescape.className}`}
    >
      <section
        className={`skillbook-copy-col w-full lg:flex-1 min-w-0 min-h-0 overflow-y-auto overscroll-contain lg:h-full lg:block ${
          mobileView === "text" ? "h-full" : "hidden"
        }`}
      >
        <div className="w-[90%] lg:w-[min(42rem,86%)] mx-auto py-8 lg:py-12 pb-28 lg:pb-12">
          {selectedSkill ? (
            <SkillDetail
              skill={selectedSkill}
              onClear={() => setSelectedSkillId(null)}
            />
          ) : (
            <WelcomeCopy
              levelsOpen={levelsOpen}
              onToggleLevels={() => setLevelsOpen((open) => !open)}
            />
          )}
        </div>
      </section>

      <section
        className={`skillbook-panel-slot w-full min-h-0 h-full items-stretch justify-center overflow-hidden py-3 pb-24 lg:pb-4 lg:py-4 lg:pr-4 lg:w-auto lg:shrink-0 lg:flex ${
          mobileView === "panel" ? "flex" : "hidden"
        }`}
      >
        <SkillsPanel
          fit
          scale={3}
          selectedSkillId={selectedSkillId}
          onSelectSkill={handleSelectSkill}
        />
      </section>

      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={() =>
            setMobileView((view) => (view === "text" ? "panel" : "text"))
          }
          className="skillbook-toggle w-full min-h-11 px-4 py-3 text-base"
        >
          {mobileView === "text" ? "View skills" : "About the Skillbook"}
        </button>
      </div>
    </div>
  );
}
