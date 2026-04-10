'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { ModelSelector } from './ModelSelector'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Download, Send, Loader2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  model?: string
}

export function ChatInterface({ onNewChat }: { onNewChat: () => void }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState('gpt-4o-mini')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(scrollToBottom, [messages, scrollToBottom])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    }

    setMessages(prev => [...prev, userMessage])
    const tempInput = input
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: tempInput,
          model: selectedModel,
          provider: 'openai',
        }),
      })

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        model: selectedModel,
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const newChat = () => {
    setMessages([])
    onNewChat()
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          AI Assistant
        </h2>
        <Button variant="ghost" onClick={newChat} size="sm">
          New Chat
        </Button>
      </div>

      {/* Model Selector */}
      <div className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-2xl backdrop-blur-sm">
        <ModelSelector 
          model={selectedModel} 
          onModelChange={setSelectedModel}
        />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-4 custom-scrollbar">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-3xl p-6 rounded-3xl shadow-2xl ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white'
                  : 'bg-gray-900/90 border border-gray-700/50 backdrop-blur-sm text-white'
              }`}>
                <ReactMarkdown className="prose prose-invert max-w-none">
                  {message.content}
                </ReactMarkdown>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                  {message.model && (
                    <span className="text-xs opacity-75 px-2 py-1 bg-black/30 rounded-full">
                      {message.model}
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(message.content)}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const blob = new Blob([message.content], { type: 'text/plain' })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = `chat-${message.id}.txt`
                      a.click()
                    }}
                    className="h-8 w-8 p-0"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-900/90 border border-gray-700/50 backdrop-blur-sm p-6 rounded-3xl max-w-3xl">
              <div className="flex items-center gap-3">
                <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                <span className="text-gray-400">AI is thinking...</span>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-3 p-4 bg-gray-900/50 rounded-3xl backdrop-blur-sm">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything... 'build a website', 'write code', 'analyze data'..."
          className="flex-1 min-h-[44px] max-h-32 resize-none focus-visible:ring-2 focus-visible:ring-blue-500"
          disabled={loading}
          rows={1}
        />
        <Button type="submit" disabled={loading || !input.trim()} className="h-12 w-12 p-0">
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </form>
    </div>
  )
}