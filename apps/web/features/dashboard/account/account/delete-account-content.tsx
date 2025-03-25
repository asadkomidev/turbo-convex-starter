"use client";

import { api } from "@workspace/backend/convex/_generated/api";

import { FC, useState } from "react";
import { toast } from "sonner";
import { useSettings } from "@/hooks/use-settings";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { useAction } from "convex/react";
import { Id } from "@workspace/backend/convex/_generated/dataModel";
import {
  AppModal,
  AppModalContent,
  AppModalFooter,
  AppModalHeader,
  AppModalTitle,
} from "@/components/app/app-modal";

interface DeleteAccountContentProps {
  userId: string;
  close: () => void;
}

export const DeleteAccountContent: FC<DeleteAccountContentProps> = ({
  userId,
  close,
}) => {
  const [name, setName] = useState("");
  const [deleting, setDeleting] = useState(false);

  const { setOpenAccount } = useSettings();

  const deleteUserAction = useAction(api.users.actions.deleteUserAction);

  const clearCookies = () => {
    const cookies = document.cookie.split("; ");
    const domain = window.location.hostname;
    const paths = ["/", "/auth", "/dashboard"];

    cookies.forEach((cookie) => {
      const name = cookie.split("=")[0];
      paths.forEach((path) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; domain=${domain}`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; domain=.${domain}`;
      });
    });
  };

  const handleDeleteAccount = async () => {
    try {
      setDeleting(true);
      if (name === "Delete") {
        if (!userId) {
          throw new Error("User profile not found");
        }

        setOpenAccount(false);

        // Delete user account
        await deleteUserAction({ userId: userId as Id<"users"> });

        // Clear all client-side data immediately
        localStorage.clear();
        sessionStorage.clear();
        clearCookies();

        // Show success message
        toast.success("Account deleted successfully");

        // Force a full page reload to clear all React state and re-fetch user data
        window.location.replace("/");
      } else {
        toast.error("Please type Delete to confirm");
      }
    } catch (error) {
      toast.error("Failed to delete account");
    } finally {
      setDeleting(false);
      close();
    }
  };

  if (deleting) {
    return (
      <div className="flex flex-col gap-4 h-full min-h-[200px] w-full justify-center items-center">
        <div className="flex flex-col text-center ">
          <h1 className="text-lg font-medium mb-2 ">Deleting Account</h1>
          <p className="text-sm text-muted-foreground ">Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <AppModal className="flex flex-col gap-4">
      <AppModalHeader className="flex flex-col">
        <AppModalTitle>Delete Account</AppModalTitle>
      </AppModalHeader>
      <AppModalContent className="pb-4">
        <p className="text-sm text-muted-foreground ">
          Are you sure you want to delete this account? This action cannot be
          undone. Please proceed with caution.
        </p>
        <div className="flex flex-col gap-2 mt-4 w-full">
          <span className="text-sm text-muted-foreground">
            Type <span className="font-semibold text-primary">Delete</span> to
            confirm
          </span>
          <Input
            type="text"
            className="w-full shadow-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </AppModalContent>
      <AppModalFooter>
        <div className="flex items-center justify-between">
          <Button size="sm" variant="outline" onClick={close}>
            Close
          </Button>
          <Button
            size="sm"
            disabled={!name}
            variant="destructive"
            onClick={handleDeleteAccount}
          >
            Delete
          </Button>
        </div>
      </AppModalFooter>
    </AppModal>
  );
};
