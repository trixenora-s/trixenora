# AI Platform

A modern AI platform built with Next.js, Better Auth, and Prisma.

## Features

- 🔐 Secure authentication with Better Auth
- 💬 AI chat interface with multiple models
- 🔑 API key management
- 📊 Dashboard with statistics
- 🚀 Serverless deployment ready

## Getting Started

### Prerequisites

- Node.js 18+
- MySQL database
- Environment variables configured

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Update .env.local with your configuration
# DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, BETTER_AUTH_URL, BETTER_AUTH_API_KEY

# Run database migrations (if using Prisma)
npx prisma migrate dev

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
ai-platform/
├── app/                 # Next.js app directory
│   ├── (auth)/         # Auth routes (login, register)
│   ├── dashboard/      # Protected dashboard routes
│   └── api/            # API routes
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   └── ...            # Feature components
├── lib/               # Utility functions and libraries
├── prisma/            # Database schema
├── types/             # TypeScript types
└── middleware.ts      # Next.js middleware
```

## Environment Variables

Required environment variables:

- `DB_HOST` - Database host
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name
- `BETTER_AUTH_URL` - Authentication base URL
- `BETTER_AUTH_API_KEY` - Authentication secret key

## Deployment

Deploy to Vercel:

```bash
git push origin main
```

Make sure to set environment variables in Vercel project settings.

## License

MIT
