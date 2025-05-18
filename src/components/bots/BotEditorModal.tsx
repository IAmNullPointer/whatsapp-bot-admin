"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import InputField from "@/components/form/input/InputField";
import BotConfigForm from "@/components/bots/BotConfigForm";
import api from "@/lib/api";
import type { Bot } from "@/lib/types";

type Prompt = { id: number; task: string };

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Bot) => void;
  initialData?: Bot | null;
};

const defaultConfig = {
  llm_provider: "openai",
  llm_model: "gpt-3.5-turbo",
  instructions: "",
  trial_limit: 200,
  allow_memory: true,
};

export default function BotEditorModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: Props) {
  const [formData, setFormData] = useState<Bot>({
    name: "",
    whatsapp_number: "",
    config: defaultConfig,
  });

  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const res = await api.get<Prompt[]>("/prompts");
        setPrompts(res.data);
      } catch (err) {
        console.error("Failed to fetch prompts", err);
      }
    };
    fetchPrompts();
  }, []);

  useEffect(() => {
  if (isOpen) {
    console.log("📦 initialData", initialData);

    if (initialData) {
      setFormData({
        ...initialData,
        config: {
          ...defaultConfig,
          ...initialData.config,
        },
      });
    } else {
      setFormData({
        name: "",
        whatsapp_number: "",
        config: defaultConfig,
      });
    }
  }
}, [isOpen, initialData]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const formattedNumber = formData.whatsapp_number?.startsWith("whatsapp:")
      ? formData.whatsapp_number
      : `whatsapp:${formData.whatsapp_number?.replace(/\s+/g, "")}`;

    onSave({
      ...formData,
      whatsapp_number: formattedNumber,
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[507px] p-6 lg:p-10">
      <h4 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white/90">
        {initialData ? "Edit Bot" : "Create Bot"}
      </h4>

      <div className="overflow-y-auto max-h-[60vh] space-y-6 pr-1">
        <div>
          <Label htmlFor="name">Bot Name</Label>
          <InputField
            id="name"
            name="name"
            type="text"
            placeholder="e.g. Sales Assistant"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
          <InputField
            id="whatsapp_number"
            name="whatsapp_number"
            type="text"
            placeholder="+123456789"
            value={formData.whatsapp_number}
            onChange={handleChange}
          />
        </div>

        <BotConfigForm
          config={formData.config}
          availablePrompts={prompts}
          onChange={(updated) =>
            setFormData((prev) => ({ ...prev, config: updated }))
          }
        />
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <Button variant="outline" onClick={onClose} size="sm">
          Cancel
        </Button>
        <Button onClick={handleSubmit} size="sm">
          {initialData ? "Save Changes" : "Create Bot"}
        </Button>
      </div>
    </Modal>
  );
}
