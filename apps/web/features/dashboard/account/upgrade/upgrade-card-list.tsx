import { useProducts } from "@/hooks/use-products";
import { UpgradeCard } from "./upgrade-card";
import React from "react";

export const UpgradeCardList = () => {
  const products = useProducts();

  const sortedProducts = products.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  // filter out the free product
  const filteredProducts = sortedProducts.filter(
    (product) => product.name !== "Free"
  );

  return (
    <div className="grid grid-cols-2 w-full gap-4">
      {filteredProducts.map((product) => (
        <UpgradeCard
          key={product.id}
          name={product.name}
          prices={product.prices}
          benefits={product.benefits}
        />
      ))}
    </div>
  );
};
