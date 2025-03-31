"use client";

import { ProductsResponse } from "@/config/types";
import { useUser } from "@/hooks/use-user";

import { PricingHeader } from "./pricing-header";
import { PricingCard } from "./pricing-card";

interface PricingProps {
  data: ProductsResponse;
}

export const Pricing = ({ data }: PricingProps) => {
  const { user } = useUser();

  data.products.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  return (
    <section id="pricing" className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <PricingHeader
          title="Pricing that Scales with You"
          subtitle=" Gemini is evolving to be more than just the models. It supports an
        entire to the APIs and platforms helping developers and businesses
        innovate."
        />

        <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-3">
          {data.products.map((item) => (
            <PricingCard
              key={item.id}
              user={user}
              name={item.name}
              description={item.description || ""}
              prices={item.prices}
              benefits={item.benefits}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
