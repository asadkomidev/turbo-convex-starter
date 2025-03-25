"use client";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

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
                New
              </span>
              <span className="text-sm">Introduction Tailus UI Html</span>
              <span className="bg-(--color-border) block h-4 w-px"></span>

              <ArrowRight className="size-4" />
            </Link>

            <h1 className="mt-8 text-4xl font-semibold md:text-5xl xl:text-5xl xl:[line-height:1.125]">
              Tame the Wild West <br /> of Frontend Development
            </h1>
            <p className="mx-auto mt-8 hidden max-w-2xl text-wrap text-lg sm:block">
              Tailwindcss highly customizable components for building modern
              websites and applications that look and feel the way you mean it.
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-wrap sm:hidden">
              Highly customizable components for building modern websites and
              applications, with your personal spark.
            </p>

            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="#">
                  <Rocket className="relative size-4" />
                  <span className="text-nowrap">Start Building</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
