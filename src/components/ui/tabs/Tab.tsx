"use client";
import { useTabs } from "./Tabs";

export function Tab({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
        isActive
          ? "border-brand-500 text-brand-600 dark:text-brand-400"
          : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
      }`}
    >
      {children}
    </button>
  );
}
