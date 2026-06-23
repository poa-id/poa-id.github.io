const CUBE_ROUTE_PREFIXES = [
  "/writing",
  "/garden",
  "/forge",
  "/shelf",
  "/hearth",
  "/mines",
] as const

export function isCubeRoute(pathname: string): boolean {
  return CUBE_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )
}
