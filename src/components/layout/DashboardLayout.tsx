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
          "pt-16 min-h-screen transition-all duration-300 ease-in-out",
          isSidebarExpanded ? "md:pl-64" : "md:pl-16",
        )}
      >
        <div className="p-3 pb-20 sm:p-4 sm:pb-20 md:p-6 md:pb-6 lg:p-8 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
