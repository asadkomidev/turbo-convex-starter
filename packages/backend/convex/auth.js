import { convexAuth } from "@convex-dev/auth/server";
import Github from "@auth/core/providers/github";

import { ResendOTP } from "./emails/ResendOTP";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Github, ResendOTP],
});
