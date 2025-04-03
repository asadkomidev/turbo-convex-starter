"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { User } from "@/config/types";
import { useLogin } from "@/features/auth/hooks/use-login";
import { GithubLink } from "../shared/github-link";
import { XLink } from "../shared/x-link";
import { UserMenu } from "./user-menu";

interface RightMenuProps {
  user: User | null;
  hasAccess: boolean;
}

interface GetStartedButtonProps {
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const LoginButton: React.FC = () => {
  const { setOpen } = useLogin();

  const handleLogin = React.useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={handleLogin}
      aria-label="Open login modal"
      className="rounded-lg"
    >
      Log in
    </Button>
  );
};

const DashboardButton: React.FC = () => (
  <Button asChild variant="secondary" size="sm" className="rounded-lg">
    <Link href="/dashboard" aria-label="Go to dashboard">
      Dashboard
    </Link>
  </Button>
);

const GetStartedButton: React.FC<GetStartedButtonProps> = ({ onClick }) => (
  <Button asChild variant="secondary" size="sm" className="rounded-lg">
    <Link href="/#pricing" onClick={onClick} aria-label="View pricing">
      Get Started
    </Link>
  </Button>
);

export const RightMenu: React.FC<RightMenuProps> = ({ user, hasAccess }) => {
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

  const renderAuthenticatedContent = () => (
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
  );

  return (
    <nav
      className="hidden lg:flex items-center gap-4 w-full justify-end"
      aria-label="User navigation"
    >
      <GithubLink />
      <XLink />
      {!user && <LoginButton />}
      {user && renderAuthenticatedContent()}
    </nav>
  );
};
