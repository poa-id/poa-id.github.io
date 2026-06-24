"use client"

import { useState } from "react"
import Image from "next/image"
import { ProfessionalSectionShell } from "@/components/professional-section-shell"
import { sectionTabClass } from "@/lib/professional-layout"
import { useTheme } from "next-themes"

type Section = "home" | "making" | "guild" | "training"

export default function NowPage() {
  const { theme } = useTheme()
  const [currentSection, setCurrentSection] = useState<Section | null>(null)

  const handleSectionChange = (section: Section) => {
    setCurrentSection(section)
    const contentDiv = document.querySelector(".content-scroll")
    if (contentDiv) {
      contentDiv.scrollTop = 0
    }
  }

  const renderContent = () => {
    if (currentSection === null) {
      return (
        <div className="space-y-8">
          <p className="text-base lg:text-lg text-muted-foreground [font-family:var(--font-disket)]">
            A snapshot of what I'm focused on right now, updated occasionally. This
            page exists because of{" "}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              nownownow.com
            </a>.
          </p>
          <div className="flex justify-center">
            <Image
              src="/images/blacksmith-loop.gif"
              alt="Pixel art blacksmith striking an anvil"
              width={200}
              height={200}
              className="w-40 h-40"
              unoptimized
            />
          </div>
        </div>
      )
    }

    switch (currentSection) {
      case "home":
        return (
          <div className="space-y-6">
            <h2 className="text-4xl mb-8 uppercase tracking-wide [font-family:var(--font-disket-bold)]">Home</h2>
            <p className="text-base text-muted-foreground">
              My wife and I run{" "}
              <a
                href="https://www.instagram.com/lacasitapinterest"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                @lacasitapinterest
              </a>{" "}
              on Instagram — deco, house reformation projects, and the garden.
              It's become its own thing, separate from design work, but it scratches the same
              itch: take something unfinished and make it make sense.
            </p>
            <p className="text-base text-muted-foreground">
              Practicing intentional, slow living — actively trying to reduce noise and clutter,
              in the house and otherwise.
            </p>
          </div>
        )
      case "making":
        return (
          <div className="space-y-6">
            <h2 className="text-4xl mb-8 uppercase tracking-wide [font-family:var(--font-disket-bold)]">Making</h2>
            <p className="text-base text-muted-foreground">
              Welding a wood cart soon, and scouting for a shipping container to convert into a
              workshop/gym. Also figuring out how to get back into knifemaking — smithing got
              dropped when I lived in an apartment, but I have a house now, so it's coming back.
            </p>
            <p className="text-base text-muted-foreground">
              Practicing concept art and illustration — currently drawing my friends' D&D
              characters.
            </p>
          </div>
        )
      case "guild":
        return (
          <div className="space-y-6">
            <h2 className="text-4xl mb-8 uppercase tracking-wide [font-family:var(--font-disket-bold)]">The Guild</h2>
            <p className="text-base text-muted-foreground">
              Building a small set of personal software tools under one umbrella I call The
              Guild — each one replacing a subscription I don't believe in with something I
              actually own. Same philosophy across all of them: intentional software, built for
              a real need, not growth metrics.
            </p>
            <p className="text-base text-muted-foreground">
              Three so far: a deliberate-practice tracker for Muay Thai training (the idea owes
              a lot to Cal Newport's{" "}
              <span className="italic">So Good They Can't Ignore You</span>), a parallel one for
              concept art training, and a writing app.
            </p>
            <p className="text-base text-muted-foreground">
              Another friend recently pointed me to my friend Manuel Aráoz's{" "}
              <a
                href="https://maraoz.com/great-software/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Great Software
              </a>{" "}
              essay, which deeply resonated with what I'm building.
            </p>
          </div>
        )
      case "training":
        return (
          <div className="space-y-6">
            <h2 className="text-4xl mb-8 uppercase tracking-wide [font-family:var(--font-disket-bold)]">Training</h2>
            <p className="text-base text-muted-foreground">
              Muay Thai and kickboxing a couple times a week, plus kettlebell training and
              mobility work — less about performance, more about staying strong and durable. I
              have one daughter and we're planning on more, so this is also just future-proofing
              my body for the years of being a dad that are still ahead of me.
            </p>
          </div>
        )
    }
  }

  const sections: { id: Section; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "making", label: "Making" },
    { id: "guild", label: "The Guild" },
    { id: "training", label: "Training" },
  ]

  return (
    <ProfessionalSectionShell
      darkContent={theme === "dark"}
      navMeta={
        <p className="text-[10px] lg:text-xs text-muted-foreground [font-family:var(--font-disket)]">
          Last updated: June 2026
        </p>
      }
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
