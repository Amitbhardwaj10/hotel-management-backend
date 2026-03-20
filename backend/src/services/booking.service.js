import { Booking } from "../models/booking.model.js";
import { Room } from "../models/room.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

const createBookingService = async (data) => {
	const room = await Room.findOne({ _id: data.roomId, status: "available" });

	if (!room) throw new ApiError(404, "room is not available");

	const overlappingBooking = await Booking.findOne({
		room: data.roomId,
		status: { $nin: ["cancelled", "checkedout"] },
		$or: [
			{
				checkInDate: { $lte: data.checkInDate },
				checkOutDate: { $gte: data.checkInDate },
			},

			{
				checkInDate: { $lte: data.checkOutDate },
				checkOutDate: { $gte: data.checkOutDate },
			},

			{
				checkInDate: { $gte: data.checkInDate },
				checkOutDate: { $lte: data.checkOutDate },
			},
		],
	});

	if (overlappingBooking) {
		throw new ApiError(400, "room is already booked for these dates");
	}

	const { checkInDate, checkOutDate, roomId, guestId } = data;
	const totalNights =
		(new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24);
	const totalAmount = totalNights * room.price;

	const booked = await Booking.create({
		guestId,
		roomId,
		checkInDate,
		checkOutDate,
		status: "confirmed",
		totalAmount,
	});

	if (!booked) {
		throw new ApiError(500, "error while booking");
	}

	return { booked, room };
};

const getAllBookingsService = async () => {
	const bookings = await Booking.find().populate(["guestId", "roomId"]);

	if (bookings.length === 0) {
		throw new ApiError(404, "no bookings found!");
	}

	return bookings;
};

const getMyBookingsService = async (guestId) => {
	const guestBookings = await Booking.find({ guestId }).populate("roomId");
	return guestBookings;
};

const checkInService = async (bookingId) => {
	const booking = await Booking.findById(bookingId);
	if (!booking) throw new ApiError(404, "booking not found");

	if (booking.status !== "confirmed") {
		throw new ApiError(400, "booking must be confirmed before check-in");
	}

	booking.status = "checkedin";
	await booking.save({ validateBeforeSave: false });

	return booking;
};

const checkOutService = async (bookingId) => {
	const booking = await Booking.findById(bookingId);

	if (!booking) throw new ApiError(404, "booking not found");

	if (booking.status !== "checkedin") {
		throw new ApiError(400, "guest must be checked-in before check-out");
	}

	//put into booking history too.
	User.bookingHistory.push(bookingId);

	booking.status = "checkedout";
	await booking.save({ validateBeforeSave: false });

	return booking;
};

export {
	createBookingService,
	getAllBookingsService,
	getMyBookingsService,
	checkInService,
	checkOutService,
};
