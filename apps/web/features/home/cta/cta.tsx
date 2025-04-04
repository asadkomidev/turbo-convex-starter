import React from "react";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import { Github, Star } from "lucide-react";
import {
  AppSection,
  AppSectionHeader,
  AppSectionContent,
  AppSectionTitle,
  AppSectionDescription,
} from "@/components/app/app-section";

export const CTA = () => {
  return (
    <AppSection className=" px-4 lg:px-8 mx-auto max-w-5xl">
      <div className="border rounded-3xl py-24">
        <AppSectionHeader className="w-full">
          <AppSectionTitle className=" ">
            Start Building Your Next Project
          </AppSectionTitle>
          <AppSectionDescription className=" ">
            {" "}
            Everything you need to know about our starter kit
          </AppSectionDescription>
        </AppSectionHeader>
        <AppSectionContent>
          <div className="mt-12 flex flex-wrap justify-center gap-4 lg:gap-6">
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
        </AppSectionContent>
      </div>
    </AppSection>
  );
};
