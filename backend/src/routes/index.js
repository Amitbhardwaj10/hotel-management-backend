import express from "express";

const router = express.Router();

// routes import
import authRouter from "./auth.route.js";
import userRouter from "./user.route.js";
import roomRouter from "./room.route.js";
import bookingRouter from "./booking.route.js";

// routes declaration
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/rooms", roomRouter);
router.use("/bookings", bookingRouter);

export default router;
