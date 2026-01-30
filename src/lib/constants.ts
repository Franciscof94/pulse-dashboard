import {
  LayoutDashboard,
  Disc3,
  BarChart3,
  Users,
  Settings,
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
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "releases",
    label: "Releases",
    href: "/dashboard/releases",
    icon: Disc3,
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  { id: "fans", label: "Fans", href: "/dashboard/fans", icon: Users },
  {
    id: "settings",
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
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
