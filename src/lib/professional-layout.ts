export function sectionTabClass(active: boolean) {
  return `cursor-pointer text-sm lg:text-xl uppercase tracking-wide transition-colors whitespace-nowrap shrink-0 ${
    active
      ? "[font-family:var(--font-disket-bold)] text-foreground"
      : "[font-family:var(--font-disket)] text-muted-foreground hover:text-foreground"
  }`
}

export const PROFESSIONAL_PAGE_FRAME =
  "fixed top-14 lg:top-24 bottom-0 w-full flex flex-col lg:flex-row"

export const PROFESSIONAL_NAV_STRIP =
  "w-full lg:w-1/2 shrink-0 bg-background border-b lg:border-b-0 lg:border-r border-border dark:border-gray-800 flex items-center lg:flex-col lg:justify-center py-2 lg:py-0"

export const PROFESSIONAL_NAV_INNER =
  "flex lg:flex-col gap-4 lg:gap-0 lg:space-y-6 items-center overflow-x-auto w-full lg:w-auto px-4 lg:px-0"

export const PROFESSIONAL_CONTENT_PANEL = (dark: boolean) =>
  `w-full lg:w-1/2 flex-1 min-h-0 ${dark ? "bg-[#0F1015]" : "bg-background"} overflow-y-auto content-scroll`

export const PROFESSIONAL_CONTENT_INNER = "w-[90%] lg:w-4/5 mx-auto py-6 lg:py-12"
