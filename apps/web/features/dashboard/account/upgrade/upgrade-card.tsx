import { Button } from "@workspace/ui/components/button";
import React from "react";
import { Price } from "@/config/types";
import { Benefit } from "@/config/types";
import { Check } from "lucide-react";
import { useAction } from "convex/react";
import { api } from "@workspace/backend/convex/_generated/api";

interface UpgradeCardProps {
  name: string;
  prices: Price[];
  benefits: Benefit[];
}

export const UpgradeCard = ({ name, prices, benefits }: UpgradeCardProps) => {
  const getProCheckoutUrl = useAction(
    api.subscriptions.actions.getProOnboardingCheckoutUrl
  );

  const currentPrice =
    prices.find((price) => price.recurringInterval === "month") || prices[0];

  const priceId = currentPrice?.id;
  const priceAmount = currentPrice?.priceAmount
    ? (currentPrice.priceAmount / 100).toFixed(0)
    : "0";
  const currency = currentPrice?.priceCurrency?.toUpperCase() || "USD";
  const interval = "mo";

  const handleCheckout = async () => {
    if (!priceId) return;
    try {
      const checkout = await getProCheckoutUrl({
        priceId,
      });
      window.location.href = checkout;
    } catch (error) {
      console.error("Failed to get checkout URL:", error);
    }
  };

  return (
    <div className="border-[0.5px] flex flex-col justify-between gap-4 w-full h-full  p-4 rounded-lg bg-sidebar items-start">
      <div className="flex w-full justify-between">
        <div className="flex flex-col">
          <span className="text-muted-foreground text-xs">{name}</span>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold tracking-tight">
              {currency === "USD" ? "$" : currency}
              {name === "Free" ? "0" : priceAmount}
            </span>
            <span className="text-xs text-muted-foreground">/{interval}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className=""></span>
        </div>
      </div>
      <div className="flex flex-col justify-start items-start mb-auto">
        <ul className="list-outside space-y-3 text-sm">
          {benefits.map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-xs">
              <Check className="size-3" />
              {item.description}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex  w-full">
        <Button className="w-full" onClick={handleCheckout}>
          Upgrade
        </Button>
      </div>
    </div>
  );
};
