'use client'

import { ChatInterface } from '@/components/ChatInterface'
import { Sidebar } from '@/components/Sidebar'
import { useState } from 'react'

export default function ChatPage() {
  const [chatCount, setChatCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Sidebar />
      <div className="lg:ml-64 p-6">
        <ChatInterface onNewChat={() => setChatCount(prev => prev + 1)} />
      </div>
    </div>
  )
}