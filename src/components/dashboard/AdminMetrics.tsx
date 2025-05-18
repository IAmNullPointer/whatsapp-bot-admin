"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function AdminMetrics() {
  const [botsCount, setBotsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const botRes = await api.get("/bots").catch(() => ({ data: [] }));
      const userRes = await api.get("/admin/users").catch(() => ({ data: [] }));
      setBotsCount(botRes.data.length || 0);
      setUsersCount(userRes.data.length || 0);
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Total Bots</h4>
        <p className="text-3xl font-semibold text-gray-900 dark:text-white">{botsCount}</p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Total Users</h4>
        <p className="text-3xl font-semibold text-gray-900 dark:text-white">{usersCount}</p>
      </div>
    </div>
  );
}
