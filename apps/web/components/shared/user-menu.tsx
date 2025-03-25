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

import ThemeToggle from "./theme-toggle";

interface UserMenuProps {
  user: User | null;
}

export const UserMenu: FC<UserMenuProps> = ({ user }) => {
  const router = useRouter();
  const { signOut } = useAuthActions();

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const onSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none cursor-pointer">
        <Avatar className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-300">
          <AvatarImage src={user?.image} />
          <AvatarFallback className="text-white text-sm sr-only">
            {initials || "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-56 rounded-3xl border p-6 shadow-xl mt-2 space-y-2"
      >
        <DropdownMenuLabel className="">
          <div className="flex flex-col space-y-2">
            <p className=" leading-none ">{user?.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuItem
          onClick={() => router.push("/dashboard")}
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
            onClick={onSignOut}
          >
            Logout
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
