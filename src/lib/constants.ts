import {
  LayoutDashboard,
  LucideIcon,
} from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
];

export const LAYOUT = {
  HEADER_HEIGHT: 64,
  SIDEBAR_COLLAPSED_WIDTH: 64,
  SIDEBAR_EXPANDED_WIDTH: 256,
} as const;

export const ARTIST = {
  name: "Marcus Cole",
  initials: "MC",
  avatarUrl: "https://placehold.co/100x100/6366f1/ffffff?text=MC",
} as const;
