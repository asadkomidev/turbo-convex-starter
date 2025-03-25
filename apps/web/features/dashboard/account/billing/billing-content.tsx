import {
  AppModal,
  AppModalHeader,
  AppModalTitle,
  AppModalContent,
  AppModalFooter,
  AppModalDescription,
} from "@/components/app/app-modal";
import { PlanDetails } from "../components/plan-details";
import { useAction, useQuery } from "convex/react";
import { api } from "@workspace/backend/convex/_generated/api";
import { Button } from "@workspace/ui/components/button";
import { useSettings } from "@/hooks/use-settings";

export const BillingContent = () => {
  const { setOpenBilling } = useSettings();
  const subscription = useQuery(api.subscriptions.queries.getUserSubscription);
  const getDashboardUrl = useAction(
    api.subscriptions.actions.getUserDashboardUrl
  );

  const handleManageSubscription = async () => {
    if (!subscription?.customerId) {
      return;
    }

    try {
      const result = await getDashboardUrl({
        customerId: subscription.customerId,
      });
      if (result?.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Error getting dashboard URL:", error);
    }
  };

  return (
    <AppModal>
      <AppModalHeader>
        <AppModalTitle>Billing</AppModalTitle>
        <AppModalDescription>Manage your billing settings</AppModalDescription>
      </AppModalHeader>
      <AppModalContent>
        <div className="h-full py-4 mb-4">
          <PlanDetails />
        </div>
      </AppModalContent>
      <AppModalFooter>
        <div className="flex items-center justify-between">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setOpenBilling(false)}
          >
            Close
          </Button>
          <Button
            size="sm"
            onClick={handleManageSubscription}
            disabled={!subscription?.customerId}
          >
            Manage Subscription
          </Button>
        </div>
      </AppModalFooter>
    </AppModal>
  );
};
