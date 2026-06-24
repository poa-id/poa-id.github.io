export interface Achievement {
  id: string
  title: string
  description: string
  secret?: boolean
}

export const ACHIEVEMENTS: Record<string, Achievement> = {
  face_front: {
    id: "face_front",
    title: "At the Hall",
    description: "You crossed the threshold of the house.",
  },
  face_left: {
    id: "face_left",
    title: "Into the Scriptorium",
    description: "You wandered into the thinker's wing.",
  },
  face_right: {
    id: "face_right",
    title: "Into the Garden",
    description: "You stepped among things being tended.",
  },
  face_back: {
    id: "face_back",
    title: "Through the Forge",
    description: "You entered where ideas meet reality.",
  },
  face_top: {
    id: "face_top",
    title: "At the Hearth",
    description: "You found where the house keeps its heart.",
  },
  face_bottom: {
    id: "face_bottom",
    title: "At the Shelf",
    description: "You browsed what feeds the work.",
  },
  face_down: {
    id: "face_down",
    title: "Going Down",
    description: "You descended into The Deep.",
  },
  found_dice: {
    id: "found_dice",
    title: "Roll for Initiative",
    description: "A relic die, tucked away on the Shelf. The house keeps score now.",
    secret: true,
  },
  cube_explorer: {
    id: "cube_explorer",
    title: "Getting Your Bearings",
    description: "Three rooms noted on the floor plan.",
  },
  cube_complete: {
    id: "cube_complete",
    title: "Full Survey",
    description: "Every room on the floor plan is charted.",
  },
  deep_delve: {
    id: "deep_delve",
    title: "Deep Delve",
    description: "You peered below. The narrator took note.",
    secret: true,
  },
  deep_map_found: {
    id: "deep_map_found",
    title: "Charted the Descent",
    description: "The map now shows what lies beneath the Forge.",
    secret: true,
  },
  theme_lightswitch: {
    id: "theme_lightswitch",
    title: "Lightswitch",
    description: "You toggled between light and dark for the first time.",
  },
  theme_wanderer: {
    id: "theme_wanderer",
    title: "Light and Dark",
    description: "You toggled the theme three times. Indecisive, or curious?",
  },
  theme_flipper_5: {
    id: "theme_flipper_5",
    title: "Flickering Light",
    description: "Five theme toggles. The bulbs are getting tired.",
  },
  theme_flipper_10: {
    id: "theme_flipper_10",
    title: "Dimmer Switch Devotee",
    description: "Ten times you've redrawn the sky. The house is keeping score.",
  },
  theme_flipper_50: {
    id: "theme_flipper_50",
    title: "Lord of Lumen",
    description: "Fifty toggles. At this point the lightswitch is a personality trait.",
    secret: true,
  },
  theme_both_worlds: {
    id: "theme_both_worlds",
    title: "Both Worlds",
    description: "You've spent time in light mode and dark mode.",
  },
  video_channel_change: {
    id: "video_channel_change",
    title: "Changed the Channel",
    description: "You switched the ambient background on the homepage.",
  },
  video_day_tripper: {
    id: "video_day_tripper",
    title: "Day Tripper",
    description: "You cycled through the daytime backgrounds three times.",
  },
  video_night_shift: {
    id: "video_night_shift",
    title: "Night Shift",
    description: "You switched the nighttime background.",
  },
  video_forest: {
    id: "video_forest",
    title: "Forest Path",
    description: "You watched the forest.",
  },
  video_snow: {
    id: "video_snow",
    title: "First Snow",
    description: "You watched the snow.",
  },
  video_water: {
    id: "video_water",
    title: "Still Waters",
    description: "You watched the water.",
  },
  video_campfire: {
    id: "video_campfire",
    title: "By the Fire",
    description: "You watched the campfire.",
  },
  video_moto: {
    id: "video_moto",
    title: "Open Road",
    description: "You watched the road.",
  },
  video_day_complete: {
    id: "video_day_complete",
    title: "Full Daylight",
    description: "You've seen every daytime background.",
  },
  video_night_complete: {
    id: "video_night_complete",
    title: "After Hours",
    description: "You've seen every nighttime background.",
  },
  video_pilgrim: {
    id: "video_pilgrim",
    title: "Video Pilgrim",
    description: "You've seen every ambient video on the homepage.",
  },
}

export const ACHIEVEMENT_LIST = Object.values(ACHIEVEMENTS)
