"use client";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import {
  AppSection,
  AppSectionHeader,
  AppSectionContent,
  AppSectionDescription,
  AppSectionTitle,
} from "@/components/app/app-section";
import { HeroCopyText } from "./components/hero-copy-text";
import { HeroBadge } from "./components/hero-badge";

export const Hero = () => {
  return (
    <AppSection className="">
      <AppSectionHeader className="">
        <HeroBadge />
        <AppSectionTitle className="mt-8">
          Build Faster with Modern <br /> Full-Stack Architecture
        </AppSectionTitle>
        <AppSectionDescription>
          Launch your next project with a powerful stack: Turborepo, Next.js 14,
          Convex, Shadcn/UI, and TailwindCSS. Everything you need for rapid
          development with built-in payments via Polar.sh.
        </AppSectionDescription>
      </AppSectionHeader>
      <AppSectionContent>
        <HeroCopyText value="npm create @tcn-dev/tcn" />
      </AppSectionContent>
    </AppSection>
  );
};
