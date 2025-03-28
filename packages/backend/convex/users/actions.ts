import { ConvexError, v } from "convex/values";
import { action } from "../_generated/server";
import logger from "../debux";

import { api, internal } from "../_generated/api";

import { getUserId } from "../helpers/common";
import { polar } from "../config/polar";

export const deleteUserAction = action({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, { userId }) => {
    const id = await getUserId(ctx);

    if (id !== userId) {
      throw new Error("Unauthorized");
    }

    const subscriptions = await ctx.runQuery(
      internal.users.internals.getInternalSubscriptions,
      {
        userId,
      }
    );

    Promise.all([
      subscriptions &&
        (await polar.subscriptions.revoke({
          id: subscriptions.polarId!,
        })),
      subscriptions &&
        (await polar.customers.delete({
          id: subscriptions.customerId!,
        })),
      await ctx.runMutation(api.users.mutations.deleteUser, {
        userId,
      }),
    ]);
  },
});

export const updateUserProfileAction = action({
  args: {
    title: v.optional(v.string()),
    location: v.optional(v.string()),
    bio: v.optional(v.string()),
    imageId: v.optional(v.id("_storage")),
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      const userId = await getUserId(ctx);
      if (!userId) {
        throw new ConvexError("Unauthorized");
      }

      const user = await ctx.runQuery(api.users.queries.getUser, {
        userId,
      });

      if (!user) {
        throw new ConvexError("User not found");
      }

      const result = await ctx.runMutation(api.users.mutations.updateProfile, {
        ...args,
      });

      if (!result) {
        throw new ConvexError("Failed to update user profile");
      }
    } catch (error) {
      logger.reportError(error as Error);
      throw new ConvexError("Failed to update user profile");
    }
  },
});
