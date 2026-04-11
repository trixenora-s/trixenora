'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { BackgroundParticles } from './BackgroundParticles'
import { Orb } from './Orb'

interface AICanvasProps {
  isThinking?: boolean
  isResponding?: boolean
}

function CanvasContent({ isThinking, isResponding }: AICanvasProps) {
  return (
    <>
      <BackgroundParticles />
      <Orb isThinking={isThinking} isResponding={isResponding} />
    </>
  )
}

export function AICanvas({ isThinking = false, isResponding = false }: AICanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 75 }}
      style={{
        background: 'linear-gradient(135deg, #050505 0%, #0a0a2e 50%, #16213e 100%)',
      }}
      performance={{ current: 0.5, min: 0.2, max: 1 }}
    >
      <Suspense fallback={null}>
        <CanvasContent isThinking={isThinking} isResponding={isResponding} />
      </Suspense>
    </Canvas>
  )
}
