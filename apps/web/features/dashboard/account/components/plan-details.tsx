import { InfoDetails } from "@/components/shared/info-details";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useQuery } from "convex/react";
import { api } from "@workspace/backend/convex/_generated/api";
import { format } from "date-fns";

export const PlanDetails = () => {
  const subscription = useQuery(
    api.subscriptions.queries.getUserSubscription,
    {}
  );

  const plan = subscription?.plan || "free";
  const status = subscription?.status || "inactive";
  const amount = subscription?.amount ?? 0;
  const formattedAmount = (amount / 100).toFixed(0);
  const currentPeriodEnd = subscription?.currentPeriodEnd;

  return (
    <div className="flex flex-col gap-y-4 mt-4">
      <div className="flex flex-col gap-y-4">
        <div className="">
          <p className="text-base font-semibold">Current plan</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <InfoDetails label="Plan" value={capitalizeFirstLetter(plan)} />
          <InfoDetails label="Status" value={capitalizeFirstLetter(status)} />
          <InfoDetails
            label="Price"
            value={"$" + formattedAmount}
            subValue="/mo"
          />
          <InfoDetails
            label="Next Billing"
            value={
              currentPeriodEnd
                ? format(new Date(currentPeriodEnd), "MMM dd, yyyy")
                : "-"
            }
          />
        </div>
      </div>
    </div>
  );
};
