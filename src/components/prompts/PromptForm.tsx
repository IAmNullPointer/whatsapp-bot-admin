"use client";

import React from "react";
import Label from "@/components/form/Label";
import InputField from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";

type Prompt = {
  task: string;
  vendor: string;
  content: string;
};

type Props = {
  formData: Prompt;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function PromptForm({ formData, onChange }: Props) {
  return (
    <div className="space-y-6">
      {/* Task input */}
      <div>
        <Label htmlFor="task">Task</Label>
        <InputField
          id="task"
          name="task"
          type="text"
          placeholder="e.g. conversation"
          value={formData.task} // ✅ controlled
          onChange={onChange}
        />
      </div>

      {/* Vendor input */}
      <div>
        <Label htmlFor="vendor">Vendor</Label>
        <InputField
          id="vendor"
          name="vendor"
          type="text"
          placeholder="e.g. openai"
          value={formData.vendor} // ✅ controlled
          onChange={onChange}
        />
      </div>

      {/* Content textarea */}
      <div>
        <Label htmlFor="content">Prompt Content</Label>
        <TextArea
          name="content"
          placeholder="Enter prompt content here..."
          rows={6}
          value={formData.content} // ✅ controlled
          onChange={(value: string) =>
            onChange({
              target: {
                name: "content",
                value,
              },
            } as React.ChangeEvent<HTMLTextAreaElement>)
          }
        />
      </div>
    </div>
  );
}
