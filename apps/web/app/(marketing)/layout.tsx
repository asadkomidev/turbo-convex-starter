import { Footer } from "@/components/navigation/footer/footer";
import { Navbar } from "@/components/navigation/navbar/navbar";

import LayoutProvider from "@/providers/layout-provider";
import { Metadata } from "next";
import { JSX } from "react";
import { auth } from "@/actions/auth";
import { hasAccess } from "@/actions/subscription";
import { redirect } from "next/navigation";

// TODO: Update metadata Image
export const metadata: Metadata = {
  metadataBase: new URL("https://nextstarter.xyz/"),
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
      "https://dwdwn8b5ye.ufs.sh/f/MD2AM9SEY8GucGJl7b5qyE7FjNDKYduLOG2QHWh3f5RgSi0c",
    ],
    url: "https://nextstarter.xyz/",
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
      "https://dwdwn8b5ye.ufs.sh/f/MD2AM9SEY8GucGJl7b5qyE7FjNDKYduLOG2QHWh3f5RgSi0c",
    ],
  },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const user = await auth();
  const isSubscribed = await hasAccess();

  // if (user) {
  //   redirect("/dashboard");
  // }

  return (
    <LayoutProvider>
      <Navbar user={user || null} isSubscribed={isSubscribed} />
      {children}
      <Footer />
    </LayoutProvider>
  );
}
