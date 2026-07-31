import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { SkillsPageContent } from "@/components/skills-page-content";

export const metadata: Metadata = {
  title: "Skills — Pedro Ossorio Arana",
  description: "A real-life skills panel in the style of Old School RuneScape.",
};

export default function SkillsPage() {
  return (
    <main className="fixed inset-0 overflow-hidden bg-black">
      <Nav />
      <SkillsPageContent />
    </main>
  );
}
