"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

type Props = {
  botId: string;
};

type UsageData = {
  total_tokens: number;
  total_messages: number;
  message_limit: number;
};

export default function BotUsageCard({ botId }: Props) {
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsage() {
      try {
        const res = await api.get<UsageData>(`/bots/${botId}/usage`);
        setUsage(res.data);
      } catch (err) {
        console.error("Failed to load usage", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUsage();
  }, [botId]);

  if (loading || !usage) return null;

  const percentUsed = Math.min(
    Math.round((usage.total_messages / usage.message_limit) * 100),
    100
  );

  const isNearLimit = percentUsed >= 90;
  const progressColor = isNearLimit
    ? "bg-red-500"
    : percentUsed >= 60
    ? "bg-yellow-500"
    : "bg-brand-500";

  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-2 flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
        <div>
          <strong className="text-brand-600 dark:text-brand-400">Messages Used:</strong>{" "}
          {usage.total_messages} / {usage.message_limit}
        </div>
        <div>
          <strong className="text-brand-600 dark:text-brand-400">Usage:</strong> {percentUsed}%
        </div>
      </div>
      <div className="h-2 w-full rounded bg-gray-200 dark:bg-gray-700">
        <div
          className={`h-full rounded ${progressColor}`}
          style={{ width: `${percentUsed}%` }}
        />
      </div>
    </div>
  );
}
