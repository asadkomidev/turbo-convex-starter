import { InfiniteSlider } from "./components/infinite-slider";

import {
  ConvexLogo,
  TurborepoLogo,
  NextjsLogo,
  TailwindLogo,
  ShadcnLogo,
  PolarLogo,
  TypeScriptLogo,
  ResendLogo,
} from "./logos/logos";
import { AppSection, AppSectionContent } from "@/components/app/app-section";

export const Technologies = () => {
  return (
    <AppSection className="relative !py-0 w-full">
      <AppSectionContent className="px-4 mx-auto max-w-5xl">
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
                <TurborepoLogo className="size-11" />
                <NextjsLogo className="size-12" />
                <ShadcnLogo className="size-12" />
                <ConvexLogo className="size-18" />
                <ResendLogo className="size-16" />
                <TypeScriptLogo className="size-10 mt-1" />
                <TailwindLogo className="size-16 pb-4" />
                <PolarLogo className="size-11" />
              </InfiniteSlider>
            </div>
          </div>
        </div>
      </AppSectionContent>
    </AppSection>
  );
};
