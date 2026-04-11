'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sidebar } from '@/components/Sidebar'
import { DashboardHeader } from '@/components/DashboardHeader'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Brain, MessageCircle, Key, Zap, BarChart, ArrowRight } from 'lucide-react'

export default function DashboardPage() {
  // TODO: Add proper session validation
  const stats = {
    gpt4o: 127,
    tokens: '2.4M',
    providers: 5,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black/30 to-slate-900">
      <Sidebar />
      <div className="lg:ml-64 p-8">
        <DashboardHeader />
        
        <motion.main 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-12"
          role="main"
        >
          {/* Hero Welcome Card */}
          <Card className="bg-slate-900/40 backdrop-blur-xl border-slate-700/50 col-span-1 lg:col-span-2 xl:col-span-3 shadow-2xl hover:shadow-blue-500/20 transition-all group/card hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="text-4xl font-black bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-3">
                <Brain className="h-12 w-12 opacity-80" />
                Welcome back!
              </CardTitle>
              <CardDescription className="text-xl leading-relaxed">
                Manage your AI APIs, track usage, and unlock intelligent automation across 10+ providers. 
                Your gateway to production AI.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-0">
              
              {/* AI Chat */}
              <Link href="/dashboard/chat" className="group hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg" aria-label="AI Chat Interface">
                <motion.div 
                  whileHover={{ scale: 1.05, rotateX: -5 }}
                  className="bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10 border-2 border-blue-500/20 hover:border-blue-400/40 backdrop-blur-xl p-8 rounded-3xl text-center h-full shadow-xl hover:shadow-blue-500/30 transition-all duration-500 group-hover:bg-blue-500/20 cursor-pointer"
                >
                  <div className="w-24 h-24 bg-blue-500/20 rounded-3xl mx-auto mb-6 flex items-center justify-center backdrop-blur-xl border-2 border-blue-500/30 hover:bg-blue-500/40 transition-all duration-500 hover:scale-110 hover:rotate-6">
                    💬
                  </div>
                  <h3 className="font-black text-2xl mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">AI Chat</h3>
                  <p className="text-lg text-slate-300 mb-8 opacity-90">Multi-model conversations with streaming, tool calling, and context memory</p>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 h-12 font-semibold text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                    Start Chatting
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </Link>

              {/* API Management */}
              <Link href="/dashboard/apis" className="group hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg" aria-label="API Keys Management">
                <motion.div 
                  whileHover={{ scale: 1.05, rotateX: -5 }}
                  className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/20 hover:border-emerald-400/40 backdrop-blur-xl p-8 rounded-3xl text-center h-full shadow-xl hover:shadow-emerald-500/30 transition-all duration-500 group-hover:bg-emerald-500/20 cursor-pointer"
                >
                  <div className="w-24 h-24 bg-emerald-500/20 rounded-3xl mx-auto mb-6 flex items-center justify-center backdrop-blur-xl border-2 border-emerald-500/30 hover:bg-emerald-500/40 transition-all duration-500 hover:scale-110 hover:rotate-6">
                    🔑
                  </div>
                  <h3 className="font-black text-2xl mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">API Keys</h3>
                  <p className="text-lg text-slate-300 mb-8 opacity-90">Securely manage 10+ AI providers with real-time usage tracking and cost analytics</p>
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600 h-12 font-semibold text-lg shadow-lg hover:shadow-emerald-500/25 transition-all duration-300">
                    Manage Keys
                    <Key className="h-5 w-5 ml-2" />
                  </Button>
                </motion.div>
              </Link>

              {/* Smart Commands */}
              <Link href="/dashboard/chat" className="group hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg" aria-label="Smart AI Commands">
                <motion.div 
                  whileHover={{ scale: 1.05, rotateX: -5 }}
                  className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/20 hover:border-purple-400/40 backdrop-blur-xl p-8 rounded-3xl text-center h-full shadow-xl hover:shadow-purple-500/30 transition-all duration-500 group-hover:bg-purple-500/20 cursor-pointer"
                >
                  <div className="w-24 h-24 bg-purple-500/20 rounded-3xl mx-auto mb-6 flex items-center justify-center backdrop-blur-xl border-2 border-purple-500/30 hover:bg-purple-500/40 transition-all duration-500 hover:scale-110 hover:rotate-6">
                    ⚡
                  </div>
                  <h3 className="font-black text-2xl mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Smart Commands</h3>
                  <p className="text-lg text-slate-300 mb-8 opacity-90">"build website", "write React component", "analyze sales data", "debug code"</p>
                  <Button className="w-full bg-purple-500 hover:bg-purple-600 h-12 font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                    Try Commands
                    <Zap className="h-5 w-5 ml-2" />
                  </Button>
                </motion.div>
              </Link>
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50 xl:col-span-2 shadow-2xl hover:shadow-blue-500/20 group/card hover:scale-[1.02]" aria-label="Usage Statistics">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold flex items-center gap-2 text-slate-200">
                <BarChart className="h-8 w-8" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-8 bg-slate-800/50 rounded-3xl border border-slate-700/50 hover:border-blue-500/30 hover:bg-slate-800/70 backdrop-blur-xl transition-all duration-300"
                >
                  <div>
                    <p className="font-bold text-xl text-white">GPT-4o Requests</p>
                    <p className="text-slate-400 text-sm">Today</p>
                  </div>
                  <div className="text-3xl font-black text-blue-400 bg-gradient-to-r from-blue-400/20 to-transparent p-4 rounded-2xl backdrop-blur-sm">{stats.gpt4o} req</div>
                </motion.div>
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-8 bg-slate-800/50 rounded-3xl border border-slate-700/50 hover:border-emerald-500/30 hover:bg-slate-800/70 backdrop-blur-xl transition-all duration-300"
                >
                  <div>
                    <p className="font-bold text-xl text-white">Total Tokens</p>
                    <p className="text-slate-400 text-sm">This month</p>
                  </div>
                  <div className="text-3xl font-black text-emerald-400 bg-gradient-to-r from-emerald-400/20 to-transparent p-4 rounded-2xl backdrop-blur-sm">{stats.tokens}</div>
                </motion.div>
              </div>
            </CardContent>
          </Card>

          {/* Pro Tips */}
          <Card className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/30 backdrop-blur-xl shadow-2xl hover:shadow-indigo-500/20 group/card hover:scale-[1.02] xl:col-span-1" aria-label="Pro Tips">
            <CardHeader>
              <CardTitle className="text-indigo-300 text-2xl font-bold flex items-center gap-2">
                💡 Pro Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-6 bg-indigo-500/10 rounded-3xl border border-indigo-500/30 hover:bg-indigo-500/20 transition-all duration-300 group/tip hover:scale-[1.02]">
                <div className="w-3 h-3 bg-indigo-400 rounded-full mt-3 flex-shrink-0 animate-pulse" />
                <p className="text-indigo-100 text-lg leading-relaxed">
                  Add multiple API keys per provider for automatic failover and load balancing
                </p>
              </div>
              <div className="flex items-start gap-4 p-6 bg-indigo-500/10 rounded-3xl border border-indigo-500/30 hover:bg-indigo-500/20 transition-all duration-300 group/tip hover:scale-[1.02]">
                <div className="w-3 h-3 bg-indigo-400 rounded-full mt-3 flex-shrink-0 animate-pulse" />
                <p className="text-indigo-100 text-lg leading-relaxed">
                  Use natural language commands like "build a React app with Tailwind" or "analyze this CSV data"
                </p>
              </div>
              <div className="flex items-start gap-4 p-6 bg-indigo-500/10 rounded-3xl border border-indigo-500/30 hover:bg-indigo-500/20 transition-all duration-300 group/tip hover:scale-[1.02]">
                <div className="w-3 h-3 bg-indigo-400 rounded-full mt-3 flex-shrink-0 animate-pulse" />
                <p className="text-indigo-100 text-lg leading-relaxed">
                  Monitor costs in real-time and set budgets per provider across all your projects
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.main>
      </div>
    </div>
  )
}

