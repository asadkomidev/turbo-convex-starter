import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

import { cn } from "@workspace/ui/lib/utils";
import ThemeToggle from "@/components/shared/theme-toggle";
import { Button } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";

import { menuItems } from "@/config/constants";
import { User } from "@auth/core/types";

interface MobileMenuProps {
  user: User | null;
  isOpen: boolean;
  onToggle: () => void;
}

interface UserSectionProps {
  user: User;
  onSignOut: () => Promise<void>;
}

const MenuToggle = ({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <button
    onClick={onToggle}
    aria-label={isOpen ? "Close Menu" : "Open Menu"}
    aria-expanded={isOpen}
    className="fixed z-20 -m-2.5 block cursor-pointer p-2.5 lg:hidden top-4 right-4"
  >
    <Menu
      className={cn(
        "m-auto size-6 duration-200 in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0",
        isOpen && "rotate-180 scale-0 opacity-0"
      )}
    />
    <X
      className={cn(
        "absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200 in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100",
        isOpen && "rotate-0 scale-100 opacity-100"
      )}
    />
  </button>
);

const UserSection = ({ user }: UserSectionProps) => (
  <>
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
    {/* <Separator /> */}
  </>
);

const MenuItems = () => (
  <ul className="space-y-6 text-base">
    {menuItems.map((item, index) => (
      <li key={index}>
        <Link
          href={item.href}
          className="text-muted-foreground hover:text-accent-foreground block duration-150"
        >
          <span>{item.name}</span>
        </Link>
      </li>
    ))}
  </ul>
);

export const MobileMenu = ({ user, isOpen, onToggle }: MobileMenuProps) => {
  const router = useRouter();
  const { signOut } = useAuthActions();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <>
      <MenuToggle isOpen={isOpen} onToggle={onToggle} />
      <div
        data-state={isOpen ? "active" : "inactive"}
        className={cn(
          "bg-background lg:hidden mb-6 w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-xl md:flex-nowrap lg:m-0 md:max-w-[300px] md:ml-auto lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none",
          isOpen ? "block" : "hidden"
        )}
        aria-hidden={!isOpen}
      >
        <div className="lg:hidden space-y-6">
          {user && <UserSection user={user} onSignOut={handleSignOut} />}
          {/* <MenuItems /> */}
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
