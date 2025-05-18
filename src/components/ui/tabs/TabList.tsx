import React from "react";

export function TabList({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
      {children}
    </div>
  );
}
