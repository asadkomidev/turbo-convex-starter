"use client";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CopyText } from "@/components/shared/copy-text";

export const HeroSection = () => {
  return (
    <section className="relative">
      <div className="relative py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center sm:mx-auto sm:w-10/12 lg:mr-auto lg:mt-0 lg:w-4/5">
            <Link
              href="/"
              className="rounded-(--radius) mx-auto flex w-fit items-center gap-2 border p-1 pr-3"
            >
              <span className="bg-muted rounded-[calc(var(--radius)-0.25rem)] px-2 py-1 text-xs">
                Featured
              </span>
              <span className="text-sm">Modern Full-Stack Starter Kit</span>
              <span className="bg-(--color-border) block h-4 w-px"></span>
              <ArrowRight className="size-4" />
            </Link>

            <h1 className="mt-8 text-4xl font-semibold md:text-5xl xl:text-5xl xl:[line-height:1.125]">
              Build Faster with Modern <br /> Full-Stack Architecture
            </h1>
            <p className="mx-auto text-muted-foreground mt-8 hidden max-w-2xl text-wrap text-lg sm:block">
              Launch your next project with a powerful stack: Turborepo, Next.js
              14, Convex, Shadcn/UI, and TailwindCSS. Everything you need for
              rapid development with built-in payments via Polar.sh.
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-wrap sm:hidden">
              Launch your next project with a modern full-stack architecture and
              built-in payments system.
            </p>

            <div className="mt-8">
              <div className="mt-10 mb-8">
                <CopyText value="npm create @tcn-dev/tcn" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
