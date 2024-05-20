import express, { Application } from "express";
import router from "./routes";

export default async (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //api's routes
  app.use("/", router);

  return app;
};
