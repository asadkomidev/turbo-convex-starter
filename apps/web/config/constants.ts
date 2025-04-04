import { Users, TrendingUp } from "lucide-react";

export const menuItems = [
  { name: "Features", href: "#link" },
  { name: "Solution", href: "#link" },
  { name: "Pricing", href: "#link" },
  { name: "About", href: "#link" },
];

export const sidebarItems = {
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: TrendingUp,
      isActive: true,
    },
    {
      title: "Team",
      url: "/dashboard/team",
      icon: Users,
    },
  ],
};
