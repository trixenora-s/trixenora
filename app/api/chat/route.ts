import { NextRequest, NextResponse } from 'next/server'
import { AIClient } from '@/lib/ai-client'

export async function POST(req: NextRequest) {
  try {
    // TODO: Implement proper session validation
    // For now, assume authenticated based on API key or cookie
    const { message, model, provider, userId } = await req.json()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const response = await AIClient.callAI(
      userId,
      provider as any,
      model,
      message
    )

    return NextResponse.json({ response })
  } catch (error) {
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 })
  }
}