"use client";

import React from "react";
import { Check } from "lucide-react";
import { useAction, useQuery } from "convex/react";
import { api } from "@workspace/backend/convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

import { Benefit, Price } from "@/config/types";
import { useUser } from "@/hooks/use-user";
import { useAccess } from "@/hooks/use-access";
import { useLogin } from "../auth/hooks/use-login";
import { PricingButton } from "./pricing-button";

type PricingCardProps = {
  user: ReturnType<typeof useUser>["user"];
  name: string;
  prices: Price[];
  description: string;
  benefits: Benefit[];
};

export const PricingCard = ({
  user,
  name,
  prices,
  description,
  benefits,
}: PricingCardProps) => {
  const { setOpen } = useLogin();
  const hasAccess = useAccess();
  const subscription = useQuery(api.subscriptions.queries.getUserSubscription);
  const getProCheckoutUrl = useAction(
    api.subscriptions.actions.getProOnboardingCheckoutUrl
  );
  const getDashboardUrl = useAction(
    api.subscriptions.actions.getUserDashboardUrl
  );

  const currentPrice =
    prices.find((price) => price.recurringInterval === "month") || prices[0];
  const priceId = currentPrice?.id;
  const priceAmount = currentPrice
    ? (currentPrice.priceAmount / 100).toFixed(0)
    : "0";
  const currency = currentPrice?.priceCurrency?.toUpperCase() || "USD";

  const handleManageSubscription = async () => {
    if (!subscription?.customerId) return;

    try {
      const { url } =
        (await getDashboardUrl({ customerId: subscription.customerId })) || {};
      if (url) window.location.href = url;
    } catch (error) {
      console.error("Error getting dashboard URL:", error);
    }
  };

  const handleCheckout = async () => {
    if (!currentPrice) return;

    if (hasAccess && subscription?.polarPriceId === priceId) {
      handleManageSubscription();
      return;
    }

    try {
      const checkout = await getProCheckoutUrl({ priceId: currentPrice.id });
      window.location.href = checkout;
    } catch (error) {
      console.error("Failed to get checkout URL:", error);
    }
  };

  const handleButtonClick = () => {
    if (!user) {
      setOpen(true);
      return;
    }
    handleCheckout();
  };

  return (
    <Card className="relative shadow-none rounded-3xl">
      {name === "Pro" && (
        <span className="bg-linear-to-br/increasing absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full from-purple-400 to-amber-300 px-3 py-1 text-xs font-medium text-amber-950 ring-1 ring-inset ring-white/20 ring-offset-1 ring-offset-gray-950/5">
          Popular
        </span>
      )}

      <CardHeader>
        <CardTitle className="font-medium">{name}</CardTitle>
        <div className="flex items-baseline">
          <span className="text-5xl font-bold tracking-tight">
            {currency === "USD" ? "$" : currency}
            {name === "Free" ? "0" : priceAmount}
          </span>
          <span className="text-lg text-muted-foreground">/mo</span>
        </div>

        <CardDescription className="text-sm">{description}</CardDescription>

        <PricingButton
          priceId={priceId}
          handleButtonClick={handleButtonClick}
          currentPrice={currentPrice}
        />
      </CardHeader>

      <CardContent className="space-y-4">
        <hr className="border-dashed" />
        <ul className="list-outside space-y-3 text-sm">
          {benefits.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="size-3 text-green-500" />
              {item.description}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
