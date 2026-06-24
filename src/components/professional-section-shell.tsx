"use client"

import { Nav } from "@/components/nav"
import {
  PROFESSIONAL_CONTENT_INNER,
  PROFESSIONAL_CONTENT_PANEL,
  PROFESSIONAL_NAV_INNER,
  PROFESSIONAL_NAV_STRIP,
  PROFESSIONAL_PAGE_FRAME,
} from "@/lib/professional-layout"

interface ProfessionalSectionShellProps {
  nav: React.ReactNode
  children: React.ReactNode
  darkContent?: boolean
  overlay?: React.ReactNode
}

export function ProfessionalSectionShell({
  nav,
  children,
  darkContent = false,
  overlay,
}: ProfessionalSectionShellProps) {
  return (
    <main className="min-h-screen w-full">
      <Nav />
      {overlay}
      <div className={PROFESSIONAL_PAGE_FRAME}>
        <div className={PROFESSIONAL_NAV_STRIP}>
          <nav className={PROFESSIONAL_NAV_INNER} aria-label="Section">
            {nav}
          </nav>
        </div>
        <div className={PROFESSIONAL_CONTENT_PANEL(darkContent)}>
          <div className={PROFESSIONAL_CONTENT_INNER}>{children}</div>
        </div>
      </div>
    </main>
  )
}
