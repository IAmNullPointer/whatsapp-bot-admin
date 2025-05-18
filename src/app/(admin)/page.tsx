import type { Metadata } from "next";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import QuotaProgressCard from "@/components/dashboard/QuotaProgressCard";
import React from "react";

import MonthlyMessageChart from "@/components/dashboard/MonthlyMessageChart";
import MessageTypeBreakdownChart from "@/components/dashboard/MessageTypeBreakdownChart";
import RecentMessages from "@/components/dashboard/RecentMessages";
import DemographicCard from "@/components/ecommerce/DemographicCard";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-6">
        <DashboardMetrics />
      </div>

      <div className="col-span-12 xl:col-span-6">
        <QuotaProgressCard />      </div>

      <div className="col-span-12 xl:col-span-6">
          <MonthlyMessageChart />
      </div>
      <div className="col-span-12 xl:col-span-6">
        <MessageTypeBreakdownChart  />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentMessages  />
      </div>
    </div>
  );
}
