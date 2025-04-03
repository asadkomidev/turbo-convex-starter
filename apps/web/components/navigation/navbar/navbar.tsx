"use client";

import React from "react";
import { useScroll } from "motion/react";
import { cn } from "@workspace/ui/lib/utils";
import Container from "@/components/shared/container";
import { User } from "@/config/types";
import { MobileMenu } from "./mobile-menu";
import { LeftMenu } from "./left-menu";
import { RightMenu } from "./right-menu";

interface NavbarProps {
  user: User | null;
  isSubscribed: boolean;
}

const SCROLL_THRESHOLD = 0;

export const Navbar: React.FC<NavbarProps> = ({ user, isSubscribed }) => {
  const [menuState, setMenuState] = React.useState<boolean>(false);
  const [scrolled, setScrolled] = React.useState<boolean>(false);

  const { scrollYProgress } = useScroll();

  React.useEffect(() => {
    const handleScroll = (latest: number) => {
      setScrolled(latest > SCROLL_THRESHOLD);
    };

    const unsubscribe = scrollYProgress.on("change", handleScroll);
    
    return () => {
      unsubscribe();
    };
  }, [scrollYProgress]);

  const toggleMenu = React.useCallback(() => {
    setMenuState((prev) => !prev);
  }, []);

  const navClasses = cn(
    "fixed z-20 w-full transition-colors duration-150 bg-background/50 backdrop-blur-sm",
    scrolled && "border-b",
    menuState && "h-full transition-height"
  );

  return (
    <header className="pb-16">
      <nav
        data-state={menuState ? "active" : "inactive"}
        className={navClasses}
        role="navigation"
        aria-label="Main navigation"
      >
        <Container className="w-full">
          <div className="relative flex items-center justify-between py-3">
            <LeftMenu />
            <RightMenu user={user} hasAccess={isSubscribed} />
          </div>
          <MobileMenu 
            user={user} 
            isOpen={menuState} 
            onToggle={toggleMenu} 
          />
        </Container>
      </nav>
    </header>
  );
};
