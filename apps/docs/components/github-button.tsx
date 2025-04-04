import GithubIcon from "@/components/github-icon";
import Link from "next/link";
import React from "react";

export const GithubButton = () => {
  return (
    <Link
      href="https://github.com/asadkomidev/turbo-convex-starter"
      className="bg-transparent border-none flex items-center gap-2 hover:bg-accent p-2 rounded-md transition-colors cursor-pointer"
      aria-label="Go to GitHub"
    >
      <GithubIcon className="size-4" />
    </Link>
  );
};
