import mongoose from "mongoose";
import * as z from "zod";

const createBookingSchema = z
	.object({
		checkInDate: z.coerce.date({
			required_error: "check-in date is required",
		}),

		checkOutDate: z.coerce.date({
			required_error: "check-out date is required",
		}),
	})
	.refine((data) => data.checkOutDate >= data.checkInDate, {
		message: "check-out date must be after check-in date",
		path: ["checkOutDate"],
	});

export { createBookingSchema };
