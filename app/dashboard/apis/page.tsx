"use client";

import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import ApiKeyManager from "@/components/ApiKeyManager";

export default function ApisPage() {
  return (
    <div className="flex bg-slate-900 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">API Keys</h1>
            <ApiKeyManager />
          </div>
        </main>
      </div>
    </div>
  );
}
