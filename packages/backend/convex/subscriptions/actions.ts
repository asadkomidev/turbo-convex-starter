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
import { Benefit, Price, Plan } from "../config/types";

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
      userName: user.name,
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

export const getPlans = action({
  args: {},
  handler: async (
    ctx
  ): Promise<{
    plans: Plan[];
    pagination: { totalCount: number; maxPage: number };
    timestamp: number;
  }> => {
    const data = await polar.products.list({
      organizationId: process.env.POLAR_ORGANIZATION_ID,
    });

    // Transform and validate the response data
    const plans = data.result.items.map(
      (plan: any): Plan => ({
        id: plan.id,
        name: plan.name,
        description: plan.description,
        recurringInterval: plan.recurringInterval,
        isRecurring: plan.isRecurring,
        prices: plan.prices.map(
          (price: any): Price => ({
            id: price.id,
            priceAmount: price.priceAmount,
            priceCurrency: price.priceCurrency,
            recurringInterval: price.recurringInterval,
            type: price.type,
            amountType: price.amountType,
          })
        ),
        benefits: plan.benefits.map(
          (benefit: any): Benefit => ({
            id: benefit.id,
            description: benefit.description,
            type: benefit.type,
          })
        ),
      })
    );

    // Filter out free plans and sort by price amount
    const filteredPlans = plans
      .filter((plan) =>
        plan.prices.some((price) => price.amountType !== "free")
      )
      .sort((a, b) => {
        const aPrice = a.prices[0]?.priceAmount || 0;
        const bPrice = b.prices[0]?.priceAmount || 0;
        return aPrice - bPrice;
      });

    return {
      plans: filteredPlans,
      pagination: {
        totalCount: data.result.pagination.totalCount,
        maxPage: data.result.pagination.maxPage,
      },
      timestamp: Date.now(),
    };
  },
});
