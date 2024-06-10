import express from "express";
import { AuthController } from "../../controllers";
import {
  loginValidation,
  passwordValidation,
  registerValidation,
} from "../../validation";
import { isAuthenticate } from "../../middlewares";
const router = express.Router();

// Route without middleware
router.post("/register", registerValidation, AuthController.register);
router.post("/login", loginValidation, AuthController.login);

// Middleware function: Authenticate(auth token verification)
router.use(isAuthenticate);

//Protected routes
// router.post(
//   "/change-password",
//   passwordValidation,
//   AuthController.changePassword,
// );

export { router as AuthRoute };
