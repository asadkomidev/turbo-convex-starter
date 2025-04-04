import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

import { GeistSans } from "geist/font/sans";
import { AppProvider } from "./app-provider";

import "@workspace/ui/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          suppressHydrationWarning
          className={GeistSans.variable + " scroll-smooth"}
        >
          <AppProvider>{children}</AppProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
