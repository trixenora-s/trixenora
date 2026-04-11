# Trixenora AI - Best Personal AI Assistant

A modern, deploy-ready AI platform built with Next.js App Router, Better Auth, Prisma + Neon PostgreSQL, and multi-provider AI (OpenAI, Anthropic, Google, Groq, etc.).

## 🚀 Features

- 🔐 Secure email/password auth with Better Auth
- 💬 Intelligent chat with model selection & smart routing
- 🔑 User-managed encrypted API keys per provider
- 📊 Usage logs & dashboard analytics
- 🎨 Responsive UI with Tailwind, shadcn/ui, dark/light themes
- 🌐 Vercel + Neon serverless deploy ready
- 3D-ready (React Three Fiber prepared)

## Prerequisites

- Node.js 18+
- Neon PostgreSQL account (free tier)

## Quick Start (Local)

```bash
git clone <repo>
cd trixenora
npm install
cp .env.example .env.local
# Update DATABASE_URL with Neon connection string
npx prisma db push
npx prisma db seed  # Optional demo users
npm run dev
```

Visit http://localhost:3000

## Production Deploy (Vercel + Neon)

1. Push to GitHub
2. Import to Vercel
3. Add Neon project, copy DATABASE_URL (with ?pgbouncer=true&connect_timeout=10 for pooling)
4. Add env vars from .env.example
5. Vercel auto-deploys with prisma generate on build

## Environment Variables

```
DATABASE_URL          # Neon postgres://... ?sslmode=require&pgbouncer=true
BETTER_AUTH_SECRET    # openssl rand -hex 32
BETTER_AUTH_URL       # https://your-vercel-app.vercel.app
```

AI keys stored per-user.

## Project Structure

```
├── app/              # App Router pages & API
├── components/       # shadcn/ui + custom
├── lib/              # Auth, Prisma, AIClient
├── prisma/           # PostgreSQL schema
├── public/           # Assets
└── TODO.md           # Progress tracker
```

## Best Personal AI Assistant Features

- Multi-model support with smart task routing (coding → Claude, etc.)
- Conversation history
- Usage tracking/costs
- Encrypted key storage
- Extendable for voice, 3D avatar, memory

## License

MIT
