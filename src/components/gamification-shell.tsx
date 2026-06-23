"use client"

import { GamificationProvider } from "@/contexts/gamification-provider"
import { AchievementToast } from "@/components/achievement-toast"
import { HouseMapNav } from "@/components/house-map-nav"

export function GamificationShell({ children }: { children: React.ReactNode }) {
  return (
    <GamificationProvider>
      {children}
      <AchievementToast />
      <HouseMapNav />
    </GamificationProvider>
  )
}
