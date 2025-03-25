"use client";

import {
  BadgeCheck,
  ChevronsUpDown,
  CreditCard,
  Home,
  LogOut,
  Sparkles,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components/sidebar";
import { useUser } from "@/hooks/use-user";
import { useSignOut } from "@/hooks/use-sign-out";
import { useAccess } from "@/hooks/use-access";
import { useSettings } from "@/hooks/use-settings";
import { Skeleton } from "@workspace/ui/components/skeleton";
import ThemeToggle from "@/features/dashboard/account/components/theme-toggle";

import { useQuery } from "convex/react";
import { api } from "@workspace/backend/convex/_generated/api";
import { useRouter } from "next/navigation";

export const AccountSettings = () => {
  const { isMobile } = useSidebar();
  const router = useRouter();

  const { user, isLoading } = useUser();
  const signout = useSignOut();
  const hasAccess = useAccess();
  const subscription = useQuery(api.subscriptions.queries.getUserSubscription);

  const { setOpenUpgrade, setOpenAccount, setOpenBilling } = useSettings();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.image} alt={user?.name || ""} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              {isLoading ? (
                <div className="grid flex-1 text-left text-sm leading-tight space-y-1.5">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-2.5 w-24" />
                </div>
              ) : (
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-xs">
                    {user?.name || ""}
                  </span>
                  <span className="truncate text-xs">{user?.email || ""}</span>
                </div>
              )}
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "top"}
            align="center"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {!hasAccess ||
              (subscription?.plan?.toLowerCase() === "free" && (
                <>
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setOpenUpgrade(true)}>
                      <Sparkles />
                      Upgrade to Pro
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                </>
              ))}

            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setOpenAccount(true)}>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenBilling(true)}>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/")}>
                <Home />
                Home Page
              </DropdownMenuItem>
              {/* <DropdownMenuItem onClick={() => setOpenNotification(true)}>
                <Bell />
                Notifications
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <ThemeToggle />
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
