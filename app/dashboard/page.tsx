"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/session");
        if (!response.ok) {
          router.push("/login");
          return;
        }
        const sessionData = await response.json();
        setUser(sessionData.user);
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex bg-slate-900 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <DashboardHeader user={user} />
        <main className="p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">
              Welcome to Your Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h2 className="text-xl font-semibold text-white mb-2">
                  Chat with AI
                </h2>
                <p className="text-slate-400 mb-4">
                  Start a conversation with our AI models
                </p>
                <a
                  href="/dashboard/chat"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Go to Chat →
                </a>
              </div>

              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h2 className="text-xl font-semibold text-white mb-2">
                  API Keys
                </h2>
                <p className="text-slate-400 mb-4">
                  Manage and generate your API keys
                </p>
                <a
                  href="/dashboard/apis"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Manage APIs →
                </a>
              </div>

              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h2 className="text-xl font-semibold text-white mb-2">
                  Documentation
                </h2>
                <p className="text-slate-400 mb-4">
                  Learn how to use the platform
                </p>
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-300"
                >
                  View Docs →
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
