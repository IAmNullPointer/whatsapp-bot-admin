"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import BotConfigForm from "./BotConfigForm";
import api from "@/lib/api";

type Config = {
    llm_provider: string;
    llm_model: string;
    instructions: string;
    trial_limit: number;
    allow_memory: boolean;
    prompt_id?: number;
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
    botId: string;
    initialConfig: Config;
    availablePrompts?: { id: number; task: string }[];
    onSuccess?: () => void;
};

export default function BotConfigEditorModal({
    isOpen,
    onClose,
    botId,
    initialConfig,
    availablePrompts,
    onSuccess,
}: Props) {
    const [config, setConfig] = useState<Config>(initialConfig);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setConfig(initialConfig);
    }, [initialConfig]);

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.put(`/bots/${botId}/config`, config);
            onSuccess?.();
            onClose();
        } catch (err) {
            console.error("Failed to save config", err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-xl p-6 lg:p-8">
            <h4 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white/90">
                Edit Bot Configuration
            </h4>

            <BotConfigForm
                config={config}
                onChange={setConfig}
                availablePrompts={availablePrompts}
            />

            <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                    Save Changes
                </Button>
            </div>
        </Modal>
    );
}
