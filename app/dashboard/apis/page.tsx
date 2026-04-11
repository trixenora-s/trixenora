'use client'

import { ApiKeyManager } from '@/components/ApiKeyManager'
import { Sidebar } from '@/components/Sidebar'
import { DashboardHeader } from '@/components/DashboardHeader'

export default function ApiKeysPage() {
  // TODO: Add proper session validation
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Sidebar />
      <div className="lg:ml-64 p-8">
        <DashboardHeader title="API Management" />
        <div className="mt-12">
          <ApiKeyManager />
        </div>
      </div>
    </div>
  )
}