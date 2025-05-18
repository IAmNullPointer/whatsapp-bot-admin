"use client";

import { useEffect, useState } from "react";
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
import { PencilIcon, TrashBinIcon } from "@/icons";

type Prompt = {
  id: number;
  task: string;
  vendor: string;
  content: string;
  updated_at: string;
};

type Props = {
  onEdit: (prompt: Prompt) => void;
  onDelete: (id: number) => void;
};

export default function PromptTable({ onEdit, onDelete }: Props) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrompts() {
      try {
        const res = await api.get<Prompt[]>("/prompts");
        setPrompts(res.data);
      } catch (err) {
        console.error("Failed to load prompts", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPrompts();
  }, []);

  if (loading) {
    return <div className="text-sm text-gray-500 px-4 py-2">Loading prompts…</div>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[800px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="text-left text-theme-xs font-medium text-gray-500 dark:text-gray-400 px-5 py-3">
                  Task
                </TableCell>
                <TableCell isHeader className="text-left text-theme-xs font-medium text-gray-500 dark:text-gray-400 px-5 py-3">
                  Vendor
                </TableCell>
                <TableCell isHeader className="text-left text-theme-xs font-medium text-gray-500 dark:text-gray-400 px-5 py-3">
                  Preview
                </TableCell>
                <TableCell isHeader className="text-left text-theme-xs font-medium text-gray-500 dark:text-gray-400 px-5 py-3">
                  Updated
                </TableCell>
                <TableCell isHeader className="text-left text-theme-xs font-medium text-gray-500 dark:text-gray-400 px-5 py-3">
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {prompts.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="px-5 py-3 text-sm text-gray-700 dark:text-white/90">{p.task}</TableCell>
                  <TableCell className="px-5 py-3 text-sm text-gray-500 dark:text-gray-400">{p.vendor}</TableCell>
                  <TableCell className="px-5 py-3 text-sm text-gray-600 dark:text-gray-300">
                    {p.content.length > 50 ? p.content.slice(0, 50) + "…" : p.content}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-sm text-gray-400">
                    {format(new Date(p.updated_at), "yyyy-MM-dd HH:mm")}
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => onEdit(p)}>
                        <PencilIcon className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => onDelete(p.id)}>
                        <TrashBinIcon className="w-4 h-4" />
                      </Button>
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
