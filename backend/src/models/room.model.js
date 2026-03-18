import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema(
	{
		roomNumber: {
			type: String,
			required: [true, "Room number is mandatory"],
			unique: true,
			trim: true,
		},

		// roomPictures: {
		// 	type: [String],
		// 	required: [true, "room picture is required"],
		// },

		// roomPicturePublicIds: [String], // public ids for all pictures for cloudinary operations

		roomType: {
			type: String,
			required: true,
			enum: {
				values: ["single", "double", "suite"],
				message: "{VALUE} is not valid room type",
			},
		},

		price: {
			type: Number,
			required: [true, "Price per night is requried"],
			min: [0, "Price should be greater than  0"],
		},

		status: {
			type: String,
			default: "available",
			enum: ["available", "occupied", "maintenance"],
		},

		amenities: {
			type: [String],
			default: [],
		},
	},

	{ timestamps: true },
);

export const Room = mongoose.model("Room", roomSchema);
