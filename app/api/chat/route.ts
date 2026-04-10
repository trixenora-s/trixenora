import { NextRequest, NextResponse } from 'next/server'
import { AIClient } from '@/lib/ai-client'
import { getServerSession } from 'better-auth/next'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { message, model, provider } = await req.json()

    const response = await AIClient.callAI(
      session.user.id,
      provider as any,
      model,
      message
    )

    return NextResponse.json({ response })
  } catch (error) {
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 })
  }
}