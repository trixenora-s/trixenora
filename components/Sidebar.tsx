'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  MessageCircle, 
  Settings, 
  KeySquare, 
  BarChart3, 
  LogOut,
  Home 
} from 'lucide-react'
import { Button } from './ui/button'

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const NAV_ITEMS = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/dashboard/chat', label: 'Chat', icon: MessageCircle },
    { href: '/dashboard/apis', label: 'API Keys', icon: KeySquare },
    { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  ]

  return (
    <motion.aside 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-screen w-64 bg-gray-900/95 backdrop-blur-sm border-r border-gray-800/50 z-50 lg:static lg:translate-x-0"
    >
      <div className="p-8 border-b border-gray-800/50">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          AI Platform
        </div>
        <p className="text-sm text-gray-400 mt-2">Welcome</p>
      </div>

      <nav className="p-6 space-y-2 mt-8">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start h-12 px-4 py-3 transition-all duration-200 hover:bg-gray-800/50 ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30 shadow-lg' 
                    : 'hover:shadow-md'
                }`}
              >
                <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
                <span className="font-medium">{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-8 left-6 right-6">
        <Button
          variant="ghost"
          className="w-full justify-start h-12 px-4 hover:bg-red-500/20 hover:text-red-400 border-red-500/30 transition-all duration-200"
          onClick={() => {
            // Clear auth and redirect to login
            fetch('/api/auth/logout', { method: 'POST' })
              .then(() => router.push('/login'))
              .catch(() => router.push('/login'))
          }}
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span>Sign Out</span>
        </Button>
      </div>
    </motion.aside>
  )
}