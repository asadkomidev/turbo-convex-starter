"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { SignInFunctionType } from "@/config/types";
import { codeSchema, CodeSchemaType } from "@/config/schema";

import { useStepEmail } from "../hooks/use-step-email";
import { useIsPending } from "../hooks/use-is-pending";
import { useLogin } from "../hooks/use-login";

type CodeFormProps = {
  signIn: SignInFunctionType;
};

export const CodeForm: React.FC<CodeFormProps> = ({ signIn }) => {
  const { setStep, email } = useStepEmail();
  const { isPending, setIsPending } = useIsPending();
  const { setOpen } = useLogin();

  const form = useForm({
    resolver: zodResolver(codeSchema),
    defaultValues: { code: "", email },
  });

  const onSubmit = async (values: CodeSchemaType) => {
    try {
      setIsPending(true);
      signIn("resend-otp", values);

      setTimeout(() => {
        setOpen(false);
        setStep("email");
      }, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your code"
                    type="text"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            Verify
          </Button>
        </form>
      </Form>
    </div>
  );
};
