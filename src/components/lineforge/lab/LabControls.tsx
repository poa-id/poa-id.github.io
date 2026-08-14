"use client"

import type { LabPrimitive, LabSettings, LabStudyMode } from "@/lib/lineforge/types/lab"
import { LIGHTING_PRESETS } from "@/lib/lineforge/types/lab"
import { cn } from "@/lib/utils"

function Toggle({
  label,
  on,
  onClick,
}: {
  label: string
  on: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-[10px] font-mono uppercase tracking-wider px-2 py-1.5 border min-h-11",
        on ? "border-primary/30 text-primary" : "border-border text-muted-foreground"
      )}
    >
      {label} {on ? "ON" : "OFF"}
    </button>
  )
}

function Slider({
  id,
  label,
  min,
  max,
  step,
  value,
  onChange,
}: {
  id: string
  label: string
  min: number
  max: number
  step: number
  value: number
  onChange: (value: number) => void
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="flex justify-between text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
        <span>{label}</span>
        <span>{value}</span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full"
      />
    </div>
  )
}

export function LabControls({
  settings,
  onChange,
  onImport,
  error,
}: {
  settings: LabSettings
  onChange: (partial: Partial<LabSettings>) => void
  onImport: (file: File) => void
  error: string | null
}) {
  const primitives: LabPrimitive[] = ["cube", "sphere", "cylinder"]
  const modes: LabStudyMode[] = ["default", "wireframe", "silhouette", "two-value"]

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1">
        {primitives.map((primitive) => (
          <button
            key={primitive}
            type="button"
            onClick={() => onChange({ primitive, source: "primitive" })}
            className={cn(
              "text-[10px] font-mono uppercase tracking-wider px-2 py-1.5 border",
              settings.source === "primitive" && settings.primitive === primitive
                ? "border-primary text-primary"
                : "border-border text-muted-foreground"
            )}
          >
            {primitive}
          </button>
        ))}
      </div>

      <div>
        <label htmlFor="lf-model-file" className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
          Import GLB / GLTF / STL / OBJ
        </label>
        <input
          id="lf-model-file"
          type="file"
          accept=".glb,.gltf,.stl,.obj"
          className="mt-1 block w-full text-[10px] font-mono text-muted-foreground file:mr-2 file:border file:border-border file:bg-card file:px-2 file:py-1 file:text-[10px] file:font-mono"
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) onImport(file)
          }}
        />
        {error && <p className="text-[10px] font-mono text-destructive mt-1">{error}</p>}
      </div>

      <div className="flex flex-wrap gap-1">
        {modes.map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => onChange({ studyMode: mode })}
            className={cn(
              "text-[10px] font-mono uppercase tracking-wider px-2 py-1.5 border",
              settings.studyMode === mode ? "border-primary text-primary" : "border-border text-muted-foreground"
            )}
          >
            {mode.replace("-", " ")}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-1">
        {LIGHTING_PRESETS.map((preset) => (
          <button
            key={preset.key}
            type="button"
            onClick={() =>
              onChange({
                lightingPreset: preset.key,
                lightAzimuth: preset.azimuth,
                lightElevation: preset.elevation,
                lightIntensity: preset.intensity,
              })
            }
            className={cn(
              "text-[10px] font-mono uppercase tracking-wider px-2 py-1.5 border",
              settings.lightingPreset === preset.key
                ? "border-primary text-primary"
                : "border-border text-muted-foreground"
            )}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <Slider
        id="lf-az"
        label="Azimuth"
        min={0}
        max={360}
        step={1}
        value={settings.lightAzimuth}
        onChange={(lightAzimuth) => onChange({ lightAzimuth, lightingPreset: null })}
      />
      <Slider
        id="lf-el"
        label="Elevation"
        min={-20}
        max={90}
        step={1}
        value={settings.lightElevation}
        onChange={(lightElevation) => onChange({ lightElevation, lightingPreset: null })}
      />
      <Slider
        id="lf-in"
        label="Intensity"
        min={0.1}
        max={2}
        step={0.1}
        value={settings.lightIntensity}
        onChange={(lightIntensity) => onChange({ lightIntensity, lightingPreset: null })}
      />

      {settings.source === "model" && (
        <>
          <Slider id="lf-rx" label="Rot X" min={-180} max={180} step={1} value={settings.modelRotX} onChange={(modelRotX) => onChange({ modelRotX })} />
          <Slider id="lf-ry" label="Rot Y" min={-180} max={180} step={1} value={settings.modelRotY} onChange={(modelRotY) => onChange({ modelRotY })} />
          <Slider id="lf-rz" label="Rot Z" min={-180} max={180} step={1} value={settings.modelRotZ} onChange={(modelRotZ) => onChange({ modelRotZ })} />
        </>
      )}

      <div className="flex flex-wrap gap-1">
        <Toggle label="Perspective" on={settings.perspective} onClick={() => onChange({ perspective: !settings.perspective })} />
        <Toggle label="Camera lock" on={settings.cameraLocked} onClick={() => onChange({ cameraLocked: !settings.cameraLocked })} />
        <Toggle label="Ground" on={settings.groundPlane} onClick={() => onChange({ groundPlane: !settings.groundPlane })} />
        <Toggle label="Shadows" on={settings.castShadow} onClick={() => onChange({ castShadow: !settings.castShadow })} />
        <Toggle label="Grid" on={settings.showGrid} onClick={() => onChange({ showGrid: !settings.showGrid })} />
        <Toggle label="BBox" on={settings.showBoundingBox} onClick={() => onChange({ showBoundingBox: !settings.showBoundingBox })} />
        <Toggle label="Turntable" on={settings.turntable} onClick={() => onChange({ turntable: !settings.turntable })} />
      </div>
    </div>
  )
}
