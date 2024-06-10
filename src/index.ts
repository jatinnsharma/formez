import express from "express";
import App from "./app";
import { dbConnection, envConfig } from "./config";

const StartServer = async () => {
  const app = express();

  const PORT = envConfig.PORT || 5000;

  await App(app);

  app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
  });
  await dbConnection();
};

StartServer();
