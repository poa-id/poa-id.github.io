"use client"

import { useState } from "react"
import { Nav } from "@/components/nav"
import { useTheme } from "next-themes"

type Section = "tldr" | "background" | "values" | "cv" | "interests"

export default function About() {
  const { theme } = useTheme()
  const [currentSection, setCurrentSection] = useState<Section>("tldr")

  const renderContent = () => {
    switch (currentSection) {
      case "tldr":
        return (
          <div className="space-y-6">
            <h2 className="text-4xl mb-8 uppercase tracking-wide [font-family:var(--font-disket-bold)]">TL;DR</h2>
            <p className="text-base text-muted-foreground">
            I'm Poa, a Senior Product Designer with a strong background in fast-paced startup environments. I have led end-to-end design projects, focusing on refining user experiences and driving product growth. Problem-solving is at the core of my approach, as I prioritize user needs and craft high-quality designs that enhance satisfaction and engagement.
            </p>
            <p className="text-base text-muted-foreground">
            In past roles, I have driven strategic initiatives that improved key product metrics and user retention. I specialize in overseeing the entire design process—from strategy and research to UX/UI execution—while collaborating closely with cross-functional teams.
            </p>
            <p className="text-base text-muted-foreground">
            My expertise lies in creating intuitive interfaces and fostering collaboration between design, engineering, and product teams. I am committed to craftsmanship,innovation, pushing boundaries, and delivering solutions that meet user needs while aligning with business objectives.
            </p>
            <div className="space-y-6">
              {/* Currently Reading */}
              <div className="space-y-4 border border-border dark:border-gray-800 p-6 bg-card">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <h4 className="text-xl [font-family:var(--font-disket-bold)]">Currently reading</h4>
                </div>
                <ul className="space-y-2 text-base text-muted-foreground list-disc pl-6">
                  <li>Hooked (Nir Eyal)</li>
                  <li>East of Eden (John Steinbeck)</li>
                  <li>Refactoring UI (Adam Wathan & Steve Schoger)</li>
                  <li className="italic">Always re-reading The Lord of The Rings by J.R.R Tolkien</li>
                </ul>
              </div>
              
              {/* Currently Studying */}
              <div className="space-y-4 border border-border dark:border-gray-800 p-6 bg-card">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <h4 className="text-xl [font-family:var(--font-disket-bold)]">Currently studying</h4>
                </div>
                <ul className="space-y-2 text-base text-muted-foreground list-disc pl-6">
                  <li>Data Driven Design: Quantitative Research for UX, by the <span className="font-medium">Interaction Design Foundation (IxDF)</span></li>
                </ul>
              </div>
            </div>
          </div>
        )
      case "background":
        return (
          <div className="space-y-6">
            <h2 className="text-4xl mb-8 uppercase tracking-wide [font-family:var(--font-disket-bold)]">Background</h2>
            <p className="text-base text-muted-foreground">I'm a passionate Product Designer with expertise in UX/UI, Branding, Web Design and Illustration. I've got a keen eye for detail and a deep understanding of design principles. I strive to craft digital solutions that not only look visually appealing but also deliver great functionality.</p>
            <p className="text-base text-muted-foreground">              As a Product Designer, I've worked on designing UI for e-commerce sites, B2B 
              and institutional websites, as well as developing Design Systems. I collaborate 
              with Product Owners and Engineers to ensure that the design significantly 
              enhances product metrics and user engagement.</p>
              <p className="text-base text-muted-foreground">              I have a knack for front-end coding, occasionally tackling a little project 
              on the side. This enables me to bridge the gap between design and development 
              teams effectively. I have worked with teams in Argentina, Mexico, and the 
              United States.</p>
              <p className="text-base text-muted-foreground">I've lead a Design Team in a fast paced agency, dealing with various clients simoultaneously, and I've also worked in a startup environment, where I've been able to wear many hats, from UI Designer, to Design Lead, to Product Designer.</p>
          </div>
        )
      case "values":
        return (
          <div className="space-y-6">
            <h2 className="text-4xl mb-8 uppercase tracking-wide [font-family:var(--font-disket-bold)]">Values</h2>
            <p className="text-base text-muted-foreground"><span className="font-bold">Craftsmanship. Usefulness. Authenticity.</span> These are the core values that guide my work and way of designing (and living).</p>
            <p className="text-base text-muted-foreground">I strive to imbue them in all my endeavors. I've always been drawn to making things—whether illustrations, products, forged metal, or carved wooden swords—and <span className="font-bold">I've always been fascinated by the process of creation.</span> Design is a mindset, not something you switch on and off for work.</p>
            <p className="text-base text-muted-foreground"><span className="font-bold">Collaboration and communication</span> are paramount. Climbing to the summit alone is a lonely and dangerous path. Triumph is a team effort, and tightly knit teams create the greatest products.</p>
            <p className="text-base text-muted-foreground">If and when I use AI, it is solely as a tool for productivity and as a co-developer. Under no circumstances will I ever use it for creative purposes, <span className="font-bold">as I am morally and vehemently against it</span>.</p>
            <p className="text-2xl text-muted-foreground text-center">☩</p>
          </div>
        )
      case "cv":
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">CV</h2>
              <a 
                href="/cv-product-design-OssorioArana.pdf" 
                download
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
                I specialize in designing user interfaces and digital products. The mix of design, user experience, marketing,
                branding, and business/domain knowledge is where I thrive. Throughout my career, I have taught myself to code in front end languages, allowing me to put the vision I have
                for a product exactly as I've visualised it.
              </p>
            </div>

            {/* Experience */}
            <div className="space-y-6">
              <h3 className="text-2xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">Experience</h3>
              
              {/* Nera */}
              <div className="space-y-4 border border-border dark:border-gray-800 p-6 bg-card">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <h4 className="text-xl [font-family:var(--font-disket-bold)]">Product Designer</h4>
                  <span className="text-muted-foreground [font-family:var(--font-disket)]">Sept 2023 - Present</span>
                </div>
                <h5 className="text-lg text-primary [font-family:var(--font-disket)]">Nera</h5>
                <ul className="space-y-2 text-base text-muted-foreground list-disc pl-6">
                  <li>Evolve Design System: Collaborate with the expansion and development of the existing design system, focusing on scalability, incorporating latest tools and methods.</li>
                  <li>Craft Intuitive Interfaces: Design captivating and user-centric interfaces that enhance the overall product experience.</li>
                  <li>Cross-Functional Collaboration: Collaborate seamlessly with other UX designers, developers, and product owner.</li>
                  <li>Drive Innovation: Keep abreast of industry trends, emerging technologies, and user behaviors.</li>
                  <li>Prototype wireframes and flows to foster communication and understanding.</li>
                </ul>
              </div>

              {/* Balloon Group */}
              <div className="space-y-4 border border-border dark:border-gray-800 p-6 bg-card">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <h4 className="text-xl [font-family:var(--font-disket-bold)]">Lead Product Designer</h4>
                  <span className="text-muted-foreground [font-family:var(--font-disket)]">May 2021 - Sept 2023</span>
                </div>
                <h5 className="text-lg text-primary [font-family:var(--font-disket)]">Balloon Group</h5>
                <ul className="space-y-2 text-base text-muted-foreground list-disc pl-6">
                  <li>Ensuring that the design work is of sufficient quality and that all directives are being followed.</li>
                  <li>Developing and maintaining Design Systems for the company and its clients.</li>
                  <li>Collaborating with other departments to achieve Design goals.</li>
                  <li>Conducting and guiding Discovery workshops with clients.</li>
                  <li>Coordinating department meetings.</li>
                </ul>
              </div>

              {/* Freelance */}
              <div className="space-y-4 border border-border dark:border-gray-800 p-6 bg-card">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <h4 className="text-xl [font-family:var(--font-disket-bold)]">UI Designer Contractor</h4>
                  <span className="text-muted-foreground [font-family:var(--font-disket)]">2022 - 2023</span>
                </div>
                <h5 className="text-lg text-primary [font-family:var(--font-disket)]">Various Clients</h5>
                <ul className="space-y-2 text-base text-muted-foreground list-disc pl-6">
                  <li>Designed and improved the usability of an Insurance app (Kinsu).</li>
                  <li>Designed the interface for a web app, expanding existing design systems (PPL Events).</li>
                  <li>Website redesign and e-commerce development for Ecoaqua.</li>
                  <li>Branding & Web Redesign for Oriens Energía.</li>
                </ul>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-6">
              <h3 className="text-2xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">Education</h3>
              
              <div className="space-y-4 border border-border dark:border-gray-800 p-6 bg-card">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <h4 className="text-xl [font-family:var(--font-disket-bold)]">UX/UI Design, Research and Management</h4>
                  <span className="text-muted-foreground [font-family:var(--font-disket)]">Dec 2022 - Present</span>
                </div>
                <h5 className="text-lg text-primary [font-family:var(--font-disket)]">The Interaction Design Foundation</h5>
              </div>

              <div className="space-y-4 border border-border dark:border-gray-800 p-6 bg-card">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <h4 className="text-xl [font-family:var(--font-disket-bold)]">Industrial Design</h4>
                  <span className="text-muted-foreground [font-family:var(--font-disket)]">Aug 2017 - Jun 2021</span>
                </div>
                <h5 className="text-lg text-primary [font-family:var(--font-disket)]">University of Buenos Aires (UBA - FADU)</h5>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-6">
              <h3 className="text-2xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">Skills</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* UX/UI */}
                <div className="space-y-2 border border-border dark:border-gray-800 p-4 bg-card">
                  <h4 className="text-lg [font-family:var(--font-disket-bold)] text-primary">UX/UI</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>Product discovery</li>
                    <li>UX research</li>
                    <li>User testing</li>
                    <li>Information architecture</li>
                    <li>Wireframing</li>
                    <li>Prototyping</li>
                    <li>UI design</li>
                  </ul>
                </div>

                {/* Design */}
                <div className="space-y-2 border border-border dark:border-gray-800 p-4 bg-card">
                  <h4 className="text-lg [font-family:var(--font-disket-bold)] text-primary">Design</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>Illustration</li>
                    <li>Interaction design</li>
                    <li>Design system</li>
                    <li>Design sprints</li>
                    <li>A/B testing</li>
                  </ul>
                </div>

                {/* Tools */}
                <div className="space-y-2 border border-border dark:border-gray-800 p-4 bg-card">
                  <h4 className="text-lg [font-family:var(--font-disket-bold)] text-primary">Tools</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>Figma</li>
                    <li>Adobe Illustrator</li>
                    <li>Notion</li>
                    <li>Jira</li>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>ReactJs</li>
                    <li>Amplitude</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="space-y-6">
              <h3 className="text-2xl uppercase tracking-wide [font-family:var(--font-disket-bold)]">Languages</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 border border-border dark:border-gray-800 p-4 bg-card">
                  <h4 className="text-lg [font-family:var(--font-disket-bold)] text-primary">Spanish</h4>
                  <p className="text-sm text-muted-foreground">Native</p>
                </div>
                <div className="space-y-2 border border-border dark:border-gray-800 p-4 bg-card">
                  <h4 className="text-lg [font-family:var(--font-disket-bold)] text-primary">English</h4>
                  <p className="text-sm text-muted-foreground">Professional</p>
                </div>
              </div>
            </div>
          </div>
        )
      case "interests":
        return (
          <div className="space-y-6">
            <h2 className="text-4xl mb-8 uppercase tracking-wide [font-family:var(--font-disket-bold)]">Other Interests</h2>
            <p className="text-base text-muted-foreground">Beyond design, I love a good book, and I'm an avid sports enthusiast, with 
              a particular love for football and surfing. Additionally, I'm an Illustrator, 
              Tattoo Artist, and I'm diving into Concept Design. These endeavours allow me 
              to channel my creativity in a different medium, exploring the fusion of art 
              and personal expression.</p>
          </div>
        )
    }
  }

  return (
    <main className="min-h-screen w-full">
      <Nav />
      <div className="fixed top-24 bottom-0 w-full flex flex-col lg:flex-row">
        {/* Left side - Navigation */}
        <div className="w-full lg:w-1/2 bg-background border-b lg:border-b-0 lg:border-r border-border dark:border-gray-800 flex flex-col items-center justify-center relative py-6 lg:py-0">
          <nav className="flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-6 items-center overflow-x-auto w-full lg:w-auto px-6 lg:px-0">
            <button
              onClick={() => setCurrentSection("tldr")}
              className={`text-base lg:text-xl uppercase tracking-wide transition-colors whitespace-nowrap ${
                currentSection === "tldr" 
                  ? "[font-family:var(--font-disket-bold)] text-foreground" 
                  : "[font-family:var(--font-disket)] text-muted-foreground hover:text-foreground"
              }`}
            >
              TL;DR
            </button>
            <button
              onClick={() => setCurrentSection("background")}
              className={`text-base lg:text-xl uppercase tracking-wide transition-colors whitespace-nowrap ${
                currentSection === "background" 
                  ? "[font-family:var(--font-disket-bold)] text-foreground" 
                  : "[font-family:var(--font-disket)] text-muted-foreground hover:text-foreground"
              }`}
            >
              Background
            </button>
            <button
              onClick={() => setCurrentSection("values")}
              className={`text-base lg:text-xl uppercase tracking-wide transition-colors whitespace-nowrap ${
                currentSection === "values" 
                  ? "[font-family:var(--font-disket-bold)] text-foreground" 
                  : "[font-family:var(--font-disket)] text-muted-foreground hover:text-foreground"
              }`}
            >
              Values
            </button>
            <button
              onClick={() => setCurrentSection("cv")}
              className={`text-base lg:text-xl uppercase tracking-wide transition-colors whitespace-nowrap ${
                currentSection === "cv" 
                  ? "[font-family:var(--font-disket-bold)] text-foreground" 
                  : "[font-family:var(--font-disket)] text-muted-foreground hover:text-foreground"
              }`}
            >
              CV
            </button>
            <button
              onClick={() => setCurrentSection("interests")}
              className={`text-base lg:text-xl uppercase tracking-wide transition-colors whitespace-nowrap ${
                currentSection === "interests" 
                  ? "[font-family:var(--font-disket-bold)] text-foreground" 
                  : "[font-family:var(--font-disket)] text-muted-foreground hover:text-foreground"
              }`}
            >
              Other Interests
            </button>
          </nav>
        </div>

        {/* Right side - Content */}
        <div className={`w-full lg:w-1/2 ${theme === 'dark' ? 'bg-[#0C0E15]' : 'bg-background'} overflow-y-auto h-full`}>
          <div className="w-[90%] lg:w-4/5 mx-auto py-8 lg:py-12">
            {renderContent()}
          </div>
        </div>
      </div>
    </main>
  )
} 