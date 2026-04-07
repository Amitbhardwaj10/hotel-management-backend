import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
	addRoomsBulkSchema,
	addRoomSchema,
	updateRoomSchema,
	updateRoomStatusSchema,
} from "../validators/room.validate.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
	addBulkRooms,
	addNewRoom,
	deleteARoom,
	getAllRooms,
	getSingleRoom,
	updateRoom,
	updateStatus,
} from "../controllers/room.controller.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();

// non-secured routes for listing and browsing
router.route("/").get(getAllRooms);
router.route("/room/:roomId").get(getSingleRoom);

// secured routes (only logged-in users)
router.use(verifyJWT);

router
	.route("/room/add")
	.post(
		authorizeRoles("admin", "manager"),
		validate(addRoomSchema),
		addNewRoom,
	);

router
	.route("/room/add-bulk")
	.post(
		authorizeRoles("admin", "manager"),
		validate(addRoomsBulkSchema),
		addBulkRooms,
	);

router
	.route("/room/:roomId")
	.patch(
		authorizeRoles("admin", "manager"),
		validate(updateRoomSchema),
		updateRoom,
	)
	.delete(authorizeRoles("admin"), deleteARoom);

router
	.route("/room/update/:roomId/status")
	.patch(
		authorizeRoles("admin", "manager", "staff"),
		validate(updateRoomStatusSchema),
		updateStatus,
	);

export default router;
