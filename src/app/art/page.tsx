"use client"

import { useState } from "react"
import { Nav } from "@/components/nav"
import { useTheme } from "next-themes"
import Image from "next/image"

type Section = "illustration" | "tattoos" | "flash" | "digital-tattoo"

interface ArtPiece {
  src: string
  alt: string
  caption?: string
}

function buildPieces(folder: string, ids: string[], label: string): ArtPiece[] {
  return ids.map((id) => ({
    src: `/images/art/${folder}/${id}.png`,
    alt: `${label} ${id}`,
  }))
}

const illustrationPieces = buildPieces("illustration", [
  "i0", "i2", "i3", "i41", "i40", "i5", "i8", "i1", "i6",
], "Illustration")

const tattooPieces = buildPieces("tattoos", [
  "t1", "t2", "t3", "t4", "t5",
], "Tattoo")

const flashPieces = buildPieces("flash", [
  "f0", "f1", "f2", "f41", "f3", "f4", "f5", "f6", "f8", "f9", "f21", "f22", "f31",
], "Flash painting")

const digitalTattooPieces = buildPieces("digital", [
  "d1", "d5", "d6", "d7", "d9", "d8", "d4", "d3", "d2",
], "Digital flash")

const sectionPieces: Record<Section, ArtPiece[]> = {
  illustration: illustrationPieces,
  tattoos: tattooPieces,
  flash: flashPieces,
  "digital-tattoo": digitalTattooPieces,
}

export default function Art() {
  const { theme } = useTheme()
  const [currentSection, setCurrentSection] = useState<Section>("illustration")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const handleSectionChange = (section: Section) => {
    setCurrentSection(section)
    setLightboxIndex(null)
    const contentDiv = document.querySelector(".content-scroll")
    if (contentDiv) {
      contentDiv.scrollTop = 0
    }
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
    document.body.style.overflow = "auto"
  }

  const goToPrevious = () => {
    const pieces = sectionPieces[currentSection]
    setLightboxIndex((index) =>
      index === null ? null : (index - 1 + pieces.length) % pieces.length
    )
  }

  const goToNext = () => {
    const pieces = sectionPieces[currentSection]
    setLightboxIndex((index) =>
      index === null ? null : (index + 1) % pieces.length
    )
  }

  const renderLightbox = () => {
    if (lightboxIndex === null) return null

    const pieces = sectionPieces[currentSection]
    const piece = pieces[lightboxIndex]
    if (!piece) return null

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-6"
        onClick={closeLightbox}
      >
        <div className="absolute inset-0 bg-black/90" aria-hidden="true" />

        <button
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          onClick={closeLightbox}
          aria-label="Close lightbox"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {pieces.length > 1 ? (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10 p-2"
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10 p-2"
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        ) : null}

        <div
          className="relative z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={piece.src}
            alt={piece.alt}
            width={1600}
            height={1600}
            className="max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain"
          />
        </div>
      </div>
    )
  }

  const renderGrid = (pieces: ArtPiece[]) => (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
      {pieces.map((piece, index) => (
        <div key={piece.src} className="space-y-2">
          <button
            className="w-full relative aspect-square cursor-zoom-in group block overflow-hidden"
            onClick={() => openLightbox(index)}
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
            <Image
              src={piece.src}
              alt={piece.alt}
              fill
              className="object-cover bg-gray-100 dark:bg-gray-900"
            />
          </button>
          {piece.caption ? (
            <p className="text-xs text-muted-foreground [font-family:var(--font-disket)]">{piece.caption}</p>
          ) : null}
        </div>
      ))}
    </div>
  )

  const renderContent = () => {
    switch (currentSection) {
      case "illustration":
        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-4xl mb-2 uppercase tracking-wide [font-family:var(--font-disket-bold)]">Illustration</h2>
              <p className="text-base text-muted-foreground mb-8">
                Currently drawing my friends&apos; D&amp;D characters, plus odds and ends when the mood hits.
              </p>
            </div>
            {renderGrid(illustrationPieces)}
          </div>
        )
      case "tattoos":
        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-4xl mb-2 uppercase tracking-wide [font-family:var(--font-disket-bold)]">Tattoos</h2>
              <p className="text-base text-muted-foreground mb-8">
                A selection of work so far.
              </p>
            </div>
            {renderGrid(tattooPieces)}
          </div>
        )
      case "flash":
        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-4xl mb-2 uppercase tracking-wide [font-family:var(--font-disket-bold)]">Flash Painting</h2>
              <p className="text-base text-muted-foreground mb-8">
                Traditional flash on various media, ready to decorate your body or walls.
              </p>
            </div>
            {renderGrid(flashPieces)}
          </div>
        )
      case "digital-tattoo":
        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-4xl mb-2 uppercase tracking-wide [font-family:var(--font-disket-bold)]">Digital Tattoo</h2>
              <p className="text-base text-muted-foreground mb-8">
                Digital flash — same intent as the painted sheets, drawn on screen.
              </p>
            </div>
            {renderGrid(digitalTattooPieces)}
          </div>
        )
    }
  }

  const navItems: { id: Section; label: string }[] = [
    { id: "illustration", label: "Illustration" },
    { id: "tattoos", label: "Tattoos" },
    { id: "flash", label: "Flash Painting" },
    { id: "digital-tattoo", label: "Digital Tattoo" },
  ]

  return (
    <main className="min-h-screen w-full">
      <Nav />
      {renderLightbox()}
      <div className="fixed top-24 bottom-0 w-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 bg-background border-b lg:border-b-0 lg:border-r border-border dark:border-gray-800 flex flex-col items-center justify-center relative py-6 lg:py-0">
          <nav className="flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-6 items-center overflow-x-auto w-full lg:w-auto px-6 lg:px-0">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleSectionChange(id)}
                className={`text-base lg:text-xl uppercase tracking-wide transition-colors whitespace-nowrap ${
                  currentSection === id
                    ? "[font-family:var(--font-disket-bold)] text-foreground"
                    : "[font-family:var(--font-disket)] text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className={`w-full lg:w-1/2 ${theme === "dark" ? "bg-[#0F1015]" : "bg-background"} overflow-y-auto h-full content-scroll`}>
          <div className="w-[90%] lg:w-4/5 mx-auto py-8 lg:py-12">
            {renderContent()}
          </div>
        </div>
      </div>
    </main>
  )
}
