import { betterAuth } from 'better-auth'
import { google } from 'better-auth/providers'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from './prisma'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignInAfterSignUp: true,
  },
  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  plugins: [],
  secret: process.env.BETTER_AUTH_SECRET,
  basePath: '/api/auth',
  appName: 'Trixenora AI',
  trustedOrigins: [
    'http://localhost:3000',
    'https://trixenora.vercel.app',
    process.env.BETTER_AUTH_URL || '',
  ],
})

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.User
