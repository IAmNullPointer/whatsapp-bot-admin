"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/ui/badge/Badge";
import {
    ArrowUpIcon,
    ArrowDownIcon,
    GroupIcon,
    BoxIconLine,
    PlugInIcon,
} from "@/icons";
import api from "@/lib/api";

type Metrics = {
    total_users: number;
    total_bots: number;
    total_messages: number;
};

export default function DashboardMetrics() {
    const [metrics, setMetrics] = useState<Metrics>({
        total_users: 0,
        total_bots: 0,
        total_messages: 0,
    });

    useEffect(() => {
        async function fetchMetrics() {
            try {
                const res = await api.get<Metrics>("/dashboard/metrics");
                setMetrics(res.data);
            } catch (err) {
                console.error("Failed to load dashboard metrics", err);
            }
        }

        fetchMetrics();
    }, []);

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            {/* Users */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
                </div>
                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Users</span>
                        <Link href="/users">
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                            {metrics.total_users.toLocaleString()}
                        </h4>
                        </Link>
                        
                    </div>
                    <Badge color="success">
                        <ArrowUpIcon />
                        Live
                    </Badge>
                </div>
            </div>

            {/* Bots */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <PlugInIcon className="text-gray-800 size-6 dark:text-white/90" />
                </div>
                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Bots</span>
                        <Link href="/bots">
                            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90 hover:underline">
                                {metrics.total_bots.toLocaleString()}
                            </h4>
                        </Link>
                    </div>
                    <Badge color="success">
                        <ArrowUpIcon />
                        Active
                    </Badge>
                </div>
            </div>

            {/* Messages */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
                </div>
                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Messages</span>
                        <Link href="/messages">
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                            {metrics.total_messages.toLocaleString()}
                        </h4>
                        </Link>
                        
                    </div>
                    <Badge color="success">
                        <ArrowUpIcon />
                        Growing
                    </Badge>
                </div>
            </div>
        </div>
    );
}
