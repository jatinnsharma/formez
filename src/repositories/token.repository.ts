import { ObjectId } from "mongoose";
import { Token } from "../models";

async function saveNewToken(
  id: ObjectId,
  accessToken: string,
  refreshToken: string,
) {
  const token = new Token({
    userId: id,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });

  await token.save();

  return token;
}

async function updateToken(
  userId: ObjectId,
  accessToken: string,
  refreshToken: string,
) {
  const updateToken = await Token.updateOne(
    { userId: userId },
    { $set: { accessToken, refreshToken } },
    { new: true },
  );

  return updateToken;
}

async function getUserDetailsFromToken(userId: ObjectId) {
  const userDetails = await Token.findOne({ userId: userId }).populate({
    path: "userId",
    model: "User",
    select: "username role",
  });

  return userDetails;
}

async function getTokenById(userId: ObjectId) {
  return await Token.findById({userId:userId});
}




export { saveNewToken, updateToken, getUserDetailsFromToken,getTokenById };
