import { betterAuth } from 'better-auth'

export const auth = betterAuth({
  database: {
    provider: 'prisma',
    url: process.env.DATABASE_URL!,
  },
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
})