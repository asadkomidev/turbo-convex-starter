import { query } from "../_generated/server";
import { Doc } from "../_generated/dataModel";
import { getPlans } from "../config/utils";

export type PlansQueryResult = {
  monthlyPlans: Doc<"plans">[];
  yearlyPlans: Doc<"plans">[];
};

export const getActivePlans = query({
  handler: async (ctx): Promise<PlansQueryResult> => {
    const plans = await getPlans(ctx, false);

    if (!plans) {
      return { monthlyPlans: [], yearlyPlans: [] };
    }

    const filteredPlans = plans.filter(
      (plan) => plan.priceAmountType !== "free"
    );

    const monthlyPlans = filteredPlans.filter(
      (plan) => plan.planInterval === "month"
    );
    const yearlyPlans = filteredPlans.filter(
      (plan) => plan.planInterval === "year"
    );

    return { monthlyPlans, yearlyPlans };
  },
});
