"use client";

import { LoginModal } from "@/features/auth/components/login-modal";
import {
  AccountModal,
  BillingModal,
  DeleteAccountModal,
} from "@/features/dashboard/account";
import { FC } from "react";

export const ModalProvider: FC = () => {
  return (
    <>
      <AccountModal />
      <BillingModal />
      <DeleteAccountModal />
      <LoginModal />
    </>
  );
};
