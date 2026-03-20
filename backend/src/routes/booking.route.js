import Router from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createBookingSchema } from "../validators/booking.validate.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import {
	checkIn,
	checkOut,
	createBooking,
	getAllBookings,
	getMyBookings,
} from "../controllers/booking.controller.js";
const router = Router();

router.use(verifyJWT);

router
	.route("/create/:roomId")
	.post(
		authorizeRoles("guest", "staff"),
		validate(createBookingSchema),
		createBooking,
	);

router
	.route("/")
	.get(authorizeRoles("staff", "manager", "admin"), getAllBookings);
router.route("/my-bookings").get(authorizeRoles("guest"), getMyBookings);
router
	.route("/booking/check-in/:bookingId")
	.patch(authorizeRoles("staff", "manager", "admin"), checkIn);
router
	.route("/booking/check-out/:bookingId")
	.patch(authorizeRoles("staff", "manager", "admin"), checkOut);

export default router;
