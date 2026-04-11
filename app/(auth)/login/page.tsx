'use client'

import { BackgroundEffects } from '@/components/auth/BackgroundEffects'
import { AuthCard } from '@/components/auth/AuthCard'
import { LoginForm } from '@/components/auth/LoginForm'
import { GoogleButton } from '@/components/auth/GoogleButton'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundEffects />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center w-full">
        <AuthCard
          title="Welcome Back"
          subtitle="Sign in to access your AI platform and unlock advanced features"
        >
          <div className="space-y-5">
            <LoginForm />

            {/* Google Login Button */}
            <GoogleButton />
          </div>
        </AuthCard>
      </div>
    </div>
  )
}