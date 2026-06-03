// NetworkBackground.jsx
// Drop this anywhere in your layout, behind your Hero content.
// Uses @react-three/fiber + @react-three/drei + three
// npm install three @react-three/fiber @react-three/drei

'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const NODE_COUNT = 120
const CONNECTION_DISTANCE = 2.2
const BOUNDS = 14

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v))
}

function NetworkMesh() {
  const meshRef = useRef()
  const lineRef = useRef()
  const { size } = useThree()

  // Generate nodes with random positions and velocities
  const nodes = useMemo(() => {
    return Array.from({ length: NODE_COUNT }, () => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * BOUNDS * 2,
        (Math.random() - 0.5) * BOUNDS * 2,
        (Math.random() - 0.5) * BOUNDS * 0.4
      ),
      vel: new THREE.Vector3(
        (Math.random() - 0.5) * 0.012,
        (Math.random() - 0.5) * 0.012,
        0
      ),
      phase: Math.random() * Math.PI * 2,
    }))
  }, [])

  // Instanced mesh for nodes (spheres)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Geometry for instanced spheres
  const sphereGeo = useMemo(() => new THREE.SphereGeometry(0.055, 8, 8), [])
  const sphereMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#38bdf8'), // sky-400
        transparent: true,
        opacity: 0.85,
      }),
    []
  )

  // Line segments geometry (pre-allocate max connections)
  const MAX_LINES = NODE_COUNT * 8
  const linePositions = useMemo(
    () => new Float32Array(MAX_LINES * 2 * 3),
    []
  )
  const lineColors = useMemo(
    () => new Float32Array(MAX_LINES * 2 * 3),
    []
  )
  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    g.setAttribute('color', new THREE.BufferAttribute(lineColors, 3))
    return g
  }, [])

  const lineMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.35,
        linewidth: 1,
      }),
    []
  )

  const colorNear = useMemo(() => new THREE.Color('#38bdf8'), [])   // sky-400
  const colorFar = useMemo(() => new THREE.Color('#0c4a6e'), [])   // sky-900

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Update node positions
    for (let i = 0; i < NODE_COUNT; i++) {
      const n = nodes[i]
      n.pos.addScaledVector(n.vel, 1)
      // Bounce off bounds
      if (Math.abs(n.pos.x) > BOUNDS) n.vel.x *= -1
      if (Math.abs(n.pos.y) > BOUNDS) n.vel.y *= -1
    }

    // Update instanced mesh
    const im = meshRef.current
    if (im) {
      for (let i = 0; i < NODE_COUNT; i++) {
        const n = nodes[i]
        const pulse = 0.85 + 0.25 * Math.sin(t * 1.4 + n.phase)
        dummy.position.copy(n.pos)
        dummy.scale.setScalar(pulse)
        dummy.updateMatrix()
        im.setMatrixAt(i, dummy.matrix)
      }
      im.instanceMatrix.needsUpdate = true
    }

    // Build line segments
    const posArr = linePositions
    const colArr = lineColors
    let lineIdx = 0

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dist = nodes[i].pos.distanceTo(nodes[j].pos)
        if (dist < CONNECTION_DISTANCE && lineIdx < MAX_LINES) {
          const alpha = 1 - dist / CONNECTION_DISTANCE
          const col = colorFar.clone().lerp(colorNear, alpha)

          const base = lineIdx * 6
          posArr[base + 0] = nodes[i].pos.x
          posArr[base + 1] = nodes[i].pos.y
          posArr[base + 2] = nodes[i].pos.z
          posArr[base + 3] = nodes[j].pos.x
          posArr[base + 4] = nodes[j].pos.y
          posArr[base + 5] = nodes[j].pos.z

          colArr[base + 0] = col.r
          colArr[base + 1] = col.g
          colArr[base + 2] = col.b
          colArr[base + 3] = col.r
          colArr[base + 4] = col.g
          colArr[base + 5] = col.b

          lineIdx++
        }
      }
    }

    // Zero out unused segment positions
    for (let k = lineIdx; k < MAX_LINES; k++) {
      const base = k * 6
      posArr[base] = posArr[base + 1] = posArr[base + 2] = 0
      posArr[base + 3] = posArr[base + 4] = posArr[base + 5] = 0
    }

    lineGeo.attributes.position.needsUpdate = true
    lineGeo.attributes.color.needsUpdate = true
    lineGeo.setDrawRange(0, lineIdx * 2)
  })

  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[sphereGeo, sphereMat, NODE_COUNT]}
      />
      <lineSegments ref={lineRef} geometry={lineGeo} material={lineMat} />
    </>
  )
}

// Subtle mouse parallax layer
function CameraRig() {
  const mouse = useRef([0, 0])

  if (typeof window !== 'undefined') {
    window.onmousemove = (e) => {
      mouse.current = [
        (e.clientX / window.innerWidth - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2,
      ]
    }
  }

  useFrame(({ camera }) => {
    camera.position.x += (mouse.current[0] * 1.2 - camera.position.x) * 0.03
    camera.position.y += (mouse.current[1] * 0.8 - camera.position.y) * 0.03
    camera.lookAt(0, 0, 0)
  })

  return null
}

export default function NetworkBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 18], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <NetworkMesh />
        <CameraRig />
      </Canvas>
    </div>
  )
}