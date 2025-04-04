import { getAuthUserId } from "@convex-dev/auth/server";
import { QueryCtx, MutationCtx, ActionCtx } from "../_generated/server";
import { Id } from "../_generated/dataModel";

// Users
export const getUserId = async (ctx: QueryCtx | MutationCtx | ActionCtx) => {
  const userId = await getAuthUserId(ctx);
  if (!userId) {
    return null;
  }
  return userId;
};

export const getUser = async (ctx: QueryCtx, userId: Id<"users">) => {
  const user = await ctx.db.get(userId);
  return user;
};

export const getUserDetails = async (ctx: QueryCtx, userId: Id<"users">) => {
  const user = await ctx.db.get(userId);
  const image = user?.imageId ? await ctx.storage.getUrl(user.imageId) : null;

  return {
    ...user,
    image,
  };
};

// Subscriptions
export const getSubscriptionBySubscriptionId = async (
  ctx: QueryCtx,
  subscriptionId: Id<"subscriptions">
) => {
  const subscription = await ctx.db
    .query("subscriptions")
    .filter((q) => q.eq(q.field("_id"), subscriptionId))
    .first();

  return subscription;
};
export const getSubscriptionByUserId = async (
  ctx: QueryCtx,
  userId: Id<"users">
) => {
  const subscription = await ctx.db
    .query("subscriptions")
    .withIndex("userId", (q) => q.eq("userId", userId))
    .first();

  return subscription;
};
export const getSubscriptionByPolarId = async (
  ctx: QueryCtx,
  polarId: string
) => {
  const subscription = await ctx.db
    .query("subscriptions")
    .withIndex("polarId", (q) => q.eq("polarId", polarId))
    .first();

  return subscription;
};

export const getSubscriptions = async (ctx: QueryCtx) => {
  const subscriptions = await ctx.db.query("subscriptions").collect();
  return subscriptions;
};

// Plans
export const getPlan = async (ctx: QueryCtx, id: Id<"plans">) => {
  const plan = await ctx.db.get(id);
  return plan;
};

export const getPlanByPlanId = async (ctx: QueryCtx, planId: string) => {
  const plan = await ctx.db
    .query("plans")
    .withIndex("planId", (q) => q.eq("planId", planId))
    .first();
  return plan;
};

export const getPlans = async (ctx: QueryCtx, isArchived: boolean = false) => {
  const plans = await ctx.db
    .query("plans")
    .withIndex("isArchived", (q) => q.eq("isArchived", isArchived))
    .collect();
  return plans;
};

// Customers
export const getCustomerByCustomerId = async (
  ctx: QueryCtx,
  customerId: string
) => {
  const customer = await ctx.db
    .query("customers")
    .withIndex("customerId", (q) => q.eq("customerId", customerId))
    .first();
  return customer;
};

export const getCustomers = async (ctx: QueryCtx) => {
  const customers = await ctx.db.query("customers").collect();
  return customers;
};
