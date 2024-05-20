import express from "express";
import { AuthController } from "../controllers";
import { validateLoginData, validateRegisterData } from "../validation";
import { Authenticate } from "../middlewares";
import { ApiError, STATUS_CODE } from "../utils";
const router = express.Router();

router.post("/register", validateRegisterData, AuthController.register);
router.post("/login", AuthController.login);

export { router as AuthRoute };
