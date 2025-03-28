import { Logger } from "@debux/sdk";

const logger = new Logger("api-key", {
  environment: "development", // Optional: defaults to 'production' // Optional: defaults to predefined URL
});

export default logger;
