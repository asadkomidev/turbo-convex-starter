import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const subscriptionStoreWebhook = mutation({
  args: {
    body: v.any(),
  },
  handler: async (ctx, args) => {
    // Extract event type from webhook payload
    const eventType = args.body.type;

    // Store webhook event
    await ctx.db.insert("polarWebhooks", {
      type: eventType,
      polarEventId: args.body.data.id,
      createdAt: args.body.data.created_at,
      modifiedAt: args.body.data.modified_at || args.body.data.created_at,
      data: args.body.data,
    });

    switch (eventType) {
      case "subscription.created":
        // Insert new subscription
        await ctx.db.insert("subscriptions", {
          polarId: args.body.data.id,
          polarPriceId: args.body.data.price_id,
          currency: args.body.data.currency,
          interval: args.body.data.recurring_interval,
          userId: args.body.data.metadata.userId,
          status: args.body.data.status,
          currentPeriodStart: new Date(
            args.body.data.current_period_start
          ).getTime(),
          currentPeriodEnd: new Date(
            args.body.data.current_period_end
          ).getTime(),
          cancelAtPeriodEnd: args.body.data.cancel_at_period_end,
          amount: args.body.data.amount,
          startedAt: new Date(args.body.data.started_at).getTime(),
          endedAt: args.body.data.ended_at
            ? new Date(args.body.data.ended_at).getTime()
            : undefined,
          canceledAt: args.body.data.canceled_at
            ? new Date(args.body.data.canceled_at).getTime()
            : undefined,
          customerCancellationReason:
            args.body.data.customer_cancellation_reason || undefined,
          customerCancellationComment:
            args.body.data.customer_cancellation_comment || undefined,
          metadata: args.body.data.metadata || {},
          customFieldData: args.body.data.custom_field_data || {},
          customerId: args.body.data.customer_id,
          plan: args.body.data.product.name,
        });
        break;

      case "subscription.updated":
        // Find existing subscription
        const existingSub = await ctx.db
          .query("subscriptions")
          .withIndex("polarId", (q) => q.eq("polarId", args.body.data.id))
          .first();

        if (existingSub) {
          await ctx.db.patch(existingSub._id, {
            amount: args.body.data.amount,
            status: args.body.data.status,
            currentPeriodStart: new Date(
              args.body.data.current_period_start
            ).getTime(),
            currentPeriodEnd: new Date(
              args.body.data.current_period_end
            ).getTime(),
            cancelAtPeriodEnd: args.body.data.cancel_at_period_end,
            metadata: args.body.data.metadata || {},
            customFieldData: args.body.data.custom_field_data || {},
            plan: args.body.data.product.name,
            interval: args.body.data.recurring_interval,
            polarPriceId: args.body.data.price_id,
          });
        }
        break;

      case "subscription.active":
        // Find and update subscription
        const activeSub = await ctx.db
          .query("subscriptions")
          .withIndex("polarId", (q) => q.eq("polarId", args.body.data.id))
          .first();

        if (activeSub) {
          await ctx.db.patch(activeSub._id, {
            status: args.body.data.status,
            startedAt: new Date(args.body.data.started_at).getTime(),
          });
        }
        break;

      case "subscription.canceled":
        // Find and update subscription
        const canceledSub = await ctx.db
          .query("subscriptions")
          .withIndex("polarId", (q) => q.eq("polarId", args.body.data.id))
          .first();

        if (canceledSub) {
          await ctx.db.patch(canceledSub._id, {
            status: args.body.data.status,
            canceledAt: args.body.data.canceled_at
              ? new Date(args.body.data.canceled_at).getTime()
              : undefined,
            customerCancellationReason:
              args.body.data.customer_cancellation_reason || undefined,
            customerCancellationComment:
              args.body.data.customer_cancellation_comment || undefined,
          });
        }
        break;

      case "subscription.uncanceled":
        // Find and update subscription
        const uncanceledSub = await ctx.db
          .query("subscriptions")
          .withIndex("polarId", (q) => q.eq("polarId", args.body.data.id))
          .first();

        if (uncanceledSub) {
          await ctx.db.patch(uncanceledSub._id, {
            status: args.body.data.status,
            cancelAtPeriodEnd: false,
            canceledAt: undefined,
            customerCancellationReason: undefined,
            customerCancellationComment: undefined,
          });
        }
        break;

      case "subscription.revoked":
        // Find and update subscription
        const revokedSub = await ctx.db
          .query("subscriptions")
          .withIndex("polarId", (q) => q.eq("polarId", args.body.data.id))
          .first();

        if (revokedSub) {
          await ctx.db.patch(revokedSub._id, {
            status: "revoked",
            endedAt: args.body.data.ended_at
              ? new Date(args.body.data.ended_at).getTime()
              : undefined,
          });
        }
        break;

      case "product.created":
        // Insert new plan
        await ctx.db.insert("plans", {
          planId: args.body.data.id,
          planName: args.body.data.name,
          planDescription: args.body.data.description,
          planInterval: args.body.data.recurring_interval,
          isRecurring: args.body.data.is_recurring,
          isArchived: args.body.data.is_archived,
          createdAt: new Date(args.body.data.created_at).getTime(),
          updatedAt: new Date(
            args.body.data.modified_at || args.body.data.created_at
          ).getTime(),
          priceId: args.body.data.prices[0].id,
          priceAmount: args.body.data.prices[0].price_amount,
          priceCurrency: args.body.data.prices[0].price_currency,
          priceAmountType: args.body.data.prices[0].amount_type,
          planBenefits: args.body.data.benefits.map((benefit: any) => ({
            benefitId: benefit.id,
            benefitDescription: benefit.description,
          })),
          metadata: args.body.data.metadata || {},
        });
        break;

      case "product.updated":
        const plan = await ctx.db
          .query("plans")
          .withIndex("planId", (q) => q.eq("planId", args.body.data.id))
          .first();
        if (plan) {
          // Update plan
          await ctx.db.patch(plan._id, {
            planName: args.body.data.name,
            planDescription: args.body.data.description,
            planInterval: args.body.data.recurring_interval,
            isRecurring: args.body.data.is_recurring,
            isArchived: args.body.data.is_archived,
            createdAt: new Date(args.body.data.created_at).getTime(),
            updatedAt: new Date(
              args.body.data.modified_at || args.body.data.created_at
            ).getTime(),
            priceId: args.body.data.prices[0].id,
            priceAmount: args.body.data.prices[0].price_amount,
            priceCurrency: args.body.data.prices[0].price_currency,
            priceAmountType: args.body.data.prices[0].amount_type,
            planBenefits: args.body.data.benefits.map((benefit: any) => ({
              benefitId: benefit.id,
              benefitDescription: benefit.description,
            })),
            metadata: args.body.data.metadata || {},
          });
        }
        break;

      case "order.created":
        // Orders are handled through the subscription events
        break;

      default:
        break;
    }
  },
});
