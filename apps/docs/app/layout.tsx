import { Layout } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import "@workspace/ui/globals.css";
import { navbar } from "@/components/navbar";
import { banner } from "@/components/banner";

export const metadata = {
  title: "Tcn Docs",
  description: "Tcn Docs",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className="!bg-background"
    >
      <Head></Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/asadkomidev/turbo-convex-starter"
          sidebar={{ toggleButton: false }}
          darkMode={false}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
