'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2 } from 'lucide-react'

interface GlassInputProps {
  onSubmit?: (message: string) => void
  disabled?: boolean
  isLoading?: boolean
  placeholder?: string
}

export function GlassInput({
  onSubmit,
  disabled = false,
  isLoading = false,
  placeholder = 'Ask anything...',
}: GlassInputProps) {
  const [message, setMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && onSubmit && !isLoading) {
      onSubmit(message)
      setMessage('')
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4 z-50"
    >
      <motion.div
        animate={{
          boxShadow: isFocused
            ? '0 0 30px rgba(0, 240, 255, 0.4), inset 0 0 30px rgba(0, 240, 255, 0.1)'
            : '0 0 20px rgba(0, 240, 255, 0.2)',
        }}
        className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-4 shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled || isLoading}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-white placeholder-white/40 text-base font-medium disabled:opacity-50 transition-opacity"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={disabled || isLoading || !message.trim()}
            className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </motion.button>
        </div>

        {/* Floating particles on focus */}
        {isFocused && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 1],
                  opacity: [0, 0.6, 0],
                  x: [0, Math.cos((i / 3) * Math.PI * 2) * 30],
                  y: [0, Math.sin((i / 3) * Math.PI * 2) * 30],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                style={{
                  bottom: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </motion.form>
  )
}
