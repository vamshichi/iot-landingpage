"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import {
    Users, Handshake, FileText, TrendingUp,
} from "lucide-react";
import { Trophy } from "lucide-react";

import AdminNav from "@/components/admin/Adminnav";
import AdminFilters from "@/components/admin/Adminfilters";
import LeadsTable from "@/components/admin/Leadstable";
import LeadDrawer from "@/components/admin/Leaddrawer";
import StatCard from "@/components/admin/Statcard";
import { exportCSV } from "@/components/admin/Utils";
import { Lead, Stats, Pagination, FormType, LeadStatus } from "@/types/lead";

export default function AdminPage() {
    const router = useRouter();

    const [leads, setLeads] = useState<Lead[]>([]);
    const [stats, setStats] = useState<Stats>({ total: 0, byType: {}, byStatus: {} });
    const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, pages: 1 });
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState<FormType | "">("");
    const [filterStatus, setFilterStatus] = useState<LeadStatus | "">("");
    const [filterBadgeSent, setFilterBadgeSent] = useState("");
    const [filterCheckedIn, setFilterCheckedIn] = useState("");
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [page, setPage] = useState(1);
    const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    /* ── Mutations ──────────────────────────────────────────── */
    const handleStatusChange = async (id: string, status: LeadStatus) => {
        await fetch("/api/admin/leads", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status }),
        });
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
        setSelectedLead((prev) => (prev?.id === id ? { ...prev, status } : prev));
    };

    const handleNotesSave = async (id: string, notes: string) => {
        await fetch("/api/admin/leads", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, notes }),
        });
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, notes } : l)));
        setSelectedLead((prev) => (prev?.id === id ? { ...prev, notes } : prev));
    };

    const handleDelete = async (id: string) => {
        await fetch("/api/admin/leads", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        setLeads((prev) => prev.filter((l) => l.id !== id));
        setSelectedLead(null);
        fetchLeads();
    };

    const handleLogout = async () => {
        await fetch("/api/admin/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "logout" }),
        });
        router.push("/admin/login");
    };

    const handlePageChange = (p: number) => { setPage(p); fetchLeads({ p }); };

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

            <AdminNav
                onRefresh={() => fetchLeads()}
                onExport={() => exportCSV(leads)}
                onLogout={handleLogout}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 relative z-10">
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    <StatCard icon={<TrendingUp size={20} className="text-cyan-400" />} label="Total Leads" value={stats.total} color="bg-cyan-400/10" />
                    <StatCard icon={<Users size={20} className="text-cyan-400" />} label="Delegates" value={stats.byType.delegate ?? 0} sub={`${stats.byStatus.new ?? 0} new`} color="bg-cyan-400/10" />
                    <StatCard icon={<Handshake size={20} className="text-purple-400" />} label="Sponsors" value={stats.byType.sponsor ?? 0} sub={`${stats.byStatus.converted ?? 0} converted`} color="bg-purple-400/10" />
                    <StatCard icon={<FileText size={20} className="text-amber-400" />} label="Brochures" value={stats.byType.brochure ?? 0} color="bg-amber-400/10" />
                    <StatCard icon={<Trophy size={20} className="text-rose-400" />} label="Nominations" value={stats.byType.nomination ?? 0} color="bg-rose-400/10" />
                </div>

                {/* Filters */}
                <AdminFilters
                    search={search}
                    filterType={filterType}
                    filterStatus={filterStatus}
                    filterBadgeSent={filterBadgeSent}
                    filterCheckedIn={filterCheckedIn}
                    onCheckedInChange={(v) => {
                        setFilterCheckedIn(v);
                        setPage(1);
                    }}
                    onSearch={handleSearch}
                    onTypeChange={(v) => { setFilterType(v); setPage(1); }}
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

            {/* Drawer */}
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