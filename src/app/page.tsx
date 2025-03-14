"use client"

import { Nav } from "@/components/nav"
import { ContactButtons } from "@/components/contact-buttons"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

type LightVideoKey = "forest" | "snow" | "water"
type DarkVideoKey = "campfire" | "moto"

export default function Home() {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentLightVideo, setCurrentLightVideo] = useState<LightVideoKey>("forest")
  const [currentDarkVideo, setCurrentDarkVideo] = useState<DarkVideoKey>("campfire")
  
  const lightVideos: Record<LightVideoKey, string> = {
    forest: "/forest-pixel.mp4",
    snow: "/snow.mp4",
    water: "/water.mp4"
  }

  const darkVideos: Record<DarkVideoKey, string> = {
    campfire: "/campfire-pixel.mp4",
    moto: "/moto.mp4"
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = theme === 'system' ? systemTheme : theme
  
  if (!mounted) {
    return (
      <main className="min-h-screen w-full">
        <Nav />
        <div className="h-[calc(100vh-6rem)] w-full flex">
          <div className="w-1/2 bg-background border-r border-gray-200 dark:border-gray-800">
            {/* Left side content */}
          </div>
          <div className="w-1/2 bg-[#0C0E15]">
            {/* Right side placeholder */}
          </div>
        </div>
        <ContactButtons />
      </main>
    )
  }

  return (
    <main className="min-h-screen w-full">
      <Nav />
      <div className="fixed top-24 inset-x-0 bottom-0 flex flex-col lg:flex-row">
        {/* Content section - Full width on mobile */}
        <div className="w-full lg:w-1/2 bg-background lg:border-r border-gray-200 dark:border-gray-800">
          <div className="h-full flex items-center justify-center p-6 lg:p-0">
            <section className="w-full lg:w-4/5 space-y-6">
              <h2 className="text-xl lg:text-3xl mb-4 lg:mb-6 uppercase tracking-wide [font-family:var(--font-disket)]">PEDRO OSSORIO ARANA</h2>
              <h1 className="text-3xl lg:text-4xl mb-4 lg:mb-6 uppercase tracking-wide [font-family:var(--font-disket-bold)]">
                Product Design/UX D.Systems/Strategy
              </h1>
              <div className="space-y-4">
                <p className="text-base text-muted-foreground font-light">
                  Hi! I'm Pedro, but people call me <span className="font-medium">Poa</span>. I'm currently working {" "}
                  <Link 
                    href="https://www.nera-agro.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    here
                  </Link>
                </p>
                <p className="text-base text-muted-foreground font-light">
                  I'm a <span className="font-medium">Senior Product Designer</span> from Argentina. 
                  I've collaborated with various clients, locally and internationally.
                  Throughout my career, I've participated in design projects from concept to completion. I specialize in crafting product interfaces <span className="font-medium">that actually help users</span>, meeting business objectives with their needs. Let's get in touch!
                </p>
              </div>
              <Link 
                href="/work" 
                className="inline-flex mt-8 px-6 py-3 bg-transparent text-foreground border border-foreground dark:border-foreground hover:bg-foreground hover:text-background dark:hover:bg-gray-300 dark:hover:text-gray-900 transition-all duration-200 [font-family:var(--font-disket)]"
              >
                View My Work
              </Link>
            </section>
          </div>
        </div>

        {/* Video section - Hidden on mobile */}
        <div className="hidden lg:block lg:w-1/2 bg-[#0F1015] h-full flex items-center justify-center">
          <div className={currentTheme === 'light' ? 'w-full h-full relative flex items-center justify-center' : 'w-full h-full flex items-center justify-center'}>
            <div className="relative w-full h-full flex items-center justify-center">
              <div className={`${
                currentTheme === 'light' 
                  ? currentLightVideo === 'snow'
                    ? 'h-full w-full flex items-end'
                    : 'h-full w-full flex items-center'
                  : currentDarkVideo === 'campfire'
                    ? 'h-full w-full flex items-center'
                    : 'h-full w-full flex items-center'
              } bg-[#0F1015] overflow-hidden justify-center`}>
                <video
                  key={currentTheme === 'light' ? currentLightVideo : currentDarkVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={`${
                    currentTheme === 'light' 
                      ? currentLightVideo === 'snow'
                        ? 'w-[150%] max-w-none h-auto object-cover -mb-32'
                        : 'w-full h-full object-cover'
                      : currentDarkVideo === 'campfire'
                        ? 'w-full h-full object-cover'
                        : 'w-[150%] max-w-none h-auto object-cover'
                  }`}
                >
                  <source src={currentTheme === 'light' ? lightVideos[currentLightVideo] : darkVideos[currentDarkVideo]} type="video/mp4" />
                </video>
              </div>
            </div>
            {/* Video controls */}
            <div className={`absolute top-4 right-8 flex gap-3 p-2 rounded-full ${currentTheme === 'light' ? 'bg-black/20' : 'bg-white/5'} backdrop-blur-sm`}>
              {currentTheme === 'light' ? (
                <>
                  <button
                    onClick={() => setCurrentLightVideo("forest")}
                    className={`w-5 h-5 rounded-full transition-all ${currentLightVideo === "forest" ? 'bg-white scale-100' : 'bg-black/50 hover:bg-black/30 scale-90'}`}
                    aria-label="Switch to forest video"
                  />
                  <button
                    onClick={() => setCurrentLightVideo("snow")}
                    className={`w-5 h-5 rounded-full transition-all ${currentLightVideo === "snow" ? 'bg-white scale-100' : 'bg-black/50 hover:bg-black/30 scale-90'}`}
                    aria-label="Switch to snow video"
                  />
                  <button
                    onClick={() => setCurrentLightVideo("water")}
                    className={`w-5 h-5 rounded-full transition-all ${currentLightVideo === "water" ? 'bg-white scale-100' : 'bg-black/50 hover:bg-black/30 scale-90'}`}
                    aria-label="Switch to water video"
                  />
                </>
              ) : (
                <>
                  <button
                    onClick={() => setCurrentDarkVideo("campfire")}
                    className={`w-5 h-5 rounded-full transition-all ${currentDarkVideo === "campfire" ? 'bg-white scale-100' : 'bg-white/20 hover:bg-white/30 scale-90'}`}
                    aria-label="Switch to campfire video"
                  />
                  <button
                    onClick={() => setCurrentDarkVideo("moto")}
                    className={`w-5 h-5 rounded-full transition-all ${currentDarkVideo === "moto" ? 'bg-white scale-100' : 'bg-white/20 hover:bg-white/30 scale-90'}`}
                    aria-label="Switch to moto video"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ContactButtons />
    </main>
  )
}
