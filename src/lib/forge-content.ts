export type ForgeProjectStatus = "live" | "in-progress" | "desktop"

export interface ForgeProject {
  slug: string
  number: string
  title: string
  lede: string
  status: ForgeProjectStatus
  href: string
  /** Small metadata line under the title, e.g. Writing · Markdown · Desktop */
  descriptor?: string
  /** Quieter supporting line under the lede */
  supporting?: string
  /** External destination; opens in a new tab and is skipped by in-app chrome matching */
  external?: boolean
  /** CTA label. Defaults to Enter for in-portfolio tools. */
  actionLabel?: string
}

export const FORGE_PROJECT_STATUS_LABEL: Record<ForgeProjectStatus, string> = {
  live: "Live",
  "in-progress": "On the bench",
  desktop: "Desktop App",
}

export const FORGE_PROJECTS: ForgeProject[] = [
  {
    slug: "lineforge",
    number: "00",
    title: "LINEFORGE",
    lede: "Daily art practice system.",
    status: "live",
    href: "/forge/lineforge",
  },
  {
    slug: "commissions",
    number: "01",
    title: "Illustration Commissions",
    lede: "A practice tool for fantasy illustration.",
    status: "live",
    href: "/forge/commissions",
  },
  {
    slug: "rule-of-life",
    number: "02",
    title: "PILLARS",
    lede: "A personal Rule of Life.",
    status: "live",
    href: "/forge/rule-of-life",
  },
  {
    slug: "gravitas",
    number: "03",
    title: "GRAVITAS",
    descriptor: "Writing · Markdown · Desktop",
    lede: "A craftsman's writing workshop for turning fragments into finished thought.",
    supporting: "Plain files. No lock-in. No distractions.",
    status: "desktop",
    href: "https://github.com/poa-id/gravitas",
    external: true,
    actionLabel: "View on GitHub ↗",
  },
]

export function getForgeProject(pathname: string): ForgeProject | undefined {
  return FORGE_PROJECTS.find(
    (project) =>
      !project.external &&
      (pathname === project.href || pathname.startsWith(`${project.href}/`))
  )
}
