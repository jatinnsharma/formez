import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import {
  emailValidation,
  passwordValidation,
  usernameValidation,
} from "./common.validation";
import { STATUS_CODE, ApiResponse } from "../utils";

export const registerValidationData = z.object({
  identifier: z.union([usernameValidation, emailValidation]),
  password: passwordValidation,
});

// Middleware function to validate registration data
export const registerValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validationResult = registerValidationData.safeParse(req.body);
  if (!validationResult.success) {
    const firstError = validationResult.error.issues[0];
    const errorMessage = `${firstError.message}`;

    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .json(new ApiResponse(STATUS_CODE.BAD_REQUEST, errorMessage));
  }
  next();
};
