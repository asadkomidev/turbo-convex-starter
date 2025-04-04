"use server";

import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { api } from "@workspace/backend/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

export const getUserAccess = async () => {
  const token = await convexAuthNextjsToken();
  const hasAccess = await fetchQuery(
    api.subscriptions.queries.getUserAccess,
    {},
    { token }
  );
  return hasAccess;
};
