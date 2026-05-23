import { Users, Handshake, FileText } from "lucide-react";
import { Trophy } from "lucide-react";
import { FormType, LeadStatus } from "@/types/lead";

export const STATUS_META: Record<
  LeadStatus,
  { label: string; color: string; dot: string }
> = {
  new: {
    label: "New",
    color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
    dot: "bg-cyan-400",
  },
  contacted: {
    label: "Contacted",
    color: "text-blue-400 bg-blue-400/10 border-blue-400/30",
    dot: "bg-blue-400",
  },
  converted: {
    label: "Converted",
    color: "text-green-400 bg-green-400/10 border-green-400/30",
    dot: "bg-green-400",
  },
  rejected: {
    label: "Rejected",
    color: "text-red-400 bg-red-400/10 border-red-400/30",
    dot: "bg-red-400",
  },
};

export const TYPE_META: Record<
  FormType,
  { label: string; icon: React.ReactNode; color: string }
> = {
  delegate: {
    label: "Delegate",
    icon: <Users size={13} />,
    color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
  },
  sponsor: {
    label: "Sponsor",
    icon: <Handshake size={13} />,
    color: "text-purple-400 bg-purple-400/10 border-purple-400/30",
  },
  brochure: {
    label: "Brochure",
    icon: <FileText size={13} />,
    color: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  },
  nomination: {
    label: "Nomination",
    icon: <Trophy size={13} />,
    color: "text-rose-400 bg-rose-400/10 border-rose-400/30",
  },
};