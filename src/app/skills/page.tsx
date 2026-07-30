import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { SkillsPanel } from "@/components/SkillsPanel";
import { skillLevelStages } from "@/data/skills";
import { PROFESSIONAL_PAGE_FRAME } from "@/lib/professional-layout";

export const metadata: Metadata = {
  title: "Skills — Pedro Ossorio Arana",
  description: "A real-life skills panel in the style of Old School RuneScape.",
};

export default function SkillsPage() {
  return (
    <main className="fixed inset-0 overflow-hidden bg-white dark:bg-[#0F1015]">
      <Nav />
      <div className={`${PROFESSIONAL_PAGE_FRAME} overflow-hidden`}>
        <section className="w-full lg:flex-1 min-w-0 lg:h-full bg-white dark:bg-[#0F1015] border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 min-h-0 overflow-y-auto overscroll-contain">
          <div className="w-[90%] lg:w-[min(48rem,88%)] mx-auto py-8 lg:py-12 space-y-10 lg:space-y-14">
            <div className="space-y-4 lg:space-y-5">
              <h1 className="text-3xl lg:text-4xl uppercase tracking-wide text-gray-900 dark:text-white [font-family:var(--font-disket-bold)]">
                The Skillbook
              </h1>
              <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 [font-family:var(--font-disket)] leading-relaxed">
                Every discipline here reflects a part of the life I&apos;m trying
                to build. Some are crafts of the hand, others train the body, the
                mind, or the spirit. Some have obvious measures of progress;
                others, like Prayer, Hearthkeeping, Homesteading, or Design,
                resist quantification. Their levels are necessarily subjective,
                this skillbook is simply an honest attempt to map a lifetime of
                learning into a familiar language.
              </p>
              <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 [font-family:var(--font-disket)] leading-relaxed">
                Hover a discipline to see its current level.
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

        <section className="w-full lg:w-auto lg:shrink-0 min-h-0 h-full flex items-stretch justify-center overflow-hidden bg-black dark:bg-[#0F1015] py-3 lg:py-4 lg:pr-4">
          <SkillsPanel fit scale={3} />
        </section>
      </div>
    </main>
  );
}
