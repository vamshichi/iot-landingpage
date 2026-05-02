"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body   : JSON.stringify({ action: "login", password }),
      });
      if (!res.ok) {
        const j = await res.json();
        setError(j.error ?? "Invalid password.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020810] flex items-center justify-center p-4"
         style={{ backgroundImage: "radial-gradient(ellipse at 50% 0%, #0a2540 0%, #020810 70%)" }}>

      {/* Grid overlay */}
      <div className="fixed inset-0 pointer-events-none"
           style={{ backgroundImage: "linear-gradient(rgba(56,189,248,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,0.03) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Logo area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 mb-4">
            <ShieldCheck size={28} className="text-cyan-400" />
          </div>
          <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase">IoT Security World Summit</p>
          <h1 className="text-2xl font-bold text-white mt-1">Admin Panel</h1>
          <p className="text-slate-500 text-sm mt-1">Abu Dhabi 2026 · Confex Meet</p>
        </div>

        {/* Card */}
        <div className="bg-[#06111f] border border-cyan-500/20 rounded-2xl p-8 shadow-2xl shadow-cyan-900/20">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent -mt-8 mb-8" />

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-cyan-300/80 uppercase tracking-wider mb-2">
                Admin Password
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full bg-[#0a1628]/60 border border-cyan-500/30 rounded-lg pl-9 pr-10 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShow(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors"
                >
                  {show ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={loading ? {} : { scale: 1.02 }}
              whileTap={loading ? {} : { scale: 0.98 }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-[#050d1a] font-bold text-sm tracking-wide hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading
                ? <><Loader2 size={15} className="animate-spin" /> Signing in…</>
                : "Sign In"}
            </motion.button>
          </form>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          © 2026 Confex Meet · Restricted Access
        </p>
      </motion.div>
    </div>
  );
}