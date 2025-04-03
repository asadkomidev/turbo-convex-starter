import Link from "next/link";
import GithubIcon from "@/components/icons/github-icon";

export const GithubLink = () => (
  <Link
    href="https://github.com/asadkomidev/turbo-convex-starter"
    target="_blank"
    aria-label="Go to GitHub"
  >
    <GithubIcon />
  </Link>
);
