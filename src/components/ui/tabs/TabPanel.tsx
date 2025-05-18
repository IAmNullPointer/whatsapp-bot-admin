import { useTabs } from "./Tabs";

export function TabPanel({
  value,
  children,
  className = "",
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { activeTab } = useTabs();
  if (activeTab !== value) return null;
  return <div className={className}>{children}</div>;
}
