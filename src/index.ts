import express from "express";
import App from "./app";
import { dbConnection, envConfig } from "./config";
import { fetchAllExamUpdates } from "./helper/webScraping.helper";
import { websties } from "./utils/websitesURL.constants.util";

const StartServer = async () => {
  const app = express();

  const PORT = envConfig.PORT || 5000;

  await App(app);

 await fetchAllExamUpdates(websties);

  app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
  });
  await dbConnection();
};

StartServer();
