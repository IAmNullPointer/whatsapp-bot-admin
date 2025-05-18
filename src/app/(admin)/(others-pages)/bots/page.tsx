"use client";

import { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import BotAdminTable from "@/components/bots/BotAdminTable";
import BotEditorModal from "@/components/bots/BotEditorModal";
import Button from "@/components/ui/button/Button";
import api from "@/lib/api";
import { PlusIcon } from "@/icons";
import type { Bot } from "@/lib/types";

export default function AdminBotPage() {
  const [reloadKey, setReloadKey] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);

  const handleCreate = () => {
    setSelectedBot(null);
    setModalOpen(true);
  };

  const handleEdit = (bot: Bot) => {
    setSelectedBot(bot);
    setModalOpen(true);
  };

  const handleSave = async (botData: Bot) => {
    if (botData.id) {
      await api.put(`/admin/bots/${botData.id}`, botData);
    } else {
      await api.post("/admin/bots", botData);
    }
    setReloadKey((k) => k + 1);
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/admin/bots/${id}`);
    setReloadKey((k) => k + 1);
  };

  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Bot Management" />

      <ComponentCard
        title="All Bots"
        action={
          <Button
            size="sm"
            variant="primary"
            onClick={handleCreate}
            startIcon={<PlusIcon className="w-4 h-4" />}
          >
            New Bot
          </Button>
        }
      >
        <BotAdminTable
          key={reloadKey}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </ComponentCard>

      <BotEditorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={selectedBot}
      />
    </div>
  );
}
