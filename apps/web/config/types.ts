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
  priceAmount: number;
  priceCurrency: string;
  recurringInterval: "month" | "year";
  productId?: string;
};

export type Benefit = {
  description: string;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  prices: Price[];
  benefits: Benefit[];
  isRecurring?: boolean;
  isArchived?: boolean;
  organizationId?: string;
  createdAt?: Date;
  modifiedAt?: Date | null;
  metadata?: Record<string, any>;
  medias?: any[];
  attachedCustomFields?: any[];
};
