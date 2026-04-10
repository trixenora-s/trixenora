"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import ChatInterface from "@/components/ChatInterface";
import ModelSelector from "@/components/ModelSelector";

export default function ChatPage() {
  const [selectedModel, setSelectedModel] = useState<string>("gpt-4");

  return (
    <div className="flex bg-slate-900 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <ChatInterface model={selectedModel} />
              </div>
              <div>
                <ModelSelector
                  selectedModel={selectedModel}
                  onModelChange={setSelectedModel}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
