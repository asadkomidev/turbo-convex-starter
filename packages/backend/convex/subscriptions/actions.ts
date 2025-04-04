import { action, httpAction } from "../_generated/server";
import { v } from "convex/values";

import { api } from "../_generated/api";
import { polar } from "../config/polar";
import { getUserId } from "../config/utils";
import { createCheckoutSession } from "./helpers";

export const polarWebhook = httpAction(async (ctx, request) => {
  try {
    const body = await request.json();

    await ctx.runMutation(api.subscriptions.mutations.handleWebhookEvents, {
      body,
    });

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

export const getCheckoutUrl = action({
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

    const checkout = await createCheckoutSession({
      customerEmail: user.email!,
      priceId: args.priceId,
      successUrl: `${process.env.SITE_URL}/success`,
      userId: userId,
    });

    return checkout.url;
  },
});

export const getCustomerPortalUrl = action({
  args: {
    customerId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const result = await polar.customerSessions.create({
        customerId: args.customerId,
      });

      return { url: result.customerPortalUrl };
    } catch (error) {
      console.error("Error creating customer session:", error);
      throw new Error("Failed to create customer session");
    }
  },
});
