import { getAuthUserId } from "@convex-dev/auth/server";
import { QueryCtx, MutationCtx, ActionCtx } from "../_generated/server";
import { Id } from "../_generated/dataModel";

export const getUserId = async (ctx: QueryCtx | MutationCtx | ActionCtx) => {
  const userId = await getAuthUserId(ctx);
  if (!userId) {
    return null;
  }
  return userId;
};

export const getUserDetails = async (ctx: QueryCtx, userId: Id<"users">) => {
  const user = await ctx.db.get(userId);
  const image = user?.imageId ? await ctx.storage.getUrl(user.imageId) : null;

  return {
    ...user,
    image,
  };
};
