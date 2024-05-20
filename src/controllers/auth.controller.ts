import { Request, Response } from "express";
import { authServices } from "../services";
import { ApiResponse, STATUS_CODE, asyncHandler } from "../utils";

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
      const createdUser = await authServices.register(req.body);

      // Success response with created user data
      return res
        .status(STATUS_CODE.CREATED)
        .json(
          new ApiResponse(
            STATUS_CODE.CREATED,
            "User registered Successfully",
            createdUser,
          ),
        );
    } catch (error) {
      console.log(error);
      // Error response in case of failure
      return res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json(
          new ApiResponse(
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            error.message || "Internal server error",
            null,
          ),
        );
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
      const loginUser = await authServices.login(req.body);

      // Success response with token
      return res
        .status(STATUS_CODE.OK)
        .json(
          new ApiResponse(STATUS_CODE.OK, "User login Successfully", loginUser),
        );
    } catch (error) {
      // Error response in case of failure
      return res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json(
          new ApiResponse(
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            error.message || "Internal server error",
          ),
        );
    }
  },
);

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  const { accessToken, refreshToken, options } =
    await authServices.refreshAccessToken(incomingRefreshToken);

  try {
    return res
      .status(STATUS_CODE.OK)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(STATUS_CODE.OK, "Access token refreshed", {
          accessToken,
          refreshToken,
        }),
      );
  } catch (error) {
    throw new ApiResponse(
      STATUS_CODE.UNAUTHORIZED,
      error?.message || "Invalid refresh token",
    );
  }
});

export { register, login, refreshAccessToken };
