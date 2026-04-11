'use client'

import { useState, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { EnhancedSidebar } from '@/components/ui/EnhancedSidebar'
import { StatusBar } from '@/components/ui/StatusBar'
import { GlassInput } from '@/components/ui/GlassInput'

const AICanvas = dynamic(
  () => import('@/components/3d/AICanvas').then((mod) => ({ default: mod.AICanvas })),
  { ssr: false, loading: () => <CanvasLoader /> }
)

function CanvasLoader() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border-2 border-transparent border-t-cyan-400 border-r-blue-500 rounded-full"
      />
    </div>
  )
}

const sampleMessages = [
  { id: 1, role: 'user', content: 'What are my API usage statistics?' },
  {
    id: 2,
    role: 'assistant',
    content: 'Based on your current data, you have used 50% of your monthly quota.',
  },
  { id: 3, role: 'user', content: 'How can I optimize my requests?' },
  {
    id: 4,
    role: 'assistant',
    content: 'I recommend using connection pooling and batch requests where possible.',
  },
]

export default function PremiumDashboard() {
  const [messages, setMessages] = useState(sampleMessages)
  const [status, setStatus] = useState<'idle' | 'thinking' | 'responding'>('idle')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (message: string) => {
    setIsLoading(true)
    setStatus('thinking')

    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: 'user', content: message },
    ])

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setStatus('responding')

      // Simulate response
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: 'I have processed your request. Here are the insights...',
        },
      ])
    } finally {
      setIsLoading(false)
      setStatus('idle')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Status Bar */}
      <StatusBar
        isActive
        status={status}
      />

      {/* Enhanced Sidebar */}
      <EnhancedSidebar />

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pl-72 pt-20 pb-32 min-h-screen flex flex-col"
      >
        {/* 3D Canvas Section */}
        <div className="flex-1 w-full relative">
          <Suspense fallback={<CanvasLoader />}>
            <AICanvas
              isThinking={status === 'thinking'}
              isResponding={status === 'responding'}
            />
          </Suspense>

          {/* Content Overlay */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="text-center max-w-2xl px-4">
              <motion.h1
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
              >
                Welcome to AI Platform
              </motion.h1>

              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-lg text-white/60 mb-8"
              >
                Interact with advanced AI models. Ask anything, get instant insights.
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Messages Panel */}
        {messages.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="px-8 py-6 max-w-4xl mx-auto w-full"
          >
            <div className="space-y-4 max-h-48 overflow-y-auto">
              {messages.slice(-4).map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ x: msg.role === 'user' ? 20 : -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg max-w-xs text-sm ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-100'
                        : 'bg-white/5 border border-white/10 text-white/80'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.main>

      {/* Glass Input */}
      <GlassInput
        onSubmit={handleSubmit}
        disabled={false}
        isLoading={isLoading}
      />
    </div>
  )
}
