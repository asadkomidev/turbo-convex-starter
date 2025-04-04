import { defineTable } from "convex/server";
import { v } from "convex/values";

export const plansTables = {
  plans: defineTable({
    planId: v.string(),
    planName: v.optional(v.string()),
    planDescription: v.optional(v.string()),
    planInterval: v.optional(v.string()),
    isRecurring: v.optional(v.boolean()),
    isArchived: v.optional(v.boolean()),
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
    priceId: v.optional(v.string()),
    priceAmount: v.optional(v.number()),
    priceCurrency: v.optional(v.string()),
    priceAmountType: v.optional(v.string()),
    planBenefits: v.optional(
      v.array(
        v.object({
          createdAt: v.optional(v.number()),
          updatedAt: v.optional(v.number()),

          benefitId: v.optional(v.string()),
          benefitType: v.optional(v.string()),
          benefitDescription: v.optional(v.string()),
          isSelectable: v.optional(v.boolean()),
          isDeletable: v.optional(v.boolean()),
          organizationId: v.optional(v.string()),
          properties: v.optional(v.any()),
          isTaxApplicable: v.optional(v.boolean()),
        })
      )
    ),
    metadata: v.optional(v.record(v.string(), v.any())),
  })
    .index("planId", ["planId"])
    .index("priceAmountType", ["priceAmountType"])
    .index("planInterval", ["planInterval"])
    .index("isRecurring", ["isRecurring"])
    .index("isArchived_priceAmountType", ["isArchived", "priceAmountType"])
    .index("isArchived", ["isArchived"]),
};
