export type ForgeProjectStatus = "live" | "in-progress"

export interface ForgeProject {
  slug: string
  number: string
  title: string
  lede: string
  status: ForgeProjectStatus
  href: string
}

export const FORGE_PROJECT_STATUS_LABEL: Record<ForgeProjectStatus, string> = {
  live: "Live",
  "in-progress": "On the bench",
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
]

export function getForgeProject(pathname: string): ForgeProject | undefined {
  return FORGE_PROJECTS.find(
    (project) => pathname === project.href || pathname.startsWith(`${project.href}/`)
  )
}
