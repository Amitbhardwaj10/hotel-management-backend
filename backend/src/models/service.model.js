import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema(
	{
		booking: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Booking",
			required: [true, "Service must be linked to a booking"],
		},

		name: {
			type: String,
			required: [true, "Service type is required"],
			trim: true,
			enum: {
				values: [
					"Room Service",
					"Laundry",
					"Spa & Wellness",
					"Transport",
					"Mini-Bar",
					"Late Checkout Fee",
					"Extra Bedding",
				],
				message: "{VALUE} is not a valid service category",
			},
		},

		price: {
			type: Number,
			required: [true, "Service price is required"],
			min: [0, "Price cannot be negative"],
		},

		date: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true },
);

export const Service = mongoose.model("Service", serviceSchema);
