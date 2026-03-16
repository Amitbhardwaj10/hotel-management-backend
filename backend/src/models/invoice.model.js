import mongoose, { Schema } from "mongoose";

const invoiceSchema = new Schema(
	{
		booking: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Booking",
			required: [true, "Invoice must be linked to a booking"],
			unique: true,
		},

		guest: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Invoice must be linked to a guest"],
		},

		roomCharges: {
			type: Number,
			required: true,
			min: 0,
		},

		serviceCharges: {
			type: Number,
			default: 0,
			min: 0,
		},

		totalAmount: {
			type: Number,
			required: true,
		},

		paymentStatus: {
			type: "String",
			enum: ["pending", "paid", "Partial"],
			default: "pending",
		},
	},

	{ timestamps: true },
);

invoiceSchema.pre("save", function () {
	this.totalAmount = this.roomCharges + this.serviceCharges;
	next();
});

export const Invoice = mongoose.model("Invoice", invoiceSchema);
