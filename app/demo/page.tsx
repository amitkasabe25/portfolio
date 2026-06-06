'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Sphere, Box, Torus, TorusKnot, Float, Stars,
  Ring, Cylinder, MeshDistortMaterial, Environment
} from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

// ------------------------------------------------------------
// Main Animated Scene with Scroll-Driven Hyper Dynamics
// ------------------------------------------------------------
function HyperScene() {
  const scrollProgress = useRef(0)
  const groupRef = useRef<THREE.Group>(null)
  const centralEmblemRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const floatingTokensRef = useRef<(THREE.Mesh | null)[]>([])
  const ringsRef = useRef<(THREE.Mesh | null)[]>([])
  const knotRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0
      scrollProgress.current = Math.min(1.0, Math.max(0.0, progress))
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Complex camera path: dolly, rotate, and tilt
  useFrame((state) => {
    const p = scrollProgress.current
    const t = state.clock.getElapsedTime()

    // Dynamic camera: moves around the scene dramatically
    const angle = p * Math.PI * 1.2
    const radius = 6 - p * 1.5
    const targetX = Math.sin(angle) * radius
    const targetZ = Math.cos(angle) * radius * 0.8
    const targetY = 2.5 + p * 2 + Math.sin(angle * 2) * 0.5

    camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.06)
    camera.lookAt(0, 1.5, 0)

    // Central emblem pulsation and rotation
    if (centralEmblemRef.current) {
      centralEmblemRef.current.rotation.y = p * Math.PI * 2
      centralEmblemRef.current.rotation.x = Math.sin(p * Math.PI) * 0.5
      const intensity = 0.8 + p * 1.5 + Math.sin(t * 5) * 0.2
        ; (centralEmblemRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity
    }

    // Rotating main group
    if (groupRef.current) {
      groupRef.current.rotation.y = p * Math.PI * 1.2
      groupRef.current.position.y = Math.sin(p * Math.PI * 2) * 0.4
    }

    // Animated torus knot
    if (knotRef.current) {
      knotRef.current.rotation.x = t * 0.3
      knotRef.current.rotation.y = t * 0.5 + p * 2
      knotRef.current.scale.setScalar(1 + p * 0.6)
    }

    // Rings: expand and rotate
    ringsRef.current.forEach((ring, idx) => {
      if (ring) {
        ring.rotation.z = t * 0.2 * (idx + 1) + p * Math.PI
        ring.rotation.x = Math.sin(t * 0.5 + idx) * 0.5
        const scaleRing = 1 + p * 0.8
        ring.scale.setScalar(scaleRing)
      }
    })

    // Floating tokens – orbit and bob
    floatingTokensRef.current.forEach((token, idx) => {
      if (token) {
        const angleOffset = idx * 0.5
        const radiusToken = 2.2 + p * 1.2
        const x = Math.cos(t * 0.8 + angleOffset) * radiusToken
        const z = Math.sin(t * 0.6 + angleOffset) * radiusToken
        const y = Math.sin(t * 1.2 + idx) * 0.8 + p * 1.5
        token.position.set(x, y, z)
        token.rotation.x = t
        token.rotation.y = t
      }
    })

    // Particle field – dynamic motion and color
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.1
      particlesRef.current.rotation.x = Math.sin(t * 0.2) * 0.2
      particlesRef.current.position.y = -1 + p * 2.5
      if (particlesRef.current.material) {
        const hue = 0.55 + p * 0.3
          ; (particlesRef.current.material as THREE.PointsMaterial).color.setHSL(hue, 1.0, 0.6)
      }
    }
  })

  // Generate particle system positions (3D cloud)
  const particleCount = 2500
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18 - 4
    }
    return positions
  }, [])

  // Floating token positions (static base, animated in useFrame)
  const tokenCount = 16
  const tokenColors = ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#f59e0b']

  return (
    <>
      {/* Advanced Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 5, 4]} intensity={1.5} color="#3b82f6" />
      <pointLight position={[-3, 4, 5]} intensity={1.0} color="#a855f7" />
      <directionalLight position={[2, 5, 3]} intensity={1.2} castShadow />
      <spotLight position={[0, 6, 2]} intensity={1.2} angle={0.5} penumbra={0.4} color="#60a5fa" />

      {/* Cinematic Stars Field */}
      <Stars radius={80} depth={60} count={3000} factor={6} saturation={0.4} fade speed={0.8} />

      {/* Main Scene Group */}
      <group ref={groupRef} position={[0, 1.2, 0]}>
        {/* Central Emblem – authoritative shield shape */}
        <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
          <mesh ref={centralEmblemRef} position={[0, 0, 0]}>
            <cylinderGeometry args={[1.0, 1.0, 0.4, 48]} />
            <MeshDistortMaterial
              color="#1e40af"
              emissive="#3b82f6"
              emissiveIntensity={1.2}
              metalness={0.9}
              roughness={0.15}
              distort={0.15}
              speed={2}
            />
          </mesh>
        </Float>

        {/* Emblem top crest */}
        <mesh position={[0, 0.55, 0]}>
          <torusGeometry args={[0.85, 0.08, 64, 200]} />
          <meshStandardMaterial color="#facc15" metalness={0.95} roughness={0.1} emissive="#fbbf24" emissiveIntensity={0.6} />
        </mesh>

        {/* Glowing Core inside emblem */}
        <mesh position={[0, 0, 0.2]} scale={0.45}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial color="#ffffff" emissive="#3b82f6" emissiveIntensity={1.5} transparent opacity={0.7} />
        </mesh>

        {/* Dynamic Torus Knot orbiting around */}
        <Float speed={0.8} rotationIntensity={1} floatIntensity={0.5}>
          <mesh ref={knotRef} position={[0, 0, 0]}>
            <torusKnotGeometry args={[1.3, 0.12, 200, 32, 3, 4]} />
            <meshStandardMaterial color="#8b5cf6" emissive="#a855f7" emissiveIntensity={0.8} metalness={0.7} roughness={0.2} />
          </mesh>
        </Float>

        {/* Multiple glowing Rings */}
        {[1.4, 2.0, 2.6].map((radius, idx) => (
          <mesh key={idx} ref={el => { ringsRef.current[idx] = el }} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.05, 128, 300]} />
            <meshStandardMaterial color={idx === 0 ? "#60a5fa" : idx === 1 ? "#facc15" : "#ec4899"} emissive="#3b82f6" emissiveIntensity={0.5} />
          </mesh>
        ))}
      </group>

      {/* Floating Game Tokens / Dice / Shields */}
      {[...Array(tokenCount)].map((_, i) => {
        const color = tokenColors[i % tokenColors.length]
        const shape = i % 3 === 0 ? 'box' : i % 3 === 1 ? 'sphere' : 'torus'
        return (
          <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.8} floatIntensity={0.6}>
            <mesh ref={el => { floatingTokensRef.current[i] = el }} scale={0.35}>
              {shape === 'box' && <boxGeometry args={[0.45, 0.45, 0.45]} />}
              {shape === 'sphere' && <sphereGeometry args={[0.3, 24, 24]} />}
              {shape === 'torus' && <torusGeometry args={[0.32, 0.08, 32, 60]} />}
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} metalness={0.6} roughness={0.3} />
            </mesh>
          </Float>
        )
      })}

      {/* Hyper Particle System */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial color="#3b82f6" size={0.06} transparent opacity={0.5} blending={THREE.AdditiveBlending} />
      </points>

      {/* Ground Glow Disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <circleGeometry args={[5.5, 32]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} metalness={0.2} transparent opacity={0.4} emissive="#1e3a8a" emissiveIntensity={0.3} />
      </mesh>
    </>
  )
}

// ------------------------------------------------------------
// Main Page Component with Bloom Effect and Overlay
// ------------------------------------------------------------
export default function Home() {
  const [scrollPercent, setScrollPercent] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0
      setScrollPercent(Math.floor(progress * 100))
    }
    window.addEventListener('scroll', updateScrollProgress)
    updateScrollProgress()
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return (
    <div className="relative bg-black text-white font-sans overflow-x-hidden">
      {/* Fixed Canvas with Post-Processing Bloom */}
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ position: [0, 2.5, 7], fov: 50 }}
          shadows
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        >
          <HyperScene />
          <EffectComposer>
            <Bloom intensity={1.2} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
          </EffectComposer>
          <Environment preset="night" />
        </Canvas>
      </div>

      {/* Scroll Content with Glassmorphic Cards */}
      <div className="relative z-10 pointer-events-auto">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/20 backdrop-blur-sm border border-blue-400/40 text-blue-300 text-sm font-mono mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              INDIA'S OFFICIAL GAMING REGULATOR
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Online Gaming<br />Authority
              </span>
              <span className="text-white"> of India</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mt-6 mb-10">
              Ensuring fair play, consumer protection, and responsible gaming for a billion players.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <button className="group relative px-8 py-3.5 bg-blue-600 rounded-full font-bold text-lg overflow-hidden shadow-lg hover:shadow-blue-500/30 transition">
                <span className="relative z-10">Apply for License</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition duration-300"></div>
              </button>
              <button className="px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 transition">
                View Framework →
              </button>
            </div>
          </div>
        </section>

        {/* Mission & Mandate */}
        <section className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-blue-500/30 hover:border-blue-400 transition">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                To create a transparent, secure, and innovative online gaming ecosystem in India. We set global benchmarks, issue licenses, monitor compliance, and protect consumers from unfair practices.
              </p>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 hover:border-purple-400 transition">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Key Mandate</h2>
              <ul className="space-y-3 text-gray-300 text-lg">
                <li>✓ Licensing of Real-Money Games</li>
                <li>✓ Auditing RNG and Fairness</li>
                <li>✓ Dispute Resolution Mechanism</li>
                <li>✓ Responsible Gaming Initiatives</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-6xl w-full bg-slate-900/40 backdrop-blur-xl rounded-3xl p-12 border border-blue-500/20 text-center">
            <h2 className="text-5xl font-bold mb-12">India's Gaming <span className="text-blue-400">Landscape</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {[
                { value: '500M+', label: 'Gamers' },
                { value: '2,100+', label: 'Licensed Operators' },
                { value: '₹15,000Cr', label: 'Market Size' },
                { value: '99.7%', label: 'Dispute Resolution' },
              ].map(stat => (
                <div key={stat.label} className="group">
                  <div className="text-5xl font-black text-blue-400 group-hover:scale-110 transition">{stat.value}</div>
                  <div className="text-sm text-gray-400 mt-2 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Regulatory Pillars */}
        <section className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold text-center mb-12">Regulatory <span className="text-purple-400">Framework</span></h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Player Protection', desc: 'KYC, age gates, deposit limits, and self-exclusion tools.', icon: '🛡️', color: 'blue' },
                { title: 'Game Certification', desc: 'Technical standards for RNG, payout ratios, and source code audit.', icon: '🎮', color: 'purple' },
                { title: 'Compliance & Audit', desc: 'Regular inspections, AML checks, and financial transparency.', icon: '📋', color: 'cyan' },
              ].map(pillar => (
                <div key={pillar.title} className="group bg-slate-900/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-blue-400 transition hover:shadow-xl">
                  <div className="text-6xl mb-4">{pillar.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{pillar.title}</h3>
                  <p className="text-gray-400">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA + Contact */}
        <section className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl w-full bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-xl rounded-3xl p-12 border border-blue-500/40 text-center">
            <h2 className="text-4xl font-bold mb-4">Become a Recognised Operator</h2>
            <p className="text-gray-300 text-lg mb-8">
              Join India's most trusted gaming ecosystem. Apply for a provisional license today.
            </p>
            <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold text-xl shadow-lg hover:scale-105 transition">
              Start Application →
            </button>
            <div className="mt-12 pt-8 border-t border-gray-700 flex flex-wrap justify-center gap-8 text-gray-400">
              <span className="flex items-center gap-2">📧 <span className="font-mono">contact@ogai.gov.in</span></span>
              <span className="flex items-center gap-2">📞 +91 11 4000 5000</span>
              <span className="flex items-center gap-2">📍 New Delhi, India</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-800/50 bg-black/30">
          © 2025 Online Gaming Authority of India. All rights reserved.
        </footer>
      </div>

      {/* Scroll Indicator */}
      <div className="fixed bottom-6 right-6 z-20 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-xs font-mono text-blue-300 border border-blue-500/50">
        🎮 scroll {scrollPercent}%
      </div>
    </div>
  )
}