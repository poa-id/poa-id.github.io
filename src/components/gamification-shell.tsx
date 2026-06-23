"use client"

import { GamificationProvider } from "@/contexts/gamification-provider"
import { AchievementToast } from "@/components/achievement-toast"
import { HouseMapNav } from "@/components/house-map-nav"
import { MobileCubeGuard } from "@/components/mobile-cube-guard"
import { useIsMobile } from "@/hooks/use-is-mobile"

function GamificationChrome() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <MobileCubeGuard />
  }

  return (
    <>
      <AchievementToast />
      <HouseMapNav />
    </>
  )
}

export function GamificationShell({ children }: { children: React.ReactNode }) {
  return (
    <GamificationProvider>
      {children}
      <GamificationChrome />
    </GamificationProvider>
  )
}
