"use client"

import { useEffect, useRef } from "react"
import { Box, ContactShadows, Grid, OrbitControls, OrthographicCamera, PerspectiveCamera } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import type { LabSettings, LabStudyMode } from "@/lib/lineforge/types/lab"

function studyMaterial(mode: LabStudyMode) {
  if (mode === "silhouette") return <meshBasicMaterial color="#000000" />
  if (mode === "two-value") return <meshToonMaterial color="#888888" />
  if (mode === "wireframe") return <meshBasicMaterial color="#888888" wireframe />
  return <meshStandardMaterial color="#888888" roughness={0.85} metalness={0.05} />
}

function applyStudyToModel(root: THREE.Object3D, mode: LabStudyMode) {
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return
    if (!child.userData._lfOriginal) {
      child.userData._lfOriginal = child.material
    }
    if (mode === "default") {
      child.material = child.userData._lfOriginal
      return
    }
    if (mode === "silhouette") child.material = new THREE.MeshBasicMaterial({ color: "#000000" })
    else if (mode === "two-value") child.material = new THREE.MeshToonMaterial({ color: "#888888" })
    else child.material = new THREE.MeshBasicMaterial({ color: "#888888", wireframe: true })
  })
}

function Primitive({ settings }: { settings: LabSettings }) {
  const material = studyMaterial(settings.studyMode)
  const common = { position: [0, 0.5, 0] as [number, number, number], castShadow: true }
  if (settings.primitive === "sphere") {
    return (
      <mesh {...common}>
        <sphereGeometry args={[0.6, 32, 32]} />
        {material}
      </mesh>
    )
  }
  if (settings.primitive === "cylinder") {
    return (
      <mesh {...common}>
        <cylinderGeometry args={[0.4, 0.4, 1, 32]} />
        {material}
      </mesh>
    )
  }
  return (
    <mesh {...common}>
      <boxGeometry args={[1, 1, 1]} />
      {material}
    </mesh>
  )
}

function ModelSubject({
  object,
  settings,
}: {
  object: THREE.Object3D
  settings: LabSettings
}) {
  const group = useRef<THREE.Group>(null)
  useEffect(() => {
    applyStudyToModel(object, settings.studyMode)
  }, [object, settings.studyMode])

  useFrame((_, delta) => {
    if (settings.turntable && group.current) group.current.rotation.y += delta * 0.4
  })

  return (
    <group
      ref={group}
      rotation={[
        (settings.modelRotX * Math.PI) / 180,
        (settings.modelRotY * Math.PI) / 180,
        (settings.modelRotZ * Math.PI) / 180,
      ]}
    >
      <primitive object={object} />
    </group>
  )
}

function TurntablePrimitive({ settings }: { settings: LabSettings }) {
  const group = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (settings.turntable && group.current) group.current.rotation.y += delta * 0.4
  })
  return (
    <group ref={group}>
      <Primitive settings={settings} />
    </group>
  )
}

export function LabScene({
  settings,
  model,
}: {
  settings: LabSettings
  model: THREE.Object3D | null
}) {
  const elev = (settings.lightElevation * Math.PI) / 180
  const azim = (settings.lightAzimuth * Math.PI) / 180
  const x = 4 * Math.cos(elev) * Math.sin(azim)
  const y = 4 * Math.sin(elev)
  const z = 4 * Math.cos(elev) * Math.cos(azim)

  return (
    <>
      <color attach="background" args={["#2a2a2a"]} />
      {settings.perspective ? (
        <PerspectiveCamera makeDefault position={[2.4, 1.8, 3.2]} fov={50} />
      ) : (
        <OrthographicCamera makeDefault position={[2.4, 1.8, 3.2]} zoom={80} />
      )}
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[x, y, z]}
        intensity={settings.lightIntensity}
        castShadow={settings.castShadow}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {settings.source === "model" && model ? (
        <ModelSubject object={model} settings={settings} />
      ) : (
        <TurntablePrimitive settings={settings} />
      )}
      {settings.groundPlane && (
        <ContactShadows position={[0, 0, 0]} opacity={0.45} scale={8} blur={2} far={4} />
      )}
      {settings.showGrid && (
        <Grid args={[8, 8]} cellSize={0.5} sectionSize={2} cellColor="#444" sectionColor="#666" infiniteGrid={false} />
      )}
      {settings.showBoundingBox && (
        <Box args={[1.6, 1.6, 1.6]} position={[0, 0.8, 0]}>
          <meshBasicMaterial color="#c9a96e" wireframe />
        </Box>
      )}
      <OrbitControls enabled={!settings.cameraLocked} makeDefault />
    </>
  )
}
