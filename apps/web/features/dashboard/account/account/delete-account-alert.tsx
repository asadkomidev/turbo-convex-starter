"use client";

import { useDeleteAccount } from "@/hooks/use-delete-account";
import React from "react";
import { useUser } from "@/hooks/use-user";
import { Button } from "@workspace/ui/components/button";

export const DeleteAccountAlert = () => {
  const { setIsOpen, setUserId } = useDeleteAccount();

  const { user: userProfile } = useUser();

  const handleDeleteAccount = async () => {
    setIsOpen(true);
    setUserId(userProfile?._id || "");
  };

  return (
    <div className="flex space-y-6 mb-12 flex-col p-4 rounded-lg bg-red-200/30 dark:bg-red-900/10 mt-8">
      <p className="text-red-500 text-sm">
        Pro plan cost $20/month. After upgrading, an amount of $20 will be added
        to this month's invoice and your credit card will be charged
        immediately.
      </p>
      <div className="ml-auto">
        <Button
          onClick={handleDeleteAccount}
          size="sm"
          variant="outline"
          className="text-red-500 hover:text-red-700"
          type="button"
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
};
