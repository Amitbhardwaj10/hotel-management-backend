import mongoose, { Schema } from "mongoose";
import { refreshAccessTokenService } from "../services/auth.service";

const bookingSchema = new Schema(
	{
		guest: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "A booking must belong to a guest"],
		},

		room: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Room",
			required: [true, "A booking must have a room assigned"],
		},

		checkInDate: {
			type: Date,
			required: [true, "Check-in date is required"],
		},

		checkOutDate: {
			type: Date,
			required: [true, "Check-out date is required"],
		},

		status: {
			type: String,
			enum: ["pending", "confirmed", "checkedin", "checkedout", "cancelled"],
			default: "pending",
		},

		totalAmount: {
			type: Number,
			required: true,
			min: 0,
		},
	},
	{ timestamps: true },
);

bookingSchema.pre("save", function () {
	if (this.checkInDate >= this.checkOutDate) {
		return next(new Error("Chcek-out date must be after check-in date"));
	}
	next();
});

export const Booking = mongoose.model("Booking", bookingSchema);
