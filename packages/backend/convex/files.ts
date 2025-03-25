import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserId } from "./helpers/common";

export const generateUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    return await ctx.storage.generateUploadUrl();
  },
});

export const getImageUrl = query({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    if (!userId) {
      return null;
    }
    const url = await ctx.storage.getUrl(args.storageId);
    return url;
  },
});
