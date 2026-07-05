'use client'

/**
 * "Digital Engine Core" — scroll-driven 3D hero background.
 *
 * A wireframe AI core with orbiting service modules. As the visitor
 * scrolls: the whole engine rotates, the modules burst apart mid-page
 * (services scattered), then reassemble near the CTA — "we bring it
 * all together". Procedural geometry only; no model files needed.
 */

import { useMemo, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Shared scroll state — written by a passive listener, read per-frame.
const scroll = { target: 0, current: 0 }

function smoothstep(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

// Even distribution of N points on a sphere (fibonacci spiral).
function fibonacciSphere(n: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const th = golden * i
    pts.push(new THREE.Vector3(Math.cos(th) * r, y, Math.sin(th) * r))
  }
  return pts
}

const MODULE_COUNT = 12
const BASE_R = 1.7
const EXPLODE_R = 2.3

const TEALS = ['#21d6bd', '#46e3cd', '#14b8a6', '#7ff0e0']

function Engine({ lowPower }: { lowPower: boolean }) {
  const group = useRef<THREE.Group>(null)
  const modules = useRef<THREE.Group>(null)
  const lines = useRef<THREE.LineSegments>(null)

  const dirs = useMemo(() => fibonacciSphere(MODULE_COUNT), [])

  const linePositions = useMemo(
    () => new Float32Array(MODULE_COUNT * 2 * 3),
    [],
  )

  const starGeo = useMemo(() => {
    const n = lowPower ? 90 : 220
    const arr = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const v = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
      )
        .normalize()
        .multiplyScalar(3.2 + Math.random() * 4.5)
      arr.set([v.x, v.y, v.z], i * 3)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3))
    return g
  }, [lowPower])

  useFrame((state, delta) => {
    // Smooth the scroll signal (framerate-independent lerp).
    scroll.current += (scroll.target - scroll.current) * Math.min(1, delta * 4)
    const p = scroll.current
    const t = state.clock.elapsedTime

    // Scatter through the middle of the page, reassemble near the end.
    const explode =
      smoothstep(0.06, 0.38, p) * (1 - smoothstep(0.55, 0.88, p))
    const radius = BASE_R + explode * EXPLODE_R

    if (group.current) {
      group.current.rotation.y = p * Math.PI * 3 + t * 0.06
      group.current.rotation.x = 0.25 + Math.sin(p * Math.PI) * 0.35
    }

    if (modules.current) {
      modules.current.children.forEach((child, i) => {
        const dir = dirs[i]
        const wobble = 1 + Math.sin(t * 0.8 + i * 2.4) * 0.04
        child.position.set(
          dir.x * radius * wobble,
          dir.y * radius * wobble,
          dir.z * radius * wobble,
        )
        child.rotation.x += delta * (0.3 + (i % 3) * 0.2)
        child.rotation.y += delta * 0.4
        const s = 1 + explode * 0.35
        child.scale.setScalar(s)

        // Connection line: core surface → module.
        const o = i * 6
        linePositions[o] = dir.x * 1.05
        linePositions[o + 1] = dir.y * 1.05
        linePositions[o + 2] = dir.z * 1.05
        linePositions[o + 3] = child.position.x
        linePositions[o + 4] = child.position.y
        linePositions[o + 5] = child.position.z
      })
    }

    if (lines.current) {
      const attr = lines.current.geometry.getAttribute(
        'position',
      ) as THREE.BufferAttribute
      attr.needsUpdate = true
      const mat = lines.current.material as THREE.LineBasicMaterial
      mat.opacity = 0.28 - explode * 0.14
    }

    // Gentle camera parallax with the pointer.
    const px = state.pointer.x * 0.4
    const py = state.pointer.y * 0.25
    state.camera.position.x += (px - state.camera.position.x) * delta * 2
    state.camera.position.y += (py - state.camera.position.y) * delta * 2
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={group}>
      {/* AI core */}
      <mesh>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#21d6bd" wireframe transparent opacity={0.5} />
      </mesh>
      <mesh scale={0.62}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#0d9488" transparent opacity={0.18} />
      </mesh>

      {/* Service modules */}
      <group ref={modules}>
        {dirs.map((d, i) => (
          <mesh key={i} position={d.clone().multiplyScalar(BASE_R)}>
            {i % 3 === 0 ? (
              <octahedronGeometry args={[0.16]} />
            ) : i % 3 === 1 ? (
              <boxGeometry args={[0.2, 0.2, 0.2]} />
            ) : (
              <icosahedronGeometry args={[0.15]} />
            )}
            <meshBasicMaterial
              color={TEALS[i % TEALS.length]}
              wireframe={i % 2 === 0}
              transparent
              opacity={i % 2 === 0 ? 0.85 : 0.5}
            />
          </mesh>
        ))}
      </group>

      {/* Core → module connections */}
      <lineSegments ref={lines}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#46e3cd" transparent opacity={0.28} />
      </lineSegments>

      {/* Ambient particles */}
      <points geometry={starGeo}>
        <pointsMaterial
          color="#7ff0e0"
          size={0.035}
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  )
}

export default function EngineScene({ lowPower = false }: { lowPower?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      scroll.target = p
      // Fade the engine out over the footer so text stays readable.
      if (wrap.current) {
        wrap.current.style.opacity = String(0.5 * (1 - smoothstep(0.8, 0.94, p)))
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      ref={wrap}
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-300"
      style={{ opacity: 0.5 }}
    >
      <Canvas
        camera={{ position: [0, 0, lowPower ? 7.5 : 6], fov: 45 }}
        dpr={lowPower ? 1 : [1, 1.75]}
        gl={{ antialias: !lowPower, alpha: true, powerPreference: 'low-power' }}
      >
        <Engine lowPower={lowPower} />
      </Canvas>
    </div>
  )
}
