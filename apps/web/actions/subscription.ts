"use server";

import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { api } from "@workspace/backend/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

export const hasAccess = async () => {
  const token = await convexAuthNextjsToken();
  const isSubscribed = await fetchQuery(
    api.subscriptions.queries.getUserSubscriptionStatus,
    {},
    { token }
  );
  return isSubscribed.hasAccess;
};
