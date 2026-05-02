"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Handshake, FileText, TrendingUp,
  Search, Filter, RefreshCw, LogOut, ChevronLeft,
  ChevronRight, CheckCircle, Phone, Mail, Globe,
  Building2, MapPin, Calendar, StickyNote, X,
  Trash2, Download, ChevronDown, ShieldCheck, Eye,
  AlertTriangle,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */
type FormType   = "delegate" | "sponsor" | "brochure";
type LeadStatus = "new" | "contacted" | "converted" | "rejected";

interface Lead {
  _id            : string;
  formType       : FormType;
  status         : LeadStatus;
  submittedAt    : string;
  notes          : string;
  fullName       : string;
  jobTitle       : string;
  workEmailAddress: string;
  mobileNumber   : string;
  linkedInProfileUrl?: string;
  // delegate
  organizationCompanyName?: string;
  industry?               : string;
  keyAreasOfInterest?     : string[];
  lookingToAchieve?       : string[];
  galaDinner?             : string[];
  // sponsor
  companyName?            : string;
  websiteUrl?             : string;
  sponsorIndustry?        : string;
  headquartersLocation?   : string;
  companySize?            : string;
  keyObjectives?          : string[];
  targetAudience?         : string[];
  sponsorshipCategory?    : string[];
  addOns?                 : string[];
  activationPlans?        : string[];
  customRequests?         : string;
  scheduledMeetings?      : string[];
  vipDinner?              : string[];
  // brochure
  companyOrganizationName?: string;
  brochureIndustry?       : string;
  brochureCompanySize?    : string;
  countryRegion?          : string;
  interestedIn?           : string[];
}

interface Stats {
  total    : number;
  byType   : Record<string, number>;
  byStatus : Record<string, number>;
}

interface Pagination {
  page : number;
  limit: number;
  total: number;
  pages: number;
}

/* ─────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────── */
const STATUS_META: Record<LeadStatus, { label: string; color: string; dot: string }> = {
  new       : { label: "New",       color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",   dot: "bg-cyan-400"  },
  contacted : { label: "Contacted", color: "text-blue-400 bg-blue-400/10 border-blue-400/30",   dot: "bg-blue-400"  },
  converted : { label: "Converted", color: "text-green-400 bg-green-400/10 border-green-400/30", dot: "bg-green-400" },
  rejected  : { label: "Rejected",  color: "text-red-400 bg-red-400/10 border-red-400/30",      dot: "bg-red-400"   },
};

const TYPE_META: Record<FormType, { label: string; icon: React.ReactNode; color: string }> = {
  delegate: { label: "Delegate", icon: <Users size={13} />,    color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30"   },
  sponsor : { label: "Sponsor",  icon: <Handshake size={13} />, color: "text-purple-400 bg-purple-400/10 border-purple-400/30" },
  brochure: { label: "Brochure", icon: <FileText size={13} />, color: "text-amber-400 bg-amber-400/10 border-amber-400/30"  },
};

/* ─────────────────────────────────────────────────────────────
   SMALL COMPONENTS
───────────────────────────────────────────────────────────── */
function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${className}`}>
      {children}
    </span>
  );
}

function StatCard({
  icon, label, value, sub, color,
}: { icon: React.ReactNode; label: string; value: number; sub?: string; color: string }) {
  return (
    <div className="bg-[#06111f] border border-cyan-500/10 rounded-xl p-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>{icon}</div>
      <div>
        <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
        {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   LEAD DETAIL DRAWER
───────────────────────────────────────────────────────────── */
function LeadDrawer({
  lead,
  onClose,
  onStatusChange,
  onNotesSave,
  onDelete,
}: {
  lead: Lead;
  onClose: () => void;
  onStatusChange: (id: string, status: LeadStatus) => Promise<void>;
  onNotesSave   : (id: string, notes: string)       => Promise<void>;
  onDelete      : (id: string)                       => Promise<void>;
}) {
  const [notes, setNotes] = useState(lead.notes);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const tm = TYPE_META[lead.formType];
  const sm = STATUS_META[lead.status];

  const company =
    lead.organizationCompanyName ??
    lead.companyName ??
    lead.companyOrganizationName ?? "—";

  const industry =
    lead.industry ?? lead.sponsorIndustry ?? lead.brochureIndustry ?? "—";

  const rows: [string, React.ReactNode][] = [
    ["Email",    <a key="e" href={`mailto:${lead.workEmailAddress}`} className="text-cyan-400 hover:underline">{lead.workEmailAddress}</a>],
    ["Phone",    lead.mobileNumber],
    ["Company",  company],
    ["Industry", industry],
  ];

  if (lead.linkedInProfileUrl)
    rows.push(["LinkedIn", <a key="li" href={lead.linkedInProfileUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline truncate max-w-[200px] inline-block">{lead.linkedInProfileUrl}</a>]);
  if (lead.headquartersLocation) rows.push(["Location",   lead.headquartersLocation]);
  if (lead.websiteUrl)           rows.push(["Website",    <a key="ws" href={lead.websiteUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">{lead.websiteUrl}</a>]);
  if (lead.countryRegion)        rows.push(["Country",    lead.countryRegion]);
  if (lead.companySize ?? lead.brochureCompanySize) rows.push(["Company Size", lead.companySize ?? lead.brochureCompanySize ?? "—"]);

  const chips: [string, string[] | undefined][] = [
    ["Key Areas",         lead.keyAreasOfInterest],
    ["Objectives",        lead.lookingToAchieve],
    ["Gala Dinner",       lead.galaDinner],
    ["Sponsorship Goals", lead.keyObjectives],
    ["Target Audience",   lead.targetAudience],
    ["Sponsorship Tier",  lead.sponsorshipCategory],
    ["Add-ons",           lead.addOns],
    ["Activation Plans",  lead.activationPlans],
    ["Interested In",     lead.interestedIn],
    ["Scheduled Meetings",lead.scheduledMeetings],
    ["VIP Dinner",        lead.vipDinner],
  ].filter(([, v]) => v && v.length > 0) as [string, string[]][];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.aside
        className="relative z-10 w-full max-w-lg h-full bg-[#06111f] border-l border-cyan-500/20 flex flex-col overflow-hidden"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
      >
        {/* Header */}
        <div className="shrink-0 px-6 pt-6 pb-4 border-b border-cyan-500/15">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge className={tm.color}>{tm.icon} {tm.label}</Badge>
                <Badge className={sm.color}>
                  <span className={`w-1.5 h-1.5 rounded-full ${sm.dot}`} />
                  {sm.label}
                </Badge>
              </div>
              <h2 className="text-lg font-bold text-white">{lead.fullName}</h2>
              <p className="text-sm text-slate-400">{lead.jobTitle} · {company}</p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all">
              <X size={18} />
            </button>
          </div>
          <p className="text-xs text-slate-600 mt-2 flex items-center gap-1.5">
            <Calendar size={11} />
            {new Date(lead.submittedAt).toLocaleString("en-AE", { timeZone: "Asia/Dubai", dateStyle: "medium", timeStyle: "short" })} GST
          </p>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

          {/* Status change */}
          <div>
            <p className="text-xs font-semibold text-cyan-300/70 uppercase tracking-wider mb-2">Update Status</p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(STATUS_META) as LeadStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={() => onStatusChange(lead._id, s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    lead.status === s
                      ? STATUS_META[s].color + " ring-1 ring-inset ring-current"
                      : "text-slate-500 border-slate-700 hover:border-slate-500 bg-white/5"
                  }`}
                >
                  {STATUS_META[s].label}
                </button>
              ))}
            </div>
          </div>

          {/* Details table */}
          <div>
            <p className="text-xs font-semibold text-cyan-300/70 uppercase tracking-wider mb-2">Details</p>
            <table className="w-full text-sm">
              <tbody>
                {rows.map(([label, value]) => (
                  <tr key={label} className="border-b border-white/5 last:border-0">
                    <td className="py-2 pr-4 text-slate-500 font-medium whitespace-nowrap w-28">{label}</td>
                    <td className="py-2 text-slate-200 break-words">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Chip groups */}
          {chips.length > 0 && (
            <div className="space-y-4">
              {chips.map(([label, items]) => (
  <div key={label}>
    <p className="text-xs font-semibold text-cyan-300/70 uppercase tracking-wider mb-1.5">
      {label}
    </p>

    <div className="flex flex-wrap gap-1.5">
      {(items ?? []).map((item) => (
        <span
          key={item}
          className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
))}
            </div>
          )}

          {/* Custom requests */}
          {lead.customRequests && (
            <div>
              <p className="text-xs font-semibold text-cyan-300/70 uppercase tracking-wider mb-1.5">Custom Requests</p>
              <p className="text-sm text-slate-300 bg-white/5 rounded-lg p-3 border border-white/10">{lead.customRequests}</p>
            </div>
          )}

          {/* Internal notes */}
          <div>
            <p className="text-xs font-semibold text-cyan-300/70 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <StickyNote size={11} /> Internal Notes
            </p>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Add notes visible only to the admin team…"
              rows={4}
              className="w-full bg-[#0a1628]/60 border border-cyan-500/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 resize-none transition-all"
            />
            <button
              onClick={async () => { setSaving(true); await onNotesSave(lead._id, notes); setSaving(false); }}
              disabled={saving || notes === lead.notes}
              className="mt-2 px-4 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs font-semibold border border-cyan-500/30 hover:bg-cyan-500/30 disabled:opacity-40 transition-all"
            >
              {saving ? "Saving…" : "Save Notes"}
            </button>
          </div>
        </div>

        {/* Footer actions */}
        <div className="shrink-0 px-6 py-4 border-t border-white/5 flex justify-between items-center">
          <a
            href={`mailto:${lead.workEmailAddress}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm font-semibold border border-cyan-500/20 hover:bg-cyan-500/20 transition-all"
          >
            <Mail size={14} /> Reply
          </a>

          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-400 text-sm font-semibold border border-red-500/20 hover:bg-red-500/10 transition-all"
            >
              <Trash2 size={14} /> Delete
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-red-400">Sure?</span>
              <button
                onClick={async () => { setDeleting(true); await onDelete(lead._id); }}
                disabled={deleting}
                className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/30 hover:bg-red-500/30 disabled:opacity-50 transition-all"
              >
                {deleting ? "Deleting…" : "Yes, Delete"}
              </button>
              <button onClick={() => setConfirmDelete(false)} className="px-3 py-1.5 rounded-lg text-slate-400 text-xs border border-slate-600 hover:bg-white/5 transition-all">
                Cancel
              </button>
            </div>
          )}
        </div>
      </motion.aside>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CSV EXPORT
───────────────────────────────────────────────────────────── */
function exportCSV(leads: Lead[]) {
  const cols = [
    "formType","status","submittedAt","fullName","jobTitle","workEmailAddress","mobileNumber",
    "organizationCompanyName","companyName","companyOrganizationName","industry","sponsorIndustry",
    "brochureIndustry","headquartersLocation","countryRegion","companySize","brochureCompanySize",
    "websiteUrl","linkedInProfileUrl","keyAreasOfInterest","lookingToAchieve","keyObjectives",
    "targetAudience","sponsorshipCategory","addOns","interestedIn","customRequests","notes",
  ];
  const header = cols.join(",");
  const rows = leads.map(l =>
    cols.map(c => {
      const val = l[c as keyof Lead];
      if (Array.isArray(val)) return `"${val.join("; ")}"`;
      if (typeof val === "string" && val.includes(",")) return `"${val}"`;
      return val ?? "";
    }).join(",")
  );
  const csv  = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `leads_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/* ─────────────────────────────────────────────────────────────
   MAIN ADMIN PAGE
───────────────────────────────────────────────────────────── */
export default function AdminPage() {
  const router = useRouter();

  const [leads, setLeads]         = useState<Lead[]>([]);
  const [stats, setStats]         = useState<Stats>({ total: 0, byType: {}, byStatus: {} });
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, pages: 1 });
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [filterType, setFilterType] = useState<FormType | "">("");
  const [filterStatus, setFilterStatus] = useState<LeadStatus | "">("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [page, setPage]           = useState(1);
const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Fetch leads ───────────────────────────────────────── */
  const fetchLeads = useCallback(async (opts?: { p?: number; q?: string }) => {
    setLoading(true);
    try {
      const p  = opts?.p ?? page;
      const q  = opts?.q ?? search;
      const params = new URLSearchParams({
        page    : String(p),
        limit   : "20",
        formType: filterType,
        status  : filterStatus,
        search  : q,
        sort    : "-submittedAt",
      });
      const res  = await fetch(`/api/admin/leads?${params}`);
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
  }, [page, search, filterType, filterStatus, router]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  /* ── Debounced search ──────────────────────────────────── */
  const handleSearch = (q: string) => {
    setSearch(q);
    if (searchRef.current) {
  clearTimeout(searchRef.current);
}
    searchRef.current = setTimeout(() => { setPage(1); fetchLeads({ p: 1, q }); }, 500);
  };

  /* ── Actions ───────────────────────────────────────────── */
  const handleStatusChange = async (id: string, status: LeadStatus) => {
    await fetch("/api/admin/leads", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    setLeads(prev => prev.map(l => l._id === id ? { ...l, status } : l));
    if (selectedLead?._id === id) setSelectedLead(prev => prev ? { ...prev, status } : null);
  };

  const handleNotesSave = async (id: string, notes: string) => {
    await fetch("/api/admin/leads", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, notes }) });
    setLeads(prev => prev.map(l => l._id === id ? { ...l, notes } : l));
    if (selectedLead?._id === id) setSelectedLead(prev => prev ? { ...prev, notes } : null);
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/admin/leads", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setLeads(prev => prev.filter(l => l._id !== id));
    setSelectedLead(null);
    fetchLeads();
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "logout" }) });
    router.push("/admin/login");
  };

  /* ─────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#020810] text-white" style={{ backgroundImage: "radial-gradient(ellipse at 50% 0%,#0a2540 0%,#020810 60%)" }}>

      {/* Grid overlay */}
      <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(56,189,248,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,0.025) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-30 border-b border-cyan-500/10 bg-[#020810]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="text-cyan-400" />
            <div>
              <span className="font-bold text-white text-sm">Admin Panel</span>
              <span className="hidden sm:inline text-slate-600 text-sm"> · IoT Security World Summit 2026</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => fetchLeads()} className="p-2 rounded-lg text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all">
              <RefreshCw size={15} />
            </button>
            <button
              onClick={() => exportCSV(leads)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 border border-slate-700 hover:border-cyan-500/40 hover:text-cyan-400 transition-all"
            >
              <Download size={13} /> Export CSV
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 border border-slate-700 hover:border-red-500/40 hover:text-red-400 transition-all"
            >
              <LogOut size={13} /> Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 relative z-10">

        {/* ── STATS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<TrendingUp size={20} className="text-cyan-400" />} label="Total Leads" value={stats.total} color="bg-cyan-400/10" />
          <StatCard icon={<Users size={20} className="text-cyan-400" />}      label="Delegates"   value={stats.byType.delegate ?? 0} sub={`${stats.byStatus.new ?? 0} new`} color="bg-cyan-400/10" />
          <StatCard icon={<Handshake size={20} className="text-purple-400" />} label="Sponsors"   value={stats.byType.sponsor ?? 0}  sub={`${stats.byStatus.converted ?? 0} converted`} color="bg-purple-400/10" />
          <StatCard icon={<FileText size={20} className="text-amber-400" />}  label="Brochures"   value={stats.byType.brochure ?? 0} color="bg-amber-400/10" />
        </div>

        {/* ── FILTERS ── */}
        <div className="bg-[#06111f] border border-cyan-500/10 rounded-xl p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={e => handleSearch(e.target.value)}
                placeholder="Search by name, email, company…"
                className="w-full bg-[#0a1628]/60 border border-cyan-500/20 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-all"
              />
            </div>

            {/* Type filter */}
            <div className="relative">
              <select
                value={filterType}
                onChange={e => { setFilterType(e.target.value as FormType | ""); setPage(1); }}
                className="appearance-none bg-[#0a1628]/60 border border-cyan-500/20 rounded-lg pl-3 pr-8 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 transition-all"
              >
                <option value="">All Types</option>
                <option value="delegate">Delegate</option>
                <option value="sponsor">Sponsor</option>
                <option value="brochure">Brochure</option>
              </select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>

            {/* Status filter */}
            <div className="relative">
              <select
                value={filterStatus}
                onChange={e => { setFilterStatus(e.target.value as LeadStatus | ""); setPage(1); }}
                className="appearance-none bg-[#0a1628]/60 border border-cyan-500/20 rounded-lg pl-3 pr-8 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 transition-all"
              >
                <option value="">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
                <option value="rejected">Rejected</option>
              </select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ── TABLE ── */}
        <div className="bg-[#06111f] border border-cyan-500/10 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-cyan-500/10 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              {loading ? "Loading…" : `${pagination.total} lead${pagination.total !== 1 ? "s" : ""} found`}
            </p>
            <button onClick={() => exportCSV(leads)} className="sm:hidden flex items-center gap-1 text-xs text-slate-500 hover:text-cyan-400 transition-colors">
              <Download size={12} /> Export
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-xs text-slate-500 uppercase tracking-wider">
                  <th className="text-left px-4 py-3 font-semibold">Name</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Contact</th>
                  <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Company</th>
                  <th className="text-left px-4 py-3 font-semibold">Type</th>
                  <th className="text-left px-4 py-3 font-semibold">Status</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Date</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-white/5 animate-pulse">
                      {Array.from({ length: 7 }).map((__, j) => (
                        <td key={j} className="px-4 py-3"><div className="h-4 bg-white/5 rounded" /></td>
                      ))}
                    </tr>
                  ))
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center">
                      <div className="flex flex-col items-center gap-3 text-slate-600">
                        <AlertTriangle size={32} />
                        <p className="text-sm">No leads found. Try adjusting your filters.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  leads.map(lead => {
                    const tm = TYPE_META[lead.formType];
                    const sm = STATUS_META[lead.status];
                    const company = lead.organizationCompanyName ?? lead.companyName ?? lead.companyOrganizationName ?? "—";
                    return (
                      <motion.tr
                        key={lead._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-b border-white/5 hover:bg-white/3 cursor-pointer transition-colors group"
                        onClick={() => setSelectedLead(lead)}
                      >
                        <td className="px-4 py-3">
                          <p className="font-semibold text-white group-hover:text-cyan-300 transition-colors">{lead.fullName}</p>
                          <p className="text-xs text-slate-500">{lead.jobTitle}</p>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <p className="text-slate-300 text-xs">{lead.workEmailAddress}</p>
                          <p className="text-slate-500 text-xs">{lead.mobileNumber}</p>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell text-slate-400 text-xs">{company}</td>
                        <td className="px-4 py-3">
                          <Badge className={tm.color}>{tm.icon} {tm.label}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={sm.color}>
                            <span className={`w-1.5 h-1.5 rounded-full ${sm.dot}`} />
                            {sm.label}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell text-slate-500 text-xs whitespace-nowrap">
                          {new Date(lead.submittedAt).toLocaleDateString("en-AE", { day: "2-digit", month: "short", year: "numeric" })}
                        </td>
                        <td className="px-4 py-3">
                          <Eye size={14} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between">
              <p className="text-xs text-slate-500">
                Page {pagination.page} of {pagination.pages} · {pagination.total} total
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { const p = page - 1; setPage(p); fetchLeads({ p }); }}
                  disabled={page <= 1}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  onClick={() => { const p = page + 1; setPage(p); fetchLeads({ p }); }}
                  disabled={page >= pagination.pages}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── LEAD DRAWER ── */}
      <AnimatePresence>
        {selectedLead && (
          <LeadDrawer
            key={selectedLead._id}
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