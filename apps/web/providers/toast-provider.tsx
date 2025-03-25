"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

export function ToastProvider() {
  const { theme } = useTheme();

  return (
    <Toaster
      richColors
      theme={theme as "light" | "dark" | "system"}
      className="toaster group"
    />
  );
}
