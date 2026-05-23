"use client";

import { motion } from "framer-motion";
import {
  Eye,
  AlertTriangle,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Badge from "./Badge";
import { Lead, Pagination } from "@/types/lead";
import { STATUS_META, TYPE_META } from "@/constants/Constants";

interface LeadsTableProps {
  leads: Lead[];
  loading: boolean;
  pagination: Pagination;
  page: number;
  onRowClick: (lead: Lead) => void;
  onPageChange: (p: number) => void;
  onExport: () => void;
}

export default function LeadsTable({
  leads,
  loading,
  pagination,
  page,
  onRowClick,
  onPageChange,
  onExport,
}: LeadsTableProps) {
  return (
    <div className="bg-[#06111f] border border-cyan-500/10 rounded-xl overflow-hidden">
      {/* Header row */}
      <div className="px-5 py-3 border-b border-cyan-500/10 flex items-center justify-between">
        <p className="text-xs text-slate-500">
          {loading
            ? "Loading…"
            : `${pagination.total} lead${pagination.total !== 1 ? "s" : ""} found`}
        </p>
        <button
          onClick={onExport}
          className="sm:hidden flex items-center gap-1 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
        >
          <Download size={12} /> Export
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-xs text-slate-500 uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-semibold">Name</th>
              <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">
                Contact
              </th>
              <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">
                Company
              </th>
              <th className="text-left px-4 py-3 font-semibold">Type</th>
              <th className="text-left px-4 py-3 font-semibold">Status</th>
              <th className="text-left px-4 py-3 font-semibold">Check-In</th>
              <th className="text-left px-4 py-3 font-semibold">Badge</th>
              <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                Date
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <SkeletonRows />
            ) : leads.length === 0 ? (
              <EmptyRow />
            ) : (
              leads.map((lead) => (
                <LeadRow key={lead.id} lead={lead} onClick={onRowClick} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Page {pagination.page} of {pagination.pages} · {pagination.total}{" "}
            total
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= pagination.pages}
              className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────── */

function LeadRow({
  lead,
  onClick,
}: {
  lead: Lead;
  onClick: (lead: Lead) => void;
}) {
  const tm = TYPE_META[lead.formType];
  const sm = STATUS_META[lead.status];
  const company =
    lead.organizationCompanyName ??
    lead.companyName ??
    lead.companyOrganizationName ??
    "—";

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-b border-white/5 hover:bg-white/3 cursor-pointer transition-colors group"
      onClick={() => onClick(lead)}
    >
      <td className="px-4 py-3">
        <p className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
          {lead.fullName}
        </p>
        <p className="text-xs text-slate-500">{lead.jobTitle}</p>
      </td>

      <td className="px-4 py-3 hidden md:table-cell">
        <p className="text-slate-300 text-xs">{lead.workEmailAddress}</p>
        <p className="text-slate-500 text-xs">{lead.mobileNumber}</p>
      </td>

      <td className="px-4 py-3 hidden lg:table-cell text-slate-400 text-xs">
        {company}
      </td>

      <td className="px-4 py-3">
        <Badge className={tm.color}>
          {tm.icon} {tm.label}
        </Badge>
      </td>

      <td className="px-4 py-3">
        <Badge className={sm.color}>
          <span className={`w-1.5 h-1.5 rounded-full ${sm.dot}`} />
          {sm.label}
        </Badge>
      </td>

      <td className="px-4 py-3">
        {lead.checkedIn ? (
          <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs border border-green-500/20">
            Checked-In
          </span>
        ) : (
          <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs border border-yellow-500/20">
            Pending
          </span>
        )}
      </td>

      <td className="px-4 py-3">
        {lead.badgeSent ? (
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs border border-cyan-500/20">
            Sent
          </span>
        ) : (
          <span className="px-3 py-1 rounded-full bg-slate-500/10 text-slate-400 text-xs border border-slate-500/20">
            Pending
          </span>
        )}
      </td>

      <td className="px-4 py-3 hidden sm:table-cell text-slate-500 text-xs whitespace-nowrap">
        {new Date(lead.submittedAt).toLocaleDateString("en-AE", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </td>

      <td className="px-4 py-3">
        <Eye
          size={14}
          className="text-slate-600 group-hover:text-cyan-400 transition-colors"
        />
      </td>
    </motion.tr>
  );
}

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="border-b border-white/5 animate-pulse">
          {Array.from({ length: 9 }).map((__, j) => (
            <td key={j} className="px-4 py-3">
              <div className="h-4 bg-white/5 rounded" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function EmptyRow() {
  return (
    <tr>
      <td colSpan={9} className="px-4 py-16 text-center">
        <div className="flex flex-col items-center gap-3 text-slate-600">
          <AlertTriangle size={32} />
          <p className="text-sm">No leads found. Try adjusting your filters.</p>
        </div>
      </td>
    </tr>
  );
}