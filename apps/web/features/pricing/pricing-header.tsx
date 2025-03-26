"use client";

import React from "react";

interface PricingHeaderProps {
  title?: string;
  subtitle?: string;
}

export const PricingHeader = ({ title, subtitle }: PricingHeaderProps) => {
  return (
    <div className="mx-auto max-w-2xl space-y-6 text-center">
      <h1 className="text-center text-4xl font-semibold lg:text-5xl">
        {title}
      </h1>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
};
