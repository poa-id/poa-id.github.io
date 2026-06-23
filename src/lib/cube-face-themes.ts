export interface CubeFaceTheme {
  bg: string
  text: string
  textMuted: string
  border: string
  hover: string
}

type ThemedFace = "garden" | "forge" | "hearth" | "shelf" | "scriptorium"

export const CUBE_FACE_THEMES = {
  scriptorium: {
    light: {
      bg: "#f6f5f2",
      text: "#3a3832",
      textMuted: "#3a383299",
      border: "#d8d4c8",
      hover: "#eceae4",
    },
    dark: {
      bg: "#121318",
      text: "#b8bcc8",
      textMuted: "#b8bcc880",
      border: "#2a2d38",
      hover: "#1a1c24",
    },
  },
  garden: {
    light: {
      bg: "#f4f7f2",
      text: "#3d4f38",
      textMuted: "#3d4f3899",
      border: "#c5d4be",
      hover: "#e8efe4",
    },
    dark: {
      bg: "#0f1410",
      text: "#a8b89a",
      textMuted: "#a8b89a80",
      border: "#2a3328",
      hover: "#161c14",
    },
  },
  forge: {
    light: {
      bg: "#faf6f0",
      text: "#5c3d1e",
      textMuted: "#5c3d1e99",
      border: "#dcc9a8",
      hover: "#f2ead8",
    },
    dark: {
      bg: "#12100e",
      text: "#d4a574",
      textMuted: "#d4a57480",
      border: "#3d2e20",
      hover: "#1a1612",
    },
  },
  hearth: {
    light: {
      bg: "#faf8f4",
      text: "#4a3f32",
      textMuted: "#4a3f3299",
      border: "#e5d9c8",
      hover: "#f3ede4",
    },
    dark: {
      bg: "#141210",
      text: "#e8d4b8",
      textMuted: "#e8d4b880",
      border: "#3a3228",
      hover: "#1c1814",
    },
  },
  shelf: {
    light: {
      bg: "#f0f2f6",
      text: "#2a3344",
      textMuted: "#2a334499",
      border: "#b8c2d0",
      hover: "#e4e9f0",
    },
    dark: {
      bg: "#0e1219",
      text: "#a8b6cc",
      textMuted: "#a8b6cc80",
      border: "#242d3d",
      hover: "#151c28",
    },
  },
  deep: {
    dark: {
      bg: "#0a0908",
      text: "#c4a882",
      textMuted: "#c4a88280",
      border: "#2a2218",
      hover: "#12100e",
    },
  },
} as const

export type ThemedFaceSlug = ThemedFace | "deep"
export type SiteColorMode = "light" | "dark"

export function getThemeForSlug(
  slug: ThemedFaceSlug,
  siteMode: SiteColorMode
): CubeFaceTheme {
  if (slug === "deep") return CUBE_FACE_THEMES.deep.dark
  return CUBE_FACE_THEMES[slug][siteMode]
}

export function getThemedFaceForPath(pathname: string): ThemedFaceSlug | null {
  if (pathname.startsWith("/mines")) return "deep"
  if (pathname.startsWith("/writing")) return "scriptorium"
  if (pathname.startsWith("/garden")) return "garden"
  if (pathname.startsWith("/forge")) return "forge"
  if (pathname.startsWith("/hearth")) return "hearth"
  if (pathname.startsWith("/shelf")) return "shelf"
  return null
}

export function getCubeFaceTheme(
  pathname: string,
  siteMode: SiteColorMode = "dark"
): CubeFaceTheme | null {
  const slug = getThemedFaceForPath(pathname)
  if (!slug) return null
  return getThemeForSlug(slug, slug === "deep" ? "dark" : siteMode)
}
