import { api } from "@workspace/backend/convex/_generated/api";
import { useQuery } from "convex/react";

export const useSubscription = () => {
  const subscription = useQuery(api.subscriptions.queries.getUserSubscription);

  return subscription;
};
