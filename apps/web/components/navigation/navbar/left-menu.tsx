import Link from "next/link";
import React from "react";

import Logo from "@/components/shared/logo";

const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL;

export const LeftMenu = () => {
  return (
    <div className="flex items-center justify-between gap-12 w-full relative">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          aria-label="Go to homepage"
          className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <Logo className="w-6 h-6" />
        </Link>
        <div className="flex items-center gap-4 px-4">
          <Link
            href={DOCS_URL || "/"}
            target="_blank"
            aria-label="Go to docs"
            className="text-muted-foreground hover:text-primary"
          >
            Docs
          </Link>
        </div>
      </div>
    </div>
  );
};
