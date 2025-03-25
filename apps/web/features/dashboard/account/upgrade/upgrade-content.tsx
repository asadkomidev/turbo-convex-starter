"use client";

import {
  AppModal,
  AppModalHeader,
  AppModalTitle,
  AppModalContent,
  AppModalFooter,
  AppModalDescription,
} from "@/components/app/app-modal";

import { PlanDetails } from "../components/plan-details";
import { UpgradeCardList } from "./upgrade-card-list";
import { useSettings } from "@/hooks/use-settings";
import { Button } from "@workspace/ui/components/button";

export const UpgradeContent = () => {
  const { setOpenUpgrade } = useSettings();

  return (
    <AppModal>
      <AppModalHeader>
        <AppModalTitle>Upgrade</AppModalTitle>
        <AppModalDescription>Manage your upgrade settings</AppModalDescription>
      </AppModalHeader>
      <AppModalContent className="h-full overflow-y-auto">
        <div className="">
          <PlanDetails />
          <div className="flex flex-col my-6">
            <div className="mb-4">
              <p className="text-base font-semibold">Choose a plan</p>
            </div>
            <UpgradeCardList />
          </div>
        </div>
      </AppModalContent>
      <AppModalFooter>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setOpenUpgrade(false)}
        >
          Close
        </Button>
      </AppModalFooter>
    </AppModal>
  );
};
