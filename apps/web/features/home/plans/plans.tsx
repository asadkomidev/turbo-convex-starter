"use client";

import { api } from "@workspace/backend/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import { PlansToggle } from "./components/plans-toggle";
import { usePlanToggle } from "./hooks/use-plan-toggle";
import { PlansList } from "./components/plans-list";
import {
  AppSection,
  AppSectionHeader,
  AppSectionContent,
  AppSectionTitle,
  AppSectionDescription,
} from "@/components/app/app-section";

export const Plans = () => {
  const { toggle } = usePlanToggle();

  const plans = useQuery(api.plans.queries.getActivePlans);
  const displayPlans = toggle ? plans?.yearlyPlans : plans?.monthlyPlans;

  return (
    <AppSection id="pricing" className="">
      <AppSectionHeader>
        <AppSectionTitle>Pricing that Scales with You</AppSectionTitle>
        <AppSectionDescription>
          Pick a plan that fits your needs and budget
        </AppSectionDescription>
        <PlansToggle plans={plans} />
      </AppSectionHeader>
      <AppSectionContent>
        <PlansList plans={displayPlans || []} />
      </AppSectionContent>
    </AppSection>
  );
};
