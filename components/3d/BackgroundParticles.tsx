'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, BufferGeometry, PointsMaterial } from 'three'
import * as THREE from 'three'

export function BackgroundParticles() {
  const pointsRef = useRef<Points>(null)

  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const particleCount = 1000
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 80
      positions[i + 1] = (Math.random() - 0.5) * 80
      positions[i + 2] = (Math.random() - 0.5) * 80
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geometry
  }, [])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return

    const positions = pointsRef.current.geometry.attributes.position
      .array as Float32Array

    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += 0.01
      if (positions[i + 1] > 40) {
        positions[i + 1] = -40
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.rotation.x = clock.getElapsedTime() * 0.05
  })

  return (
    <points ref={pointsRef} geometry={particleGeometry}>
      <pointsMaterial
        size={0.1}
        color="#00f0ff"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}
