import mongoose from "mongoose";
import { DB_NAME } from "../utils";
import { envConfig } from "./envConfig";

export const dbConnection = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${envConfig.DB_URL}/${DB_NAME}`,
    );
    console.log(
      `MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};
