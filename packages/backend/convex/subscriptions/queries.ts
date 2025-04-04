import { query } from "../_generated/server";
import { getUserId } from "../config/utils";
import { getSubscriptionByUserId } from "../config/utils";

export const getUserAccess = query({
  handler: async (ctx) => {
    const userId = await getUserId(ctx);
    if (!userId) {
      return false;
    }

    const subscription = await getSubscriptionByUserId(ctx, userId);
    if (!subscription) {
      return false;
    }

    const hasAccess = subscription.status === "active";
    return hasAccess;
  },
});

export const getUserSubscription = query({
  handler: async (ctx) => {
    const userId = await getUserId(ctx);
    if (!userId) {
      return null;
    }

    const subscription = await getSubscriptionByUserId(ctx, userId);

    return subscription;
  },
});
