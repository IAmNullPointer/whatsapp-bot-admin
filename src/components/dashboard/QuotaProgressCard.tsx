"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import ComponentCard from "@/components/common/ComponentCard";

type QuotaData = {
  total_inbound: number;
  quota_limit: number;
};

export default function QuotaProgressCard() {
  const [quota, setQuota] = useState<QuotaData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get<QuotaData>("/dashboard/quota-usage");
        setQuota(res.data);
      } catch (err) {
        console.error("Failed to fetch quota data", err);
      }
    }

    fetchData();
  }, []);

  if (!quota) return null;

  const percentUsed = Math.min(
    Math.round((quota.total_inbound / quota.quota_limit) * 100),
    100
  );

  const progressColor =
    percentUsed >= 90
      ? "bg-red-500"
      : percentUsed >= 60
      ? "bg-yellow-500"
      : "bg-brand-500";

  return (
    <ComponentCard title="Free Trial Usage">
      <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
        <div className="flex justify-between font-medium">
          <span>Messages used:</span>
          <span>
            {quota.total_inbound} / {quota.quota_limit}
          </span>
        </div>

        <div className="w-full h-2 rounded bg-gray-200 dark:bg-gray-800">
          <div
            className={`h-full rounded ${progressColor}`}
            style={{ width: `${percentUsed}%` }}
          />
        </div>

        <div className="text-xs text-right text-gray-400">
          {percentUsed}% of quota used
        </div>
      </div>
    </ComponentCard>
  );
}
