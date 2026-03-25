import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";
import {
	cancelBookingService,
	checkInService,
	checkOutService,
	createBookingService,
	getAllBookingsService,
	getMyBookingsService,
} from "../services/booking.service.js";

const createBooking = asyncHandler(async (req, res) => {
	const { checkInDate, checkOutDate } = req.body;

	const guestId = req.user?._id;
	const roomId = req.params?.roomId;

	if (!guestId) {
		throw new ApiError(400, "guest id is not present");
	}

	if (!roomId || !mongoose.Types.ObjectId.isValid(roomId)) {
		throw new ApiError(400, "invalid room id");
	}

	const data = {
		checkInDate,
		checkOutDate,
		guestId,
		roomId,
	};

	const booking = await createBookingService(data);

	return res
		.status(201)
		.json(new ApiResponse(201, booking, "booked successfully"));
});

const getAllBookings = asyncHandler(async (_, res) => {
	const bookings = await getAllBookingsService();

	return res
		.status(200)
		.json(new ApiResponse(200, bookings, "bookings fetched successfully"));
});

const getMyBookings = asyncHandler(async (req, res) => {
	const myBookings = await getMyBookingsService(req.user?._id);

	return res
		.status(200)
		.json(new ApiResponse(200, myBookings, "fetched guest's bookings"));
});

const checkIn = asyncHandler(async (req, res) => {
	const bookingId = req.params?.bookingId;

	if (!bookingId || !mongoose.Types.ObjectId.isValid(bookingId)) {
		throw new ApiError(400, "invalid booking id");
	}

	const booking = await checkInService(bookingId);

	return res
		.status(200)
		.json(new ApiResponse(200, booking, "successfully checked-in"));
});

const checkOut = asyncHandler(async (req, res) => {
	const bookingId = req.params?.bookingId;
	if (!bookingId || !mongoose.Types.ObjectId.isValid(bookingId)) {
		throw new ApiError(400, "invalid booking id");
	}

	const booking = await checkOutService(bookingId);

	return res
		.status(200)
		.json(new ApiResponse(200, booking, "successfully checked-out"));
});

const cancelBooking = asyncHandler(async (req, res) => {
	const bookingId = req.params?.bookingId;

	if (!bookingId || !mongoose.Types.ObjectId.isValid(bookingId)) {
		throw new ApiError(400, "invalid booking id");
	}

	const booking = await cancelBookingService(req.user, bookingId);

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				booking,
				"your booking has been cancelled successfully",
			),
		);
});

export {
	createBooking,
	getAllBookings,
	getMyBookings,
	checkIn,
	checkOut,
	cancelBooking,
};
