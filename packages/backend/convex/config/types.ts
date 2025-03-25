import { Infer } from "convex/values";
import { intervalValidator } from "./constants";
import { Doc } from "@convex-dev/auth/server";

export type Interval = Infer<typeof intervalValidator>;

export type User = Doc<"users"> & {
  avatarUrl?: string;
};
