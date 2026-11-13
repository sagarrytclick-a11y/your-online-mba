"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, Loader2, Lock, ShieldCheck, User } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("expired") === "1") {
        setExpired(true);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username.trim(),
          password: form.password,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-10 overflow-hidden bg-[#10131A]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(200,30,61,0.08),_transparent_55%)]" />
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#C81E3D]/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-slate-300/30 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="bg-[#14161d] rounded-3xl shadow-xl shadow-black/50/60 border border-white/10 overflow-hidden">
          <div className="bg-gradient-to-r from-[#C81E3D] to-[#9F1239] px-8 py-7 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">
                  Secure Access
                </p>
                <h1 className="text-xl font-black leading-tight">Admin Login</h1>
              </div>
            </div>
            <p className="text-sm text-white/80 font-medium">
              Sign in to manage leads &amp; counselling enquiries securely.
            </p>
          </div>

          <div className="px-8 py-8">
            <div className="flex justify-center mb-6">
              <span className="rounded-2xl bg-white p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                <Image
                  src="/logo.png"
                  alt="Your Online MBA"
                  width={160}
                  height={48}
                  className="h-14 w-auto"
                  priority
                />
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="admin-username" className="block text-xs font-bold text-[#8b96a8] uppercase tracking-wider mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7c8798]" />
                  <input
                    id="admin-username"
                    name="username"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    type="text"
                    autoComplete="username"
                    required
                    placeholder="Enter username"
                    className="w-full h-12 pl-10 pr-4 border border-white/10 rounded-xl text-sm text-[#F1F5F9] outline-none focus:border-[#C81E3D] focus:ring-2 focus:ring-[#C81E3D]/15 transition-all font-medium bg-[#10131A]/60"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="admin-password" className="block text-xs font-bold text-[#8b96a8] uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7c8798]" />
                  <input
                    id="admin-password"
                    name="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="Enter password"
                    className="w-full h-12 pl-10 pr-12 border border-white/10 rounded-xl text-sm text-[#F1F5F9] outline-none focus:border-[#C81E3D] focus:ring-2 focus:ring-[#C81E3D]/15 transition-all font-medium bg-[#10131A]/60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-[#7c8798] hover:text-[#C81E3D] hover:bg-[#2b141a] transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {expired && (
                <div className="mb-4 flex items-center gap-2 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-xs font-semibold text-amber-300">
                  <span>⏱</span> Session expired. Please sign in again.
                </div>
              )}
              {error && (
                <p className="text-[#C81E3D] text-xs font-semibold text-center bg-[#2b141a] border border-[#3a1b22] rounded-xl px-3 py-2.5">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !form.username.trim() || !form.password}
                className="w-full h-12 bg-[#C81E3D] hover:bg-[#B01A33] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60 shadow-md shadow-red-700/10"
              >
                {loading && <Loader2 size={18} className="animate-spin" />}
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="mt-6 text-center text-[11px] text-[#7c8798] font-medium leading-relaxed">
              Protected with JWT session · httpOnly cookie · rate-limited login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
