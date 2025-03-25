import Link from "next/link";
import React from "react";

import { menuItems } from "@/config/constants";
import { cn } from "@workspace/ui/lib/utils";

export const CenterMenu = () => {
  return (
    <nav
      className="hidden lg:flex items-center justify-center w-full"
      aria-label="Main menu"
    >
      <ul className="flex gap-8 text-sm">
        {menuItems.map((item, index) => (
          <li key={index} role="none">
            <Link
              href={item.href}
              className={cn(
                "text-muted-foreground hover:text-accent-foreground block duration-150",
                "focus:outline-none rounded-sm px-2 py-1"
              )}
              role="menuitem"
            >
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
