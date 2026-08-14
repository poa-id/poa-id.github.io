"use client"

import { Component, useCallback, useEffect, useState, type ReactNode } from "react"
import { Palette, RotateCcw, X } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { LabControls } from "@/components/lineforge/lab/LabControls"
import { LabScene } from "@/components/lineforge/lab/LabScene"
import { DEFAULT_LAB_SETTINGS, type LabSettings } from "@/lib/lineforge/types/lab"
import { getLabSettings, saveLabSettings } from "@/lib/lineforge/storage"
import * as THREE from "three"

class LabErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (this.state.failed) {
      return (
        <div className="flex-1 flex items-center justify-center text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          3D lab unavailable
        </div>
      )
    }
    return this.props.children
  }
}

function normalizeModel(object: THREE.Object3D) {
  const box = new THREE.Box3().setFromObject(object)
  const size = box.getSize(new THREE.Vector3())
  const maxDim = Math.max(size.x, size.y, size.z) || 1
  const scale = 1.5 / maxDim
  object.scale.setScalar(scale)
  box.setFromObject(object)
  object.position.x -= (box.min.x + box.max.x) / 2
  object.position.z -= (box.min.z + box.max.z) / 2
  object.position.y -= box.min.y * 1
}

async function loadModel(file: File): Promise<THREE.Object3D> {
  const ext = file.name.split(".").pop()?.toLowerCase()
  const url = URL.createObjectURL(file)
  try {
    if (ext === "glb" || ext === "gltf") {
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js")
      const gltf = await new GLTFLoader().loadAsync(url)
      normalizeModel(gltf.scene)
      return gltf.scene
    }
    if (ext === "stl") {
      const { STLLoader } = await import("three/examples/jsm/loaders/STLLoader.js")
      const geometry = await new STLLoader().loadAsync(url)
      const mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshStandardMaterial({ color: "#888888", roughness: 0.85, metalness: 0.05 })
      )
      const group = new THREE.Group()
      group.add(mesh)
      normalizeModel(group)
      return group
    }
    if (ext === "obj") {
      const { OBJLoader } = await import("three/examples/jsm/loaders/OBJLoader.js")
      const obj = await new OBJLoader().loadAsync(url)
      normalizeModel(obj)
      return obj
    }
    throw new Error("Unsupported format")
  } finally {
    URL.revokeObjectURL(url)
  }
}

export function FormLightingLab({
  onClose,
  onOpenPalette,
}: {
  onClose: () => void
  onOpenPalette: () => void
}) {
  const [settings, setSettings] = useState<LabSettings>(DEFAULT_LAB_SETTINGS)
  const [model, setModel] = useState<THREE.Object3D | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setSettings(getLabSettings())
    setReady(true)
  }, [])

  const update = useCallback((partial: Partial<LabSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial }
      saveLabSettings(next)
      return next
    })
  }, [])

  const onImport = async (file: File) => {
    setError(null)
    try {
      const loaded = await loadModel(file)
      setModel(loaded)
      update({ source: "model" })
    } catch {
      setError("Could not load that model. Try GLB, GLTF, STL, or OBJ.")
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      <header className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <h2 className="text-xs font-mono uppercase tracking-wider">Form & Lighting Lab</h2>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={onOpenPalette}
            className="p-2 border border-border text-muted-foreground hover:text-foreground min-h-11 min-w-11"
            aria-label="Open palette"
          >
            <Palette className="size-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => {
              setSettings(DEFAULT_LAB_SETTINGS)
              saveLabSettings(DEFAULT_LAB_SETTINGS)
              setModel(null)
              setError(null)
            }}
            className="p-2 border border-border text-muted-foreground hover:text-foreground min-h-11 min-w-11"
            aria-label="Reset lab"
          >
            <RotateCcw className="size-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2 border border-border text-muted-foreground hover:text-foreground min-h-11 min-w-11"
            aria-label="Close lab"
          >
            <X className="size-4" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <div className="flex-1 min-h-0 grid grid-rows-[minmax(220px,1fr)_auto] lg:grid-rows-1 lg:grid-cols-[1fr_20rem]">
        <LabErrorBoundary>
          <div className="min-h-[220px] h-[50vh] lg:h-full bg-[#2a2a2a]">
            {ready && (
              <Canvas shadows className="w-full h-full" style={{ height: "100%" }}>
                <LabScene settings={settings} model={model} />
              </Canvas>
            )}
          </div>
        </LabErrorBoundary>
        <div className="border-t lg:border-t-0 lg:border-l border-border overflow-y-auto p-4 bg-background">
          <LabControls settings={settings} onChange={update} onImport={onImport} error={error} />
        </div>
      </div>
    </div>
  )
}
