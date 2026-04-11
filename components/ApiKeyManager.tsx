'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X, Plus, Trash2 } from 'lucide-react'

const PROVIDERS = [
  { id: 'openai', name: 'OpenAI', placeholder: 'sk-...' },
  { id: 'google', name: 'Google Gemini', placeholder: 'AIza...' },
  { id: 'anthropic', name: 'Claude', placeholder: 'sk-ant...' },
  { id: 'groq', name: 'Groq', placeholder: 'gsk...' },
  { id: 'cohere', name: 'Cohere', placeholder: '...' },
  { id: 'huggingface', name: 'Hugging Face', placeholder: 'hf...' },
  { id: 'replicate', name: 'Replicate', placeholder: '...' },
  { id: 'stability', name: 'Stability AI', placeholder: 'sk...' },
  { id: 'deepseek', name: 'DeepSeek', placeholder: 'sk...' },
  { id: 'together', name: 'Together AI', placeholder: '...' },
]

export function ApiKeyManager() {
  const [apiKeys, setApiKeys] = useState<any[]>([])
  const [newKey, setNewKey] = useState('')
  const [selectedProvider, setSelectedProvider] = useState('openai')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchApiKeys()
  }, [])

  const fetchApiKeys = async () => {
    const res = await fetch('/api/api-keys')
    const data = await res.json()
    setApiKeys(data)
  }

  const saveApiKey = async () => {
    await fetch('/api/api-keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: selectedProvider,
        apiKey: newKey,
      }),
    })
    setNewKey('')
    fetchApiKeys()
  }

  const toggleApiKey = async (provider: string, enabled: boolean) => {
    await fetch('/api/api-keys', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider, enabled }),
    })
    fetchApiKeys()
  }

  const deleteApiKey = async (provider: string) => {
    await fetch('/api/api-keys', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider }),
    })
    fetchApiKeys()
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border-gray-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New API Key
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select 
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="p-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
            >
              {PROVIDERS.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <Input
              placeholder={PROVIDERS.find(p => p.id === selectedProvider)?.placeholder}
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              className="col-span-2"
            />
          </div>
          <Button onClick={saveApiKey} className="w-full" disabled={!newKey}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Save API Key
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {apiKeys.map((key) => (
            <motion.div
              key={key.provider}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50 h-full hover:shadow-2xl transition-all group">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg">{key.provider.toUpperCase()}</h3>
                    <div className={`p-2 rounded-full ${
                      key.enabled 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {key.enabled ? <CheckCircle className="h-5 w-5" /> : <X className="h-5 w-5" />}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-white">
                      Usage: {key.usageCount}
                      <span className="text-xs">requests</span>
                    </div>
                    {key.lastUsed && (
                      <div className="text-xs text-gray-500">
                        Last used: {new Date(key.lastUsed).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 pt-4 border-t border-gray-700/50">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleApiKey(key.provider, !key.enabled)}
                      className="flex-1"
                    >
                      {key.enabled ? 'Disable' : 'Enable'}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteApiKey(key.provider)}
                      className="flex-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}