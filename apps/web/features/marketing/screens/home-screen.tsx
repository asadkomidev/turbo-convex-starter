"use client";

import React from "react";
import { HeroSection } from "@/features/marketing/sections/home/hero-section";
import { LogosSection } from "../sections/home/logos-section";
import { AboutSection } from "../sections/home/about-section";
import { FeaturesSection } from "../sections/home/features-section";
import { FAQsSection } from "../sections/home/faqs-section";
import { CTASection } from "../sections/home/cta-section";
import { Pricing } from "@/features/pricing/pricing";
import { Product, ProductsResponse } from "@/config/types";

interface PricingProps {
  data: ProductsResponse;
}

export const HomeScreen = ({ data }: PricingProps) => {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <LogosSection />
      <AboutSection />
      <FeaturesSection />
      <Pricing data={data} />
      <FAQsSection />
      <CTASection />
    </main>
  );
};
