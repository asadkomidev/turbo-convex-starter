import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Define your environment variables configuration
export default {
  // Environment Variables
  env: v.object({
    POLAR_ORGANIZATION_ID: v.string(),
    POLAR_ACCESS_TOKEN: v.string(),
  }),
};
