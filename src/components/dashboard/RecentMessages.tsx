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
import api from "@/lib/api";
import ComponentCard from "@/components/common/ComponentCard";
import { GroupIcon, PlugInIcon } from "@/icons"; // TailAdmin-styled icons

type Message = {
  id: number;
  direction: "inbound" | "outbound";
  body: string;
  timestamp: string;
  bot_id: number;
};

export default function RecentMessages() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await api.get<Message[]>("/dashboard/recent-messages");
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch recent messages", err);
      }
    }

    fetchMessages();
  }, []);

  return (
    <ComponentCard title="Recent Messages">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-y border-gray-100 dark:border-gray-800">
            <TableRow>
              <TableCell
                isHeader
                className="text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                From
              </TableCell>
              <TableCell
                isHeader
                className="text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Message
              </TableCell>
              <TableCell
                isHeader
                className="text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Bot
              </TableCell>
              <TableCell
                isHeader
                className="text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Time
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {messages.map((msg) => (
              <TableRow key={msg.id}>
                <TableCell className="py-3 text-sm text-gray-700 dark:text-white/90 flex items-center gap-2">
                  {msg.direction === "inbound" ? (
                    <>
                      <span>User</span>
                    </>
                  ) : (
                    <>
                      <span>Bot</span>
                    </>
                  )}

                </TableCell>
                <TableCell className="py-3 text-sm text-gray-800 dark:text-white/90">
                  {msg.body.length > 50 ? msg.body.slice(0, 50) + "…" : msg.body}
                </TableCell>
                <TableCell className="py-3 text-sm text-brand-600 dark:text-brand-400">
                  <Link href={`/bots/${msg.bot_id}`} className="hover:underline">
                    Bot #{msg.bot_id}
                  </Link>
                </TableCell>
                <TableCell className="py-3 text-sm text-gray-500 dark:text-gray-400">
                  {new Date(msg.timestamp).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ComponentCard>
  );
}
