import { Doc } from "@convex-dev/auth/server";
import { Value } from "convex/values";

export type SignInFunctionType = (
  this: void,
  provider: string,
  params?:
    | FormData
    | (Record<string, Value> & {
        redirectTo?: string;
        code?: string;
      })
) => Promise<{
  signingIn: boolean;
  redirect?: URL;
}>;

export type User = Doc<"users"> & {
  avatarUrl?: string;
};

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

export type Plan = {
  id: string;
  name: string;
  description: string;
  recurringInterval: string;
  isRecurring: boolean;
  prices: Price[];
  benefits: Benefit[];
};

export type PlansResponse = {
  plans: Plan[];
  pagination: {
    totalCount: number;
    maxPage: number;
  };
  timestamp: number;
};
