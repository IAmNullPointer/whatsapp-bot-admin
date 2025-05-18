"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import PromptForm from "./PromptForm";

type Prompt = {
  id?: number;
  task: string;
  vendor: string;
  content: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Prompt) => void;
  initialData?: Prompt | null;
};

export default function PromptEditorModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: Props) {
  const [formData, setFormData] = useState<Prompt>({
    task: "",
    vendor: "openai",
    content: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ task: "", vendor: "openai", content: "" });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-xl p-6 lg:p-8">
      <h4 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white/90">
        {initialData ? "Edit Prompt" : "New Prompt"}
      </h4>

      <PromptForm formData={formData} onChange={handleChange} />

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          {initialData ? "Save Changes" : "Create Prompt"}
        </Button>
      </div>
    </Modal>
  );
}
