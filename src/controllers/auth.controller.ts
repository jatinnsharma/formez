import { Request, Response } from "express";
import { authServices } from "../services";
import {
  STATUS_CODE,
  ValidatePassword,
  asyncHandler,
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils";
import { User } from "../models";

/**
 * Controller function to handle auth system.
 * It attempts to register a new user using the data from the request body.
 * On success, it responds with the created user data and a success message.
 * On failure, it responds with an appropriate error message.
 *
 * @param {Request} req - The Express request object containing user registration data.
 * @param {Response} res - The Express response object for sending the response.
 * @returns {Promise<void>} - A promise that resolves to void.
 */

const register = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { identifier, password } = req.body;

      const createdUser = await authServices.register({ identifier, password });

      sendSuccessResponse(
        res,
        STATUS_CODE.CREATED,
        "User registered successfully",
        createdUser,
      );
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
);

/**
 * It attempts to login a exited user using the data from the request body.
 * On success, it responds with the userId , accessToken and a success message.
 * On failure, it responds with an appropriate error message.
 *
 * @param {Request} req - The Express request object containing user login data.
 * @param {Response} res - The Express response object for sending the response.
 * @returns {Promise<void>} - A promise that resolves to void.
 */

const login = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { identifier, password } = req.body;
      const loginUser = await authServices.login({identifier, password} );

      sendSuccessResponse(
        res,
        STATUS_CODE.OK,
        "User login successfully",
        loginUser,
      );
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
);

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  const { accessToken, refreshToken, options } =
    await authServices.refreshAccessToken(incomingRefreshToken);

  try {
    res
      .status(STATUS_CODE.OK)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options);
    sendSuccessResponse(res, STATUS_CODE.OK, "Access token refreshed", {
      accessToken,
      refreshToken,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const userId = req?.user?._id;
  const response = await authServices.changePassword(userId, req.body);
});

export { register, login, refreshAccessToken, changePassword };
