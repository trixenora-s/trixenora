"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
}

export default function ApiKeyManager() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateKey = async () => {
    if (!keyName.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: keyName }),
      });

      if (!response.ok) throw new Error("Failed to create key");

      const newKey = await response.json();
      setApiKeys((prev) => [...prev, newKey]);
      setKeyName("");
      setShowForm(false);
    } catch (error) {
      console.error("Error creating key:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteKey = async (id: string) => {
    try {
      const response = await fetch(`/api/keys/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete key");
      setApiKeys((prev) => prev.filter((key) => key.id !== id));
    } catch (error) {
      console.error("Error deleting key:", error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-white">Your API Keys</h2>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "Create New Key"}
          </Button>
        </div>

        {showForm && (
          <div className="bg-slate-700 p-4 rounded-lg mb-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Key Name
              </label>
              <Input
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                placeholder="My first API key"
              />
            </div>
            <Button
              onClick={handleCreateKey}
              disabled={loading || !keyName.trim()}
              className="w-full"
            >
              {loading ? "Creating..." : "Create Key"}
            </Button>
          </div>
        )}

        {apiKeys.length === 0 ? (
          <p className="text-slate-400">No API keys yet. Create one to get started.</p>
        ) : (
          <div className="space-y-3">
            {apiKeys.map((key) => (
              <div
                key={key.id}
                className="flex items-center justify-between p-4 bg-slate-700 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium text-white">{key.name}</p>
                  <p className="text-sm text-slate-400 font-mono">
                    {key.key.slice(0, 10)}...
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Created {new Date(key.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  onClick={() => handleDeleteKey(key.id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
