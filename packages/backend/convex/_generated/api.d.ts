/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as config_polar from "../config/polar.js";
import type * as config_utils from "../config/utils.js";
import type * as customers_tables from "../customers/tables.js";
import type * as emails_ResendOTP from "../emails/ResendOTP.js";
import type * as emails_templates_verification from "../emails/templates/verification.js";
import type * as files from "../files.js";
import type * as http from "../http.js";
import type * as plans_queries from "../plans/queries.js";
import type * as plans_tables from "../plans/tables.js";
import type * as subscriptions_actions from "../subscriptions/actions.js";
import type * as subscriptions_helpers from "../subscriptions/helpers.js";
import type * as subscriptions_mutations from "../subscriptions/mutations.js";
import type * as subscriptions_queries from "../subscriptions/queries.js";
import type * as subscriptions_tables from "../subscriptions/tables.js";
import type * as users_actions from "../users/actions.js";
import type * as users_internals from "../users/internals.js";
import type * as users_mutations from "../users/mutations.js";
import type * as users_queries from "../users/queries.js";
import type * as users_tables from "../users/tables.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  "config/polar": typeof config_polar;
  "config/utils": typeof config_utils;
  "customers/tables": typeof customers_tables;
  "emails/ResendOTP": typeof emails_ResendOTP;
  "emails/templates/verification": typeof emails_templates_verification;
  files: typeof files;
  http: typeof http;
  "plans/queries": typeof plans_queries;
  "plans/tables": typeof plans_tables;
  "subscriptions/actions": typeof subscriptions_actions;
  "subscriptions/helpers": typeof subscriptions_helpers;
  "subscriptions/mutations": typeof subscriptions_mutations;
  "subscriptions/queries": typeof subscriptions_queries;
  "subscriptions/tables": typeof subscriptions_tables;
  "users/actions": typeof users_actions;
  "users/internals": typeof users_internals;
  "users/mutations": typeof users_mutations;
  "users/queries": typeof users_queries;
  "users/tables": typeof users_tables;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
