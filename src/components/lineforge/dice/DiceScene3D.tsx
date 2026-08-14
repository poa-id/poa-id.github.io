"use client"

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Html, RoundedBox } from "@react-three/drei"
import { CuboidCollider, Physics, RigidBody, type RapierRigidBody } from "@react-three/rapier"
import * as THREE from "three"

export interface DiceSceneHandle {
  throwAll: () => void
  throwOne: (index: number) => void
  reset: (count?: number) => void
}

const DIE_COLORS = ["#555555", "#666666", "#4a4a5a", "#5a5050", "#4a555a"]

function DieEngravings({ color }: { color: string }) {
  const carved = useMemo(() => new THREE.Color(color).multiplyScalar(0.5), [color])
  return (
    <group>
      <group position={[0, 0, 0.52]}>
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.5, 0.04, 0.02]} />
          <meshStandardMaterial color={carved} roughness={0.9} metalness={0} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.35, 0.04, 0.02]} />
          <meshStandardMaterial color={carved} roughness={0.9} metalness={0} />
        </mesh>
        <mesh position={[0, -0.15, 0]}>
          <boxGeometry args={[0.5, 0.04, 0.02]} />
          <meshStandardMaterial color={carved} roughness={0.9} metalness={0} />
        </mesh>
      </group>
      <group position={[0, 0, -0.52]} rotation={[0, 0, Math.PI / 4]}>
        <mesh>
          <boxGeometry args={[0.3, 0.3, 0.02]} />
          <meshStandardMaterial color={carved} roughness={0.9} metalness={0} wireframe />
        </mesh>
      </group>
      <group position={[0.52, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.01, 0.45, 0.04]} />
          <meshStandardMaterial color={carved} roughness={0.9} metalness={0} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.01, 0.04, 0.45]} />
          <meshStandardMaterial color={carved} roughness={0.9} metalness={0} />
        </mesh>
      </group>
      <group position={[-0.52, 0, 0]}>
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color={carved} roughness={0.9} metalness={0} />
        </mesh>
        <mesh position={[0, -0.15, 0]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color={carved} roughness={0.9} metalness={0} />
        </mesh>
      </group>
      <mesh position={[0, 0.52, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.18, 0.025, 8, 16]} />
        <meshStandardMaterial color={carved} roughness={0.9} metalness={0} />
      </mesh>
      <group position={[0, -0.52, 0]}>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.4, 0.04, 0.02]} />
          <meshStandardMaterial color={carved} roughness={0.9} metalness={0} />
        </mesh>
        <mesh rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.4, 0.04, 0.02]} />
          <meshStandardMaterial color={carved} roughness={0.9} metalness={0} />
        </mesh>
      </group>
    </group>
  )
}

function spawnPosition(index: number, count: number): [number, number, number] {
  const spacing = count <= 3 ? 2.8 : 2.4
  return [
    (index - (count - 1) / 2) * spacing,
    5.5 + index * 1.6,
    (index % 2 === 0 ? -1 : 1) * (0.7 + Math.random() * 0.5),
  ]
}

function PhysicsDie({
  index,
  thrown,
  label,
  position,
  onSettle,
}: {
  index: number
  thrown: boolean
  label: string
  position: [number, number, number]
  onSettle: (index: number) => void
}) {
  const body = useRef<RapierRigidBody>(null)
  const settled = useRef(false)
  const acc = useRef(0)
  const impulseDone = useRef(false)
  const color = DIE_COLORS[index % DIE_COLORS.length]

  useEffect(() => {
    settled.current = false
    acc.current = 0
    impulseDone.current = false
  }, [thrown])

  useFrame((_, delta) => {
    const rb = body.current
    if (!rb || !thrown || settled.current) return

    if (!impulseDone.current) {
      impulseDone.current = true
      rb.setLinvel({ x: 0, y: 0, z: 0 }, true)
      rb.setAngvel({ x: 0, y: 0, z: 0 }, true)
      const outward = position[0] * 0.55
      rb.applyImpulse(
        {
          x: outward + (Math.random() - 0.5) * 3.5,
          y: -4 + Math.random() * -4,
          z: (Math.random() - 0.5) * 3.2,
        },
        true
      )
      rb.applyTorqueImpulse(
        {
          x: (Math.random() - 0.5) * 15,
          y: (Math.random() - 0.5) * 15,
          z: (Math.random() - 0.5) * 15,
        },
        true
      )
    }

    const lin = rb.linvel()
    const ang = rb.angvel()
    const speed = Math.hypot(lin.x, lin.y, lin.z)
    const angSpeed = Math.hypot(ang.x, ang.y, ang.z)
    if (speed < 0.08 && angSpeed < 0.15) {
      acc.current += delta
      if (acc.current > 0.4) {
        settled.current = true
        onSettle(index)
      }
    } else {
      acc.current = 0
    }
  })

  return (
    <RigidBody
      ref={body}
      position={position}
      restitution={0.6}
      friction={0.6}
      linearDamping={0.3}
      angularDamping={0.2}
      colliders="cuboid"
      ccd
      type={thrown ? "dynamic" : "fixed"}
    >
      <RoundedBox args={[1, 1, 1]} radius={0.12} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
      </RoundedBox>
      <DieEngravings color={color} />
      <SettleLabel show={thrown} label={label} settledRef={settled} />
    </RigidBody>
  )
}

function SettleLabel({
  show,
  label,
  settledRef,
}: {
  show: boolean
  label: string
  settledRef: { current: boolean }
}) {
  const [visible, setVisible] = useState(false)
  useFrame(() => {
    if (settledRef.current && show && !visible) setVisible(true)
    if (!settledRef.current && visible) setVisible(false)
  })
  if (!visible) return null
  return (
    <Html position={[0, 1.2, 0]} center zIndexRange={[0, 0]}>
      <div
        style={{
          background: "rgba(0,0,0,0.85)",
          border: "1px solid rgba(255,107,53,0.4)",
          color: "#ff6b35",
          fontFamily: "ui-monospace, monospace",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          borderRadius: 2,
          pointerEvents: "none",
          whiteSpace: "nowrap",
          padding: "2px 6px",
        }}
      >
        {label}
      </div>
    </Html>
  )
}

function Tray() {
  const wall = 5.6
  const half = 6.2
  return (
    <>
      <RigidBody type="fixed" position={[0, -2, 0]} colliders={false}>
        <CuboidCollider args={[half, 0.1, half]} />
        <mesh receiveShadow>
          <boxGeometry args={[half * 2, 0.2, half * 2]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.95} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" position={[wall, 1.6, 0]} colliders={false}>
        <CuboidCollider args={[0.12, 3.6, half]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-wall, 1.6, 0]} colliders={false}>
        <CuboidCollider args={[0.12, 3.6, half]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, 1.6, wall]} colliders={false}>
        <CuboidCollider args={[half, 3.6, 0.12]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, 1.6, -wall]} colliders={false}>
        <CuboidCollider args={[half, 3.6, 0.12]} />
      </RigidBody>
    </>
  )
}

export const DiceScene3D = forwardRef<
  DiceSceneHandle,
  {
    diceCount: number
    labels: string[]
    onSettle: (index: number) => void
  }
>(function DiceScene3D({ diceCount, labels, onSettle }, ref) {
  const [resetKey, setResetKey] = useState(0)
  const [thrownDice, setThrownDice] = useState<boolean[]>(() => Array.from({ length: diceCount }, () => false))
  const [origins, setOrigins] = useState<[number, number, number][]>(() =>
    Array.from({ length: diceCount }, (_, i) => spawnPosition(i, diceCount))
  )
  const throwTimers = useRef<number[]>([])
  const diceCountRef = useRef(diceCount)
  diceCountRef.current = diceCount

  const clearThrowTimers = () => {
    throwTimers.current.forEach((id) => window.clearTimeout(id))
    throwTimers.current = []
  }

  useEffect(() => {
    setThrownDice((prev) => {
      if (prev.length === diceCount) return prev
      if (prev.length < diceCount) return [...prev, ...Array.from({ length: diceCount - prev.length }, () => false)]
      return prev.slice(0, diceCount)
    })
    setOrigins((prev) => {
      if (prev.length >= diceCount) return prev.slice(0, diceCount)
      const next = [...prev]
      while (next.length < diceCount) {
        next.push(spawnPosition(next.length, diceCount))
      }
      return next
    })
  }, [diceCount])

  useImperativeHandle(ref, () => ({
    throwAll() {
      clearThrowTimers()
      const count = diceCountRef.current
      for (let i = 0; i < count; i++) {
        const id = window.setTimeout(() => {
          setThrownDice((prev) => {
            const next = prev.length === count ? [...prev] : Array.from({ length: count }, (_, n) => !!prev[n])
            next[i] = true
            return next
          })
        }, i * 180)
        throwTimers.current.push(id)
      }
    },
    throwOne(index: number) {
      setThrownDice((prev) => {
        const next = [...prev]
        next[index] = true
        return next
      })
    },
    reset(count?: number) {
      clearThrowTimers()
      const nextCount = count ?? diceCountRef.current
      diceCountRef.current = nextCount
      setOrigins(Array.from({ length: nextCount }, (_, i) => spawnPosition(i, nextCount)))
      setThrownDice(Array.from({ length: nextCount }, () => false))
      setResetKey((key) => key + 1)
    },
  }))

  return (
    <div className="w-full border border-border bg-[#111]" style={{ height: 420 }}>
      <Canvas shadows camera={{ position: [0, 8.5, 9], fov: 38 }} gl={{ antialias: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[3, 8, 4]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-2, 4, -3]} intensity={0.3} />
        <Physics gravity={[0, -25, 0]} key={resetKey}>
          <Tray />
          {Array.from({ length: diceCount }, (_, i) => (
            <PhysicsDie
              key={`${resetKey}-${i}`}
              index={i}
              thrown={!!thrownDice[i]}
              label={labels[i] ?? "?"}
              position={origins[i] ?? spawnPosition(i, diceCount)}
              onSettle={onSettle}
            />
          ))}
        </Physics>
      </Canvas>
    </div>
  )
})
