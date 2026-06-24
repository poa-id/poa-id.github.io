"use client"

import { useState } from "react"
import { ProfessionalSectionShell } from "@/components/professional-section-shell"
import { sectionTabClass } from "@/lib/professional-layout"
import { useTheme } from "next-themes"
import Image from "next/image"

type Section = "nera" | "balloon" | "freelance" | "personal"

interface LightboxImage {
  src: string;
  alt: string;
}

export default function Work() {
  const { theme } = useTheme()
  const [currentSection, setCurrentSection] = useState<Section>("nera")
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null)

  const handleSectionChange = (section: Section) => {
    setCurrentSection(section)
    // Reset scroll position of the content div
    const contentDiv = document.querySelector('.content-scroll')
    if (contentDiv) {
      contentDiv.scrollTop = 0
    }
  }

  const openLightbox = (image: LightboxImage) => {
    setLightboxImage(image)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxImage(null)
    document.body.style.overflow = 'auto'
  }

  const renderLightbox = () => {
    if (!lightboxImage) return null;

    return (
      <div 
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center cursor-pointer"
        onClick={closeLightbox}
      >
        <button
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
          onClick={closeLightbox}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="relative w-[90vw] h-[90vh]">
          <Image
            src={lightboxImage.src}
            alt={lightboxImage.alt}
            fill
            className="object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (currentSection) {
      case "nera":
        return (
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl mb-2 uppercase tracking-wide [font-family:var(--font-disket-bold)]">Nera</h2>
              <p className="text-lg mb-8 text-muted-foreground [font-family:var(--font-disket)]">Product Designer - Aug 23 / Present</p>
              <p className="text-base text-muted-foreground">
              Nera builds financing and payments infrastructure for agricultural businesses, working with banking partners — which means the real design problem is making complex eligibility and transaction logic legible to people who aren't financial specialists. That's the problem I spend most of my time on.
              </p>
            </div>

            {/* Key Responsibilities */}
            <div className="space-y-8 border border-border dark:border-gray-800 p-8 bg-card">
              <div className="space-y-4">
                <h3 className="text-2xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">Impact</h3>
                <ul className="space-y-4 text-base text-muted-foreground list-disc pl-6">
                  <li>Found a critical drop-off point in the flow driving our highest transaction volume, using funnel analysis in Amplitude — redesigned it and cut abandonment by 16%.</li>
                  <li>Own the design system end-to-end: 275+ components in production, shared across a 4-designer team and shipped to engineering as a versioned npm package, not just a Figma file.</li>
                  <li>Run user interviews directly with farmers and suppliers to catch where financial logic breaks down before it ships as confusing UI.</li>
                  <li>Push back in roadmap discussions when a requested feature solves a symptom, not the underlying problem — and bring data to make that case.</li>
                  <li>Work close enough to engineering to know what's actually expensive to build, which shapes which tradeoffs I propose.</li>
                </ul>
              </div>
            </div>
          </div>
        )
      case "balloon":
        return (
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl mb-2 uppercase tracking-wide [font-family:var(--font-disket-bold)]">Balloon Group</h2>
              <p className="text-lg mb-8 text-muted-foreground [font-family:var(--font-disket)]">Design Lead - May 21 / Aug 23</p>
              <p className="text-base text-muted-foreground">
                At Balloon Group, I led a team of 4 designers across SaaS, e-commerce, and B2B projects — including a Chilean telecom/ISP and a Magento build for Circle K. Alongside the day-to-day design work, I built the company's <a href="https://www.fastforward.ai/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">Webflow site</a>, and before I left, I built their design system from scratch — the project below.
              </p>
            </div>

            {/* Case Study */}
            <div className="space-y-8 border border-border dark:border-gray-800 p-8 bg-card">
              <div className="space-y-4">
                <div className="w-full relative mb-8">
                  <Image
                    src="/images/balloon-case-study/case-study1.webp"
                    alt="Design System Case Study Banner"
                    width={1920}
                    height={1080}
                    className="w-full h-auto bg-gray-100 dark:bg-gray-900"
                  />
                </div>
                <h3 className="text-2xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">Building a Design System from Scratch</h3>
                <p className="text-lg text-muted-foreground [font-family:var(--font-disket)]">Empowering Consistency and Efficiency in e-commerce Development</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground uppercase [font-family:var(--font-disket)]">
                  <span>5 min read</span>
                  <span>•</span>
                  <span>ux/ui / design system</span>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p>
                  As the Product Designer at Balloon Group—an agency specializing in e-commerce solutions and development—I embarked on the journey of building and developing a design system from scratch. In this article, I will dive deep into the reasons behind my decision, sharing my perspective on the need for a design system and outlining the step-by-step approach I took to ensure its successful implementation.
                </p>

                <h4 className="text-xl uppercase tracking-wide [font-family:var(--font-disket)] mt-8 mb-4">Identifying the Need</h4>
                <p>
                  Due to the nature of the company, we work with various clients, with their own styleguides, different needs and requirements, it can be hard to find a justification for a Design System of our own. However, as a product designer, I push for consistency, efficiency and scalability. Tired of relying on meetings, team-syncs and group decisions to maintain consistent UX patterns, something needed to be done. Obtaining buy-in from higher ups was quite easy once I explained the following reasons.
                </p>

                <div className="w-full relative my-8">
                  <Image
                    src="/images/balloon-case-study/case-study2.webp"
                    alt="Design System Development Process"
                    width={1920}
                    height={1080}
                    className="w-full h-auto bg-gray-100 dark:bg-gray-900"
                  />
                </div>

                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Project Variation:</strong> Working on various projects, I noticed common design patterns, components, and user flows that recurred across clients. This observation highlighted the potential for standardization and the need for a design system to capitalize on shared resources.</li>
                  <li><strong>Efficiency Gaps:</strong> Building websites from scratch for each project often resulted in redundant design and development efforts. Assessing the time spent reinventing the wheel revealed the opportunity to improve efficiency through a centralized design system.</li>
                  <li><strong>Client Satisfaction:</strong> Implementing a design system ensures a consistent experience for our clients' end users, enhancing their satisfaction and trust in our agency's work. By delivering high-quality, standardized designs, we can establish a reputation, while furthering our client relationships and attracting new business opportunities.</li>
                </ul>

                <div className="w-full relative my-8">
                  <Image
                    src="/images/balloon-case-study/case-study3.webp"
                    alt="Design System Components and Documentation"
                    width={1920}
                    height={1080}
                    className="w-full h-auto bg-gray-100 dark:bg-gray-900"
                  />
                </div>

                <h4 className="text-xl uppercase tracking-wide [font-family:var(--font-disket)] mt-8 mb-4">Benefits and Future Implications</h4>
                <p>
                  A design system minimizes redundant work, allowing my team to focus on higher-value tasks, resulting in improved productivity and faster project delivery. By adhering to defined design standards, our agency can establish a strong brand identity and consistency across all client projects, fostering trust and recognition in the market.
                </p>
                <p>
                  Having a Design System of our own, although every project has a different styling, it accommodates the growing demands of multiple projects simultaneously, ensuring quality outputs and reducing the risk of errors or inconsistencies. The design system serves as a shared language and reference point for our design and development teams, a unified and unique source of truth.
                </p>

                <h4 className="text-xl uppercase tracking-wide [font-family:var(--font-disket)] mt-8 mb-4">Conclusion</h4>
                <p>
                  As a Product Designer for Balloon Group, I recognized the need to build and develop a design system from the ground up. By acknowledging the importance of consistency, efficiency and scalability, I embarked on a journey to empower the teams and enhance our website development process. Through thorough research, collaboration and iterative development, a proper Design System that brought numerous benefits, including collaboration, speed and consistency, was established — adopted across the team and used as the foundation for every new client project for the rest of my time there. I'd also begun scoping documentation in Zeroheight and a Storybook integration to make the system self-service for engineering — work that was just getting started when I moved on.
                </p>
              </div>
            </div>
          </div>
        )
      case "freelance":
        return (
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl mb-2 uppercase tracking-wide [font-family:var(--font-disket-bold)]">Contractor</h2>
              <p className="text-lg mb-8 text-muted-foreground [font-family:var(--font-disket)]">UX/UI Design</p>
              
              {/* Insurance Broker & Event Staffing */}
              <div className="space-y-8 border border-border dark:border-gray-800 p-8 bg-card">
                <div className="space-y-4">
                  <h3 className="text-2xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">Insurance Broker & Event Staffing</h3>
                  <p className="text-base text-muted-foreground">
                    Both of these came to me mid-flight — existing products, existing designs, but no system holding them together. The job wasn't starting from zero; it was finding the patterns already hiding in their Figma files and turning them into a styleguide the team could actually keep using after I left. Same instinct as the design systems work at Balloon Group and Nera, just compressed into a few weeks instead of a year.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <button 
                      className="w-full relative cursor-zoom-in group"
                      onClick={() => openLightbox({
                        src: "/images/contractor/mockup4.webp",
                        alt: "Insurance Broker UI Design"
                      })}
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                      <Image
                        src="/images/contractor/mockup4.webp"
                        alt="Insurance Broker UI Design"
                        width={1920}
                        height={1080}
                        className="w-full h-auto bg-gray-100 dark:bg-gray-900"
                      />
                    </button>
                    <button 
                      className="w-full relative cursor-zoom-in group"
                      onClick={() => openLightbox({
                        src: "/images/contractor/mockup5.webp",
                        alt: "Event Staffing Platform UI"
                      })}
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                      <Image
                        src="/images/contractor/mockup5.webp"
                        alt="Event Staffing Platform UI"
                        width={1920}
                        height={1080}
                        className="w-full h-auto bg-gray-100 dark:bg-gray-900"
                      />
                    </button>
                    <button 
                      className="w-full relative cursor-zoom-in group"
                      onClick={() => openLightbox({
                        src: "/images/contractor/mockup6.webp",
                        alt: "Additional UI Components"
                      })}
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                      <Image
                        src="/images/contractor/mockup6.webp"
                        alt="Additional UI Components"
                        width={1920}
                        height={1080}
                        className="w-full h-auto bg-gray-100 dark:bg-gray-900"
                      />
                    </button>
                    <button 
                      className="w-full relative cursor-zoom-in group"
                      onClick={() => openLightbox({
                        src: "/images/contractor/mockup1.webp",
                        alt: "Platform Interface Design"
                      })}
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                      <Image
                        src="/images/contractor/mockup1.webp"
                        alt="Platform Interface Design"
                        width={1920}
                        height={1080}
                        className="w-full h-auto bg-gray-100 dark:bg-gray-900"
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Travel Budget Managing App */}
              <div className="space-y-8 border border-border dark:border-gray-800 p-8 bg-card mt-12">
                <div className="space-y-4">
                  <h3 className="text-2xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">Dashboard Design</h3>
                  <p className="text-base text-muted-foreground">
                    This is a prototype I built for a Travel Budget Managing App. No design system to lean on here — just a budgeting tool whose information architecture had grown organically into something nobody could navigate. I took it apart and rebuilt the IA from scratch before touching any UI, since the structure was the actual problem, not the visual layer.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <button 
                      className="w-full relative cursor-zoom-in group"
                      onClick={() => openLightbox({
                        src: "/images/contractor/mockup.webp",
                        alt: "Travel Budget Dashboard Design"
                      })}
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                      <Image
                        src="/images/contractor/mockup.webp"
                        alt="Travel Budget Dashboard Design"
                        width={1920}
                        height={1080}
                        className="w-full h-auto bg-gray-100 dark:bg-gray-900"
                      />
                    </button>
                    <button 
                      className="w-full relative cursor-zoom-in group"
                      onClick={() => openLightbox({
                        src: "/images/contractor/mockup2.webp",
                        alt: "Travel Budget App Interface"
                      })}
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                      <Image
                        src="/images/contractor/mockup2.webp"
                        alt="Travel Budget App Interface"
                        width={1920}
                        height={1080}
                        className="w-full h-auto bg-gray-100 dark:bg-gray-900"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case "personal":
        return (
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl mb-8 uppercase tracking-wide [font-family:var(--font-disket-bold)]">Personal</h2>
              
              {/* Arcana Beard Oil */}
              <div className="space-y-8 border border-border dark:border-gray-800 p-8 bg-card">
                <div className="space-y-4">
                  <h3 className="text-2xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">Arcana Beard Oil</h3>
                  <p className="text-base text-muted-foreground">
                    Brand identity, packaging, and product development for a beard oil line — purely for the fun of building a brand from nothing.
                  </p>
                  <div className="grid grid-cols-1 gap-6">
                    <button 
                      className="w-full relative cursor-zoom-in group"
                      onClick={() => openLightbox({
                        src: "/images/personal/arcana.png",
                        alt: "Arcana Beard Oil Brand Design"
                      })}
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                      <Image
                        src="/images/personal/arcana.png"
                        alt="Arcana Beard Oil Brand Design"
                        width={1920}
                        height={1080}
                        className="w-full h-auto bg-gray-100 dark:bg-gray-900"
                      />
                    </button>
                  </div>
                  <div className="mt-4">
                    <a 
                      href="https://www.behance.net/gallery/160102973/Arcana-Beard-Oil-Case-Study-and-Product-Development" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors [font-family:var(--font-disket)]"
                    >
                      View on Behance
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Concepto Fabre */}
              <div className="space-y-8 border border-border dark:border-gray-800 p-8 bg-card mt-12">
                <div className="space-y-4">
                  <h3 className="text-2xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">Concepto Fabre</h3>
                  <p className="text-base text-muted-foreground">
                    A monochrome identity for a sleepwear brand, built around origami folds and the shape of a crane in flight.
                  </p>
                  <div className="grid grid-cols-1 gap-6">
                    <button 
                      className="w-full relative cursor-zoom-in group"
                      onClick={() => openLightbox({
                        src: "/images/personal/fabre.png",
                        alt: "Concepto Fabre Brand Design"
                      })}
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                      <Image
                        src="/images/personal/fabre.png"
                        alt="Concepto Fabre Brand Design"
                        width={1920}
                        height={1080}
                        className="w-full h-auto bg-gray-100 dark:bg-gray-900"
                      />
                    </button>
                  </div>
                  <div className="mt-4">
                    <a 
                      href="https://www.behance.net/gallery/160157929/Concepto-Fabre-Brandbook" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors [font-family:var(--font-disket)]"
                    >
                      View on Behance
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <ProfessionalSectionShell
      darkContent={theme === "dark"}
      overlay={renderLightbox()}
      nav={
        <>
          <button
            onClick={() => handleSectionChange("nera")}
            className={sectionTabClass(currentSection === "nera")}
          >
            Nera
          </button>
          <button
            onClick={() => handleSectionChange("balloon")}
            className={sectionTabClass(currentSection === "balloon")}
          >
            Balloon Group
          </button>
          <button
            onClick={() => handleSectionChange("freelance")}
            className={sectionTabClass(currentSection === "freelance")}
          >
            Contractor
          </button>
          <button
            onClick={() => handleSectionChange("personal")}
            className={sectionTabClass(currentSection === "personal")}
          >
            Personal
          </button>
        </>
      }
    >
      {renderContent()}
    </ProfessionalSectionShell>
  )
} 