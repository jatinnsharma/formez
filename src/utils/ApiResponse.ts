import { Response } from "express";
import { STATUS_CODE } from "./constants.util";

class ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  success: boolean;

  constructor(statusCode: number, message: string = "Success", data: T = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }
}

const sendSuccessResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any,
): void => {
  res.status(statusCode).json(new ApiResponse(statusCode, message, data));
};

const sendErrorResponse = (res: Response, error: any): void => {
  res
    .status(error.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR)
    .json(
      new ApiResponse(
        error.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message || "Internal server error",
      ),
    );
};

export { ApiResponse, sendSuccessResponse, sendErrorResponse };
