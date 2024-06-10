import { ObjectId } from "mongoose";
import { User, IUser } from "../models";

// fetch data
async function getUserByEmail(email: string): Promise<IUser | null> {
  return await User.findOne({ email });
}

async function getUserByUsername(username: string): Promise<IUser | null> {
  return await User.findOne({ username });
}

async function getUserById(id: ObjectId): Promise<IUser | null> {
  return await User.findOne({ _id: id });
}

async function getUserByUsernameOrEmail(
  identifier: string,
): Promise<IUser | null> {
  return await User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });
}

// create new user
async function createUser(data: any) {
  const user = new User(data);
  await user.save();
}

export {
  getUserByEmail,
  getUserByUsername,
  getUserByUsernameOrEmail,
  getUserById,
  createUser,
};
