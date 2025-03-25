import { defineTable } from "convex/server";
import { v } from "convex/values";

export const usersTables = {
  users: defineTable({
    name: v.optional(v.string()),
    imageId: v.optional(v.id("_storage")),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    // other "users" fields...

    title: v.optional(v.string()),
    location: v.optional(v.string()),
    bio: v.optional(v.string()),
  }).index("email", ["email"]),
};
