"use client";

import {
  Users,
  Handshake,
  FileText,
  TrendingUp,
  Trophy,
} from "lucide-react";

import StatCard from "@/components/admin/Statcard";

interface DashboardStatsProps {
  stats: {
    total: number;

    byType: {
      delegate?: number;
      sponsor?: number;
      brochure?: number;
      nomination?: number;
    };

    byStatus: {
      new?: number;
      converted?: number;
    };
  };
}

export default function DashboardStats({
  stats,
}: DashboardStatsProps) {

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">

      <StatCard
        icon={
          <TrendingUp
            size={20}
            className="text-cyan-400"
          />
        }
        label="TOTAL"
        value={stats.total}
        color="bg-cyan-400/10"
      />

      <StatCard
        icon={
          <Users
            size={20}
            className="text-cyan-400"
          />
        }
        label="DELEGATES"
        value={stats.byType.delegate ?? 0}
        sub={`${stats.byStatus.new ?? 0} new`}
        color="bg-cyan-400/10"
      />

      <StatCard
        icon={
          <Handshake
            size={20}
            className="text-purple-400"
          />
        }
        label="SPONSORS"
        value={stats.byType.sponsor ?? 0}
        sub={`${stats.byStatus.converted ?? 0} converted`}
        color="bg-purple-400/10"
      />

      <StatCard
        icon={
          <FileText
            size={20}
            className="text-amber-400"
          />
        }
        label="BROCHURES"
        value={stats.byType.brochure ?? 0}
        color="bg-amber-400/10"
      />

      <StatCard
        icon={
          <Trophy
            size={20}
            className="text-rose-400"
          />
        }
        label="NOMINATIONS"
        value={stats.byType.nomination ?? 0}
        color="bg-rose-400/10"
      />

    </div>
  );
}