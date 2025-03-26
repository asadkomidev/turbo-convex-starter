import { Button } from "@workspace/ui/components/button";
import { ChevronRight, Github } from "lucide-react";
import Link from "next/link";
import React from "react";

export const AboutSection = () => {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          <h2 className="text-4xl font-medium">
            Build scalable applications with modern tools and best practices
          </h2>
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Our starter kit combines the best of modern web development:
              Turborepo for monorepo management, Next.js 14 for powerful React
              applications, and Convex for real-time backend capabilities.
            </p>
            <p className="text-muted-foreground">
              With{" "}
              <span className="font-bold text-primary">
                beautiful UI components from Shadcn/UI
              </span>{" "}
              and the flexibility of TailwindCSS, you can create stunning
              interfaces quickly. Plus, integrated Polar.sh payments make it
              easy to monetize your application from day one.
            </p>
            <Button asChild size="lg" className="rounded-xl">
              <Link
                href="https://github.com/asadkomidev/turbo-convex-starter"
                target="_blank"
              >
                <Github className="mr-2 size-4" />
                <span>View on GitHub</span>
                <ChevronRight className="size-3" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
