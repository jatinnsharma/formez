import { z } from "zod";
import { passwordValidation } from "./common.validation";

export const changePasswordValidationData = z.object({
  oldPassword: passwordValidation,
  newPassowrd: passwordValidation,
  confirmPassword: passwordValidation,
});
