"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AdminTokenChart() {
  const [series, setSeries] = useState([
    {
      name: "Tokens Used",
      data: [],
    },
  ]);

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // TODO: Replace with real data from /usage or similar
    setSeries([
      {
        name: "Tokens Used",
        data: [500, 900, 750, 1200, 1600, 1100, 1800],
      },
    ]);
    setCategories(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
  }, []);

  const options: ApexOptions = {
    chart: { type: "line", fontFamily: "Outfit, sans-serif" },
    xaxis: { categories },
    stroke: { width: 3, curve: "smooth" },
    markers: { size: 4 },
    dataLabels: { enabled: false },
    grid: {
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    colors: ["#3B82F6"],
    tooltip: { enabled: true },
  };

  return (
    <ReactApexChart type="line" height={310} options={options} series={series} />
  );
}
