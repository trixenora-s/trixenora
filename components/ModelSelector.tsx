"use client";

import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

const models = [
  { id: "gpt-4", name: "GPT-4", description: "Most capable model" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", description: "Fast and reliable" },
  { id: "claude-3-opus", name: "Claude 3 Opus", description: "Powerful reasoning" },
  { id: "llama-2-70b", name: "Llama 2 70B", description: "Open-source option" },
];

export default function ModelSelector({
  selectedModel,
  onModelChange,
}: {
  selectedModel: string;
  onModelChange: (model: string) => void;
}) {
  return (
    <Card>
      <h2 className="text-lg font-semibold text-white mb-4">AI Models</h2>
      <Select value={selectedModel} onChange={(e) => onModelChange(e.target.value)}>
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </Select>
      <div className="mt-4 pt-4 border-t border-slate-700">
        <p className="text-sm text-slate-400">
          {models.find((m) => m.id === selectedModel)?.description}
        </p>
      </div>
    </Card>
  );
}
