import React from "react";
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import { Blocks, Zap, Rocket } from "lucide-react";
import { ReactNode } from "react";

export const FeaturesSection = () => {
  return (
    <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Modern Development Stack
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to build and scale your next project with
            confidence
          </p>
        </div>
        <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
          <Card className="group shadow-none">
            <CardHeader className=" ">
              <CardDecorator>
                <Blocks className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Monorepo Architecture</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground">
                Turborepo powered monorepo setup with Next.js 14 apps and shared
                packages for maximum code reuse and development efficiency.
              </p>
            </CardContent>
          </Card>

          <Card className="group shadow-none">
            <CardHeader className="">
              <CardDecorator>
                <Zap className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Real-Time Backend</h3>
            </CardHeader>

            <CardContent>
              <p className="mt-3 text-sm text-muted-foreground  ">
                Built with Convex for real-time state management, automatic
                cache updates, and seamless data synchronization across clients.
              </p>
            </CardContent>
          </Card>

          <Card className="group shadow-none">
            <CardHeader className="">
              <CardDecorator>
                <Rocket className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Modern UI & Payments</h3>
            </CardHeader>

            <CardContent>
              <p className="mt-3 text-sm text-muted-foreground">
                Beautiful UI components with Shadcn/UI and TailwindCSS, plus
                integrated Polar.sh for seamless payment processing.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
    />
    <div
      aria-hidden
      className="bg-radial to-background absolute inset-0 from-transparent to-75%"
    />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
      {children}
    </div>
  </div>
);
