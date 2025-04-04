"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { User } from "@/config/types";
import ThemeToggle from "@/components/shared/theme-toggle";

interface UserMenuProps {
  user: User | null;
}

const getInitials = (name?: string): string => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export const UserMenu: FC<UserMenuProps> = ({ user }) => {
  const router = useRouter();
  const { signOut } = useAuthActions();

  const initials = getInitials(user?.name);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  const handleDashboardNavigation = () => {
    router.push("/dashboard");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none cursor-pointer">
        <Avatar className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-300">
          <AvatarImage src={user?.image} alt={user?.name || "User avatar"} />
          <AvatarFallback className="text-white text-sm sr-only">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-56 rounded-3xl border p-6 shadow-xl mt-2 space-y-2"
      >
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-2">
            <p className="leading-none">{user?.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuItem
          onClick={handleDashboardNavigation}
          className="rounded-lg h-10 text-muted-foreground hover:text-primary cursor-pointer mt-2"
        >
          Dashboard
        </DropdownMenuItem>

        <DropdownMenuItem className="rounded-lg h-10 flex items-center justify-between text-muted-foreground hover:text-primary cursor-pointer">
          Theme
          <ThemeToggle />
        </DropdownMenuItem>

        <div className="space-y-3 mt-6">
          <Button
            variant="outline"
            className="w-full rounded-lg"
            onClick={handleSignOut}
          >
            Logout
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
