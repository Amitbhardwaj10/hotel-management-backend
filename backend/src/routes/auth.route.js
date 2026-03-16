import { Router } from "express";
import {
	login,
	refreshAccessToken,
	register,
} from "../controllers/auth.controller.js";
import {
	registerGuestSchema,
	loginUserSchema,
} from "../validators/user.validate.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

// public routes
router.route("/register").post(validate(registerGuestSchema), register);
router.route("/login").post(validate(loginUserSchema), login);
router.route("/refresh").post(refreshAccessToken);

export default router;
