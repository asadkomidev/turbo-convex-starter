"use client";

import { FC } from "react";
import { ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "@workspace/ui/components/tooltip";
import { ModalProvider } from "./modal-provider";
import { DrawerProvider } from "./drawer-provider";
import { SheetProvider } from "./sheet-provider";
import { ConvexClientProvider } from "./convex-provider";
import { ToastProvider } from "./toast-provider";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <ConvexClientProvider>
        <TooltipProvider delayDuration={0}>
          {children}
          <ToastProvider />
          <ModalProvider />
          <SheetProvider />
          <DrawerProvider />
        </TooltipProvider>
      </ConvexClientProvider>
    </ThemeProvider>
  );
};
