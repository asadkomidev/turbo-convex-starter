"use server";

import { User } from "@/config/types";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { api } from "@workspace/backend/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

export const auth = async (): Promise<User | null> => {
  const token = await convexAuthNextjsToken();
  const user = await fetchQuery(
    api.users.queries.getCurrentUser,
    {},
    { token }
  );
  if (!user) {
    return null;
  }

  return user;
};
