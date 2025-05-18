"use client";

import { useEffect, useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "@/components/ui/tabs";
import BotUsageCard from "@/components/bots/BotUsageCard";
import BotStatsCardGroup from "@/components/bots/BotStatsCardGroup";
import BotConfig from "@/components/bots/BotConfig";
import BotConversationsPanel from "@/components/bots/BotConversationsPanel";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import { PencilIcon } from "@/icons";
import BotMessageChart from "@/components/bots/BotMessageChart";
import api from "@/lib/api";

export default function BotDetailTabs({ bot, onEdit }: { bot: any; onEdit: () => void }) {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get(`/admin/bots/${bot.id}/stats`)
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Failed to load stats", err));
  }, [bot.id]);

  return (
    <Tabs defaultTab="overview">
      <TabList>
        <Tab value="overview">Overview</Tab>
        <Tab value="conversations">Conversations</Tab>
      </TabList>

      <TabPanel value="overview" className="space-y-6">
        <BotUsageCard botId={String(bot.id)} />

        {/* Bot Info + Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ComponentCard title="Bot Info">
            <div className="space-y-2 text-sm text-gray-800 dark:text-white/90">
              <p><strong>Name:</strong> {bot.name}</p>
              <p><strong>WhatsApp:</strong> {bot.whatsapp_number || "-"}</p>
              <p><strong>Created:</strong> {new Date(bot.created_at).toLocaleString()}</p>
            </div>
          </ComponentCard>

          {stats?.chart_data && (
            <ComponentCard title="Daily Message Activity">
              <BotMessageChart data={stats.chart_data} />
            </ComponentCard>
          )}
        </div>

        <BotStatsCardGroup botId={String(bot.id)} />

        <ComponentCard
          title="Config"
          action={
            <Button
              size="sm"
              variant="outline"
              startIcon={<PencilIcon className="w-4 h-4" />}
              onClick={onEdit}
            >
              Edit
            </Button>
          }
        >
          <BotConfig botId={String(bot.id)} />
        </ComponentCard>
      </TabPanel>

      <TabPanel value="conversations">
        <BotConversationsPanel botId={String(bot.id)} />
      </TabPanel>
    </Tabs>
  );
}
