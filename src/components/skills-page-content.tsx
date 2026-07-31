"use client";

import { useState } from "react";
import { SkillsPanel } from "@/components/SkillsPanel";
import { skillLevelStages } from "@/data/skills";
import { PROFESSIONAL_PAGE_FRAME } from "@/lib/professional-layout";

type MobileView = "text" | "panel";

export function SkillsPageContent() {
  const [mobileView, setMobileView] = useState<MobileView>("text");

  return (
    <div className={`${PROFESSIONAL_PAGE_FRAME} overflow-hidden`}>
      <section
        className={`w-full lg:flex-1 min-w-0 min-h-0 overflow-y-auto overscroll-contain bg-white dark:bg-[#0F1015] border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 lg:h-full lg:block ${
          mobileView === "text" ? "h-full" : "hidden"
        }`}
      >
        <div className="w-[90%] lg:w-[min(48rem,88%)] mx-auto py-8 lg:py-12 pb-28 lg:pb-12 space-y-10 lg:space-y-14">
          <div className="space-y-4 lg:space-y-5">
            <h1 className="text-3xl lg:text-4xl uppercase tracking-wide text-gray-900 dark:text-white [font-family:var(--font-disket-bold)]">
              The Skillbook
            </h1>
            <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 [font-family:var(--font-disket)] leading-relaxed">
              Every discipline here reflects a part of the life I&apos;m trying
              to build. Some are crafts of the hand, others train the body, the
              mind, or the spirit. Some have obvious measures of progress;
              others, like Prayer or Hearthkeeping, resist quantification.
              Their levels are necessarily subjective, this skillbook is simply
              an honest attempt to map a lifetime of learning into a familiar
              language.
            </p>
            <p className="hidden lg:block text-sm lg:text-base text-gray-500 dark:text-gray-400 [font-family:var(--font-disket)] leading-relaxed">
              Hover a discipline to see its current level.
            </p>
            <p className="lg:hidden text-sm text-gray-500 dark:text-gray-400 [font-family:var(--font-disket)] leading-relaxed">
              Open the skill panel to tap a discipline and see its current
              level.
            </p>
          </div>

          <div className="space-y-4 lg:space-y-5">
            <h2 className="text-xl lg:text-2xl uppercase tracking-wide text-gray-900 dark:text-white [font-family:var(--font-disket-bold)]">
              How Levels Work
            </h2>
            <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 [font-family:var(--font-disket)] leading-relaxed">
              The levels aren&apos;t arbitrary. They&apos;re my attempt to
              translate real-world competence into the familiar language
              obviously inspired by OSRS. Advancement is based on independence,
              consistency, teaching, and the quality of work, not simply time
              invested or grind.
            </p>

            <div className="overflow-x-auto -mx-1 px-1">
              <table className="w-full min-w-[28rem] border-collapse text-left text-xs lg:text-sm [font-family:var(--font-disket)]">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="py-2 pr-3 font-normal text-gray-900 dark:text-white whitespace-nowrap text-right w-12">
                      Level
                    </th>
                    <th className="py-2 pr-3 font-normal text-gray-900 dark:text-white whitespace-nowrap">
                      Stage
                    </th>
                    <th className="py-2 font-normal text-gray-900 dark:text-white">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {skillLevelStages.map((row) => (
                    <tr
                      key={row.level}
                      className="border-b border-gray-100 dark:border-gray-800/80 align-top"
                    >
                      <td className="py-2.5 pr-3 text-gray-900 dark:text-white text-right tabular-nums whitespace-nowrap">
                        {row.level}
                      </td>
                      <td className="py-2.5 pr-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                        {row.stage}
                      </td>
                      <td className="py-2.5 text-gray-500 dark:text-gray-400 leading-relaxed">
                        {row.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`w-full min-h-0 h-full items-stretch justify-center overflow-hidden bg-black dark:bg-[#0F1015] py-3 pb-24 lg:pb-4 lg:py-4 lg:pr-4 lg:w-auto lg:shrink-0 lg:flex ${
          mobileView === "panel" ? "flex" : "hidden"
        }`}
      >
        <SkillsPanel fit scale={3} />
      </section>

      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-[#0F1015]/95 backdrop-blur-sm px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={() =>
            setMobileView((view) => (view === "text" ? "panel" : "text"))
          }
          className="w-full min-h-11 px-4 py-3 text-sm uppercase tracking-wide text-gray-900 dark:text-white [font-family:var(--font-disket-bold)] border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
        >
          {mobileView === "text" ? "View skills" : "About the Skillbook"}
        </button>
      </div>
    </div>
  );
}
