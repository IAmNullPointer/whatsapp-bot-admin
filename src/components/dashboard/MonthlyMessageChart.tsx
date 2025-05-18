"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import api from "@/lib/api";
import ComponentCard from "@/components/common/ComponentCard";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function MonthlyMessageChart() {
  const [series, setSeries] = useState([{ name: "Messages", data: [] as number[] }]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get<any[]>("/dashboard/monthly-usage");

        const formatted = res.data.map((row) => ({
          month: new Date(row.month).toLocaleDateString("en-US", {
            year: "2-digit",
            month: "short",
          }),
          count: Number(row.message_count),
        }));

        setSeries([{ name: "Messages", data: formatted.map((d) => d.count) }]);
        setCategories(formatted.map((d) => d.month));
      } catch (err) {
        console.error("Failed to fetch monthly message chart data", err);
      }
    }

    fetchData();
  }, []);

  const options: ApexOptions = {
    colors: ["#0EA5E9"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        borderRadius: 6,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: {
      show: false,
    },
    yaxis: {
      title: { text: undefined },
    },
    grid: {
      yaxis: {
        lines: { show: true },
      },
    },
    fill: { opacity: 1 },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} messages`,
      },
    },
  };

  return (
    <ComponentCard title="Monthly Message Volume">
      <div className="h-[300px] w-full">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={180}
          />
        </div>
    </ComponentCard>
  );
}
