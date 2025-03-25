import { Infer, v } from "convex/values";

export const INTERVALS = {
  MONTH: "month",
  YEAR: "year",
} as const;

export const intervalValidator = v.union(
  v.literal(INTERVALS.MONTH),
  v.literal(INTERVALS.YEAR)
);

// Define a price object structure that matches your data
export const priceValidator = v.object({
  amount: v.number(),
  polarId: v.string(),
});

// Define a prices object structure for a specific interval
export const intervalPricesValidator = v.object({
  usd: priceValidator,
});
