import type { Metadata } from "next";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import AdminMetrics from "@/components/dashboard/AdminMetrics";
import AdminTokenChart from "@/components/dashboard/AdminTokenChart";
import RecentMessages from "@/components/dashboard/RecentMessages";

export const metadata: Metadata = {
  title: "Admin Dashboard | WhatsApp Bot Platform",
  description: "Overview of bots, users, and usage.",
};

export default function DashboardPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Dashboard" />

      <div className="space-y-6">
        <ComponentCard title="Platform Metrics">
          <AdminMetrics />
        </ComponentCard>

        <ComponentCard title="Token Usage Overview">
          <AdminTokenChart />
        </ComponentCard>

        <ComponentCard title="Recent Messages">
          <RecentMessages />
        </ComponentCard>
      </div>
    </div>
  );
}
