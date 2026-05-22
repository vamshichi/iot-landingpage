import {
  Users,
  Handshake,
  FileText,
  Trophy,
} from "lucide-react";

export const TYPE_META = {
  delegate: {
    label: "Delegate",
    icon: <Users size={13} />,
    color:
      "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
  },

  sponsor: {
    label: "Sponsor",
    icon: <Handshake size={13} />,
    color:
      "text-purple-400 bg-purple-400/10 border-purple-400/30",
  },

  brochure: {
    label: "Brochure",
    icon: <FileText size={13} />,
    color:
      "text-amber-400 bg-amber-400/10 border-amber-400/30",
  },

  nomination: {
    label: "Nomination",
    icon: <Trophy size={13} />,
    color:
      "text-rose-400 bg-rose-400/10 border-rose-400/30",
  },
};