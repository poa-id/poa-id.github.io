"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useIsMobile } from "@/hooks/use-is-mobile"
import { isCubeRoute } from "@/lib/recruiter-routes"

export function MobileCubeGuard() {
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isMobile && isCubeRoute(pathname)) {
      router.replace("/")
    }
  }, [isMobile, pathname, router])

  return null
}
