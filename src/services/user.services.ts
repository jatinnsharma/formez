import { ObjectId } from "mongoose";
import { IUserDetail, UserDetail } from "../models";
import { getUserById, getUserDetailsByUserId } from "../repositories";
import { ApiError, STATUS_CODE } from "../utils";

export const createProfile = async (id: ObjectId, body: IUserDetail) => {
  const { firstName, lastName, countryCode, phoneNumber, dob, gender, avatar } =
    body;
  if (!id) throw new Error("User ID is required.");
  if (body && typeof body !== "object")
    throw new Error("Invalid created data.");

  const existingUser = await getUserDetailsByUserId(id);
  if (existingUser) {
    throw new ApiError(
      STATUS_CODE.CONFLICT,
      "User profile create failed: Profile already exists for this user",
    );
  }

  const createProfile = new UserDetail({
    userId: id,
    firstName,
    lastName,
    countryCode,
    phoneNumber,
    dob,
    gender,
    avatar,
  });
  await createProfile.save();

  return createProfile;
};

export const updateProfile = async (id: ObjectId, body: IUserDetail) => {
  const { firstName, lastName, countryCode, phoneNumber, dob, gender, avatar } =
    body;

  if (!id)
    throw new ApiError(
      STATUS_CODE.BAD_REQUEST,
      "User with email or username already exists",
    );
  if (body && typeof body !== "object") throw new Error("Invalid update data.");

  // Find the user by ID and update their profile
  const updatedUserDetail = await UserDetail.findOneAndUpdate(
    { userId: id },
    { firstName, lastName, countryCode, phoneNumber, dob, gender, avatar },
    { new: true, runValidators: true },
  );

  if (!updatedUserDetail) {
    throw new Error(`User with ID ${id} not found.`);
  }

  return updatedUserDetail;
};
