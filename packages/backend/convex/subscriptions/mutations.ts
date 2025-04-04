import { mutation } from "../_generated/server";
import { v } from "convex/values";
import {
  createCustomer,
  createPlan,
  createSubscription,
  deleteCustomer,
  updateCustomer,
  updatePlan,
  updateSubscription,
  updateSubscriptionCanceled,
  updateSubscriptionRevoked,
  updateSubscriptionStatus,
  updateSubscriptionUncanceled,
} from "./helpers";

export const handleWebhookEvents = mutation({
  args: {
    body: v.any(),
  },
  handler: async (ctx, args) => {
    const eventType = args.body.type;

    switch (eventType) {
      case "subscription.created":
        try {
          const subscriptionId = await createSubscription(ctx, args.body.data);
          console.log("🟢 Subscription created:", subscriptionId);
        } catch (error) {
          console.log("🔴 Error creating subscription:", error);
        }
        break;

      case "subscription.updated":
        try {
          const subscriptionId = await updateSubscription(ctx, args.body.data);
          console.log("🟢 Subscription updated:", subscriptionId);
        } catch (error) {
          console.log("🔴 Error updating subscription:", error);
        }
        break;

      case "subscription.active":
        try {
          const subscriptionId = await updateSubscriptionStatus(
            ctx,
            args.body.data
          );
          console.log("🟢 Subscription active:", subscriptionId);
        } catch (error) {
          console.log("🔴 Error updating subscription status:", error);
        }
        break;

      case "subscription.canceled":
        try {
          const subscriptionId = await updateSubscriptionCanceled(
            ctx,
            args.body.data
          );
          console.log("🟢 Subscription canceled:", subscriptionId);
        } catch (error) {
          console.log("🔴 Error updating subscription canceled:", error);
        }
        break;

      case "subscription.uncanceled":
        try {
          const subscriptionId = await updateSubscriptionUncanceled(
            ctx,
            args.body.data
          );
          console.log("🟢 Subscription uncanceled:", subscriptionId);
        } catch (error) {
          console.log("🔴 Error updating subscription uncanceled:", error);
        }
        break;

      case "subscription.revoked":
        try {
          const subscriptionId = await updateSubscriptionRevoked(
            ctx,
            args.body.data
          );
          console.log("🟢 Subscription revoked:", subscriptionId);
        } catch (error) {
          console.log("🔴 Error updating subscription revoked:", error);
        }
        break;

      case "product.created":
        try {
          const planId = await createPlan(ctx, args.body.data);
          console.log("🟢 Plan created:", planId);
        } catch (error) {
          console.log("🔴 Error creating plan:", error);
        }
        break;

      case "product.updated":
        try {
          const planId = await updatePlan(ctx, args.body.data);
          console.log("🟢 Plan updated:", planId);
        } catch (error) {
          console.log("🔴 Error updating plan:", error);
        }
        break;

      case "customer.created":
        try {
          const customerId = await createCustomer(ctx, args.body.data);
          console.log("🟢 Customer created:", customerId);
        } catch (error) {
          console.log("🔴 Error creating customer:", error);
        }
        break;

      case "customer.updated":
        try {
          const customerId = await updateCustomer(ctx, args.body.data);
          console.log("🟢 Customer updated:", customerId);
        } catch (error) {
          console.log("🔴 Error updating customer:", error);
        }
        break;

      case "customer.deleted":
        try {
          const customerId = await deleteCustomer(ctx, args.body.data);
          console.log("🟢 Customer deleted:", customerId);
        } catch (error) {
          console.log("🔴 Error deleting customer:", error);
        }
        break;

      default:
        break;
    }
  },
});
