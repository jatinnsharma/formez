import { ApiError, STATUS_CODE } from "../utils";

export const handleUserErrors = (user) => {
    if (!user) {
      throw new ApiError(
        STATUS_CODE.CONFLICT,
        "User with the provided email or username is not registered. Please register first."
      );
    }
  
    if (user.isDeleted) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        "Your account has been deleted. Please contact the administrator for further assistance."
      );
    }
  
    if (user.isBlocked) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        "Your account has been blocked. Please contact the administrator for further assistance."
      );
    }
  
    if (!user.isVerified) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        "Your account has not been verified. Please check your email inbox and follow the instructions to verify your email address before proceeding."
      );
    }
  };