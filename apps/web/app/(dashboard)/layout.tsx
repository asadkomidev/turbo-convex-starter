import { getUserAccess } from "@/actions/subscription";
import { SidebarLayout } from "@/components/navigation/sidebar/sidebar-layout";
import LayoutProvider from "@/providers/layout-provider";

import "@workspace/ui/globals.css";

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { JSX } from "react/jsx-runtime";

export const metadata: Metadata = {
  title: "Dashboard | Overview",
  description: "Dashboard overview",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const hasAccess = await getUserAccess();

  if (!hasAccess) {
    redirect("/");
  }
  return (
    <LayoutProvider>
      <SidebarLayout>{children}</SidebarLayout>
    </LayoutProvider>
  );
}
