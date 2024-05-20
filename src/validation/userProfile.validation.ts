import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { ApiError, ApiResponse, STATUS_CODE } from "../utils";

export const updateValidation = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  countryCode: z.string().optional(),
  phoneNumber: z.string().optional(),
  dob: z.string().optional(),
  gender: z.string().optional(),
  avatar: z.string().url().optional(),
});

export const validateUserProfileData = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validationResult = updateValidation.safeParse(req.body);
  if (!validationResult.success) {
    const errors = validationResult.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`,
    );
    const errorMessage = errors.join(", ");
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .json(new ApiResponse(STATUS_CODE.BAD_REQUEST, errorMessage));
  }
  next();
};
