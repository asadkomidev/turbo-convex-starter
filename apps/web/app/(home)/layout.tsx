import { Footer } from "@/components/navigation/footer/footer";
import { Navbar } from "@/components/navigation/navbar/navbar";

import LayoutProvider from "@/providers/layout-provider";
import { Metadata } from "next";
import { JSX } from "react";
import { getUserAccess } from "@/actions/subscription";
import { auth } from "@/actions/auth";

export const metadata: Metadata = {
  metadataBase: new URL("https://turbo-convex-starter-web.vercel.app/"),
  title: {
    default: "Turbo Convex Starter",
    template: `%s | Turbo Convex Starter`,
  },
  description:
    "The Ultimate SaaS Starter Kit built with Convex, Turborepo, and Next.js",
  openGraph: {
    description:
      "The Ultimate SaaS Starter Kit built with Convex, Turborepo, and Next.js",
    images: [
      "https://necessary-bloodhound-36.convex.cloud/api/storage/ad406632-eabb-4b58-a28b-3044e5ef3f3a",
    ],
    url: "https://turbo-convex-starter-web.vercel.app/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Turbo Convex Starter",
    description:
      "The Ultimate SaaS Starter Kit built with Convex, Turborepo, and Next.js",
    siteId: "",
    creator: "@asadkomi",
    creatorId: "",
    images: [
      "https://necessary-bloodhound-36.convex.cloud/api/storage/ad406632-eabb-4b58-a28b-3044e5ef3f3a",
    ],
  },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const user = await auth();
  const hasAccess = await getUserAccess();

  return (
    <LayoutProvider>
      <Navbar user={user || null} hasAccess={hasAccess} />
      {children}
      <Footer />
    </LayoutProvider>
  );
}
