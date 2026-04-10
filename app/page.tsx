import { redirect } from 'next/navigation'
import { getServerSession } from 'better-auth/next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sidebar } from '@/components/Sidebar'
import { DashboardHeader } from '@/components/DashboardHeader'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function DashboardPage() {
  const session = await getServerSession()
  if (!session) redirect('/login')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Sidebar />
      <div className="lg:ml-64 p-8">
        <DashboardHeader />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-12"
        >
          {/* Quick Stats */}
          <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50 col-span-1 lg:col-span-2 xl:col-span-3">
            <CardHeader>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Welcome back, {session.user.name || session.user.email}!
              </CardTitle>
              <CardDescription className="text-lg">
                Manage your AI APIs and unlock intelligent automation across 10+ providers
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-0">
              
              {/* AI Chat Card */}
              <Link href="/dashboard/chat" className="group">
                <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30 hover:shadow-blue-500/25 hover:shadow-2xl transition-all duration-300 cursor-pointer h-full group-hover:scale-[1.02]">
                  <CardContent className="p-8 text-center group-hover:text-blue-300">
                    <motion.div 
                      className="w-20 h-20 bg-blue-500/20 rounded-3xl mx-auto mb-6 flex items-center justify-center group-hover:bg-blue-500/40 transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      💬
                    </motion.div>
                    <h3 className="font-bold text-xl mb-3">AI Chat</h3>
                    <p className="text-sm opacity-90 mb-6">Multi-model conversations with streaming responses</p>
                    <Button className="w-full bg-blue-500 hover:bg-blue-600">Start Chatting</Button>
                  </CardContent>
                </Card>
              </Link>

              {/* API Management Card */}
              <Link href="/dashboard/apis" className="group">
                <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/30 hover:shadow-emerald-500/25 hover:shadow-2xl transition-all duration-300 cursor-pointer h-full group-hover:scale-[1.02]">
                  <CardContent className="p-8 text-center group-hover:text-emerald-300">
                    <motion.div 
                      className="w-20 h-20 bg-emerald-500/20 rounded-3xl mx-auto mb-6 flex items-center justify-center group-hover:bg-emerald-500/40 transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                    >
                      🔑
                    </motion.div>
                    <h3 className="font-bold text-xl mb-3">API Keys</h3>
                    <p className="text-sm opacity-90 mb-6">Manage 10+ AI providers with usage tracking</p>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Manage Keys</Button>
                  </CardContent>
                </Card>
              </Link>

              {/* Smart Commands Card */}
              <Link href="/dashboard/chat" className="group">
                <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30 hover:shadow-purple-500/25 hover:shadow-2xl transition-all duration-300 cursor-pointer h-full group-hover:scale-[1.02]">
                  <CardContent className="p-8 text-center group-hover:text-purple-300">
                    <motion.div 
                      className="w-20 h-20 bg-purple-500/20 rounded-3xl mx-auto mb-6 flex items-center justify-center group-hover:bg-purple-500/40 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      ⚡
                    </motion.div>
                    <h3 className="font-bold text-xl mb-3">Smart Commands</h3>
                    <p className="text-sm opacity-90 mb-6">"build website", "write code", "analyze data"</p>
                    <Button className="w-full bg-purple-500 hover:bg-purple-600">Try Commands</Button>
                  </CardContent>
                </Card>
              </Link>
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50 xl:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-2xl">
                  <div>
                    <p className="font-medium">GPT-4o Usage</p>
                    <p className="text-sm text-gray-400">Today</p>
                  </div>
                  <div className="text-2xl font-bold text-blue-400">127 req</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-2xl">
                  <div>
                    <p className="font-medium">Total Tokens</p>
                    <p className="text-sm text-gray-400">This week</p>
                  </div>
                  <div className="text-2xl font-bold text-green-400">2.4M</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border-indigo-500/20">
            <CardHeader>
              <CardTitle className="text-indigo-300">Pro Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-indigo-200">Add multiple API keys for automatic failover</p>
              </div>
              <div className="flex items-start gap-3 p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-indigo-200">Use natural language commands like "build a React app"</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}