"use client";

import React from "react";

import { Plans } from "@/features/home/plans/plans";
import { Technologies } from "@/features/home/technologies/technologies";
import { Hero } from "@/features/home/hero/hero";
import { About } from "@/features/home/about/about";
import { Features } from "@/features/home/features/features";
import { FAQs } from "@/features/home/faqs/faqs";
import { CTA } from "@/features/home/cta/cta";

export const HomePage = () => {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Technologies />
      <About />
      <Features />
      <Plans />
      <FAQs />
      <CTA />
    </main>
  );
};
