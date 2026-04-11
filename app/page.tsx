'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Brain, Zap, Shield, Github, Twitter } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LandingPage() {
  const features = [
    { icon: Brain, title: "10+ AI Models", desc: "OpenAI, Claude, Gemini, Groq, Llama, and more with seamless integration" },
    { icon: Zap, title: "Smart Commands", desc: "Natural language to code generation, auto-tool calling" },
    { icon: Shield, title: "Encrypted Keys", desc: "Military-grade AES-256 encryption for all API keys" },
    { icon: Sparkles, title: "Auto-Failover", desc: "Intelligent provider switching with latency monitoring" },
  ]

  return (
    <>
      {/* Floating Orbs - 3D Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-40 h-40 rounded-full opacity-20 mix-blend-multiply filter blur-xl bg-gradient-to-r from-blue-400/40 to-purple-600/40"
            style={{
              left: `${(i % 6) * 20 + 10}%`,
              top: `${Math.floor(i / 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 180],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20 + i * 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32 overflow-hidden z-10">
        {/* Parallax Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black/50 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-purple-500/5" />

        <div className="container mx-auto px-6 text-center relative z-20 max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-2xl mb-12 shadow-2xl"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="h-6 w-6" />
            <span className="font-semibold text-lg">🚀 10+ AI Models • Production Ready • Auto-Failover</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-white via-blue-100/80 to-purple-100/80 bg-clip-text text-transparent mb-8 leading-[0.9] tracking-tight"
          >
            Advanced{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl">
              AI Platform
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl text-slate-300/90 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Build intelligent applications with 10+ AI providers. Smart command execution, 
            API orchestration, enterprise-grade security, and seamless deployment.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/register">
              <Button size="lg" className="text-lg px-12 h-16 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-2xl shadow-blue-500/30 font-semibold text-xl">
                Get Started Free <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="text-lg px-12 h-16 border-white/20 backdrop-blur-xl hover:bg-white/5 shadow-xl font-semibold text-xl">
                Login
              </Button>
            </Link>
          </motion.div>

          {/* Social Proof */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-8 justify-center items-center mt-20 pt-12 border-t border-white/10"
          >
            <div className="text-sm text-slate-400">Trusted by builders worldwide</div>
            <div className="flex gap-6 text-white/70">
              <Github className="h-6 w-6 hover:text-white transition-colors" />
              <Twitter className="h-6 w-6 hover:text-white transition-colors" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features - 3D Cards */}
      <section className="relative py-32 overflow-hidden z-10">
        <div className="perspective-1000" style={{ perspective: '1000px' }}>
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 bg-clip-text text-transparent mb-8">
                Everything You Need
              </h2>
              <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                Production-ready AI platform with intelligent automation, 
                battle-tested reliability, and enterprise-grade security.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div 
                    key={feature.title}
                    initial={{ opacity: 0, y: 60, rotateX: 30 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      y: -20, 
                      rotateX: -10, 
                      rotateY: -10,
                      scale: 1.05 
                    }}
                    className="group/card relative perspective-1000 hover:cursor-grab active:cursor-grabbing"
                    style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                  >
                    <Card className="h-full bg-slate-900/60 backdrop-blur-xl border-white/10 shadow-2xl group-hover:shadow-emerald-500/25 transition-all duration-500 relative overflow-hidden hover:border-emerald-400/50">
                      {/* 3D Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-y-6 origin-top-left scale-x-400 opacity-50 group-hover:opacity-75 transition-all duration-500 -translate-x-full group-hover:translate-x-full" />
                      <CardContent className="p-10 text-center relative z-10 h-full flex flex-col justify-center group-hover:text-emerald-300 transition-colors">
                        <motion.div 
                          className="w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-3xl mx-auto mb-8 backdrop-blur-xl border border-emerald-500/30 flex items-center justify-center shadow-2xl group-hover:shadow-emerald-500/50 group-hover:scale-110 transition-all duration-500"
                          style={{ transformStyle: 'preserve-3d' }}
                          animate={{ rotateY: [0, 360] }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                          <Icon className="h-12 w-12 opacity-80 group-hover:opacity-100" />
                        </motion.div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-2xl font-black group-hover:text-emerald-400">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardDescription className="text-lg mt-4 leading-relaxed opacity-90">{feature.desc}</CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-gradient-to-b from-slate-900/50 to-black/50 z-10">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <motion.h3 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-5xl font-black text-white mb-6"
          >
            Ready to Build the Future?
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto"
          >
            Join thousands of developers using our platform to create next-generation AI applications.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/register">
              <Button size="lg" className="px-12 h-16 text-xl bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 shadow-2xl shadow-emerald-500/30">
                Start Building <ArrowRight className="h-6 w-6 ml-3" />
              </Button>
            </Link>
            <Link href="/docs" className="group">
              <Button variant="outline" size="lg" className="px-12 h-16 text-xl border-white/20 backdrop-blur-xl group-hover:bg-white/5">
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

