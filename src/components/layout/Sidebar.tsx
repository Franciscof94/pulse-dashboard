"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";

interface SidebarProps {
  isExpanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isExpanded,
  onExpandedChange,
}) => {
  const pathname = usePathname();

  return (
    <>
      <aside
        onMouseEnter={() => onExpandedChange(true)}
        onMouseLeave={() => onExpandedChange(false)}
        className={cn(
          "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] border-r border-white/10 bg-brand-navy text-white transition-all duration-300 ease-in-out hidden md:block",
          isExpanded ? "w-64" : "w-16",
        )}
      >
        <nav className="flex flex-col gap-2 p-3">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  "hover:bg-white/10 hover:text-white",
                  isActive ? "bg-brand-red text-white" : "text-white/70",
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span
                  className={cn(
                    "whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out",
                    isExpanded ? "opacity-100 w-32" : "opacity-0 w-0",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-brand-navy md:hidden">
        <div className="flex items-center justify-around py-2">
          {NAV_ITEMS.slice(0, 4).map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-1.5 text-xs",
                  isActive ? "text-brand-red" : "text-white/70",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};
