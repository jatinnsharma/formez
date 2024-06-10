import { ObjectId } from "mongoose";
import { IUserDocs, UserDocs } from "../models";

async function getUserDocsById(id: ObjectId): Promise<IUserDocs | null> {
  return await UserDocs.findOne({ userId: id });
}

async function updateUserDocs(id: ObjectId, data: IUserDocs) {
  return await UserDocs.findByIdAndUpdate({ userId: id, $set: { data: data } });
}

export { getUserDocsById, updateUserDocs };
