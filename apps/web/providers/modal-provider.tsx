"use client";

import { LoginModal } from "@/features/auth/components/login-modal";
import {
  AccountModal,
  BillingModal,
  NotificationModal,
  UpgradeModal,
  DeleteAccountModal,
} from "@/features/dashboard/account";
import { FC } from "react";

export const ModalProvider: FC = () => {
  return (
    <>
      <AccountModal />
      <BillingModal />
      <NotificationModal />
      <UpgradeModal />
      <DeleteAccountModal />
      <LoginModal />
    </>
  );
};
