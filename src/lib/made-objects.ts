export type MadeObjectRealm = "garden" | "hearth"

export interface MadeObjectImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface MadeObject {
  slug: string
  title: string
  year: number
  trades: string[]
  materials: string[]
  realms: MadeObjectRealm[]
  images: MadeObjectImage[]
  garden?: {
    meta: string
    body: string[]
    lessons?: string[]
    next?: string
  }
  hearth?: {
    context: string
  }
}

export const MADE_OBJECTS: MadeObject[] = [
  {
    slug: "firewood-cart",
    title: "Firewood Cart",
    year: 2026,
    trades: ["Welding", "Metalworking"],
    materials: ["Steel", "Quebracho"],
    realms: ["garden", "hearth"],
    images: [
      {
        src: "/garden/trades/firewood-cart/frame.png",
        alt: "High-angle view of a welded steel firewood cart with a quebracho plank base, loaded with split logs.",
        width: 768,
        height: 1024,
      },
      {
        src: "/garden/trades/firewood-cart/in-use.png",
        alt: "The firewood cart in use on a tiled patio, stacked with wood against the house wall.",
        width: 768,
        height: 1024,
      },
    ],
    garden: {
      meta: "First solo welding project",
      body: [
        "My first complete welding project built on my own: a wheeled steel firewood cart with a quebracho base, made for actual use around the house.",
        "It works. It also made the gaps in my technique immediately visible — the frame pulled slightly out of square, the welds are inconsistent, and cleanup in tight inside corners is still something I need to learn.",
        "Finishing it made the next version clearer. That is the milestone.",
      ],
      lessons: [
        "Squareness has to be controlled throughout tack-up and welding, not checked only at the end.",
        "Fit-up affects everything that follows.",
        "Consistent welds still require deliberate practice.",
        "Tight inside corners make cleanup difficult and should be considered during design.",
        "Finishing a useful object exposes problems that isolated practice beads do not.",
      ],
      next: "Several improvements are already apparent for a second cart. Building this one revealed them.",
    },
    hearth: {
      context:
        "A wheeled steel cart with a quebracho base, built to store and move firewood around the house.",
    },
  },
]

export function getMadeObjectsForRealm(realm: MadeObjectRealm): MadeObject[] {
  return MADE_OBJECTS.filter((object) => object.realms.includes(realm))
}
