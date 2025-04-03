import { Doc } from "@workspace/backend/convex/_generated/dataModel";

export type User = Doc<"users">;
export type Plan = Doc<"plans">;
export type Subscription = Doc<"subscriptions">;

export interface PlansQueryResult {
  monthlyPlans: Plan[];
  yearlyPlans: Plan[];
}

export type PlanBenefit = {
  createdAt?: number;
  updatedAt?: number;
  benefitId?: string;
  benefitType?: string;
  benefitDescription?: string;
  isSelectable?: boolean;
  isDeletable?: boolean;
  organizationId?: string;
  properties?: Record<string, unknown>;
  isTaxApplicable?: boolean;
};
