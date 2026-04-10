'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const MODELS = [
  { value: 'gpt-4o-mini', label: 'GPT-4o Mini (Fast)' },
  { value: 'gpt-4o', label: 'GPT-4o' },
  { value: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' },
  { value: 'gemini-pro', label: 'Gemini Pro' },
  { value: 'llama3-70b', label: 'Llama 3 70B' },
]

interface ModelSelectorProps {
  model: string
  onModelChange: (model: string) => void
}

export function ModelSelector({ model, onModelChange }: ModelSelectorProps) {
  return (
    <div className="w-64">
      <Select value={model} onValueChange={onModelChange}>
        <SelectTrigger className="w-full bg-gray-900/50 border-gray-700/50">
          <SelectValue placeholder="Select model" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 border-gray-700/50">
          {MODELS.map((m) => (
            <SelectItem key={m.value} value={m.value} className="focus:bg-gray-800">
              {m.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}