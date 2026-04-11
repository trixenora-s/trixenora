'use client'

import { motion } from 'framer-motion'
import { Zap, Signal } from 'lucide-react'

interface StatusBarProps {
  isActive?: boolean
  status?: 'idle' | 'thinking' | 'responding'
}

export function StatusBar({ isActive = true, status = 'idle' }: StatusBarProps) {
  const statusText = {
    idle: 'AI Ready',
    thinking: 'Processing...',
    responding: 'Streaming Response',
  }

  const statusColor = {
    idle: 'from-green-400 to-emerald-500',
    thinking: 'from-yellow-400 to-orange-500',
    responding: 'from-cyan-400 to-blue-500',
  }

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/80 to-black/20 backdrop-blur-md border-b border-white/5"
    >
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-lg">AI Platform</span>
        </motion.div>

        {/* Status */}
        <div className="flex items-center gap-3">
          <motion.div
            animate={{
              scale: status === 'idle' ? 1 : 1.1,
            }}
            className={`px-4 py-2 rounded-full bg-gradient-to-r ${statusColor[status]} bg-opacity-10 border border-white/20 flex items-center gap-2`}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: status === 'idle' ? 2 : 0.8,
                repeat: Infinity,
              }}
              className={`w-2 h-2 rounded-full bg-gradient-to-r ${statusColor[status]}`}
            />
            <span className={`text-sm font-semibold bg-gradient-to-r ${statusColor[status]} bg-clip-text text-transparent`}>
              {statusText[status]}
            </span>
          </motion.div>

          {/* Signal */}
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: ['8px', '16px', '8px'],
                }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
                className="w-1 bg-gradient-to-t from-cyan-400 to-cyan-300 rounded-sm"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
