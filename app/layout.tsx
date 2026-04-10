import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Brain, Zap, Shield } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-pink-500/10" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8"
            >
              <Sparkles className="h-5 w-5" />
              <span className="font-medium">10+ AI Models • Production Ready • Auto-Failover</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent mb-6 leading-tight">
              Advanced AI Platform
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Build intelligent applications with 10+ AI providers. Smart command execution, 
              API orchestration, and enterprise-grade security.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/register">
                <Button size="lg" className="text-lg px-10 h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-2xl shadow-blue-500/25">
                  Get Started Free <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="text-lg px-10 h-14 border-white/20 backdrop-blur-sm">
                  Login
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-32"
          >
            <h2 className="text-5xl font-black bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent mb-6">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Production-ready AI platform with intelligent automation and enterprise security
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Brain, title: "10+ AI Models", desc: "OpenAI, Claude, Gemini, Groq, and more" },
              { icon: Zap, title: "Smart Commands", desc: "Natural language → Code generation" },
              { icon: Shield, title: "Encrypted Keys", desc: "Military-grade API key security" },
              { icon: Sparkles, title: "Auto-Failover", desc: "Intelligent provider switching" },
            ].map((feature, index) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full bg-gray-900/50 backdrop-blur-sm border-gray-700/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all group">
                  <CardContent className="p-10 text-center group-hover:text-blue-400">
                    <feature.icon className="h-16 w-16 mx-auto mb-6 opacity-75 group-hover:opacity-100" />
                    <CardHeader className="pb-0">
                      <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardDescription className="text-lg mt-4">{feature.desc}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}