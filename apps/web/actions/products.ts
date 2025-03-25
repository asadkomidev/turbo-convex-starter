"use server";

import { polar } from "@/lib/polar";

export const getProducts = async () => {
  const data = await polar.products.list({
    organizationId: process.env.POLAR_ORGANIZATION_ID,
  });

  return data.result;
};
