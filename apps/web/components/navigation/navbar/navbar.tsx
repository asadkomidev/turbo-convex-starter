"use client";

import React from "react";
import { useScroll } from "motion/react";

import { cn } from "@workspace/ui/lib/utils";
import Container from "@/components/shared/container";
import { User } from "@/config/types";

import { MobileMenu } from "./mobile-menu";
import { LeftMenu } from "./left-menu";
import { RightMenu } from "./right-menu";
import { CenterMenu } from "./center-menu";

interface NavbarProps {
  user: User | null;
  isSubscribed: boolean;
}

export const Navbar = ({ user, isSubscribed }: NavbarProps) => {
  const [menuState, setMenuState] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const { scrollYProgress } = useScroll();

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrolled(latest > 0);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const toggleMenu = React.useCallback(() => {
    setMenuState((prev) => !prev);
  }, []);

  return (
    <header className="pb-16">
      <nav
        data-state={menuState ? "active" : "inactive"}
        className={cn(
          "fixed z-20 w-full  transition-colors duration-150 bg-background/50 backdrop-blur-sm",
          scrolled && "border-b",
          menuState && "h-full transition-height"
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <Container className="w-full">
          <div className="relative flex items-center justify-between py-3">
            <LeftMenu />
            <CenterMenu />
            <RightMenu user={user} hasAccess={isSubscribed} />
          </div>
          <MobileMenu user={user} isOpen={menuState} onToggle={toggleMenu} />
        </Container>
      </nav>
    </header>
  );
};
