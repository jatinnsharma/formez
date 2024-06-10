import { handleUserErrors } from "../helper";
import { IUser } from "../models";
import {
  createUser,
  getTokenById,
  getUserById,
  getUserByUsernameOrEmail,
  saveNewToken,
} from "../repositories";
import {
  ApiError,
  GeneratePassword,
  GenerateSalt,
  STATUS_CODE,
  ValidatePassword,
  decodeToken,
  generateAccessAndRefereshTokens,
  generateAndSaveTokens,
} from "../utils";
import { emailRegex } from "../validation";

export const register = async ( {identifier, password }) => {
  const isEmail = emailRegex.test(identifier);
  const data: any = isEmail ? { email: identifier } : { username: identifier };  

  // Check if user already exists by email or username
  const existedUser = await getUserByUsernameOrEmail(identifier);
  if (existedUser) {
    throw new ApiError(
      STATUS_CODE.CONFLICT,
      "User with email or username already exists",
    );
  }

  // Generate salt and hash the password
  const salt: string = await GenerateSalt();
  const userPassword: string = await GeneratePassword(password, salt);
  data.salt = salt;
  data.password = userPassword;

  // Create user in the database
  await createUser(data);
  const createdUser = await getUserByUsernameOrEmail(identifier);

  // Ensure user was created successfully
  if (!createdUser) {
    throw new ApiError(
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      "User creation failed",
    );
  }
  console.log(createdUser,"createdUwser ")


  const tokens = await generateAndSaveTokens(createdUser._id)

  return {...createdUser.toJSON(),...tokens};
};


export const login = async ({ identifier, password }) => {

  const user = await getUserByUsernameOrEmail(identifier);
   handleUserErrors(user)

  // Verify the provided password against the stored password
  const isPasswordMatch = await ValidatePassword(
    password,
    user.password,
    user.salt,
  );

  if (!isPasswordMatch) {
    throw new ApiError(
      STATUS_CODE.UNAUTHORIZED,
      "Incorrect password. Please try again.",
    );
  }

  const tokens = await generateAndSaveTokens(user._id);

  const userDetails = await getUserById(user._id);
  return { ...userDetails.toObject(), ...tokens };
};

export const refreshAccessToken = async (incomingRefreshToken) => {
  if (!incomingRefreshToken) {
    throw new ApiError(STATUS_CODE.UNAUTHORIZED, "unauthorized request");
  }

  const decodedToken = await decodeToken(incomingRefreshToken);

  const userToken = await getTokenById(decodedToken?._id);

  if (!userToken) {
    throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Invalid refresh token");
  }

  if (incomingRefreshToken !== userToken?.refreshToken) {
    throw new ApiError(
      STATUS_CODE.UNAUTHORIZED,
      "Refresh token is expired or used",
    );
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    userToken.userId
  );

  return { accessToken, refreshToken, options };
};

export const changePassword = async (userId, body) => {
  
  const user = await getUserById(userId);
  //check user exist in db || isDeleted || isBlocked || isVerified   
  handleUserErrors(user)

  const { oldPassword, newPassword, confirmPassword } = body;

  if (newPassword == confirmPassword) {
    throw new ApiError(
      STATUS_CODE.BAD_REQUEST,
      "New password and old password is not matched! please try again",
    );
  }


  const isValidPassword = await ValidatePassword(
    oldPassword,
    user.password,
    user.salt,
  );

  if (!isValidPassword) {
    throw new ApiError(
      STATUS_CODE.BAD_REQUEST,
      "Old Password is not valid password! Please enter valid password",
    );
  }





};
