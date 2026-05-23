"use client";

import { RefreshCw, Download, LogOut, ShieldCheck } from "lucide-react";

interface AdminNavProps {
  onRefresh: () => void;
  onExport: () => void;
  onLogout: () => void;
}

export default function AdminNav({
  onRefresh,
  onExport,
  onLogout,
}: AdminNavProps) {
  return (
    <nav className="sticky top-0 z-30 border-b border-cyan-500/10 bg-[#020810]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck size={20} className="text-cyan-400" />
          <div>
            <span className="font-bold text-white text-sm">Admin Panel</span>
            <span className="hidden sm:inline text-slate-600 text-sm">
              {" "}
              · IoT Security World Summit 2026
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            className="p-2 rounded-lg text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
          >
            <RefreshCw size={15} />
          </button>

          <button
            onClick={onExport}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 border border-slate-700 hover:border-cyan-500/40 hover:text-cyan-400 transition-all"
          >
            <Download size={13} /> Export CSV
          </button>

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 border border-slate-700 hover:border-red-500/40 hover:text-red-400 transition-all"
          >
            <LogOut size={13} /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
}