import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { encrypt } from '@/lib/encryption'

export async function GET() {
  try {
    // TODO: Extract userId from auth header or cookie
    // For now, return empty array
    return NextResponse.json([])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch API keys' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    // TODO: Extract userId from auth header or cookie
    const { provider, apiKey, userId } = await req.json()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Upsert API key
    const result = await prisma.apiKey.upsert({
      where: {
        userId_provider: {
          userId: userId,
          provider,
        },
      },
      update: {
        apiKey: encrypt(apiKey),
        enabled: true,
      },
      create: {
        userId: userId,
        provider,
        apiKey: encrypt(apiKey),
        enabled: true,
      },
    })

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save API key' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    // TODO: Extract userId from auth header or cookie
    const { provider, enabled, userId } = await req.json()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await prisma.apiKey.updateMany({
      where: {
        userId: userId,
        provider,
      },
      data: { enabled },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update API key' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // TODO: Extract userId from auth header or cookie
    const { provider, userId } = await req.json()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.apiKey.deleteMany({
      where: {
        userId: userId,
        provider,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete API key' }, { status: 500 })
  }
}