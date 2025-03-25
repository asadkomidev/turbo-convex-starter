"use client";

import {
  AppModal,
  AppModalHeader,
  AppModalTitle,
  AppModalContent,
  AppModalFooter,
  AppModalDescription,
} from "@/components/app/app-modal";
import React from "react";
import { AccountForm } from "./account-form";
import { Button } from "@workspace/ui/components/button";
import { useSettings } from "@/hooks/use-settings";
import { DeleteAccountAlert } from "./delete-account-alert";

export const AccountContent = () => {
  const { setOpenAccount } = useSettings();
  return (
    <AppModal>
      <AppModalHeader>
        <AppModalTitle>Account</AppModalTitle>
        <AppModalDescription>Manage your account settings</AppModalDescription>
      </AppModalHeader>
      <AppModalContent className="max-h-[500px] overflow-y-auto">
        <div className="">
          <AccountForm />
          <div className="border-[0.5px] my-4" />
          <DeleteAccountAlert />
        </div>
      </AppModalContent>
      <AppModalFooter>
        <div className="flex items-center justify-between">
          <Button
            onClick={() => setOpenAccount(false)}
            variant="outline"
            size="sm"
            type="button"
          >
            Close
          </Button>
          <Button form="account-form" size="sm" type="submit">
            Update Profile
          </Button>
        </div>
      </AppModalFooter>
    </AppModal>
  );
};
