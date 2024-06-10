import { ObjectId } from "mongoose";
import { IUserDetail, UserDetail } from "../models";

async function getUserDetailsById(id: ObjectId): Promise<IUserDetail | null> {
  return await UserDetail.findOne({ userId: id });
}

export { getUserDetailsById };
