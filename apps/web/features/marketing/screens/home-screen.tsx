"use client";

import React from "react";
import { HeroSection } from "@/features/marketing/sections/home/hero-section";
import { LogosSection } from "../sections/home/logos-section";
import { AboutSection } from "../sections/home/about-section";
import { FeaturesSection } from "../sections/home/features-section";
import { FAQsSection } from "../sections/home/faqs-section";
import { CTASection } from "../sections/home/cta-section";
import { Pricing } from "@/features/pricing/pricing";
import { Product } from "@/config/types";

interface PricingProps {
  result: {
    items: Product[];
    pagination: {
      totalCount: number;
      maxPage: number;
    };
  };
}

export const HomeScreen = ({ result }: PricingProps) => {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <LogosSection />
      <AboutSection />
      <FeaturesSection />
      <Pricing result={result} />
      <FAQsSection />
      <CTASection />
    </main>
  );
};
