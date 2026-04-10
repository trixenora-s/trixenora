'use client'

import { Button } from './ui/button'
import { Bell, Search, User } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function DashboardHeader({ title = "Dashboard" }: { title?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between mb-12"
    >
      <div>
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
          {title}
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl">
          Advanced AI platform with 10+ model integrations and intelligent automation
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="h-6 w-6 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-72 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" size="icon" className="h-12 w-12">
            <Bell className="h-6 w-6" />
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 h-12 px-6 font-medium">
            Upgrade
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}