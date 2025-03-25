import {
  AppModal,
  AppModalHeader,
  AppModalTitle,
  AppModalContent,
  AppModalFooter,
  AppModalDescription,
} from "@/components/app/app-modal";
import React from "react";

export const NotificationContent = () => {
  return (
    <AppModal>
      <AppModalHeader>
        <AppModalTitle>Notification</AppModalTitle>
        <AppModalDescription>
          Manage your notification settings
        </AppModalDescription>
      </AppModalHeader>
      <AppModalContent>
        <div className="h-64">Notification</div>
      </AppModalContent>
      <AppModalFooter>
        <div className="">Footer</div>
      </AppModalFooter>
    </AppModal>
  );
};
