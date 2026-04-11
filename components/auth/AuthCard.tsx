'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface AuthCardProps {
  children: ReactNode
  title: string
  subtitle?: string
}

export function AuthCard({ children, title, subtitle }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.23, 1, 0.320, 1],
      }}
      className="w-full max-w-md"
    >
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(122, 0, 255, 0.1) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 240, 255, 0.2)',
        }}
      >
        {/* Animated border glow */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              'linear-gradient(135deg, rgba(0, 240, 255, 0.5) 0%, rgba(122, 0, 255, 0.5) 100%)',
            filter: 'blur(20px)',
            pointerEvents: 'none',
          }}
        />

        {/* Inner shadow for depth */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.5)',
          }}
        />

        <div className="relative z-10 p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              {title}
            </motion.h1>

            {subtitle && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-gray-400 text-sm leading-relaxed"
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {children}
          </motion.div>
        </div>
      </div>

      {/* Floating glow effect behind card */}
      <div
        className="absolute inset-0 -z-10 rounded-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(0, 240, 255, 0.3) 0%, transparent 50%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  )
}
