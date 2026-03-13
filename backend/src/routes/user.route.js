import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { logout } from "../controllers/user.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/logout").post(logout);

export default router;
