import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'better-auth/next'
import { prisma } from '@/lib/prisma'
import { encrypt } from '@/lib/encryption'

export async function GET() {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKeys = await prisma.apiKey.findMany({
    where: { userId: session.user.id }
  })

  return NextResponse.json(apiKeys)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { provider, apiKey } = await req.json()

  // Upsert API key
  const result = await prisma.apiKey.upsert({
    where: {
      userId_provider: {
        userId: session.user.id,
        provider,
      },
    },
    update: {
      apiKey: encrypt(apiKey),
      enabled: true,
    },
    create: {
      userId: session.user.id,
      provider,
      apiKey: encrypt(apiKey),
      enabled: true,
    },
  })

  return NextResponse.json(result)
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { provider, enabled } = await req.json()

  const result = await prisma.apiKey.updateMany({
    where: {
      userId: session.user.id,
      provider,
    },
    data: { enabled },
  })

  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { provider } = await req.json()

  await prisma.apiKey.deleteMany({
    where: {
      userId: session.user.id,
      provider,
    },
  })

  return NextResponse.json({ success: true })
}