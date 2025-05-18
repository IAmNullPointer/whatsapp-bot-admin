"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { formatDistanceToNow } from "date-fns";
import { BoxIcon, PaperPlaneIcon, ChatIcon, TimeIcon } from "@/icons";

interface Props {
  botId: string;
}

type Stats = {
  total_messages: number;
  inbound_messages: number;
  outbound_messages: number;
  last_active: string | null;
  trial_limit: number;
  remaining_quota: number;
};

export default function BotStatsCardGroup({ botId }: Props) {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await api.get<Stats>(`/admin/bots/${botId}/stats`);
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load stats", err);
      }
    }

    fetchStats();
  }, [botId]);

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Card icon={<ChatIcon />} label="Total Messages" value={stats.total_messages} />
      <Card icon={<PaperPlaneIcon />} label="Outbound" value={stats.outbound_messages} />
      <Card icon={<BoxIcon />} label="Inbound" value={stats.inbound_messages} />
      <Card
        icon={<TimeIcon />}
        label="Last Active"
        value={stats.last_active ? formatDistanceToNow(new Date(stats.last_active), { addSuffix: true }) : "Never"}
      />
    </div>
  );
}

function Card({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
        {icon}
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-xl font-semibold text-gray-800 dark:text-white/90">{value}</p>
      </div>
    </div>
  );
}
