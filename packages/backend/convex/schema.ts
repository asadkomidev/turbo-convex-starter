import { defineSchema } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { usersTables } from "./tables/users";
import { subscriptionsTables } from "./tables/subscriptions";
import { webhooksTables } from "./tables/webhooks";
import { plansTables } from "./tables/plans";

const schema = defineSchema({
  ...authTables,
  ...usersTables,
  ...subscriptionsTables,
  ...webhooksTables,
  ...plansTables,
});

export default schema;
