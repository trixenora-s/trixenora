'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Brain, Zap, Shield, Lock } from 'lucide-react'

const AICanvas = dynamic(
  () => import('@/components/3d/AICanvas').then((mod) => ({ default: mod.AICanvas })),
  { ssr: false }
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

export default function LandingPage() {
  const features = [
    {
      icon: Brain,
      title: '10+ AI Models',
      desc: 'OpenAI, Claude, Gemini, and more',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      desc: 'Optimized for sub-second responses',
    },
    {
      icon: Lock,
      title: 'Enterprise Security',
      desc: 'AES-256 encryption for all keys',
    },
    {
      icon: Shield,
      title: 'Auto-Failover',
      desc: 'Intelligent provider switching',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* 3D Canvas Background */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<CanvasLoader />}>
            <AICanvas />
          </Suspense>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-8"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 backdrop-blur-xl">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Next-Generation AI Platform
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent leading-tight"
          >
            The Future of AI
            <br />
            <span className="text-white">Starts Here</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Harness the power of 10+ advanced AI models with intelligent orchestration, 
            enterprise security, and lightning-fast performance.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 240, 255, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg flex items-center gap-2 shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-400/70 transition-shadow"
              >
                Get Started Free <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>

            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/20 text-white font-bold text-lg hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all"
              >
                Sign In
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex justify-center gap-12 pt-8 border-t border-white/10"
          >
            {[
              { label: 'AI Models', value: '10+' },
              { label: 'Processing Speed', value: '<500ms' },
              { label: 'Uptime', value: '99.9%' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-black/50 to-black">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Packed with Power
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Everything you need to build next-generation AI applications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl border border-white/10 hover:border-cyan-500/50 transition-all"
                >
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/60 text-sm">{feature.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6 bg-gradient-to-t from-black to-transparent">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Transform?
            </h2>
            <p className="text-lg text-white/60 mb-10">
              Join enterprises using our platform to power their AI initiatives today.
            </p>
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg shadow-2xl shadow-cyan-500/50"
              >
                Start Free Trial
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
