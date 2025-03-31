"use server";

import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { api } from "@workspace/backend/convex/_generated/api";
import { fetchAction } from "convex/nextjs";

export const getProducts = async () => {
  const token = await convexAuthNextjsToken();
  const products = await fetchAction(
    api.subscriptions.actions.getPolarProducts,
    {},
    { token }
  );

  return products;
};
