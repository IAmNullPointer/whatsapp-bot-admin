"use client";

import { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import ErrorTable from "@/components/errors/ErrorTable";
import ErrorDetailModal from "@/components/errors/ErrorDetailModal";

export default function AdminErrorPage() {
  const [selectedErrorId, setSelectedErrorId] = useState<number | null>(null);

  return (
    <div>
      <PageBreadcrumb pageTitle="Integration Errors" />

      <ComponentCard title="Recent Errors">
        <ErrorTable onSelect={(id) => setSelectedErrorId(id)} />
      </ComponentCard>

      {selectedErrorId !== null && (
        <ErrorDetailModal
          errorId={selectedErrorId}
          onClose={() => setSelectedErrorId(null)}
        />
      )}
    </div>
  );
}
