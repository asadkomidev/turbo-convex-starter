"use client";

import { FC } from "react";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalTitle,
} from "@workspace/ui/components/responsive-modal";
import { useUser } from "@/hooks/use-user";
import { cn } from "@workspace/ui/lib/utils";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  description?: string;
  onClose?: () => void;
  showWithoutUser?: boolean;
  className?: string;
}

export const Modal: FC<ModalProps> = ({
  children,
  open,
  setOpen,
  title,
  description,
  onClose,
  showWithoutUser = false,
  className,
}) => {
  const { user } = useUser();
  if (!showWithoutUser && !user) return null;

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open && onClose) {
      onClose();
    }
  };

  return (
    <ResponsiveModal open={open} onOpenChange={handleOpenChange}>
      <ResponsiveModalTitle className="sr-only">{title}</ResponsiveModalTitle>
      <ResponsiveModalDescription className="sr-only">
        {description}
      </ResponsiveModalDescription>
      <ResponsiveModalContent
        showClose={false}
        className={cn("p-0 bg-background no-scrollbar", className)}
      >
        {children}
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};
