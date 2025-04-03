"use server";

import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { api } from "@workspace/backend/convex/_generated/api";
import { fetchAction } from "convex/nextjs";

export const getPlans = async () => {
  const token = await convexAuthNextjsToken();
  const plans = await fetchAction(
    api.subscriptions.actions.getPlans,
    {},
    { token }
  );

  return plans;
};
