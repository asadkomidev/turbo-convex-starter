import { api } from "@workspace/backend/convex/_generated/api";
import { useQuery } from "convex/react";

export const useUser = () => {
  const user = useQuery(api.users.queries.getCurrentUser);

  const isLoading = user === undefined || user === null;

  return { user, isLoading };
};
