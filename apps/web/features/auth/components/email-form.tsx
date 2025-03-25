"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { EmailSchemaType, emailSchema } from "@/config/schema";
import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";

import { useIsPending } from "../hooks/use-is-pending";
import { useStepEmail } from "../hooks/use-step-email";
import { SignInFunctionType } from "@/config/types";

type EmailFormProps = {
  signIn: SignInFunctionType;
};

export const EmailForm: React.FC<EmailFormProps> = ({ signIn }) => {
  const { isPending, setIsPending } = useIsPending();

  const { setStep, setEmail } = useStepEmail();

  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: EmailSchemaType) => {
    try {
      setIsPending(true);
      signIn("resend-otp", values)
        .then(() => {
          setEmail(values.email);
          setStep("code");
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsPending(false);
        });
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    type="email"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};
