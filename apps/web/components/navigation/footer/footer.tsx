import Logo from "@/components/shared/logo";
import Link from "next/link";
import { footerLinks } from "@/config/constants";
import GithubIcon from "@/components/icons/github-icon";
import XIcon from "@/components/icons/x-icon";
import ThemeToggle from "@/components/shared/theme-toggle";
import Container from "@/components/shared/container";

const GithubButton = () => (
  <Link
    href="https://github.com/asadkomidev/turbo-convex-starter"
    target="_blank"
    aria-label="Go to GitHub"
  >
    <GithubIcon />
  </Link>
);

const XButton = () => (
  <Link href="https://x.com/AsadKomi" target="_blank" aria-label="Go to X">
    <XIcon />
  </Link>
);

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
            <GithubButton />
            <XButton />
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </footer>
  );
};
