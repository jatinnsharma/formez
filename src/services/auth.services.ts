import { IUser, Token } from "../models";
import {
  createUser,
  getUserByEmail,
  getUserByUsername,
  getUserByUsernameOrEmail,
} from "../repositories";

import {
  ApiError,
  GeneratePassword,
  GenerateSalt,
  GenerateAccessToken,
  STATUS_CODE,
  ValidatePassword,
  decodeToken,
  generateAccessAndRefereshTokens,
} from "../utils";
import { emailRegex } from "../validation";

export const register = async (body: IUser) => {
  const { identifier, password }: IUser = body;

  const isEmail = emailRegex.test(identifier);

  // Prepare user data based on whether the identifier is an email or a username
  const data: any = {};

  if (isEmail) {
    data.email = identifier;
  } else {
    data.username = identifier;
  }

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

  // Prepare user data
  data.salt = salt;
  data.password = userPassword;

  // Create user in the database
  await createUser(data);

  // Retrieve and return the newly created user
  const createdUser = await getUserByUsernameOrEmail(identifier);

  // Ensure user was created successfully
  if (!createdUser) {
    throw new ApiError(
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      "User creation failed",
    );
  }
  return createdUser;
};

export const login = async (body: IUser) => {
  const { identifier, password }: IUser = body;

  // Check if not exists by email or username
  const user = await getUserByUsernameOrEmail(identifier);
  if (!user) {
    throw new ApiError(
      STATUS_CODE.CONFLICT,
      "User with the provided email or username is not registered. Please register first.",
    );
  }

  if (!user.isVerified) {
    throw new ApiError(
      STATUS_CODE.BAD_REQUEST,
      "Your account has not been verified. Please check your email inbox and follow the instructions to verify your email address before proceeding.",
    );
  }

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

  const payload = {
    _id: user._id,
    email: user.email,
  };

  // Call the GenerateAccessToken function with the payload
  const signature = await GenerateAccessToken(payload);

  const token = new Token({
    userId: user._id,
    accessToken: signature,
  });

  await token.save();

  return token;
};

export const refreshAccessToken = async (incomingRefreshToken) => {
  if (!incomingRefreshToken) {
    throw new ApiError(STATUS_CODE.UNAUTHORIZED, "unauthorized request");
  }

  const decodedToken = await decodeToken(incomingRefreshToken);

  const userToken = await Token.findById({ userId: decodedToken?._id });

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
    userToken.userId,
  );

  return { accessToken, refreshToken, options };
};
