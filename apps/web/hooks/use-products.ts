import { api } from "@workspace/backend/convex/_generated/api";
import { useAction } from "convex/react";
import { useEffect, useState } from "react";
import { Price, Benefit } from "@/config/types";

interface Product {
  id: string;
  name: string;
  description: string;
  prices: Price[];
  benefits: Benefit[];
}

interface ProductsResponse {
  products: Product[];
}

export const useProducts = () => {
  const listProducts = useAction(api.subscriptions.actions.getPlans);
  const [products, setProducts] = useState<ProductsResponse | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await listProducts();
        setProducts({ products: result.plans });
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, [listProducts]);

  return products?.products || [];
};
