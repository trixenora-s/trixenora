"use client";

export default function DashboardHeader({ user }: { user?: any }) {
  return (
    <header className="bg-slate-800 border-b border-slate-700 px-8 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm">Welcome back, {user?.name || "User"}</p>
      </div>
      <div className="flex items-center space-x-4">
        <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
          {user?.name?.[0] || "U"}
        </button>
      </div>
    </header>
  );
}
