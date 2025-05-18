"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Alert from "@/components/ui/alert/Alert";
import Button from "@/components/ui/button/Button";


type Conversation = {
    id: number;
    user_number: string;
    last_message_at: string;
};

type Message = {
    id: number;
    direction: "inbound" | "outbound";
    content: string;
    timestamp: string;
};

export default function BotConversationsPanel({ botId }: { botId: string }) {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [memory, setMemory] = useState<string>("");
    const [newMsg, setNewMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSummary, setShowSummary] = useState(false);


    useEffect(() => {
        api.get<Conversation[]>(`/bots/${botId}/conversations`).then(res => {
            setConversations(res.data);
            if (res.data.length > 0) setSelectedId(res.data[0].id);
        });
    }, [botId]);

    useEffect(() => {
        if (!selectedId) return;
        setLoading(true);
        Promise.all([
            api.get<Message[]>(`/conversations/${selectedId}/messages`),
            api.get<{ summary: string }>(`/conversations/${selectedId}/summary`),
        ])
            .then(([msgs, mem]) => {
                setMessages(msgs.data);
                setMemory(mem.data.summary || "");
            })
            .finally(() => setLoading(false));
    }, [selectedId]);

    const sendMessage = async () => {
        if (!newMsg.trim() || !selectedId) return;
        await api.post(`/conversations/${selectedId}/send`, { content: newMsg });
        setMessages((prev) => [
            ...prev,
            { id: Date.now(), direction: "outbound", content: newMsg, timestamp: new Date().toISOString() },
        ]);
        setNewMsg("");
    };

    return (
        <div className="flex h-[calc(100vh-15rem)] border rounded-lg overflow-hidden">
            {/* Left: conversation list */}
            <div className="w-1/3 border-r bg-gray-50 dark:bg-white/[0.03] p-2 overflow-y-auto">
                {conversations.map((c) => (
                    <div
                        key={c.id}
                        onClick={() => setSelectedId(c.id)}
                        className={`p-2 rounded cursor-pointer text-sm ${selectedId === c.id
                            ? "bg-brand-100 dark:bg-brand-900 text-brand-700"
                            : "hover:bg-gray-100 dark:hover:bg-white/[0.05]"
                            }`}
                    >
                        <div className="font-medium">{c.user_number}</div>
                        <div className="text-xs text-gray-500">{new Date(c.last_message_at).toLocaleString()}</div>
                    </div>
                ))}
            </div>

            {/* Right: conversation + memory + input */}
            <div className="flex flex-col w-2/3">
                {/* Memory Summary */}
                <div className="px-4 pt-4">
                    <div className="flex justify-between items-center mb-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowSummary((prev) => !prev)}
                            className="text-xs"
                        >
                            {showSummary ? "Hide Summary" : "Show Summary"}
                        </Button>
                    </div>

                    {showSummary && (
                        <Alert
                            variant="info"
                            title="Memory Summary"
                            message={memory || "No memory summary available."}
                        />
                    )}
                </div>


                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-white dark:bg-black">
                    {loading ? (
                        <div className="text-sm text-gray-500">Loading messages…</div>
                    ) : (
                        messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`relative max-w-xs p-2 rounded-lg text-sm leading-snug ${msg.direction === "outbound"
                                        ? "ml-auto bg-brand-500 text-white"
                                        : "mr-auto bg-gray-200 dark:bg-white/[0.05] text-gray-900 dark:text-white"
                                    }`}
                            >
                                <div className="pr-10">{msg.content}</div>
                                <span
                                    className={`absolute bottom-1 right-2 text-[10px] dark:text-gray-300 ${msg.direction === "inbound" ? "dark:text-gray-500" : "opacity-80"
                                        }`}
                                >
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </span>
                            </div>
                        ))
                    )}
                </div>

                {/* Input */}
                <div className="flex border-t px-4 py-2">
                    <input
                        type="text"
                        className="flex-1 text-sm px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-white"
                        placeholder="Type a reply..."
                        value={newMsg}
                        onChange={(e) => setNewMsg(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button
                        onClick={sendMessage}
                        className="ml-2 px-4 py-2 text-sm font-medium rounded bg-brand-500 text-white hover:bg-brand-600"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
