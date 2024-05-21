import { queueNotifications } from "./rabbitMQ.helper";
import { fetchAllExamUpdates } from "./webScraping.helper";

import cron from "node-cron";

const websites = [
  /* Array of 10,000 website URLs */
];

cron.schedule("* * * * *", async () => {
  // Run every hour
  const updates = await fetchAllExamUpdates(websites);
  if (updates.length > 0) {
    await queueNotifications(updates);
  }
});
