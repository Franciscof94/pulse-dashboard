"use client";

import { FC, useState } from "react";
import { cn } from "@/lib/utils";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar
        isExpanded={isSidebarExpanded}
        onExpandedChange={setIsSidebarExpanded}
      />
      <main
        className={cn(
          "pt-16 min-h-screen pb-16 md:pb-0 transition-all duration-300 ease-in-out",
          isSidebarExpanded ? "md:pl-64" : "md:pl-16",
        )}
      >
        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
};
