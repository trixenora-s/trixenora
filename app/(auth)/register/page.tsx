'use client'

import { BackgroundEffects } from '@/components/auth/BackgroundEffects'
import { AuthCard } from '@/components/auth/AuthCard'
import { SignupForm } from '@/components/auth/SignupForm'
import { GoogleButton } from '@/components/auth/GoogleButton'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundEffects />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center w-full">
        <AuthCard
          title="Join Trixenora"
          subtitle="Create your account to access advanced AI features and get started"
        >
          <div className="space-y-5">
            <SignupForm />

            {/* Google Login Button */}
            <GoogleButton />
          </div>
        </AuthCard>
      </div>
    </div>
  )
}
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            <div className="text-center pt-6 border-t border-gray-700/50">
              <p className="text-sm text-gray-500">
                Already have an account?{' '}
                <a href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium">
                  Sign in here
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}