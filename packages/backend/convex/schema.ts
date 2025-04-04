import { defineSchema } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { usersTables } from "./users/tables";
import { subscriptionsTables } from "./subscriptions/tables";
import { plansTables } from "./plans/tables";
import { customersTables } from "./customers/tables";

const schema = defineSchema({
  ...authTables,
  ...usersTables,
  ...subscriptionsTables,
  ...plansTables,
  ...customersTables,
});

export default schema;
