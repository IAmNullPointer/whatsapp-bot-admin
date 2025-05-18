"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ComponentCard from "@/components/common/ComponentCard";
import api from "@/lib/api";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type MessageBreakdown = {
  inbound: number;
  outbound: number;
};

export default function MessageTypeBreakdownChart() {
  const [data, setData] = useState<MessageBreakdown>({ inbound: 0, outbound: 0 });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get<MessageBreakdown>("/dashboard/message-type-breakdown");
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch message breakdown", err);
      }
    }

    fetchData();
  }, []);

  const options: ApexOptions = {
    chart: {
      type: "donut",
      fontFamily: "Outfit, sans-serif",
      foreColor: "#4B5563", // Tailwind gray-600
    },
    labels: ["Inbound", "Outbound"],
    colors: ["#0EA5E9", "#6366F1"],
    legend: {
      position: "bottom",
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} messages`,
      },
    },
  };

  const series = [data.inbound, data.outbound];

  return (
    <ComponentCard title="Message Type Breakdown">
      <div className="h-[300px] flex items-center justify-center">
        <ReactApexChart options={options} series={series} type="donut" height={280} />
      </div>
    </ComponentCard>
  );
}
