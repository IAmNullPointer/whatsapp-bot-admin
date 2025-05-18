"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import Button from "@/components/ui/button/Button";
import { format } from "date-fns";

type ErrorItem = {
  id: number;
  created_at: string;
  bot_id: string;
  service_name: string;
  error_type: string;
};

type Props = {
  onSelect: (errorId: number) => void;
};

export default function ErrorTable({ onSelect }: Props) {
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchErrors() {
      try {
        const res = await api.get<ErrorItem[]>(`/errors`);
        setErrors(res.data || []);
      } catch (err) {
        console.error("Failed to load errors", err);
      } finally {
        setLoading(false);
      }
    }

    fetchErrors();
  }, []);

  if (loading) return <div className="text-sm text-gray-500 px-4 py-2">Loading errors...</div>;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[800px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400 font-medium">
                  ID
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400 font-medium">
                  Bot ID
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400 font-medium">
                  Service
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400 font-medium">
                  Type
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400 font-medium">
                  Date
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400 font-medium">
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {errors.map((e) => (
                <TableRow key={e.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <TableCell className="px-5 py-4 text-start text-sm text-gray-800 dark:text-white/90">
                    {e.id}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start text-sm text-gray-600 dark:text-gray-300">
                    {e.bot_id}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start text-sm text-gray-600 dark:text-gray-300">
                    {e.service_name}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start text-sm text-gray-600 dark:text-gray-300">
                    {e.error_type}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start text-sm text-gray-600 dark:text-gray-400">
                    {format(new Date(e.created_at), "yyyy-MM-dd HH:mm")}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onSelect(e.id)}
                    >
                      View
                    </Button>
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
