"use client";

import React from "react";
import { Plan, Subscription, User } from "../config/types";
import { useAction } from "convex/react";
import { api } from "@workspace/backend/convex/_generated/api";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@workspace/ui/components/card";
import { PlanBadge } from "./plan-badge";
import { PlanAmount } from "./plan-amount";
import { PlanBenefits } from "./plan-benefits";
import { PlanButton } from "./plan-button";

interface Props {
  user: User | null;
  plan: Plan;
  subscription: Subscription | null;
  handleManageSubscription: () => Promise<void>;
  hasAccess: boolean;
}

export const PlanCard = ({
  user,
  plan,
  subscription,
  handleManageSubscription,
  hasAccess,
}: Props) => {
  const getProCheckoutUrl = useAction(
    api.subscriptions.actions.getProOnboardingCheckoutUrl
  );

  const handleCheckout = async (): Promise<void> => {
    if (!plan.priceId) return;

    // If user has access and same price, redirect to management
    if (hasAccess && subscription?.polarPriceId === plan.priceId) {
      handleManageSubscription();
      return;
    }

    try {
      const checkout = await getProCheckoutUrl({ priceId: plan.priceId });
      window.location.href = checkout;
    } catch {
      toast.error("Failed to get checkout URL");
    }
  };

  return (
    <Card className="relative shadow-none rounded-3xl w-full md:min-w-[300px] md:max-w-[300px] flex flex-col">
      <PlanBadge isPopular={plan.metadata?.isPopular ?? false} />
      <CardHeader className="flex-none">
        <CardTitle className="font-medium">{plan.planName}</CardTitle>
        <PlanAmount
          currency={plan.priceCurrency || ""}
          priceAmount={plan.priceAmount || 0}
          planInterval={plan.planInterval || "month"}
        />
        <CardDescription className="text-sm mt-4">
          {plan.planDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <PlanBenefits benefits={plan.planBenefits || []} />
        <PlanButton
          priceId={plan.priceId || ""}
          handleCheckout={handleCheckout}
          subscription={subscription}
          user={user}
        />
      </CardContent>
    </Card>
  );
};
