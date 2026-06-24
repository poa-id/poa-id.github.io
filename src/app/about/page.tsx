"use client"

import { useState } from "react"
import { ProfessionalSectionShell } from "@/components/professional-section-shell"
import { sectionTabClass } from "@/lib/professional-layout"
import { useTheme } from "next-themes"

type Section = "tldr" | "background" | "values" | "cv" | "interests"

export default function About() {
  const { theme } = useTheme()
  const [currentSection, setCurrentSection] = useState<Section>("tldr")

  const handleSectionChange = (section: Section) => {
    setCurrentSection(section)
    // Reset scroll position of the content div
    const contentDiv = document.querySelector('.content-scroll')
    if (contentDiv) {
      contentDiv.scrollTop = 0
    }
  }

  const renderContent = () => {
    switch (currentSection) {
      case "tldr":
        return (
          <div className="space-y-6">
            <h2 className="text-4xl mb-8 uppercase tracking-wide [font-family:var(--font-disket-bold)]">TL;DR</h2>
            <p className="text-base text-muted-foreground">
            I'm Poa, a Senior Product Designer who spends more time figuring out which problem is worth solving than pushing pixels. I've led that thinking end-to-end, from discovery through strategy, systems, and execution, across a fast-paced agency and a startup. I stay close enough to engineering to know what's actually feasible.
            </p>
            <p className="text-base text-muted-foreground">
            The work spans simplifying financial decisions for non-technical users at an agtech fintech, and building design systems that get adopted, not just shipped. Numbers and specifics live in the case studies below. This is just the shape of how I think.
            </p>
          </div>
        )
      case "background":
        return (
          <div className="space-y-6">
            <h2 className="text-4xl mb-8 uppercase tracking-wide [font-family:var(--font-disket-bold)]">Background</h2>
            <p className="text-base text-muted-foreground">What I actually do is figure out which problem is worth solving before anyone touches Figma. That means running discovery workshops, sitting with users, and pushing back on requirements that solve the wrong thing. Execution follows from that: the interface, the system, the components. Not the other way around.</p>
            <p className="text-base text-muted-foreground">That approach has played out across very different problems: simplifying financing decisions for farmers who aren't designers or technologists, untangling fragmented IA for e-commerce and B2B platforms, and building the shared systems that let a team ship consistently instead of re-solving the same problem per project. The common thread isn't the industry. It's getting underneath a messy problem before committing to a solution.</p>
              <p className="text-base text-muted-foreground">I'm technical enough to stay close to that execution layer when it matters: I write front-end code, I can read what's feasible versus what's expensive, and that's saved good ideas from getting lost in translation between design and engineering more than once. I've done this across teams in Argentina, Mexico, and the United States.</p>
              <p className="text-base text-muted-foreground">I've led a design team through a fast-paced agency juggling multiple clients at once, and worked inside a startup where the job changes shape constantly. Strategy one week, a shipped component the next. Both taught me the same thing: the title matters less than whether the right problem got solved.</p>
          </div>
        )
      case "values":
        return (
          <div className="space-y-6">
            <h2 className="text-4xl mb-8 uppercase tracking-wide [font-family:var(--font-disket-bold)]">Values</h2>
            <p className="text-base text-muted-foreground"><span className="font-bold">Craftsmanship. Usefulness. Authenticity.</span> These are the core values that guide my work and way of designing (and living).</p>
            <p className="text-base text-muted-foreground">I strive to imbue them in all my endeavors. I've always been drawn to making things, whether illustrations, products, forged metal, or carved wooden swords, and <span className="font-bold">I've always been fascinated by the process of creation.</span> Design is a mindset, not something you switch on and off for work.</p>
            <p className="text-base text-muted-foreground"><span className="font-bold">Collaboration and communication</span> are paramount. Climbing to the summit alone is a lonely and dangerous path. Triumph is a team effort, and tightly knit teams create the greatest products.</p>
            <p className="text-base text-muted-foreground">AI is a tool I use for productivity: accelerating implementation, drafting code, speeding up the mechanical parts of the work. But the creative act itself, illustration, brand identity, the actual artistic decisions, stays mine. I won't outsource that to a model, and <span className="font-bold">I'm fairly firm about it</span>.</p>
            <p className="text-2xl text-muted-foreground text-center">☩</p>
          </div>
        )
      case "cv":
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">CV</h2>
              <a 
                href="/PedroOssorioArana-CV.pdf" 
                download="PedroOssorioArana-CV.pdf"
                className="inline-flex items-center px-4 py-2 bg-transparent text-foreground border border-foreground dark:border-foreground hover:bg-foreground hover:text-background dark:hover:bg-gray-300 dark:hover:text-gray-900 transition-all duration-200 [font-family:var(--font-disket)]"
              >
                Download CV
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>

            {/* Introduction */}
            <div className="space-y-4">
              <p className="text-base text-muted-foreground">
                A quick summary. The full breakdown, with numbers, lives in the PDF.
              </p>
              <p className="text-base text-muted-foreground">
                I'm a Senior Product Designer working across discovery, strategy, design systems, and execution. Currently at Nera (agtech fintech), previously leading a 4-person design team at Balloon Group. My focus is finding the right problem before building the solution. I have enough front-end fluency to stay close to what's actually feasible to ship.
              </p>
              <p className="text-base text-muted-foreground font-medium">
                Download the CV above for the full experience, metrics, and skills breakdown.
              </p>
            </div>
          </div>
        )
      case "interests":
        return (
          <div className="space-y-6">
            <h2 className="text-4xl mb-8 uppercase tracking-wide [font-family:var(--font-disket-bold)]">Other Interests</h2>
            <p className="text-base text-muted-foreground">I'm building a cove for myself in a frantic world. I ride motorcycles, train Muay Thai, weld and build things with my hands, cook, and tend a garden planted for color in every season: Japanese maples, ginkgo, chrysanthemums, zinnias, apricots, plums, almonds. I'm also a tattoo artist (still training), an illustrator, and lately exploring concept design. Most of it comes back to the same instinct: making things, slowly, on purpose.</p>
            <p className="text-base text-muted-foreground">I'm a father and husband first. My daughter is the actual center of all this.</p>
          </div>
        )
    }
  }

  const sections: { id: Section; label: string }[] = [
    { id: "tldr", label: "TL;DR" },
    { id: "background", label: "Background" },
    { id: "values", label: "Values" },
    { id: "cv", label: "CV" },
    { id: "interests", label: "Other Interests" },
  ]

  return (
    <ProfessionalSectionShell
      darkContent={theme === "dark"}
      nav={
        <>
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleSectionChange(id)}
              className={sectionTabClass(currentSection === id)}
            >
              {label}
            </button>
          ))}
        </>
      }
    >
      {renderContent()}
    </ProfessionalSectionShell>
  )
} 