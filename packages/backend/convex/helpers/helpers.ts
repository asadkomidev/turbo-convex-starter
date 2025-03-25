import { Polar } from "@polar-sh/sdk";
import { polar } from "../config/polar";

export const createCheckout = async ({
  customerEmail,
  priceId,
  successUrl,
  metadata,
}: {
  customerEmail: string;
  priceId: string;
  successUrl: string;
  metadata?: Record<string, string>;
}) => {
  const result = await polar.checkouts.create({
    productPriceId: priceId,
    successUrl,
    customerEmail,
    metadata,
  });

  return result;
};
