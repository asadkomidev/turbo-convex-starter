import { MutationCtx } from "../_generated/server";
import { polar } from "../config/polar";
import {
  getCustomerByCustomerId,
  getPlanByPlanId,
  getSubscriptionByPolarId,
} from "../config/utils";

// Checkout
export const createCheckoutSession = async ({
  customerEmail,
  priceId,
  successUrl,
  userId,
}: {
  customerEmail: string;
  priceId: string;
  successUrl: string;
  userId: string;
}) => {
  const result = await polar.checkouts.create({
    productPriceId: priceId,
    successUrl,
    customerEmail,
    customerExternalId: userId,
    metadata: {
      userId,
    },
  });

  return result;
};

// Subscriptions
export const createSubscription = async (ctx: MutationCtx, data: any) => {
  const subscriptionId = await ctx.db.insert("subscriptions", {
    polarId: data.id,
    polarPriceId: data.price_id,
    currency: data.currency,
    interval: data.recurring_interval,
    userId: data.metadata.userId,
    status: data.status,
    currentPeriodStart: new Date(data.current_period_start).getTime(),
    currentPeriodEnd: new Date(data.current_period_end).getTime(),
    cancelAtPeriodEnd: data.cancel_at_period_end,
    amount: data.amount,
    startedAt: new Date(data.started_at).getTime(),
    endedAt: data.ended_at ? new Date(data.ended_at).getTime() : undefined,
    canceledAt: data.canceled_at
      ? new Date(data.canceled_at).getTime()
      : undefined,
    customerCancellationReason: data.customer_cancellation_reason || undefined,
    customerCancellationComment:
      data.customer_cancellation_comment || undefined,
    metadata: data.metadata || {},
    customFieldData: data.custom_field_data || {},
    customerId: data.customer_id,
    plan: data.product.name,
  });

  return subscriptionId;
};

export const updateSubscription = async (ctx: MutationCtx, data: any) => {
  const subscription = await getSubscriptionByPolarId(ctx, data.id);

  if (subscription) {
    await ctx.db.patch(subscription._id, {
      amount: data.amount,
      status: data.status,
      currentPeriodStart: new Date(data.current_period_start).getTime(),
      currentPeriodEnd: new Date(data.current_period_end).getTime(),
      cancelAtPeriodEnd: data.cancel_at_period_end,
      metadata: data.metadata || {},
      customFieldData: data.custom_field_data || {},
      plan: data.product.name,
      interval: data.recurring_interval,
      polarPriceId: data.price_id,
    });
  }

  return subscription?._id;
};

export const updateSubscriptionStatus = async (ctx: MutationCtx, data: any) => {
  const subscription = await getSubscriptionByPolarId(ctx, data.id);

  if (subscription) {
    await ctx.db.patch(subscription._id, {
      status: data.status,
      startedAt: new Date(data.started_at).getTime(),
    });
  }

  return subscription?._id;
};

export const updateSubscriptionCanceled = async (
  ctx: MutationCtx,
  data: any
) => {
  const subscription = await getSubscriptionByPolarId(ctx, data.id);

  if (subscription) {
    await ctx.db.patch(subscription._id, {
      status: data.status,
      canceledAt: data.canceled_at
        ? new Date(data.canceled_at).getTime()
        : undefined,
      customerCancellationReason:
        data.customer_cancellation_reason || undefined,
      customerCancellationComment:
        data.customer_cancellation_comment || undefined,
    });
  }

  return subscription?._id;
};

export const updateSubscriptionUncanceled = async (
  ctx: MutationCtx,
  data: any
) => {
  const subscription = await getSubscriptionByPolarId(ctx, data.id);

  if (subscription) {
    await ctx.db.patch(subscription._id, {
      status: data.status,
      cancelAtPeriodEnd: false,
      canceledAt: undefined,
      customerCancellationReason: undefined,
      customerCancellationComment: undefined,
    });
  }

  return subscription?._id;
};

export const updateSubscriptionRevoked = async (
  ctx: MutationCtx,
  data: any
) => {
  const subscription = await getSubscriptionByPolarId(ctx, data.id);

  if (subscription) {
    await ctx.db.patch(subscription._id, {
      status: "revoked",
      endedAt: data.ended_at ? new Date(data.ended_at).getTime() : undefined,
    });
  }

  return subscription?._id;
};

// Plans
export const createPlan = async (ctx: MutationCtx, data: any) => {
  const planId = await ctx.db.insert("plans", {
    planId: data.id,
    planName: data.name,
    planDescription: data.description,
    planInterval: data.recurring_interval,
    isRecurring: data.is_recurring,
    isArchived: data.is_archived,
    createdAt: new Date(data.created_at).getTime(),
    updatedAt: new Date(data.modified_at || data.created_at).getTime(),
    priceId: data.prices[0].id,
    priceAmount: data.prices[0].price_amount,
    priceCurrency: data.prices[0].price_currency,
    priceAmountType: data.prices[0].amount_type,
    planBenefits: data.benefits.map((benefit: any) => ({
      benefitId: benefit.id,
      benefitDescription: benefit.description,
    })),
    metadata: data.metadata || {},
  });
  return planId;
};

export const updatePlan = async (ctx: MutationCtx, data: any) => {
  const plan = await getPlanByPlanId(ctx, data.id);

  if (plan) {
    await ctx.db.patch(plan._id, {
      planName: data.name,
      planDescription: data.description,
      planInterval: data.recurring_interval,
      isRecurring: data.is_recurring,
      isArchived: data.is_archived,
      createdAt: new Date(data.created_at).getTime(),
      updatedAt: new Date(data.modified_at || data.created_at).getTime(),
      priceId: data.prices[0].id,
      priceAmount: data.prices[0].price_amount,
      priceCurrency: data.prices[0].price_currency,
      priceAmountType: data.prices[0].amount_type,
      planBenefits: data.benefits.map((benefit: any) => ({
        benefitId: benefit.id,
        benefitDescription: benefit.description,
      })),
      metadata: data.metadata || {},
    });
  }

  return plan?._id;
};

// Customers

export const createCustomer = async (ctx: MutationCtx, data: any) => {
  const customerId = await ctx.db.insert("customers", {
    customerId: data.id,
    userId: data.external_id,
    name: data.name,
    email: data.email,
    joinedAt: new Date(data.created_at).getTime(),
    modifiedAt: new Date(data.modified_at || data.created_at).getTime(),
    address: {
      line1: data.billing_address.line1 || undefined,
      line2: data.billing_address.line2 || undefined,
      city: data.billing_address.city || undefined,
      state: data.billing_address.state || undefined,
      postalCode: data.billing_address.postal_code || undefined,
      country: data.billing_address.country || undefined,
    },
    deletedAt: data.deleted_at
      ? new Date(data.deleted_at).getTime()
      : undefined,
    avatar: data.avatar_url,
  });
  return customerId;
};

export const updateCustomer = async (ctx: MutationCtx, data: any) => {
  const customer = await getCustomerByCustomerId(ctx, data.id);

  if (customer) {
    await ctx.db.patch(customer._id, {
      name: data.name,
      email: data.email,
      modifiedAt: data.modified_at
        ? new Date(data.modified_at).getTime()
        : new Date(data.created_at).getTime(),
      address: {
        line1: data.billing_address.line1 || undefined,
        line2: data.billing_address.line2 || undefined,
        city: data.billing_address.city || undefined,
        state: data.billing_address.state || undefined,
        postalCode: data.billing_address.postal_code || undefined,
        country: data.billing_address.country || undefined,
      },
      deletedAt: data.deleted_at
        ? new Date(data.deleted_at).getTime()
        : undefined,
      avatar: data.avatar_url,
    });
  }

  return customer?._id;
};

export const deleteCustomer = async (ctx: MutationCtx, data: any) => {
  const customer = await getCustomerByCustomerId(ctx, data.id);

  if (customer) {
    await ctx.db.patch(customer._id, {
      deletedAt: new Date(data.deleted_at).getTime(),
    });
  }

  return customer?._id;
};
