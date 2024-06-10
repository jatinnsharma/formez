import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { envConfig } from "../config";
import { ApiError } from "./ApiError";
import { STATUS_CODE } from "./constants.util";
import { Token, User } from "../models";
import { ObjectId } from "mongoose";
import { saveNewToken } from "../repositories";

export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

export const GeneratePassword = async (
  password: string,
  salt: string,
): Promise<string> => {
  return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string,
): Promise<boolean> => {
  const hashedPassword = await GeneratePassword(enteredPassword, salt);
  return hashedPassword === savedPassword;
};

export const FormateData = (data: any) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

export const GenerateAccessToken = async (payload: object) => {
  try {
    return await jwt.sign(payload, envConfig.ACCESS_TOKEN_SECRET, {
      expiresIn: envConfig.ACCESS_TOKEN_EXPIRY,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const GenerateRefreshToken = async function (userId: string) {
  return jwt.sign(
    {
      _id: userId,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    },
  );
};

export const generateAccessAndRefereshTokens = async (userId: string) => {
  try {
    const user = await User.findById(userId).lean();

    const accessToken = await GenerateAccessToken({
      userId: user._id,
      role: user.role,
    });
    const refreshToken = await GenerateRefreshToken(userId);

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token",
    );
  }
};

export const decodeToken = async (token) => {
  try {
    const decodedToken = await jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
    );
    return decodedToken;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const generateAndSaveTokens = async (userId) => {
  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(userId);
  await saveNewToken(userId, accessToken, refreshToken);
  return { accessToken, refreshToken };
};

// export const ValidateSignature = async (req, _, next) => {
// try {
//   const signature = req.get("Authorization");
//   const token =
//     req.cookies?.accessToken ||
//     req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//       return false;
//     }

//     // console.log(token,"token");
//     console.log(signature,"si ");
//     console.log(signature.split(" ")[1])
//   const payload = await jwt.verify(
//     signature.split(" ")[1],
//     envConfig.ACCESS_TOKEN_EXPIRY,
//   );
//   req.user = payload;
//   return true;
// } catch (error) {
//   console.log(error);
//   return false;
// }
// };
