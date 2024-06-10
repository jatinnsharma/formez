import { ApiError, ApiResponse, STATUS_CODE } from "../utils";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models";

export const isAuthenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(
        STATUS_CODE.UNAUTHORIZED,
        "Unauthorized request: token is missing or not provided correctly.",
      );
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error.message, "error from here");
    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json(
        new ApiResponse(
          STATUS_CODE.INTERNAL_SERVER_ERROR,
          error.message || "Internal server error",
        ),
      );
  }
};
