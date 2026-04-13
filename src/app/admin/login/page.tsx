"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data?.error || "Login failed");
        return;
      }

      router.push("/admin/donations");
      router.refresh();
    } catch {
      setError("Unable to login right now");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-zinc-900/70 p-6">
        <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
        <p className="text-sm text-zinc-400 mb-6">Enter admin password to access donations dashboard.</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-11 rounded-md bg-black/50 border border-white/15 px-3 text-white"
            placeholder="Admin password"
          />

          {error ? <p className="text-sm text-red-300">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-md bg-white text-black font-semibold disabled:opacity-70"
          >
            {loading ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
