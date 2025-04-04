import { defineTable } from "convex/server";
import { v } from "convex/values";

export const customersTables = {
  customers: defineTable({
    customerId: v.string(),
    userId: v.optional(v.string()),
    name: v.optional(v.string()),
    email: v.string(),
    joinedAt: v.number(),
    modifiedAt: v.optional(v.number()),
    address: v.optional(
      v.object({
        line1: v.optional(v.string()),
        line2: v.optional(v.string()),
        city: v.optional(v.string()),
        state: v.optional(v.string()),
        postalCode: v.optional(v.string()),
        country: v.optional(v.string()),
      })
    ),
    deletedAt: v.optional(v.number()),
    avatar: v.optional(v.string()),
  })
    .index("email", ["email"])
    .index("userId", ["userId"])
    .index("customerId", ["customerId"]),
};
