import { ConvexError, v } from "convex/values";
import { mutation } from "../_generated/server";

import { getUserId } from "../helpers/common";

export const deleteImage = mutation({
  args: {
    imageId: v.id("_storage"),
  },
  handler: async (ctx, { imageId }) => {
    const userId = await getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    await Promise.all([
      ctx.db.patch(userId, { imageId: undefined, image: undefined }),
      ctx.storage.delete(imageId),
    ]);

    return userId;
  },
});

export const updateProfile = mutation({
  args: {
    title: v.optional(v.string()),
    location: v.optional(v.string()),
    bio: v.optional(v.string()),
    username: v.optional(v.string()),
    imageId: v.optional(v.id("_storage")),
    name: v.optional(v.string()),
    lastName: v.optional(v.string()),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      // const userId = await getUserId(ctx);
      // if (!userId) {
      //   throw new ConvexError("Unauthorized");
      // }

      // await ctx.db.patch(userId, args);

      // return userId;

      throw new Error("Not implemented from mutations");
    } catch (error) {
      throw error;
    }
  },
});

export const deleteUser = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, { userId }) => {
    // Fetch all auth-related data in parallel
    const [authAccounts, authSessions] = await Promise.all([
      ctx.db
        .query("authAccounts")
        .withIndex("userIdAndProvider", (q) => q.eq("userId", userId))
        .collect(),
      ctx.db
        .query("authSessions")
        .withIndex("userId", (q) => q.eq("userId", userId))
        .collect(),
    ]);

    // Fetch all refresh tokens for all sessions in parallel
    const authRefreshTokens = await Promise.all(
      authSessions.map((session) =>
        ctx.db
          .query("authRefreshTokens")
          .withIndex("sessionId", (q) => q.eq("sessionId", session._id))
          .collect()
      )
    );

    // Fetch all subscriptions for the user in parallel
    const subscriptions = await ctx.db
      .query("subscriptions")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .collect();

    // Delete all auth-related data in parallel
    await Promise.all([
      // Delete auth accounts
      ...authAccounts.map((account) => ctx.db.delete(account._id)),
      // Delete refresh tokens
      ...authRefreshTokens.flat().map((token) => ctx.db.delete(token._id)),
      // Delete sessions
      ...authSessions.map((session) => ctx.db.delete(session._id)),

      // Delete subscriptions
      ...subscriptions.map((subscription) => ctx.db.delete(subscription._id)),

      // Delete all user-related data from other tables
      // deleteUserRelatedData(ctx, userId),
    ]);

    // Finally delete the user
    await ctx.db.delete(userId);

    return userId;
  },
});
