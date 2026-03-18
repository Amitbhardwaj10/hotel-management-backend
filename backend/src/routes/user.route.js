import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { changePassword, logout } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { passwordSchema } from "../validators/user.validate.js";

const router = Router();

router.use(verifyJWT);

router.route("/change-password").post(validate(passwordSchema), changePassword);
router.route("/logout").post(logout);

export default router;
