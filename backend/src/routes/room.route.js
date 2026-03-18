import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addRoomSchema } from "../validators/room.validate.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
	addNewRoom,
	getAllRooms,
	getSingleRoom,
} from "../controllers/room.controller.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();

router.route("/").get(getAllRooms);
router.route("/room/:roomId").get(getSingleRoom);

router.use(verifyJWT);

router
	.route("/add")
	.post(
		authorizeRoles("admin", "manager"),
		validate(addRoomSchema),
		addNewRoom,
	);

export default router;
