import { registerValidation } from "./register.validation";
import { STATUS_CODE, ApiError } from "../utils";
import { Request, Response, NextFunction } from "express";

export const loginValidation = registerValidation;

// Middleware function to validate login data
export const validateLoginData = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validationResult = loginValidation.safeParse(req.body);
  if (!validationResult.success) {
    const firstError = validationResult.error.issues[0];
    const errorMessage = `${firstError.message}`;
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .json(new ApiError(STATUS_CODE.BAD_REQUEST, "", errorMessage));
  }
  next();
};
