import { generateText, generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { google } from '@ai-sdk/google'
import { anthropic } from '@ai-sdk/anthropic'
import { huggingface } from '@ai-sdk/huggingface'
import { PrismaClient, ApiKey } from '@prisma/client'
import { encrypt, decrypt } from './encryption'
import { prisma } from './prisma'

const AI_PROVIDERS = {
  openai: openai,
  google: google,
  anthropic: anthropic,
  huggingface: huggingface,
  groq: openai, // Groq uses OpenAI compatible API
  cohere: openai, // Placeholder
  replicate: openai, // Placeholder
  stability: openai, // Placeholder
  deepseek: openai, // Placeholder
  together: openai, // Placeholder
} as const

type Provider = keyof typeof AI_PROVIDERS

export class AIClient {
  static async getUserApiKey(userId: string, provider: Provider): Promise<string | null> {
    const apiKeyRecord = await prisma.apiKey.findUnique({
      where: { userId_provider: { userId, provider } }
    })
    
    if (!apiKeyRecord?.apiKey || !apiKeyRecord.enabled) return null
    return decrypt(apiKeyRecord.apiKey)
  }

  static async callAI(
    userId: string,
    provider: Provider,
    model: string,
    prompt: string,
    options: any = {}
  ) {
    const apiKey = await this.getUserApiKey(userId, provider)
    if (!apiKey) throw new Error(`No valid ${provider} API key found`)

    const client = AI_PROVIDERS[provider]
    
    try {
      const result = await generateText({
        model: client(model),
        prompt,
        ...options,
        maxTokens: 4000,
      })

      // Log usage
      await prisma.aiUsageLog.create({
        data: {
          userId,
          provider,
          model,
          tokens: (result.usage?.inputTokens || 0) + (result.usage?.outputTokens || 0),
          cost: 0, // TODO: Calculate based on provider rates
          success: true,
        }
      })

      return result.text
    } catch (error) {
      await prisma.aiUsageLog.create({
        data: {
          userId,
          provider,
          model,
          tokens: 0,
          cost: 0,
          success: false,
        }
      })
      throw error
    }
  }

  static async smartTaskRouter(userId: string, command: string): Promise<string> {
    const providers: Provider[] = ['openai', 'anthropic', 'google', 'groq']
    
    // Simple task classification
    if (command.includes('code') || command.includes('build') || command.includes('website')) {
      providers.unshift('anthropic') // Claude excels at coding
    } else if (command.includes('image') || command.includes('generate image')) {
      providers.unshift('stability')
    }

    for (const provider of providers) {
      try {
        return await this.callAI(userId, provider, 'gpt-4o-mini', command)
      } catch (error) {
        console.error(`Provider ${provider} failed:`, error)
        continue
      }
    }

    throw new Error('All AI providers failed')
  }
}