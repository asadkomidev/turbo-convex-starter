import { v } from "convex/values";
import { query } from "../_generated/server";
import { getUserId, getUserDetails } from "../config/utils";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx);
    if (!userId) {
      return;
    }
    const [user] = await Promise.all([ctx.db.get(userId)]);
    if (!user) {
      return;
    }

    const image = user.imageId
      ? await ctx.storage.getUrl(user.imageId)
      : user.image;
    return {
      ...user,
      image: image || undefined,
    };
  },
});

export const getUser = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await getUserDetails(ctx, args.userId);
    return user;
  },
});
