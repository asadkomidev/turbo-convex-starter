import Logo from "@/components/shared/logo";

import ThemeToggle from "@/components/shared/theme-toggle";
import Container from "@/components/shared/container";
import { GithubLink } from "../shared/github-link";
import { XLink } from "../shared/x-link";

export const Footer = () => {
  return (
    <footer className="pt-20 dark:bg-transparent">
      <Container className="">
        <div className="mt-12 flex flex-wrap items-end justify-between gap-6 pb-6">
          <div className="flex items-end order-last md:order-first space-x-4">
            <Logo className="w-6 h-6" />
            <span className="text-muted-foreground  block text-center text-sm ">
              Built by Asad Komi
            </span>
          </div>
          <div className="order-first flex items-center justify-center gap-4 text-sm md:order-last">
            <GithubLink />
            <XLink />
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </footer>
  );
};
