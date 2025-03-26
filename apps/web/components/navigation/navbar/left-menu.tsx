import Link from "next/link";
import React from "react";

import Logo from "@/components/shared/logo";

export const LeftMenu = () => {
  return (
    <div className="flex items-center justify-between gap-12 w-full relative">
      <Link
        href="/"
        aria-label="Go to homepage"
        className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <Logo className="w-6 h-6" />
      </Link>
    </div>
  );
};
