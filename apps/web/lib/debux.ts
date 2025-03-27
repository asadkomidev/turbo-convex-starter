import { Logger } from "@debux/sdk";

const logger = new Logger("your-api-key", {
  environment: "development", // Optional: defaults to 'production'
  endpoint: "https://your-backend-url.com/report-error", // Optional: defaults to predefined URL
});

export default logger;
