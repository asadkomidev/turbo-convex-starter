"use client";

import { FC, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormLabel } from "@workspace/ui/components/form";
import { FormControl } from "@workspace/ui/components/form";
import { Button } from "@workspace/ui/components/button";
import { FormMessage } from "@workspace/ui/components/form";
import { FormItem } from "@workspace/ui/components/form";
import { Textarea } from "@workspace/ui/components/textarea";
import { Copy } from "lucide-react";
import { Input } from "@workspace/ui/components/input";
import { Form } from "@workspace/ui/components/form";

import { api } from "@workspace/backend/convex/_generated/api";
import { toast } from "sonner";

import { useUser } from "@/hooks/use-user";
import { useSettings } from "@/hooks/use-settings";
import { ImageUpload } from "@/components/upload-image";

import { PhoneInput, phoneSchema } from "@workspace/ui/components/phone-input";

import { useAction, useMutation } from "convex/react";
import { Id } from "@workspace/backend/convex/_generated/dataModel";

import logger from "@/lib/debux";

const profileSchema = z.object({
  title: z.string(),
  location: z.string(),
  bio: z.string(),
  name: z.string(),
  phone: phoneSchema,
});

export const AccountForm: FC = () => {
  const [storageId, setStorageId] = useState<string | null>(null);

  const { setOpenAccount } = useSettings();

  const { user: userProfile } = useUser();

  const updateProfile = useAction(api.users.actions.updateUserProfileAction);
  const deleteImage = useMutation(api.users.mutations.deleteImage);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      title: userProfile?.title || "",
      location: userProfile?.location || "",
      bio: userProfile?.bio || "",

      name: userProfile?.name || "",
      phone: userProfile?.phone || "",
    },
  });

  async function onProfileSubmit(data: z.infer<typeof profileSchema>) {
    try {
      await updateProfile({
        ...data,
        imageId: (storageId as Id<"_storage">) || userProfile?.imageId,
      });

      toast.success("Profile updated successfully");
      setOpenAccount(false);
      setStorageId(null);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  }

  const handleDeleteImage = async () => {
    try {
      let res;
      if (userProfile?.imageId) {
        res = await deleteImage({
          imageId: userProfile.imageId,
        });
      } else {
        res = await deleteImage({
          imageId: storageId as Id<"_storage">,
        });
      }
      if (res) {
        toast.success("Logo deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete image");
    }
  };

  return (
    <div className="flex flex-col p-0">
      <Form {...form}>
        <form
          id="account-form"
          onSubmit={form.handleSubmit(onProfileSubmit)}
          className="space-y-4 my-6"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="">
                <ImageUpload
                  label=""
                  description=""
                  currentImage={userProfile?.image}
                  setStorageId={setStorageId}
                  onDelete={handleDeleteImage}
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">{userProfile?.name || ""}</h3>
                <p className="text-xs text-muted-foreground">
                  {userProfile?.title || ""}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{userProfile?.email || ""}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy email</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-[0.5px]" />

            <div className="flex items-start gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-xs font-normal text-muted-foreground">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g John"
                        {...field}
                        className="shadow-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-start gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-xs font-normal text-muted-foreground">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g Customer Support"
                        {...field}
                        className="shadow-none"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-start gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-xs font-normal text-muted-foreground">
                      Location
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g John"
                        {...field}
                        className="shadow-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-xs font-normal text-muted-foreground">
                      Phone
                    </FormLabel>
                    <FormControl>
                      <PhoneInput
                        {...field}
                        value={field.value}
                        placeholder="Enter your number"
                        className="shadow-none"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-normal text-muted-foreground">
                    Biography
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. I'm a software engineer with a passion for building products that help people."
                      className="min-h-[100px] shadow-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};
