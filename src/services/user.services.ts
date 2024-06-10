import { ObjectId } from "mongoose";
import { IUserDetail, IUserDocs, UserDetail, UserDocs } from "../models";
import { getUserById, getUserDetailsById } from "../repositories";
import { ApiError, STATUS_CODE } from "../utils";

export const createProfile = async (id: ObjectId, body: IUserDetail) => {
  const { firstName, lastName, countryCode, phoneNumber, dob, gender, avatar } =
    body;
  if (!id) throw new ApiError(STATUS_CODE.BAD_REQUEST, "User ID is required.");

  if (body && typeof body !== "object")
    throw new ApiError(STATUS_CODE.BAD_REQUEST, "Invalid created data.");

  const existingUser = await getUserDetailsById(id);
  if (existingUser) {
    throw new ApiError(
      STATUS_CODE.CONFLICT,
      "Failed to create user profile: Profile already exists. Please update the existing profile or create a new one.",
    );
  }

  console.log("create user body", body);
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

  if (!id) throw new ApiError(STATUS_CODE.BAD_REQUEST, "User ID is required.");
  if (body && typeof body !== "object")
    throw new ApiError(STATUS_CODE.BAD_REQUEST, "Invalid update data.");

  // Find the user by ID and update their profile
  const updatedUserDetail = await UserDetail.findOneAndUpdate(
    { userId: id },
    { firstName, lastName, countryCode, phoneNumber, dob, gender, avatar },
    { new: true, runValidators: true },
  );

  if (!updatedUserDetail) {
    throw new ApiError(
      STATUS_CODE.BAD_REQUEST,
      "User details with ID ${id} not found.",
    );
  }

  return updatedUserDetail;
};

export const profileDetails = async (id: ObjectId) => {
  if (!id) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, "User ID is required.");
  }
  const user = await getUserById(id);

  if (!user) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, "User not found.");
  }

  const userDetails = await getUserDetailsById(id);

  if (!userDetails) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, "User details not found.");
  }

  return userDetails;
};

export const updateUserDocs = async (id: ObjectId, body: IUserDocs) => {
  if (!id) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, "User ID is required.");
  }
  const user = await getUserById(id);

  if (!user) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, "User not found.");
  }

  const {
    aadharCardNumber,
    panCardNumber,
    bankDetails,
    secondaryEducation,
    higherSecondaryEducation,
    graduateDegree,
    postgraduateDegree,
    additionalEducationQualification,
  } = body;

  const updateData = await UserDocs.findByIdAndUpdate(
    { userId: id },
    {
      aadharCardNumber,
      panCardNumber,
      bankDetails,
      secondaryEducation,
      higherSecondaryEducation,
      graduateDegree,
      postgraduateDegree,
      additionalEducationQualification,
    },
    { new: true },
  );

  return updateData;
};
