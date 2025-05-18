"use client";

import React from "react";
import Label from "@/components/form/Label";
import InputField from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Select from "@/components/form/Select";
import Switch from "@/components/form/switch/Switch";

type Config = {
  llm_provider: string;
  llm_model: string;
  prompt_id?: number;
  instructions: string;
  trial_limit: number;
  allow_memory: boolean;
};

type Props = {
  config: Config;
  onChange: (updated: Config) => void;
  availablePrompts?: { id: number; task: string }[]; // optional for dropdown
};

export default function BotConfigForm({ config, onChange, availablePrompts = [] }: Props) {
  const handleFieldChange = (field: keyof Config, value: any) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* LLM Provider */}
      <div>
        <Label htmlFor="llm_provider">LLM Provider</Label>
        <Select
          value={config.llm_provider} // ✅ was defaultValue
          onChange={(value) => handleFieldChange("llm_provider", value)}
          options={[
            { value: "openai", label: "OpenAI" },
            { value: "azure", label: "Azure" },
            { value: "claude", label: "Claude" },
          ]}
        />
      </div>

      {/* LLM Model */}
      <div>
        <Label htmlFor="llm_model">Model</Label>
        <InputField
          id="llm_model"
          name="llm_model"
          type="text"
          placeholder="e.g. gpt-3.5-turbo"
          value={config.llm_model} // ✅ was defaultValue
          onChange={(e) => handleFieldChange("llm_model", e.target.value)}
        />
      </div>

      {/* Prompt ID */}
      <div>
        <Label htmlFor="prompt_id">Prompt (Optional)</Label>
        <Select
          value={config.prompt_id?.toString() || ""} // ✅ was defaultValue
          onChange={(value) =>
            handleFieldChange("prompt_id", value ? parseInt(value) : undefined)
          }
          options={[
            { value: "", label: "None" },
            ...(availablePrompts || []).map((p) => ({
              value: p.id.toString(),
              label: `${p.task} (#${p.id})`,
            })),
          ]}
        />
      </div>

      {/* Instructions */}
      <div>
        <Label htmlFor="instructions">Instructions</Label>
        <TextArea
          placeholder="Instructions for the assistant..."
          rows={4}
          value={config.instructions}
          onChange={(value) => handleFieldChange("instructions", value)}
        />
      </div>

      {/* Trial Limit */}
      <div>
        <Label htmlFor="trial_limit">Trial Message Limit</Label>
        <InputField
          type="number"
          id="trial_limit"
          name="trial_limit"
          value={config.trial_limit} // ✅ was defaultValue
          onChange={(e) => handleFieldChange("trial_limit", parseInt(e.target.value))}
        />
      </div>

      {/* Allow Memory */}
      <div>
        <Label htmlFor="allow_memory">Allow Memory</Label>
        <Switch
          label="Allow Memory"
          checked={config.allow_memory}
          onChange={(value) => handleFieldChange("allow_memory", value)}
        />
      </div>
    </div>
  );
}
