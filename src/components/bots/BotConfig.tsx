"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";

interface BotConfigResponse {
  config: {
    instructions: string;
  };
}

export default function BotConfig({ botId }: { botId: string }) {
  const [instructions, setInstructions] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const res = await api.get<BotConfigResponse>(`/bots/${botId}/config`);
      setInstructions(res.data.config.instructions || "");
    };
    load();
  }, [botId]);

  const save = async () => {
    setSaving(true);
    await api.put(`/bots/${botId}/config`, { instructions });
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>Bot Instructions</Label>
        <TextArea
          value={instructions}
          onChange={(val) => setInstructions(val)}
          rows={6}
        />
      </div>

      <Button onClick={save} size="sm" className="mt-2">
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}
