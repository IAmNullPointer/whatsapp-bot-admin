"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Button from "@/components/ui/button/Button";


interface Message {
    id: number;
    direction: "inbound" | "outbound";
    body: string;
    timestamp: string;
}

export default function BotMessages({ botId }: { botId: string }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [page, setPage] = useState(1);
    const perPage = 10;

    useEffect(() => {
        api
            .get<Message[]>(`/bots/${botId}/messages`)
            .then((res) => {
                const sorted = [...res.data].sort(
                    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
                );
                setMessages(sorted);
                setPage(1); // Reset to first page of latest messages
            })
            .catch(() => setMessages([]));
    }, [botId]);

    const paginated = messages.slice((page - 1) * perPage, page * perPage);

    return (
        <div className="space-y-4">
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                {paginated.map((msg) => (
                    <li key={msg.id} className="py-3">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium text-gray-700 dark:text-white">
                                {msg.direction === "inbound" ? "👤 User" : "🤖 Bot"}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-500">
                                {new Date(msg.timestamp).toLocaleString()}
                            </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm whitespace-pre-wrap">
                            {msg.body}
                        </p>
                    </li>
                ))}
            </ul>

            {/* Pagination controls */}
            <div className="flex items-center justify-between mt-6">
                <Button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    size="sm"
                    variant="outline"
                >
                    ← Previous
                </Button>

                <span className="text-xs text-gray-400 dark:text-gray-500">
                    Page {page} of {Math.ceil(messages.length / perPage)}
                </span>

                <Button
                    onClick={() =>
                        setPage((p) =>
                            p < Math.ceil(messages.length / perPage) ? p + 1 : p
                        )
                    }
                    disabled={page >= Math.ceil(messages.length / perPage)}
                    size="sm"
                    variant="outline"
                >
                    Next →
                </Button>
            </div>
        </div>
    );
}
