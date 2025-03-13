"use client"

import { useState } from "react"
import { Nav } from "@/components/nav"
import { useTheme } from "next-themes"
import Image from "next/image"

type Section = "nera" | "balloon" | "freelance" | "personal" | "experiments"

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
              As a Product Designer at Nera, I am responsible for designing and implementing AgTech solutions that help farmers optimize their operations and simplify their financial decisions. At the same time, I work to make it easier for suppliers to offer financing options to farmers and to streamline the process of charging and receiving payments. This requires a deep understanding of the industry, strong business acumen, and close collaboration with banking partners.
              </p>
            </div>

            {/* Key Responsibilities */}
            <div className="space-y-8 border border-border dark:border-gray-800 p-8 bg-card">
              <div className="space-y-4">
                <h3 className="text-2xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">Key Responsibilities</h3>
                <ul className="space-y-4 text-base text-muted-foreground list-disc pl-6">
                  <li>Design and refine UI components, ensuring a seamless user experience.</li>
                  <li>Develop and maintain the design system, collaborating with developers to implement it as reusable libraries.</li>
                  <li>Optimize key user flows that drive the company's highest TPV, reducing complexity to improve conversion rates, increase revenue, and minimize friction.</li>
                  <li>Partner with product and technical owners to shape the roadmap, plan new features, and drive product discoveries.</li>
                  <li>Conduct user interviews to gain insights and improve user-centric decision-making.</li>
                  <li>Analyze metrics and funnels in Amplitude to make data-driven design decisions.</li>
                  <li>Improve cross-team communication, reducing silos and minimizing gatekeeping to enhance collaboration and efficiency.</li>
                  <li>Continuously research the business model and industry trends in AgTech, focusing on agricultural payments and financing platforms involving banking partners.</li>
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
                At Balloon Group, I lead a team of designers in various projects. Apart from SaaS Websites/e-commerce/B2B UI Designs, and strategic design decisions, I built the company's <a href="https://www.fastforward.ai/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">Webflow site</a>. Before ending my time there, I spearheaded the Design System implementation from scratch.
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
                  As a Product Designer for Balloon Group, I recognized the need to build and develop a design system from the ground up. By acknowledging the importance of consistency, efficiency and scalability, I embarked on a journey to empower the teams and enhance our website development process. Through thorough research, collaboration and iterative development, a proper Design System that brought numerous benefits, including collaboration, speed and consistency, was established.
                </p>

                <h4 className="text-xl uppercase tracking-wide [font-family:var(--font-disket)] mt-8 mb-4">Next Steps</h4>
                <p className="text-sm text-muted-foreground [font-family:var(--font-disket)]">(Planned before my time there ended)</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Documenting the Design System. (Currently researching tools for this, looking into Zeroheight)</li>
                  <li>Integration with Storybook (In progress)</li>
                  <li>Bare-bones variant. I want to build an unbranded version of the DS. This can further be used while working with clients</li>
                  <li>Training and adoption: Work with the teams, offer workshops, and foster adoption and testing throughout the company</li>
                </ul>
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
                    I've worked as a contractor designing UI for a B2B Insurance Broker company, and an event staffing platform.
                    In both cases, the process had already started and I was hired to take their existing designs further, organizing and creating styleguides, while bringing good practices to their Figma files. The end result was beautiful UI, with great usability.
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
                    This is a prototype I built for a Travel Budget Managing App. The project had some tricky requirements, including taking appart and re-designing their Information Architecture. Design had to be custom and no existing Design System was used.
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
                    A passion project focused on creating a unique brand identity for a beard oil product. The project encompassed product development, packaging design, and brand strategy.
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
                    A minimalist monochrome branding project for a luxury sleepwear brand. The design draws inspiration from origami and Japanese cranes, creating a clean and sophisticated visual identity through a concise brandbook.
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
      case "experiments":
        return (
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl mb-8 uppercase tracking-wide [font-family:var(--font-disket-bold)]">Experiments</h2>
              
              {/* Portfolio */}
              <div className="space-y-8 border border-border dark:border-gray-800 p-8 bg-card">
                <div className="space-y-4">
                  <h3 className="text-2xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">Portfolio</h3>
                  <p className="text-base text-muted-foreground">
                    This portfolio was built using Next.js, Tailwind CSS, and TypeScript. The development process was unique - 
                    I directed the entire project while co-developing with Cursor.ai, an AI-powered coding assistant. This experimental 
                    approach allowed me to focus on design decisions and creative direction while leveraging AI for implementation details.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-sm bg-card border border-border dark:border-gray-800 rounded-md text-muted-foreground">Next.js</span>
                    <span className="px-2 py-1 text-sm bg-card border border-border dark:border-gray-800 rounded-md text-muted-foreground">Tailwind CSS</span>
                    <span className="px-2 py-1 text-sm bg-card border border-border dark:border-gray-800 rounded-md text-muted-foreground">TypeScript</span>
                    <span className="px-2 py-1 text-sm bg-card border border-border dark:border-gray-800 rounded-md text-muted-foreground">AI Co-development</span>
                  </div>
                </div>
              </div>

              {/* Fireside */}
              <div className="space-y-8 border border-border dark:border-gray-800 p-8 bg-card">
                <div className="space-y-4">
                  <h3 className="text-2xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">Fireside</h3>
                  <p className="text-lg text-muted-foreground [font-family:var(--font-disket)]">A Digital Campfire for Meaningful Discussions</p>
                  <p className="text-base text-muted-foreground">
                    Fireside is an experimental platform that reimagines online discussions. It creates intimate, focused conversation spaces 
                    limited to few participants - like gathering around a digital campfire. Each week, topics are proposed and voted on by the 
                    community. This, and the small cohorts ensure engaging and relevant discussions.
                  </p>
                  <div className="space-y-4">
                    <h4 className="text-lg [font-family:var(--font-disket-bold)] text-primary">Key Features</h4>
                    <ul className="space-y-2 text-base text-muted-foreground list-disc pl-6">
                      <li>Weekly topic proposals and community voting</li>
                      <li>Limited to 5/15/30 participants per discussion for intimate conversations</li>
                      <li>Focus on constructive and meaningful dialogue</li>
                      <li>Cozy, campfire-inspired aesthetic</li>
                      <li>Social login</li>
                      <li>Lobby for creating and joining campfires with various plans and pricing options</li>
                      <li>Reddit-like thread based conversations, but in a private environment</li>
                      <li>Gives the communicator a posibility to invite and monetize seats in the campfire</li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <a 
                      href="https://fireside-poa-id.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors [font-family:var(--font-disket)]"
                    >
                      Visit Fireside
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-sm bg-card border border-border dark:border-gray-800 rounded-md text-muted-foreground">Work in Progress</span>
                    <span className="px-2 py-1 text-sm bg-card border border-border dark:border-gray-800 rounded-md text-muted-foreground">Next.js</span>
                    <span className="px-2 py-1 text-sm bg-card border border-border dark:border-gray-800 rounded-md text-muted-foreground">AI Co-development</span>
                    <span className="px-2 py-1 text-sm bg-card border border-border dark:border-gray-800 rounded-md text-muted-foreground">Community Platform</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <main className="min-h-screen w-full">
      <Nav />
      {renderLightbox()}
      <div className="fixed top-24 bottom-0 w-full flex flex-col lg:flex-row">
        {/* Left side - Navigation */}
        <div className="w-full lg:w-1/2 bg-background border-b lg:border-b-0 lg:border-r border-border dark:border-gray-800 flex flex-col items-center justify-center relative py-6 lg:py-0">
          <nav className="flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-6 items-center overflow-x-auto w-full lg:w-auto px-6 lg:px-0">
            <button
              onClick={() => handleSectionChange("nera")}
              className={`text-base lg:text-xl uppercase tracking-wide transition-colors whitespace-nowrap ${
                currentSection === "nera" 
                  ? "[font-family:var(--font-disket-bold)] text-foreground" 
                  : "[font-family:var(--font-disket)] text-muted-foreground hover:text-foreground"
              }`}
            >
              Nera
            </button>
            <button
              onClick={() => handleSectionChange("balloon")}
              className={`text-base lg:text-xl uppercase tracking-wide transition-colors whitespace-nowrap ${
                currentSection === "balloon" 
                  ? "[font-family:var(--font-disket-bold)] text-foreground" 
                  : "[font-family:var(--font-disket)] text-muted-foreground hover:text-foreground"
              }`}
            >
              Balloon Group
            </button>
            <button
              onClick={() => handleSectionChange("freelance")}
              className={`text-base lg:text-xl uppercase tracking-wide transition-colors whitespace-nowrap ${
                currentSection === "freelance" 
                  ? "[font-family:var(--font-disket-bold)] text-foreground" 
                  : "[font-family:var(--font-disket)] text-muted-foreground hover:text-foreground"
              }`}
            >
              Contractor
            </button>
            <button
              onClick={() => handleSectionChange("personal")}
              className={`text-base lg:text-xl uppercase tracking-wide transition-colors whitespace-nowrap ${
                currentSection === "personal" 
                  ? "[font-family:var(--font-disket-bold)] text-foreground" 
                  : "[font-family:var(--font-disket)] text-muted-foreground hover:text-foreground"
              }`}
            >
              Personal
            </button>
            <button
              onClick={() => handleSectionChange("experiments")}
              className={`text-base lg:text-xl uppercase tracking-wide transition-colors whitespace-nowrap ${
                currentSection === "experiments" 
                  ? "[font-family:var(--font-disket-bold)] text-foreground" 
                  : "[font-family:var(--font-disket)] text-muted-foreground hover:text-foreground"
              }`}
            >
              Experiments
            </button>
          </nav>
        </div>

        {/* Right side - Content */}
        <div className={`w-full lg:w-1/2 ${theme === 'dark' ? 'bg-[#0C0E15]' : 'bg-background'} overflow-y-auto h-full content-scroll`}>
          <div className="w-[90%] lg:w-4/5 mx-auto py-8 lg:py-12">
            {renderContent()}
          </div>
        </div>
      </div>
    </main>
  )
} 