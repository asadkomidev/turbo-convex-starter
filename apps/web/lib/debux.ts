import { Logger } from "@debux/sdk";

const logger = new Logger("your-api-key", {
  environment: "development", // Optional: defaults to 'production' // Optional: defaults to predefined URL
});

export default logger;
