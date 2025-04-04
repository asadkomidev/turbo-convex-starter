import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const HeroBadge = () => {
  return (
    <Link
      href="/"
      className="rounded-(--radius) mx-auto flex w-fit items-center gap-2 border p-1 pr-3"
    >
      <span className="bg-muted rounded-[calc(var(--radius)-0.25rem)] px-2 py-1 text-xs">
        Featured
      </span>
      <span className="text-xs md:text-sm">Modern Full-Stack Starter Kit</span>
      <span className="bg-(--color-border) block h-4 w-px"></span>
      <ArrowRight className="size-4" />
    </Link>
  );
};
