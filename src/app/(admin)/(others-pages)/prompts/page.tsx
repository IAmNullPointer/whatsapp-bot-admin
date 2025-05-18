"use client";

import { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import PromptTable from "@/components/prompts/PromptTable";
import PromptEditorModal from "@/components/prompts/PromptEditorModal";
import api from "@/lib/api";
import { PlusIcon } from "@/icons";
import Button from "@/components/ui/button/Button";

type Prompt = {
  id?: number;
  task: string;
  vendor: string;
  content: string;
};

export default function PromptAdminPage() {
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [reloadKey, setReloadKey] = useState(0); // force refresh after save/delete

  const handleEdit = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setEditorOpen(true);
  };

  const handleCreate = () => {
    setSelectedPrompt(null);
    setEditorOpen(true);
  };

  const handleSave = async (data: Prompt) => {
    if (data.id) {
      await api.put(`/prompts/${data.id}`, data);
    } else {
      await api.post("/prompts", data);
    }
    setReloadKey((k) => k + 1);
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/prompts/${id}`);
    setReloadKey((k) => k + 1);
  };

  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Prompt Management" />

      <ComponentCard
        title="System Prompts"
        action={
          <Button
  size="sm"
  variant="primary"
  startIcon={<PlusIcon className="w-4 h-4" />}
>
  New Prompt
</Button>

        }
      >
        <PromptTable key={reloadKey} onEdit={handleEdit} onDelete={handleDelete} />
      </ComponentCard>

      <PromptEditorModal
        isOpen={editorOpen}
        onClose={() => setEditorOpen(false)}
        onSave={handleSave}
        initialData={selectedPrompt}
      />
    </div>
  );
}
