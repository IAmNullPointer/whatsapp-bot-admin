"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BotConfigEditorModal from "@/components/bots/BotConfigEditorModal";
import BotDetailTabs from "@/components/bots/BotDetailTabs";

type Bot = {
  id: number;
  name: string;
  whatsapp_number: string;
  config: any;
  created_at: string;
};

type Prompt = {
  id: number;
  task: string;
};

export default function BotDetailPage() {
  const params = useParams();
  const botId = params.id as string;

  const [bot, setBot] = useState<Bot | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  const fetchBot = async () => {
    try {
      const res = await api.get<Bot>(`/bots/${botId}/config`);
      setBot(res.data);
    } catch (err) {
      console.error("Failed to load bot config", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBot();
    api.get<Prompt[]>("/prompts")
      .then(res => setPrompts(res.data))
      .catch(err => console.error("Failed to load prompts", err));
  }, [botId]);

  if (loading) return <div className="px-6 py-4 text-sm text-gray-500">Loading bot…</div>;
  if (!bot) return <div className="px-6 py-4 text-sm text-red-500">Bot not found</div>;

  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle={`Bot #${bot.id} - ${bot.name}`} />
      <BotDetailTabs bot={bot} onEdit={() => setShowEditor(true)} />
      {showEditor && (
        <BotConfigEditorModal
          isOpen={showEditor}
          onClose={() => setShowEditor(false)}
          botId={botId}
          initialConfig={bot.config}
          availablePrompts={prompts}
          onSuccess={fetchBot}
        />
      )}
    </div>
  );
}
