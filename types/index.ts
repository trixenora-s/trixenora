export interface ApiKey {
  id: string
  userId: string
  provider: string
  apiKey: string
  enabled: boolean
  usageCount: number
  lastUsed?: string | null
  createdAt: string
  updatedAt: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  model?: string
}

export interface UsageStats {
  provider: string
  requests: number
  tokens: number
  cost: number
}