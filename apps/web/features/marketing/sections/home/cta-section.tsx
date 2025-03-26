import React from "react";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import { Github, Star } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl rounded-3xl border px-6 py-12 md:py-20 lg:py-32">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Start Building Your Next Project
          </h2>
          <p className="mt-4 text-muted-foreground">
            Get started with our modern full-stack starter kit in minutes
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-xl">
              <Link
                href="https://github.com/asadkomidev/turbo-convex-starter"
                target="_blank"
              >
                <Github className="mr-2 size-4" />
                <span>Clone Repository</span>
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="rounded-xl">
              <Link
                href="https://github.com/asadkomidev/turbo-convex-starter"
                target="_blank"
              >
                <Star className="mr-2 size-4 text-green-500" />
                <span>Leave a Star</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
