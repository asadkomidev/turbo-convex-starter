import { BUTTON_STATES } from "./constants";
import { Plan, Subscription, User } from "./types";

export const formatPlanAmount = (amount?: number): string => {
  return amount ? (amount / 100).toFixed(0) : "0";
};

export const calculateSavePercentage = (
  monthlyPlan: Plan | undefined,
  yearlyPlan: Plan | undefined
): number => {
  if (
    !monthlyPlan ||
    !yearlyPlan ||
    monthlyPlan.priceAmount === undefined ||
    yearlyPlan.priceAmount === undefined
  ) {
    return 0;
  }

  return Math.round(
    ((monthlyPlan.priceAmount * 12 - yearlyPlan.priceAmount) /
      (monthlyPlan.priceAmount * 12)) *
      100
  );
};

export const getButtonText = (
  user: User | null,
  subscription: Subscription | null,
  priceId: string
) => {
  if (!user) {
    return {
      text: BUTTON_STATES.SIGN_IN,
      disabled: false,
    };
  }

  const hasActiveSubscription = subscription?.status === "active";
  const isCurrentPlan = subscription?.polarPriceId === priceId;

  if (isCurrentPlan && hasActiveSubscription) {
    return {
      text: BUTTON_STATES.MANAGE,
      disabled: false,
    };
  }

  if (hasActiveSubscription && !isCurrentPlan) {
    return {
      text: BUTTON_STATES.ALREADY_SUBSCRIBED,
      disabled: true,
    };
  }

  return {
    text: BUTTON_STATES.GET_STARTED,
    disabled: false,
  };
};
