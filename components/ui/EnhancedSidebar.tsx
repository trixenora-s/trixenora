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
  Home,
  Clock,
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/chat', label: 'Chat', icon: MessageCircle },
  { href: '/dashboard/apis', label: 'API Keys', icon: KeySquare },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
]

const SECONDARY_ITEMS = [
  { href: '#', label: 'History', icon: Clock },
  { href: '#', label: 'Settings', icon: Settings },
]

export function EnhancedSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <motion.aside
      initial={{ x: -280, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-20 h-[calc(100vh-80px)] w-72 bg-gradient-to-b from-black/50 to-black/30 backdrop-blur-xl border-r border-white/5 z-40 p-6 flex flex-col overflow-y-auto"
    >
      {/* Main Navigation */}
      <nav className="flex-1 space-y-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative px-4 py-3 rounded-xl transition-all group cursor-pointer overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50'
                    : 'hover:bg-white/5 border border-white/0 hover:border-white/10'
                }`}
              >
                {/* Animated background on hover */}
                {!isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                )}

                <div className="relative flex items-center gap-3 z-10">
                  <motion.div
                    animate={isActive ? { scale: 1.1 } : {}}
                    className={`p-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                        : 'bg-white/5 group-hover:bg-white/10 text-white/60 group-hover:text-white/80'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>

                  <div className="flex-1">
                    <p
                      className={`text-sm font-semibold transition-colors ${
                        isActive ? 'text-cyan-300' : 'text-white/70 group-hover:text-white'
                      }`}
                    >
                      {item.label}
                    </p>
                  </div>

                  {/* Glow effect on active */}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-glow"
                      className="absolute right-2 w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/50"
                    />
                  )}
                </div>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6" />

      {/* Secondary Items */}
      <nav className="space-y-2 mb-6">
        {SECONDARY_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <motion.button
              key={item.label}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {}}
              className="w-full px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-3 group transition-all"
            >
              <Icon className="w-5 h-5 text-white/60 group-hover:text-cyan-400 transition-colors" />
              <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                {item.label}
              </span>
            </motion.button>
          )
        })}
      </nav>

      {/* Logout Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          fetch('/api/auth/logout', { method: 'POST' })
            .then(() => router.push('/login'))
            .catch(() => router.push('/login'))
        }}
        className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 hover:from-red-500/20 hover:to-pink-500/20 border border-red-500/20 hover:border-red-500/40 flex items-center gap-3 transition-all"
      >
        <LogOut className="w-5 h-5 text-red-400" />
        <span className="text-sm font-semibold text-red-300">Sign Out</span>
      </motion.button>
    </motion.aside>
  )
}
