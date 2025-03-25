"use client";

import React from "react";
import { useAccess } from "@/hooks/use-access";
import { useQuery } from "convex/react";
import { api } from "@workspace/backend/convex/_generated/api";
import { useSettings } from "@/hooks/use-settings";
import { Button } from "@workspace/ui/components/button";
import { AlertTriangle } from "lucide-react";

interface PlansGateProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  plans?: string[];
}

const PlansGate = ({ children, fallback, plans = ["pro"] }: PlansGateProps) => {
  const hasAccess = useAccess();
  const subscription = useQuery(api.subscriptions.queries.getUserSubscription);
  const { setOpenUpgrade } = useSettings();

  // If user has no subscription or subscription is not active
  if (!hasAccess || !subscription) {
    return (
      fallback || (
        <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed p-8 text-center">
          <AlertTriangle className="h-8 w-8 text-muted-foreground" />
          <div className="max-w-sm space-y-2">
            <h3 className="text-lg font-medium">Pro Feature</h3>
            <p className="text-sm text-muted-foreground">
              This feature is only available for Pro plan subscribers. Upgrade
              your account to access this and other premium features.
            </p>
          </div>
          <Button onClick={() => setOpenUpgrade(true)} variant="default">
            Upgrade Plan
          </Button>
        </div>
      )
    );
  }

  // If plans are specified, check if user's plan is included
  if (plans?.length > 0) {
    const userPlan = subscription.plan?.toLowerCase();
    if (!userPlan || !plans.includes(userPlan)) {
      return (
        fallback || (
          <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed p-8 text-center">
            <AlertTriangle className="h-8 w-8 text-muted-foreground" />
            <div className="max-w-sm space-y-2">
              <h3 className="text-lg font-medium">Plan Restricted</h3>
              <p className="text-sm text-muted-foreground">
                This feature requires a different subscription plan. Please
                upgrade to access this feature.
              </p>
            </div>
            <Button onClick={() => setOpenUpgrade(true)} variant="default">
              View Plans
            </Button>
          </div>
        )
      );
    }
  }

  // If all checks pass, render the children
  return <>{children}</>;
};

export default PlansGate;
