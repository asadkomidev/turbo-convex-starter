"use client";

import { useAction, useQuery } from "convex/react";
import { Plan } from "../config/types";
import { api } from "@workspace/backend/convex/_generated/api";
import { toast } from "sonner";
import { useAccess } from "@/hooks/use-access";
import { PlanCard } from "./plan-card";
import { useUser } from "@/hooks/use-user";

interface Props {
  plans: Plan[];
}

export const PlansList = ({ plans }: Props) => {
  const { user } = useUser();
  const hasAccess = useAccess();

  const subscription = useQuery(api.subscriptions.queries.getUserSubscription);
  const getCustomerPortalUrl = useAction(
    api.subscriptions.actions.getCustomerPortalUrl
  );

  const handleManageSubscription = async (): Promise<void> => {
    if (!subscription?.customerId) return;

    try {
      const { url } =
        (await getCustomerPortalUrl({
          customerId: subscription.customerId,
        })) || {};

      if (url) {
        window.location.href = url;
      }
    } catch {
      toast.error("Error getting customer portal URL");
    }
  };

  return (
    <div className="mt-8 flex flex-col flex-wrap md:flex-row gap-6 md:mt-20 mx-auto items-stretch justify-center">
      {plans.length > 0 ? (
        plans.map((plan) => (
          <PlanCard
            key={plan.planId}
            plan={plan}
            subscription={subscription || null}
            handleManageSubscription={handleManageSubscription}
            hasAccess={hasAccess || false}
            user={user || null}
          />
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-muted-foreground">No plans available</p>
          <p className="text-muted-foreground text-sm">
            Please add products in your Polar account
          </p>
        </div>
      )}
    </div>
  );
};
