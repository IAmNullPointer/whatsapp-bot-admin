"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Button from "@/components/ui/button/Button";
import api from "@/lib/api";
import { format } from "date-fns";
import { PencilIcon, TrashBinIcon, EyeIcon } from "@/icons"; // ✅ reuse your icon set

type Bot = {
  id: number;
  name: string;
  whatsapp_number: string;
  owner_id: number;
  created_at: string;
};

type Props = {
  onEdit?: (bot: Bot) => void;
  onDelete?: (id: number) => void;
};

export default function BotAdminTable({ onEdit, onDelete }: Props) {
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBots() {
      try {
        const res = await api.get<Bot[]>("/admin/bots");
        setBots(res.data);
      } catch (err) {
        console.error("Failed to fetch bots", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBots();
  }, []);

  if (loading) {
    return <div className="text-sm text-gray-500 px-4 py-2">Loading bots…</div>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[900px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-left text-theme-xs text-gray-500 dark:text-gray-400 font-medium">
                  Name
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-left text-theme-xs text-gray-500 dark:text-gray-400 font-medium">
                  WhatsApp #
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-left text-theme-xs text-gray-500 dark:text-gray-400 font-medium">
                  Owner
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-left text-theme-xs text-gray-500 dark:text-gray-400 font-medium">
                  Created
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-left text-theme-xs text-gray-500 dark:text-gray-400 font-medium">
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {bots.map((bot) => (
                <TableRow key={bot.id}>
                  <TableCell className="px-5 py-3 text-sm text-gray-800 dark:text-white/90">
                    {bot.name}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-sm text-gray-600 dark:text-gray-300">
                    {bot.whatsapp_number || "-"}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-sm text-gray-500 dark:text-gray-400">
                    User #{bot.owner_id}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-sm text-gray-500 dark:text-gray-400">
                    {format(new Date(bot.created_at), "yyyy-MM-dd HH:mm")}
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/bots/${bot.id}`}>
                        <Button size="sm" variant="outline">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                      </Link>
                      {onEdit && (
                        <Button size="sm" variant="outline" onClick={() => onEdit(bot)}>
                          <PencilIcon className="w-4 h-4" />
                        </Button>
                      )}
                      {onDelete && (
                        <Button size="sm" variant="outline" onClick={() => onDelete(bot.id)}>
                          <TrashBinIcon className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
