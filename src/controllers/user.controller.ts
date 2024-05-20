import { userServices } from "../services";
import { ApiResponse, STATUS_CODE, asyncHandler } from "../utils";
import { Request, Response } from "express";

const createProfile = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req?.user?._id;
      const createProfile = await userServices.createProfile(userId, req.body);

      return res
        .status(STATUS_CODE.OK)
        .json(
          new ApiResponse(
            STATUS_CODE.OK,
            "Profile create successfully",
            createProfile,
          ),
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

const updateProfile = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req?.user?._id;
      const updateProfile = await userServices.updateProfile(userId, req.body);

      return res
        .status(STATUS_CODE.OK)
        .json(
          new ApiResponse(
            STATUS_CODE.OK,
            "Profile updated successfully",
            updateProfile,
          ),
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

export { createProfile, updateProfile };
