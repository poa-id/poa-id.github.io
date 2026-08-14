"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { TabNav } from "@/components/lineforge/navigation/TabNav"
import { TodayScreen } from "@/components/lineforge/today/TodayScreen"
import { DecksScreen } from "@/components/lineforge/decks/DecksScreen"
import { LibraryScreen } from "@/components/lineforge/library/LibraryScreen"
import { HistoryScreen } from "@/components/lineforge/history/HistoryScreen"
import { ObjectLibrary } from "@/components/lineforge/library/ObjectLibrary"
import { CultureLibrary } from "@/components/lineforge/library/CultureLibrary"
import { MaterialStudyTool } from "@/components/lineforge/library/MaterialStudyTool"
import type { LineforgeTab } from "@/lib/lineforge/types/lineforge"
import "@/components/lineforge/lineforge.css"

const DiceTray = dynamic(() => import("@/components/lineforge/dice/DiceTray").then((mod) => mod.DiceTray), {
  ssr: false,
})
const FormLightingLab = dynamic(
  () => import("@/components/lineforge/lab/FormLightingLab").then((mod) => mod.FormLightingLab),
  { ssr: false }
)
const PaletteGenerator = dynamic(
  () => import("@/components/lineforge/palette/PaletteGenerator").then((mod) => mod.PaletteGenerator),
  { ssr: false }
)

export function LineforgeApp({ monoVar, sansVar }: { monoVar: string; sansVar: string }) {
  const [tab, setTab] = useState<LineforgeTab>("today")
  const [showLab, setShowLab] = useState(false)
  const [showPalette, setShowPalette] = useState(false)
  const [showLibrary, setShowLibrary] = useState(false)
  const [showMaterialLibrary, setShowMaterialLibrary] = useState(false)
  const [showCultureLibrary, setShowCultureLibrary] = useState(false)
  const [libraryEntryName, setLibraryEntryName] = useState<string | null>(null)

  const handleOpenLibraryEntry = (name: string) => {
    setLibraryEntryName(name)
    setShowLibrary(true)
  }

  const handleTab = (next: LineforgeTab) => {
    if (next === "lab") {
      setShowLab(true)
      return
    }
    setTab(next)
  }

  return (
    <div
      className={`lineforge-root ${monoVar} ${sansVar} h-[100dvh] w-full overflow-hidden relative`}
    >
      <Link
        href="/forge"
        className="absolute top-3 left-3 z-30 text-[10px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground"
      >
        ← FORGE
      </Link>

      <div className="h-full overflow-y-auto pt-8">
        {tab === "today" && (
          <TodayScreen onOpenLab={() => setShowLab(true)} onOpenLibraryEntry={handleOpenLibraryEntry} />
        )}
        {tab === "decks" && <DecksScreen />}
        {tab === "dice" && <DiceTray onOpenLibraryEntry={handleOpenLibraryEntry} />}
        {tab === "library" && (
          <LibraryScreen
            onOpenObject={() => {
              setLibraryEntryName(null)
              setShowLibrary(true)
            }}
            onOpenMaterial={() => setShowMaterialLibrary(true)}
            onOpenCulture={() => setShowCultureLibrary(true)}
          />
        )}
        {tab === "history" && <HistoryScreen />}
      </div>

      <TabNav tab={tab} onChange={handleTab} />

      {showLab && (
        <FormLightingLab onClose={() => setShowLab(false)} onOpenPalette={() => setShowPalette(true)} />
      )}
      {showPalette && <PaletteGenerator onClose={() => setShowPalette(false)} />}
      {showLibrary && (
        <ObjectLibrary
          initialEntryName={libraryEntryName}
          onClose={() => {
            setShowLibrary(false)
            setLibraryEntryName(null)
          }}
        />
      )}
      {showMaterialLibrary && <MaterialStudyTool onClose={() => setShowMaterialLibrary(false)} />}
      {showCultureLibrary && <CultureLibrary onClose={() => setShowCultureLibrary(false)} />}
    </div>
  )
}
