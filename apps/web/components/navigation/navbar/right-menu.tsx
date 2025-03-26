"use client";

import React from "react";
import Link from "next/link";

import { Button } from "@workspace/ui/components/button";
import { User } from "@/config/types";
import { UserMenu } from "@/components/shared/user-menu";
import { useLogin } from "@/features/auth/hooks/use-login";
import GithubIcon from "@/components/icons/github-icon";
import XIcon from "@/components/icons/x-icon";

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

const GithubButton = () => (
  <Link
    href="https://github.com/asadkomidev/turbo-convex-starter"
    target="_blank"
    aria-label="Go to GitHub"
  >
    <GithubIcon />
  </Link>
);

const XButton = () => (
  <Link href="https://x.com/AsadKomi" target="_blank" aria-label="Go to X">
    <XIcon />
  </Link>
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
      <GithubButton />
      <XButton />
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
