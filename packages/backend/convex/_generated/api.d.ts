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
import type * as config_constants from "../config/constants.js";
import type * as config_polar from "../config/polar.js";
import type * as config_types from "../config/types.js";
import type * as config from "../config.js";
import type * as debux from "../debux.js";
import type * as emails_ResendOTP from "../emails/ResendOTP.js";
import type * as emails_SigninEmail from "../emails/SigninEmail.js";
import type * as emails_templates_verification from "../emails/templates/verification.js";
import type * as files from "../files.js";
import type * as helpers_common from "../helpers/common.js";
import type * as helpers_helpers from "../helpers/helpers.js";
import type * as http from "../http.js";
import type * as subscriptions_actions from "../subscriptions/actions.js";
import type * as subscriptions_internals from "../subscriptions/internals.js";
import type * as subscriptions_mutations from "../subscriptions/mutations.js";
import type * as subscriptions_queries from "../subscriptions/queries.js";
import type * as tables_subscriptions from "../tables/subscriptions.js";
import type * as tables_users from "../tables/users.js";
import type * as tables_webhooks from "../tables/webhooks.js";
import type * as users_actions from "../users/actions.js";
import type * as users_internals from "../users/internals.js";
import type * as users_mutations from "../users/mutations.js";
import type * as users_queries from "../users/queries.js";

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
  "config/constants": typeof config_constants;
  "config/polar": typeof config_polar;
  "config/types": typeof config_types;
  config: typeof config;
  debux: typeof debux;
  "emails/ResendOTP": typeof emails_ResendOTP;
  "emails/SigninEmail": typeof emails_SigninEmail;
  "emails/templates/verification": typeof emails_templates_verification;
  files: typeof files;
  "helpers/common": typeof helpers_common;
  "helpers/helpers": typeof helpers_helpers;
  http: typeof http;
  "subscriptions/actions": typeof subscriptions_actions;
  "subscriptions/internals": typeof subscriptions_internals;
  "subscriptions/mutations": typeof subscriptions_mutations;
  "subscriptions/queries": typeof subscriptions_queries;
  "tables/subscriptions": typeof tables_subscriptions;
  "tables/users": typeof tables_users;
  "tables/webhooks": typeof tables_webhooks;
  "users/actions": typeof users_actions;
  "users/internals": typeof users_internals;
  "users/mutations": typeof users_mutations;
  "users/queries": typeof users_queries;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
