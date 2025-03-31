import { Infer } from "convex/values";
import { intervalValidator } from "./constants";
import { Doc } from "@convex-dev/auth/server";

export type Interval = Infer<typeof intervalValidator>;

export type User = Doc<"users"> & {
  avatarUrl?: string;
};

// Define types based on validators
export type Price = {
  id: string;
  priceAmount?: number;
  priceCurrency?: string;
  recurringInterval?: string;
  type: string;
  amountType: string;
};

export type Benefit = {
  id: string;
  description: string;
  type: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  recurringInterval: string;
  isRecurring: boolean;
  prices: Price[];
  benefits: Benefit[];
};
