"use client";

import { useAuthActions } from "@convex-dev/auth/react";

import { Divider } from "./components/divider";
import { EmailForm } from "./components/email-form";
import { GithubAuthButton } from "./components/github-auth-button";
import { useStepEmail } from "./hooks/use-step-email";
import { CodeForm } from "./components/code-form";
import Link from "next/link";
import Logo from "@/components/shared/logo";
import { cn } from "@workspace/ui/lib/utils";

interface SignInScreenProps {
  modal?: boolean;
}

export const SignInScreen = ({ modal }: SignInScreenProps) => {
  const { step } = useStepEmail();
  const { signIn } = useAuthActions();

  return (
    <div
      className={cn(
        "flex flex-col space-y-4 items-center justify-center",
        modal
          ? ""
          : "flex flex-col space-y-4 items-center justify-center h-screen w-full p-4 sm:max-w-[400px] mx-auto pb-32 "
      )}
    >
      <div className="w-full pb-4">
        <Link href="/" aria-label="go home">
          <Logo className="w-10 h-10" />
        </Link>
        <h1 className="mb-1 mt-4 text-lg font-semibold">Sign In</h1>
      </div>
      <GithubAuthButton signIn={signIn} />
      <Divider />
      <div className="flex w-full flex-col gap-6 mt-6">
        {step === "email" && <EmailForm signIn={signIn} />}
        {step === "code" && <CodeForm signIn={signIn} />}
      </div>
    </div>
  );
};
