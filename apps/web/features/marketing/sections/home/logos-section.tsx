/* eslint-disable @next/next/no-img-element */
import React from "react";
import { InfiniteSlider } from "./components/infinite-slider";

import ConvexIcon from "@/components/icons/convex-icon";
import TurborepoIcon from "@/components/icons/turborepo-icon";
import NextjsIcon from "@/components/icons/nextjs-icon";
import TailwindIcon from "@/components/icons/tailwind-icon";
import ShadcnIcon from "@/components/icons/shadcn-icon";
import PolarIcon from "@/components/icons/polar-icon";
import TypeScriptIcon from "@/components/icons/typescript-icon";
import ResendIcon from "@/components/icons/resend-icon";

export const LogosSection = () => {
  return (
    <div className="relative w-full">
      <section className="">
        <div className="group relative w-full">
          <div className="flex flex-col items-start md:flex-row mx-auto max-w-5xl overflow-hidden">
            <div className="md:pr-8 flex items-center md:items-start mx-auto pb-6 md:pb-0 min-w-32">
              <p className="text-sm">Built with modern tech</p>
            </div>
            <div className="relative">
              <InfiniteSlider
                speedOnHover={20}
                speed={40}
                gap={112}
                className=""
              >
                <div className="">
                  <TurborepoIcon />
                </div>

                <div className="">
                  <NextjsIcon />
                </div>

                <div className="">
                  <ConvexIcon />
                </div>

                <div className="">
                  <ShadcnIcon />
                </div>
                <div className="">
                  <ResendIcon />
                </div>

                <div className="">
                  <TailwindIcon />
                </div>
                <div className="">
                  <TypeScriptIcon />
                </div>

                <div className="">
                  <PolarIcon />
                </div>
              </InfiniteSlider>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
