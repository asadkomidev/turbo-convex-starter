import {
  action,
  httpAction,
  internalQuery,
  mutation,
  query,
} from "../_generated/server";
import { v } from "convex/values";
import { createCheckout } from "../helpers/helpers";
import { api, internal } from "../_generated/api";
import { Polar } from "@polar-sh/sdk";
import { polar } from "../config/polar";
import { getUserDetails, getUserId } from "../helpers/common";
import { Benefit, Price, Product } from "../config/types";

export const getProOnboardingCheckoutUrl = action({
  args: {
    priceId: v.any(),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    const user = await ctx.runQuery(api.users.queries.getCurrentUser, {});
    if (!user) {
      throw new Error("User not found");
    }

    const metadata = {
      userId: userId,
      userEmail: user.email,
    };

    const checkout = await createCheckout({
      customerEmail: user.email!,
      priceId: args.priceId,
      successUrl: `${process.env.SITE_URL}/success`,
      metadata: metadata as Record<string, string>,
    });

    return checkout.url;
  },
});

export const paymentWebhook = httpAction(async (ctx, request) => {
  try {
    const body = await request.json();

    // track events and based on events store data
    await ctx.runMutation(
      api.subscriptions.mutations.subscriptionStoreWebhook,
      {
        body,
      }
    );

    return new Response(JSON.stringify({ message: "Webhook received!" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
});

export const getUserDashboardUrl = action({
  handler: async (ctx, args: { customerId: string }) => {
    try {
      const result = await polar.customerSessions.create({
        customerId: args.customerId,
      });

      // Only return the URL to avoid Convex type issues
      return { url: result.customerPortalUrl };
    } catch (error) {
      console.error("Error creating customer session:", error);
      throw new Error("Failed to create customer session");
    }
  },
});

export const getPolarProducts = action({
  args: {},
  handler: async (
    ctx
  ): Promise<{
    products: Product[];
    pagination: { totalCount: number; maxPage: number };
    timestamp: number;
  }> => {
    const data = await polar.products.list({
      organizationId: process.env.POLAR_ORGANIZATION_ID,
    });

    // Transform and validate the response data
    const products = data.result.items.map(
      (product: any): Product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        recurringInterval: product.recurringInterval,
        isRecurring: product.isRecurring,
        prices: product.prices.map(
          (price: any): Price => ({
            id: price.id,
            priceAmount: price.priceAmount,
            priceCurrency: price.priceCurrency,
            recurringInterval: price.recurringInterval,
            type: price.type,
            amountType: price.amountType,
          })
        ),
        benefits: product.benefits.map(
          (benefit: any): Benefit => ({
            id: benefit.id,
            description: benefit.description,
            type: benefit.type,
          })
        ),
      })
    );

    return {
      products,
      pagination: {
        totalCount: data.result.pagination.totalCount,
        maxPage: data.result.pagination.maxPage,
      },
      timestamp: Date.now(),
    };
  },
});
