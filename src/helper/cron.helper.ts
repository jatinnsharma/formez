import { webscaping } from "../webscraping";
import { queueNotifications } from "./rabbitMQ.helper";

import cron from "node-cron";

cron.schedule("* * * * *", async () => {
  // Run every hour
  const updates = await webscaping();
  // if (updates && Array.isArray(updates.kuk) && updates.kuk.length > 0) {
    // await queueNotifications(updates);
  // }
});
