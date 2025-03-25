import LayoutProvider from "@/providers/layout-provider";

import "@workspace/ui/globals.css";

import type { Metadata } from "next";
import { JSX } from "react/jsx-runtime";

export const metadata: Metadata = {
  title: "TCN | Sign in",
  description: "Sign in to your account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <LayoutProvider>
      <div className="w-screen h-screen fixed inset-0">{children}</div>
    </LayoutProvider>
  );
}
