"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface SummaryResponse {
  summary: string;
}

export default function BotSummary({ botId }: { botId: string }) {
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get<SummaryResponse>(`/bots/${botId}/summary`);
      setSummary(res.data.summary || "(No summary available)");
    };
    fetch();
  }, [botId]);

  return (
    <pre className="whitespace-pre-wrap rounded bg-gray-50 p-4 text-sm dark:bg-gray-900 dark:text-white">
      {summary}
    </pre>
  );
}
