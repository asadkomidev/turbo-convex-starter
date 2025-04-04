"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { cn } from "@workspace/ui/lib/utils";
import ThemeToggle from "@/components/shared/theme-toggle";
import { Button } from "@workspace/ui/components/button";
import { User } from "@auth/core/types";

interface MobileMenuProps {
  user: User | null;
  isOpen: boolean;
  onToggle: () => void;
}

interface MenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface UserSectionProps {
  user: User;
}

const UserSection: React.FC<UserSectionProps> = ({ user }) => (
  <ul className="space-y-6 text-base">
    <li>
      <div className="hover:text-accent-foreground block duration-150">
        <span>{user.email || ""}</span>
      </div>
    </li>
    <li>
      <Link
        href="/dashboard"
        className="text-muted-foreground hover:text-accent-foreground block duration-150"
      >
        <span>Dashboard</span>
      </Link>
    </li>
    <li className="w-full">
      <div className="w-full text-muted-foreground hover:text-accent-foreground flex items-center justify-between duration-150">
        <span>Theme</span>
        <ThemeToggle />
      </div>
    </li>
  </ul>
);

const MenuToggle: React.FC<MenuToggleProps> = ({ isOpen, onToggle }) => {
  const buttonLabel = isOpen ? "Close Menu" : "Open Menu";
  
  const menuIconClasses = cn(
    "m-auto size-6 duration-200 in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0",
    isOpen && "rotate-180 scale-0 opacity-0"
  );

  const closeIconClasses = cn(
    "absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200 in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100",
    isOpen && "rotate-0 scale-100 opacity-100"
  );

  return (
    <button
      onClick={onToggle}
      aria-label={buttonLabel}
      aria-expanded={isOpen}
      className="fixed z-20 -m-2.5 block cursor-pointer p-2.5 lg:hidden top-4 right-4"
    >
      <Menu className={menuIconClasses} />
      <X className={closeIconClasses} />
    </button>
  );
};

export const MobileMenu: React.FC<MobileMenuProps> = ({ user, isOpen, onToggle }) => {
  const router = useRouter();
  const { signOut } = useAuthActions();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  const menuClasses = cn(
    "bg-background lg:hidden mb-6 w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-xl md:flex-nowrap lg:m-0 md:max-w-[300px] md:ml-auto lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none",
    isOpen ? "block" : "hidden"
  );

  return (
    <>
      <MenuToggle isOpen={isOpen} onToggle={onToggle} />
      <div
        data-state={isOpen ? "active" : "inactive"}
        className={menuClasses}
        aria-hidden={!isOpen}
      >
        <div className="lg:hidden space-y-6">
          {user && <UserSection user={user} />}
          <div className="space-y-3">
            {!user && (
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/sign-in">
                  <span>Login</span>
                </Link>
              </Button>
            )}
            {user && (
              <Button
                variant="outline"
                className="w-full rounded-lg"
                onClick={handleSignOut}
                aria-label="Logout"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
