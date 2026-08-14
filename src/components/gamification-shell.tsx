"use client"

import { GamificationProvider } from "@/contexts/gamification-provider"
import { RelicsProvider } from "@/contexts/relics-provider"
import { AchievementToast } from "@/components/achievement-toast"
import { RelicToast } from "@/components/relic-toast"
import { HouseMapNav } from "@/components/house-map-nav"
import { MobileCubeGuard } from "@/components/mobile-cube-guard"
import { useIsMobile } from "@/hooks/use-is-mobile"
import { usePathname } from "next/navigation"

function isLineforgePath(pathname: string) {
  return pathname.startsWith("/forge/lineforge")
}

function GamificationChrome() {
  const pathname = usePathname()
  const isMobile = useIsMobile()

  if (isLineforgePath(pathname)) {
    return null
  }

  if (isMobile) {
    return <MobileCubeGuard />
  }

  return (
    <>
      <AchievementToast />
      <RelicToast />
      <HouseMapNav />
    </>
  )
}

export function GamificationShell({ children }: { children: React.ReactNode }) {
  return (
    <GamificationProvider>
      <RelicsProvider>
        {children}
        <GamificationChrome />
      </RelicsProvider>
    </GamificationProvider>
  )
}
