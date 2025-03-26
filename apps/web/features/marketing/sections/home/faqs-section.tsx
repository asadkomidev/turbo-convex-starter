import React from "react";

export const FAQsSection = () => {
  return (
    <section className="scroll-py-16 py-16 md:scroll-py-32 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-y-12 px-2 lg:[grid-template-columns:1fr_auto]">
          <div className="text-center lg:text-left">
            <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
              Common <br className="hidden lg:block" /> Questions{" "}
              <br className="hidden lg:block" />
              Answered
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about our starter kit
            </p>
          </div>

          <div className="divide-y divide-dashed sm:mx-auto sm:max-w-lg lg:mx-0">
            <div className="pb-6">
              <h3 className="font-medium">What technologies are included?</h3>
              <p className="text-muted-foreground mt-4">
                Our starter kit includes a powerful modern stack:
              </p>

              <ul className="list-outside list-disc space-y-2 pl-4">
                <li className="text-muted-foreground mt-4">
                  Turborepo for monorepo management and build optimization
                </li>
                <li className="text-muted-foreground mt-4">
                  Next.js 14 with App Router for React applications
                </li>
                <li className="text-muted-foreground mt-4">
                  Convex for real-time backend and state management
                </li>
                <li className="text-muted-foreground mt-4">
                  Shadcn/UI and TailwindCSS for beautiful, responsive UI
                </li>
                <li className="text-muted-foreground mt-4">
                  Polar.sh for integrated payments and subscriptions
                </li>
              </ul>
            </div>
            <div className="py-6">
              <h3 className="font-medium">How is the monorepo structured?</h3>
              <p className="text-muted-foreground mt-4">
                The monorepo is organized into apps and packages. Apps contain
                your Next.js applications, while packages contain shared UI
                components, utilities, and configurations that can be reused
                across apps.
              </p>
            </div>
            <div className="py-6">
              <h3 className="font-medium">
                How do I handle authentication and data?
              </h3>
              <p className="text-muted-foreground my-4">
                Authentication and data management are handled through Convex,
                which provides:
              </p>
              <ul className="list-outside list-disc space-y-2 pl-4">
                <li className="text-muted-foreground">
                  Built-in authentication with multiple providers
                </li>
                <li className="text-muted-foreground">
                  Real-time data synchronization across clients
                </li>
                <li className="text-muted-foreground">
                  Automatic cache invalidation and optimistic updates
                </li>
              </ul>
            </div>
            <div className="py-6">
              <h3 className="font-medium">How do I process payments?</h3>
              <p className="text-muted-foreground mt-4">
                Payments are handled through Polar.sh, which provides a complete
                payment infrastructure. You can easily set up subscriptions,
                process one-time payments, and manage customer billing through
                their dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
