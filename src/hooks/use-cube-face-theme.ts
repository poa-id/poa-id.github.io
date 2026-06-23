"use client"

import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useMemo } from "react"
import {
  getCubeFaceTheme,
  getThemeForSlug,
  type CubeFaceTheme,
  type SiteColorMode,
  type ThemedFaceSlug,
} from "@/lib/cube-face-themes"

function resolveSiteMode(theme: string | undefined): SiteColorMode {
  return theme === "dark" ? "dark" : "light"
}

export function useCubeFaceTheme(): CubeFaceTheme | null {
  const pathname = usePathname()
  const { theme } = useTheme()
  const siteMode = resolveSiteMode(theme)

  return useMemo(
    () => getCubeFaceTheme(pathname, siteMode),
    [pathname, siteMode]
  )
}

export function useCubeFaceThemeForSlug(slug: ThemedFaceSlug): CubeFaceTheme {
  const { theme } = useTheme()
  const siteMode = resolveSiteMode(theme)

  return useMemo(
    () => getThemeForSlug(slug, siteMode),
    [slug, siteMode]
  )
}
