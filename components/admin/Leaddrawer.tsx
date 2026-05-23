"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Calendar,
  StickyNote,
  Mail,
  Trash2,
  MessageCircle,
} from "lucide-react";
import Badge from "./Badge";
import { Lead, LeadStatus } from "@/types/lead";
import { STATUS_META, TYPE_META } from "@/constants/Constants";
import PrintBadge from "@/components/PrintBadge";

interface LeadDrawerProps {
  lead: Lead;
  onClose: () => void;
  onStatusChange: (id: string, status: LeadStatus) => Promise<void>;
  onNotesSave: (id: string, notes: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function LeadDrawer({
  lead,
  onClose,
  onStatusChange,
  onNotesSave,
  onDelete,
}: LeadDrawerProps) {
  const [notes, setNotes] = useState(lead.notes);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [generatedLead, setGeneratedLead] = useState<Lead | null>(null);
  const [sending, setSending] = useState(false);

  const tm = TYPE_META[lead.formType];
  const sm = STATUS_META[lead.status];

  const company =
    lead.organizationCompanyName ??
    lead.companyName ??
    lead.companyOrganizationName ??
    "—";

  const industry =
    lead.industry ?? lead.sponsorIndustry ?? lead.brochureIndustry ?? "—";

  const rows: [string, React.ReactNode][] = [
    [
      "Email",
      <a
        key="e"
        href={`mailto:${lead.workEmailAddress}`}
        className="text-cyan-400 hover:underline"
      >
        {lead.workEmailAddress}
      </a>,
    ],
    ["Phone", lead.mobileNumber],
    ["Company", company],
    ["Industry", industry],
  ];

  if (lead.linkedInProfileUrl)
    rows.push([
      "LinkedIn",
      <a
        key="li"
        href={lead.linkedInProfileUrl}
        target="_blank"
        rel="noreferrer"
        className="text-cyan-400 hover:underline truncate max-w-[200px] inline-block"
      >
        {lead.linkedInProfileUrl}
      </a>,
    ]);
  if (lead.headquartersLocation)
    rows.push(["Location", lead.headquartersLocation]);
  if (lead.websiteUrl)
    rows.push([
      "Website",
      <a
        key="ws"
        href={lead.websiteUrl}
        target="_blank"
        rel="noreferrer"
        className="text-cyan-400 hover:underline"
      >
        {lead.websiteUrl}
      </a>,
    ]);
  if (lead.countryRegion) rows.push(["Country", lead.countryRegion]);
  if (lead.companySize ?? lead.brochureCompanySize)
    rows.push([
      "Company Size",
      lead.companySize ?? lead.brochureCompanySize ?? "—",
    ]);
  if (lead.nomineeName)
    rows.push([
      "Nominee",
      `${lead.nomineeName} · ${lead.nomineeTitle ?? ""}`,
    ]);
  if (lead.nomineeCompany)
    rows.push(["Nominee Company", lead.nomineeCompany]);

  const chips: [string, string[]][] = (
    [
      ["Key Areas", lead.keyAreasOfInterest],
      ["Objectives", lead.lookingToAchieve],
      ["Gala Dinner", lead.galaDinner],
      ["Sponsorship Goals", lead.keyObjectives],
      ["Target Audience", lead.targetAudience],
      ["Sponsorship Tier", lead.sponsorshipCategory],
      ["Add-ons", lead.addOns],
      ["Activation Plans", lead.activationPlans],
      ["Interested In", lead.interestedIn],
      ["Scheduled Meetings", lead.scheduledMeetings],
      ["VIP Dinner", lead.vipDinner],
    ] as [string, string[] | undefined][]
  ).filter(([, v]) => v && v.length > 0) as [string, string[]][];

  /* ── API helpers ─────────────────────────────────────── */
  const handleWhatsApp = () => {
    const message = `
New Lead Details

Name: ${lead.fullName}
Job Title: ${lead.jobTitle}
Email: ${lead.workEmailAddress}
Phone: ${lead.mobileNumber}

Company: ${company}
Industry: ${industry}

Lead Type: ${lead.formType}
Status: ${lead.status}

Submitted: ${new Date(lead.submittedAt).toLocaleString()}
`.trim();
    window.open(
      `https://wa.me/918431429127?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const generateBadge = async () => {
    try {
      const res = await fetch("/api/badge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: lead.id }),
      });
      const data = await res.json();
      if (data.success) setGeneratedLead(data.lead);
      else alert(data.message);
    } catch {
      alert("Failed to generate badge");
    }
  };

  const sendBadgeEmail = async () => {
    if (!generatedLead) return;
    try {
      setSending(true);
      const res = await fetch("/api/send-badge-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: generatedLead.id }),
      });
      const data = await res.json();
      alert(data.success ? "Badge Email Sent Successfully" : data.message);
    } catch {
      alert("Failed to send email");
    } finally {
      setSending(false);
    }
  };

  const resetCheckIn = async () => {
    try {
      const res = await fetch("/api/reset-check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: lead.id }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Check-In Reset");
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch {
      alert("Failed to reset");
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.aside
        className="relative z-10 w-full max-w-lg h-full bg-[#06111f] border-l border-cyan-500/20 flex flex-col overflow-hidden"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
      >
        {/* ── Header ── */}
        <div className="shrink-0 px-6 pt-6 pb-4 border-b border-cyan-500/15">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge className={tm.color}>
                  {tm.icon} {tm.label}
                </Badge>
                <Badge className={sm.color}>
                  <span className={`w-1.5 h-1.5 rounded-full ${sm.dot}`} />
                  {sm.label}
                </Badge>
              </div>
              <h2 className="text-lg font-bold text-white">{lead.fullName}</h2>
              <p className="text-sm text-slate-400">
                {lead.jobTitle} · {company}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all"
            >
              <X size={18} />
            </button>
          </div>
          <p className="text-xs text-slate-600 mt-2 flex items-center gap-1.5">
            <Calendar size={11} />
            {new Date(lead.submittedAt).toLocaleString("en-AE", {
              timeZone: "Asia/Dubai",
              dateStyle: "medium",
              timeStyle: "short",
            })}{" "}
            GST
          </p>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Status buttons */}
          <div>
            <SectionLabel>Update Status</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(STATUS_META) as LeadStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={() => onStatusChange(lead.id, s)}
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
            <SectionLabel>Details</SectionLabel>
            <table className="w-full text-sm">
              <tbody>
                {rows.map(([label, value]) => (
                  <tr
                    key={label}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="py-2 pr-4 text-slate-500 font-medium whitespace-nowrap w-28">
                      {label}
                    </td>
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
                  <SectionLabel>{label}</SectionLabel>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
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

          {/* Nomination long-text fields */}
          {lead.formType === "nomination" && (
            <div className="space-y-4">
              {[
                { label: "Achievement Summary", value: lead.achievementSummary },
                { label: "Innovation", value: lead.innovation },
                { label: "Measurable Impact", value: lead.impact },
              ]
                .filter((f) => f.value)
                .map(({ label, value }) => (
                  <div key={label}>
                    <SectionLabel>{label}</SectionLabel>
                    <p className="text-sm text-slate-300 bg-white/5 rounded-lg p-3 border border-white/10 leading-relaxed">
                      {value}
                    </p>
                  </div>
                ))}
            </div>
          )}

          {/* Custom requests */}
          {lead.customRequests && (
            <div>
              <SectionLabel>Custom Requests</SectionLabel>
              <p className="text-sm text-slate-300 bg-white/5 rounded-lg p-3 border border-white/10">
                {lead.customRequests}
              </p>
            </div>
          )}

          {/* Notes */}
          <div>
            <SectionLabel icon={<StickyNote size={11} />}>
              Internal Notes
            </SectionLabel>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes visible only to the admin team…"
              rows={4}
              className="w-full bg-[#0a1628]/60 border border-cyan-500/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 resize-none transition-all"
            />
            <button
              onClick={async () => {
                setSaving(true);
                await onNotesSave(lead.id, notes);
                setSaving(false);
              }}
              disabled={saving || notes === lead.notes}
              className="mt-2 px-4 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs font-semibold border border-cyan-500/30 hover:bg-cyan-500/30 disabled:opacity-40 transition-all"
            >
              {saving ? "Saving…" : "Save Notes"}
            </button>
          </div>
        </div>

        {/* ── Footer actions ── */}
        <div className="shrink-0 px-6 py-4 border-t border-white/5 flex flex-wrap gap-3 justify-between items-center">
          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={`mailto:${lead.workEmailAddress}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm font-semibold border border-cyan-500/20 hover:bg-cyan-500/20 transition-all"
            >
              <Mail size={14} /> Reply
            </a>

            <button
              onClick={generateBadge}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 text-purple-400 text-sm font-semibold border border-purple-500/20 hover:bg-purple-500/20 transition-all"
            >
              🎟 Generate Badge
            </button>

            {lead.checkedIn && (
              <button
                onClick={resetCheckIn}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm font-semibold border border-yellow-500/20 hover:bg-yellow-500/20 transition-all"
              >
                Reset Check-In
              </button>
            )}

            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 text-green-400 text-sm font-semibold border border-green-500/20 hover:bg-green-500/20 transition-all"
            >
              <MessageCircle size={14} /> WhatsApp
            </button>
          </div>

          {/* Delete */}
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
                onClick={async () => {
                  setDeleting(true);
                  await onDelete(lead.id);
                }}
                disabled={deleting}
                className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/30 hover:bg-red-500/30 disabled:opacity-50 transition-all"
              >
                {deleting ? "Deleting…" : "Yes, Delete"}
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-3 py-1.5 rounded-lg text-slate-400 text-xs border border-slate-600 hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </motion.aside>

      {/* ── Badge modal ── */}
      {generatedLead && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#06111f] border border-cyan-500/20 rounded-2xl p-6 max-w-lg w-full max-h-[95vh] overflow-y-auto relative">
            <button
              onClick={() => setGeneratedLead(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-white mb-6 text-center">
              Badge Generated
            </h2>
            <div className="flex justify-center">
              <PrintBadge lead={generatedLead} />
            </div>
            <button
              onClick={sendBadgeEmail}
              disabled={sending}
              className="w-full mt-6 bg-cyan-500 hover:bg-cyan-400 transition-all text-white py-3 rounded-xl font-semibold"
            >
              {sending ? "Sending..." : "Send Badge Email"}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

/* tiny helper to keep section labels consistent */
function SectionLabel({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <p className="text-xs font-semibold text-cyan-300/70 uppercase tracking-wider mb-2 flex items-center gap-1.5">
      {icon}
      {children}
    </p>
  );
}