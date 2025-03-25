import { api } from "@workspace/backend/convex/_generated/api";
import { useQuery } from "convex/react";

export const useAccess = () => {
  const hasAccess = useQuery(
    api.subscriptions.queries.getUserSubscriptionStatus
  );

  return hasAccess?.hasAccess;
};
