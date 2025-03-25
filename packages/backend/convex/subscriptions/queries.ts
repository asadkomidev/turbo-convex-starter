import { query } from "../_generated/server";
import { getUserId } from "../helpers/common";

export const getUserSubscriptionStatus = query({
  handler: async (ctx) => {
    const userId = await getUserId(ctx);
    if (!userId) {
      return { hasAccess: false };
    }

    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .first();

    const hasAccess = subscription?.status === "active";
    return { hasAccess };
  },
});

export const getUserSubscription = query({
  handler: async (ctx) => {
    const userId = await getUserId(ctx);
    if (!userId) {
      return null;
    }

    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .first();

    return subscription;
  },
});
