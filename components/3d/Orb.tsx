'use client'

import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import * as THREE from 'three'

interface OrbProps {
  isThinking?: boolean
  isResponding?: boolean
}

export function Orb({ isThinking = false, isResponding = false }: OrbProps) {
  const meshRef = useRef<Mesh>(null)
  const particlesRef = useRef<Mesh>(null)
  const [glowIntensity, setGlowIntensity] = useState(1)

  useEffect(() => {
    if (isResponding) {
      setGlowIntensity(2.5)
    } else if (isThinking) {
      setGlowIntensity(1.8)
    } else {
      setGlowIntensity(1)
    }
  }, [isThinking, isResponding])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    if (meshRef.current) {
      // Rotation
      meshRef.current.rotation.x = time * 0.3
      meshRef.current.rotation.y = time * 0.5
      meshRef.current.rotation.z = time * 0.2

      // Pulse effect
      const pulseScale = 1 + Math.sin(time * (isResponding ? 3 : isThinking ? 2 : 0.5)) * 0.1
      meshRef.current.scale.set(pulseScale, pulseScale, pulseScale)

      // Update intensity
      if (meshRef.current.material) {
        const material = meshRef.current.material as THREE.MeshPhongMaterial
        material.emissiveIntensity = glowIntensity + Math.sin(time * 2) * 0.3
      }
    }

    // Particles rotation
    if (particlesRef.current) {
      particlesRef.current.rotation.z = time * 0.3
      particlesRef.current.rotation.x = time * 0.2
    }
  })

  return (
    <group>
      {/* Main Sphere */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 8]} />
        <meshPhongMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={1}
          shininess={100}
          wireframe={false}
        />
      </mesh>

      {/* Inner Glow */}
      <mesh>
        <icosahedronGeometry args={[1.45, 4]} />
        <meshBasicMaterial
          color="#7a00ff"
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Wireframe Shell */}
      <mesh>
        <icosahedronGeometry args={[1.8, 3]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Particle Ring */}
      <group ref={particlesRef}>
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2
          const x = Math.cos(angle) * 2.5
          const z = Math.sin(angle) * 2.5
          return (
            <mesh key={i} position={[x, 0, z]}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshPhongMaterial
                color={i % 2 === 0 ? '#00f0ff' : '#7a00ff'}
                emissive={i % 2 === 0 ? '#00f0ff' : '#7a00ff'}
                emissiveIntensity={0.5}
              />
            </mesh>
          )
        })}
      </group>

      {/* Lights */}
      <pointLight position={[5, 5, 5]} intensity={2} color="#00f0ff" />
      <pointLight position={[-5, -5, 5]} intensity={1.5} color="#7a00ff" />
      <ambientLight intensity={0.5} />
    </group>
  )
}
