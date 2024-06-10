import express from "express";
import { UserController } from "../../controllers";
import { validateUserProfileData } from "../../validation";
import { isAuthenticate } from "../../middlewares";
import {
  cacheUserData,
  saveUserDataToCache,
} from "../../middlewares/redis.middleware";
import { Person } from "../../models/Person.model";
const router = express.Router();

// Route without middleware
router.get("/users", cacheUserData, async (req, res) => {
  const user = await Person.find({});
  saveUserDataToCache("userData", user);

  const delayInMinutes = 0.5;
  const delayInMilliseconds = delayInMinutes * 60 * 1000;

  setTimeout(function () {
    console.log("This will be printed after 1 minutes.");
    return res.status(200).json({
      status: true,
      message: "users data fetched successfully",
      data: user,
    });
  }, delayInMilliseconds);
});

// Middleware function: Authenticate(auth token verification)
router.use(isAuthenticate);

router.post("/profile", validateUserProfileData, UserController.createProfile);
router.patch("/profile", validateUserProfileData, UserController.updateProfile);
router.get("/profile-details", UserController.profileDetails);

export { router as UserRoute };
