import express from "express";
import { UserController } from "../controllers";
import { validateUserProfileData } from "../validation";
import { Authenticate } from "../middlewares";
const router = express.Router();

//create a new profile
router.post(
  "/profile",
  Authenticate,
  validateUserProfileData,
  UserController.createProfile,
);

//update a existing profile
router.patch(
  "/profile",
  Authenticate,
  validateUserProfileData,
  UserController.updateProfile,
);

export { router as UserRoute };
