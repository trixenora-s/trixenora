'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Loader2, Eye, EyeOff, User } from 'lucide-react'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

export function SignupForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      await authClient.signUp.email(
        {
          email,
          password,
          name,
        },
        {
          onSuccess: () => {
            router.push('/dashboard')
          },
        }
      )
    } catch (err: any) {
      setError(err.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* Error Message */}
      {error && (
        <motion.div
          variants={itemVariants}
          className="p-4 rounded-2xl border border-red-500/50 bg-red-500/10"
        >
          <p className="text-red-300 text-sm font-medium">{error}</p>
        </motion.div>
      )}

      {/* Name Field */}
      <motion.div variants={itemVariants} className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Full Name</label>
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400/50 group-focus-within:text-cyan-400 transition-colors duration-300" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
            className="w-full pl-12 pr-4 py-3 rounded-2xl"
            style={{
              background: 'rgba(0, 240, 255, 0.05)',
              border: '1px solid rgba(0, 240, 255, 0.2)',
              transition: 'all 0.3s ease',
            }}
            onFocus={(e) => {
              e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)'
              e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.5)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.2)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.background = 'rgba(0, 240, 255, 0.05)'
              e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.2)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />
        </div>
      </motion.div>

      {/* Email Field */}
      <motion.div variants={itemVariants} className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Email Address</label>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400/50 group-focus-within:text-cyan-400 transition-colors duration-300" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full pl-12 pr-4 py-3 rounded-2xl"
            style={{
              background: 'rgba(0, 240, 255, 0.05)',
              border: '1px solid rgba(0, 240, 255, 0.2)',
              transition: 'all 0.3s ease',
            }}
            onFocus={(e) => {
              e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)'
              e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.5)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.2)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.background = 'rgba(0, 240, 255, 0.05)'
              e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.2)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />
        </div>
      </motion.div>

      {/* Password Field */}
      <motion.div variants={itemVariants} className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Password</label>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400/50 group-focus-within:text-cyan-400 transition-colors duration-300" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full pl-12 pr-12 py-3 rounded-2xl"
            style={{
              background: 'rgba(0, 240, 255, 0.05)',
              border: '1px solid rgba(0, 240, 255, 0.2)',
              transition: 'all 0.3s ease',
            }}
            onFocus={(e) => {
              e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)'
              e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.5)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.2)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.background = 'rgba(0, 240, 255, 0.05)'
              e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.2)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400/50 hover:text-cyan-400 transition-colors duration-300"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </motion.div>

      {/* Confirm Password Field */}
      <motion.div variants={itemVariants} className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400/50 group-focus-within:text-cyan-400 transition-colors duration-300" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full pl-12 pr-12 py-3 rounded-2xl"
            style={{
              background: 'rgba(0, 240, 255, 0.05)',
              border: '1px solid rgba(0, 240, 255, 0.2)',
              transition: 'all 0.3s ease',
            }}
            onFocus={(e) => {
              e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)'
              e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.5)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.2)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.background = 'rgba(0, 240, 255, 0.05)'
              e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.2)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400/50 hover:text-cyan-400 transition-colors duration-300"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </motion.div>

      {/* Signup Button */}
      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-2xl font-semibold text-white relative group overflow-hidden disabled:opacity-50"
        style={{
          background: 'linear-gradient(135deg, #00f0ff 0%, #3b82f6 100%)',
        }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle at center, #00f0ff, transparent)',
            filter: 'blur(20px)',
          }}
        />

        <div className="relative flex items-center justify-center gap-2">
          {loading && <Loader2 className="w-5 h-5 animate-spin" />}
          {loading ? 'Creating account...' : 'Create Account'}
        </div>
      </motion.button>

      {/* Divider */}
      <motion.div variants={itemVariants} className="relative py-2">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="relative flex justify-center">
          <span className="px-4 text-sm text-gray-500 bg-gradient-to-b from-gray-900 via-black to-gray-900">
            or continue with
          </span>
        </div>
      </motion.div>

      {/* Switch to Login */}
      <motion.div variants={itemVariants} className="text-center text-sm text-gray-400">
        Already have an account?{' '}
        <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-300">
          Sign in here
        </Link>
      </motion.div>
    </motion.form>
  )
}
