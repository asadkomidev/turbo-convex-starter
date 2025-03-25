"use client";

import React from "react";
import Link from "next/link";

import { Button } from "@workspace/ui/components/button";
import { User } from "@/config/types";
import { UserMenu } from "@/components/shared/user-menu";
import { useLogin } from "@/features/auth/hooks/use-login";

interface RightMenuProps {
  user: User | null;
  hasAccess: boolean;
}

const LoginButton = () => {
  const { setOpen } = useLogin();
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => setOpen(true)}
      aria-label="Open login modal"
      className="rounded-lg"
    >
      Log in
    </Button>
  );
};

const DashboardButton = () => (
  <Button asChild variant="secondary" size="sm" className="rounded-lg">
    <Link href="/dashboard" aria-label="Go to dashboard">
      Dashboard
    </Link>
  </Button>
);

const GetStartedButton = ({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => (
  <Button asChild variant="secondary" size="sm" className="rounded-lg">
    <Link href="/#pricing" onClick={onClick} aria-label="View pricing">
      Get Started
    </Link>
  </Button>
);

export const RightMenu = ({ user, hasAccess }: RightMenuProps) => {
  const handlePricingScroll = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const pricingSection = document.getElementById("pricing");
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  return (
    <nav
      className="hidden lg:flex items-center gap-4 w-full justify-end"
      aria-label="User navigation"
    >
      {!user && <LoginButton />}

      {user && (
        <>
          <div className="hidden lg:flex">
            {hasAccess ? (
              <DashboardButton />
            ) : (
              <GetStartedButton onClick={handlePricingScroll} />
            )}
          </div>
          <div className="hidden lg:flex">
            <UserMenu user={user} />
          </div>
        </>
      )}
    </nav>
  );
};
