import { Navbar } from "nextra-theme-docs";
import { GithubButton } from "@/components/github-button";
import ThemeToggle from "@/components/theme-toggle";

export const navbar = (
  <Navbar
    logo={
      <>
        <svg
          viewBox="0 0 102 102"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
        >
          <path
            d="M50.5 2L1 101.5H26.5L50.5 54L74.5 101.5H100.5L50.5 2Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M50.5 71L35 101.5H66L50.5 71Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </>
    }
    className="!h-12"
  >
    <div className="gap-1 flex items-center">
      <GithubButton />
      <ThemeToggle />
    </div>
  </Navbar>
);
