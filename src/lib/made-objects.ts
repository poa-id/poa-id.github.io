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
    sortDate: string
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
      sortDate: "2026-08-01",
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
  {
    slug: "workshop-bench",
    title: "Workshop Bench",
    year: 2026,
    trades: ["Metalworking", "Workshop"],
    materials: ["Steel", "Quebracho", "Wood"],
    realms: ["garden"],
    images: [
      {
        src: "/garden/trades/workshop-bench/in-use.jpeg",
        alt: "The steel workshop bench in use with a belt grinder, gas forge, vise, and hand tools.",
        width: 900,
        height: 1600,
      },
      {
        src: "/garden/trades/workshop-bench/finished.jpeg",
        alt: "The completed steel workshop bench with a timber top, reclaimed quebracho lower shelf, vise, and gas forge.",
        width: 900,
        height: 1600,
      },
    ],
    garden: {
      meta: "September · Workshop infrastructure",
      sortDate: "2026-09-01",
      body: [
        "Built the foundation for my workshop.",
        "A 1.97 m steel workbench built around the work I want to do here: knifemaking, metalworking, sharpening and general fabrication.",
        "I welded the frame from square steel tubing, added a lower shelf from reclaimed quebracho, mounted a vise, and built it heavy enough to take real workshop use. The forge and belt grinder now have a proper place to work from.",
        "This was my second substantial welding project after the firewood cart. The welds are getting better, but building a large square frame exposed a different set of problems: controlling heat, bridging imperfect joints, keeping everything square and figuring out assembly order before welding myself into a corner.",
        "More than a finished object, this bench is infrastructure. Most of what I want to learn next will be built on it.",
      ],
    },
  },
]

export function getMadeObjectsForRealm(realm: MadeObjectRealm): MadeObject[] {
  return MADE_OBJECTS.filter((object) => object.realms.includes(realm))
}
