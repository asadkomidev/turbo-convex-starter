import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { paymentWebhook } from "./subscriptions/actions";

const http = httpRouter();

auth.addHttpRoutes(http);

http.route({
  path: "/payments/webhook",
  method: "POST",
  handler: paymentWebhook,
});

export default http;
