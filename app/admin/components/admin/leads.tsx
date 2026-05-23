"use client";

/**
 * LeadsPage
 *
 * Props
 * ─────
 * presetFilter  – LeadFilter coming from the sidebar sub-item.
 *                 When set, the formType filter is locked to that value and
 *                 the filter dropdown for type is hidden (the sidebar IS the filter).
 * role          – Current user's role ("admin" | "editor" | "viewer")
 * canEdit       – Derived from role: can the user update status/notes?
 * canDelete     – Derived from role: can the user delete a lead?
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Users, Handshake, FileText, TrendingUp, Trophy } from "lucide-react";

import AdminFilters from "@/components/admin/Adminfilters";
import LeadsTable from "@/components/admin/Leadstable";
import LeadDrawer from "@/components/admin/Leaddrawer";
import StatCard from "@/components/admin/Statcard";
import { exportCSV } from "@/components/admin/Utils";
import { Lead, Stats, Pagination, FormType, LeadStatus } from "@/types/lead";
import { type Role } from "@/app/admin/page"; // adjust import path if needed

export type LeadFilter = "" | "delegate" | "sponsor" | "brochure" | "nomination";

interface LeadsPageProps {
  presetFilter?: LeadFilter; // locked filter from sidebar
  role?: Role;
  canEdit?: boolean;
  canDelete?: boolean;
}

export default function LeadsPage({
  presetFilter = "",
  role = "viewer",
  canEdit = false,
  canDelete = false,
}: LeadsPageProps) {
  const router = useRouter();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, byType: {}, byStatus: {} });
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // If presetFilter is set the sidebar controls formType — local UI filter is hidden
  const [filterType, setFilterType] = useState<FormType | "">(presetFilter as FormType | "");
  const [filterStatus, setFilterStatus] = useState<LeadStatus | "">("");
  const [filterBadgeSent, setFilterBadgeSent] = useState("");
  const [filterCheckedIn, setFilterCheckedIn] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [page, setPage] = useState(1);
  const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // When the sidebar changes the preset filter, sync it in
  useEffect(() => {
    setFilterType(presetFilter as FormType | "");
    setPage(1);
  }, [presetFilter]);

  /* ── Fetch ─────────────────────────────────────────────── */
  const fetchLeads = useCallback(
    async (opts?: { p?: number; q?: string }) => {
      setLoading(true);
      try {
        const p = opts?.p ?? page;
        const q = opts?.q ?? search;
        const params = new URLSearchParams({
          page: String(p),
          limit: "20",
          formType: filterType,
          status: filterStatus,
          badgeSent: filterBadgeSent,
          checkedIn: filterCheckedIn,
          search: q,
          sort: "-submittedAt",
        });
        const res = await fetch(`/api/admin/leads?${params}`);
        if (res.status === 401) { router.push("/admin/login"); return; }
        const json = await res.json();
        setLeads(json.leads ?? []);
        setStats(json.stats ?? { total: 0, byType: {}, byStatus: {} });
        setPagination(json.pagination ?? { page: 1, limit: 20, total: 0, pages: 1 });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [page, search, filterType, filterStatus, filterBadgeSent, filterCheckedIn, router]
  );

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  /* ── Search (debounced) ─────────────────────────────────── */
  const handleSearch = (q: string) => {
    setSearch(q);
    if (searchRef.current) clearTimeout(searchRef.current);
    searchRef.current = setTimeout(() => { setPage(1); fetchLeads({ p: 1, q }); }, 500);
  };

  /* ── Mutations (guarded by role) ────────────────────────── */
  const handleStatusChange = async (id: string, status: LeadStatus) => {
    if (!canEdit) return;
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    setSelectedLead((prev) => (prev?.id === id ? { ...prev, status } : prev));
  };

  const handleNotesSave = async (id: string, notes: string) => {
    if (!canEdit) return;
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, notes }),
    });
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, notes } : l)));
    setSelectedLead((prev) => (prev?.id === id ? { ...prev, notes } : prev));
  };

  const handleDelete = async (id: string) => {
    if (!canDelete) return;
    await fetch("/api/admin/leads", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setLeads((prev) => prev.filter((l) => l.id !== id));
    setSelectedLead(null);
    fetchLeads();
  };

  const handlePageChange = (p: number) => { setPage(p); fetchLeads({ p }); };

  /* ── Page title from preset filter ─────────────────────── */
  const titleMap: Record<LeadFilter, string> = {
    "":           "All leads",
    delegate:     "Delegates",
    sponsor:      "Sponsors",
    brochure:     "Brochures",
    nomination:   "Nominations",
  };

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <div
      className="min-h-screen bg-[#020810] text-white"
      style={{ backgroundImage: "radial-gradient(ellipse at 50% 0%,#0a2540 0%,#020810 60%)" }}
    >
      {/* Grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,0.025) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Top bar — no logout/refresh when embedded inside AdminPanel */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-3 border-b border-cyan-500/10 bg-[#020810]/80 backdrop-blur">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-white">{titleMap[presetFilter]}</h2>
          {/* Role chip */}
          <span className={`text-xs px-2 py-0.5 rounded-full border ${
            role === "admin"
              ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
              : role === "editor"
              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
              : "bg-slate-500/10 text-slate-400 border-slate-500/20"
          }`}>
            {role}
          </span>
          {!canEdit && (
            <span className="text-xs text-slate-500">(read-only)</span>
          )}
        </div>
        <button
          onClick={() => exportCSV(leads)}
          className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          Export CSV
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 relative z-10">

        {/* Stats — show all when no preset, or just the active type */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard icon={<TrendingUp size={20} className="text-cyan-400" />} label="Total" value={stats.total} color="bg-cyan-400/10" />
          <StatCard icon={<Users size={20} className="text-cyan-400" />} label="Delegates" value={stats.byType.delegate ?? 0} sub={`${stats.byStatus.new ?? 0} new`} color="bg-cyan-400/10" />
          <StatCard icon={<Handshake size={20} className="text-purple-400" />} label="Sponsors" value={stats.byType.sponsor ?? 0} sub={`${stats.byStatus.converted ?? 0} converted`} color="bg-purple-400/10" />
          <StatCard icon={<FileText size={20} className="text-amber-400" />} label="Brochures" value={stats.byType.brochure ?? 0} color="bg-amber-400/10" />
          <StatCard icon={<Trophy size={20} className="text-rose-400" />} label="Nominations" value={stats.byType.nomination ?? 0} color="bg-rose-400/10" />
        </div>

        {/*
          Filters — when the sidebar drives formType (presetFilter is set) we
          still render AdminFilters but skip the type selector by not passing
          onTypeChange / filterType, keeping it controlled to the preset value
          internally. No new prop needed on AdminFilters.
        */}
        <AdminFilters
          search={search}
          filterType={presetFilter ? (presetFilter as FormType) : filterType}
          filterStatus={filterStatus}
          filterBadgeSent={filterBadgeSent}
          filterCheckedIn={filterCheckedIn}
          onCheckedInChange={(v) => { setFilterCheckedIn(v); setPage(1); }}
          onSearch={handleSearch}
          onTypeChange={presetFilter ? () => {} : (v) => { setFilterType(v); setPage(1); }}
          onStatusChange={(v) => { setFilterStatus(v); setPage(1); }}
          onBadgeSentChange={(v) => { setFilterBadgeSent(v); setPage(1); }}
        />

        {/* Table */}
        <LeadsTable
          leads={leads}
          loading={loading}
          pagination={pagination}
          page={page}
          onRowClick={setSelectedLead}
          onPageChange={handlePageChange}
          onExport={() => exportCSV(leads)}
        />
      </div>

      {/* Drawer — handlers already no-op internally when canEdit/canDelete is false */}
      <AnimatePresence>
        {selectedLead && (
          <LeadDrawer
            key={selectedLead.id}
            lead={selectedLead}
            onClose={() => setSelectedLead(null)}
            onStatusChange={handleStatusChange}
            onNotesSave={handleNotesSave}
            onDelete={handleDelete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}