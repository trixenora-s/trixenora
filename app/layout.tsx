import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Advanced AI Platform - Build Intelligent Apps with 10+ Models',
  description: 'Production-ready AI platform with OpenAI, Claude, Gemini, auto-failover, smart commands, and enterprise security.',
  keywords: 'AI platform, LLM orchestration, API keys, chat AI, code generation',
  openGraph: {
    title: 'Advanced AI Platform',
    description: 'Build intelligent applications with 10+ AI providers.',
    url: 'https://yourdomain.com',
    siteName: 'AI Platform',
    images: [
      {
        url: 'https://yourdomain.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Advanced AI Platform',
    description: '10+ AI models. Smart commands. Enterprise ready.',
    images: ['https://yourdomain.com/og-twitter.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
