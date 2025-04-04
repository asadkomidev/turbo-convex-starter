import React from "react";
import { Blocks, Zap, Rocket } from "lucide-react";
import { FeatureCard } from "./components/feature-card";
import {
  AppSection,
  AppSectionContent,
  AppSectionDescription,
  AppSectionHeader,
  AppSectionTitle,
} from "@/components/app/app-section";

export const Features = () => {
  return (
    <AppSection className="bg-muted/50 dark:bg-muted/30  px-6">
      <AppSectionHeader className="">
        <AppSectionTitle className="">Modern Development Stack</AppSectionTitle>
        <AppSectionDescription>
          Everything you need to build and scale your next project with
          confidence
        </AppSectionDescription>
      </AppSectionHeader>
      <AppSectionContent className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 mx-auto max-w-5xl">
          <FeatureCard
            title="Monorepo Architecture"
            description="Turborepo powered monorepo setup with Next.js 14 apps and shared packages for maximum code reuse and development efficiency."
            icon={<Blocks />}
          />
          <FeatureCard
            title="Real-Time Backend"
            description="Built with Convex for real-time state management, automatic cache updates, and seamless data synchronization across clients."
            icon={<Zap />}
          />
          <FeatureCard
            title="Modern UI & Payments"
            description="Beautiful UI components with Shadcn/UI and TailwindCSS, plus integrated Polar.sh for seamless payment processing."
            icon={<Rocket />}
          />
        </div>
      </AppSectionContent>
    </AppSection>
  );
};
