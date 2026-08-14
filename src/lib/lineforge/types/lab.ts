export type LabPrimitive = "cube" | "sphere" | "cylinder"
export type LabSource = "primitive" | "model"
export type LabStudyMode = "default" | "wireframe" | "silhouette" | "two-value"

export interface LabSettings {
  source: LabSource
  primitive: LabPrimitive
  perspective: boolean
  cameraLocked: boolean
  lightAzimuth: number
  lightElevation: number
  lightIntensity: number
  lightingPreset: string | null
  groundPlane: boolean
  castShadow: boolean
  showGrid: boolean
  showBoundingBox: boolean
  studyMode: LabStudyMode
  turntable: boolean
  modelRotX: number
  modelRotY: number
  modelRotZ: number
}

export const DEFAULT_LAB_SETTINGS: LabSettings = {
  source: "primitive",
  primitive: "cube",
  perspective: true,
  cameraLocked: false,
  lightAzimuth: 45,
  lightElevation: 45,
  lightIntensity: 1,
  lightingPreset: null,
  groundPlane: true,
  castShadow: true,
  showGrid: false,
  showBoundingBox: false,
  studyMode: "default",
  turntable: false,
  modelRotX: 0,
  modelRotY: 0,
  modelRotZ: 0,
}

export interface LightingPreset {
  key: string
  label: string
  azimuth: number
  elevation: number
  intensity: number
}

export const LIGHTING_PRESETS: LightingPreset[] = [
  { key: "top", label: "Top Light", azimuth: 0, elevation: 75, intensity: 1.2 },
  { key: "side", label: "Side Light", azimuth: 90, elevation: 30, intensity: 1.0 },
  { key: "rim", label: "Rim Light", azimuth: 180, elevation: 20, intensity: 1.1 },
  { key: "overhead", label: "Overhead Industrial", azimuth: 15, elevation: 80, intensity: 1.4 },
  { key: "window", label: "Window Light", azimuth: 60, elevation: 40, intensity: 0.9 },
  { key: "bounce", label: "Bounce Light", azimuth: 200, elevation: 10, intensity: 0.6 },
  { key: "underside", label: "Underside", azimuth: 0, elevation: -5, intensity: 0.8 },
  { key: "overcast", label: "Overcast", azimuth: 45, elevation: 65, intensity: 0.5 },
]
