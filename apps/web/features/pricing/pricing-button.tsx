"use client";

import { Button } from "@workspace/ui/components/button";
import React from "react";
import { useSubscription } from "@/hooks/use-subscription";
import { useUser } from "@/hooks/use-user";
import { useAccess } from "@/hooks/use-access";
import { Price } from "@/config/types";

interface PricingButtonProps {
  priceId: string | undefined;
  handleButtonClick: () => void;
  currentPrice: Price | undefined;
}

export const PricingButton = ({
  priceId,
  handleButtonClick,
  currentPrice,
}: PricingButtonProps) => {
  const subscription = useSubscription();
  const { user } = useUser();
  const hasAccess = useAccess();

  const buttonText = !user
    ? "Sign in to continue"
    : !currentPrice
      ? "No price available"
      : hasAccess &&
          subscription?.polarPriceId === priceId &&
          subscription?.plan?.toLowerCase() !== "free"
        ? "Manage Subscription"
        : "Get Started";

  return (
    <Button
      disabled={
        subscription?.status === "active" &&
        subscription?.polarPriceId !== priceId &&
        subscription?.plan?.toLowerCase() !== "free"
      }
      className="mt-4 w-full rounded-xl"
      onClick={handleButtonClick}
      size="lg"
    >
      {buttonText}
    </Button>
  );
};
