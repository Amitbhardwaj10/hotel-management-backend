import * as z from "zod";

const registerUserSchema = z
	.object({
		email: z.email("Invalid email"),
		fullname: z.string().min(1, "Fullname required").trim(),
		password: z.string().min(8, "Password must be at least 8 characters"),
		phone: z
			.string()
			.trim()
			.regex(/^\d{10}$/, "Phone number must be a 10-digit number"),
		guestId: z.string(),
	})
	.strict();

const loginUserSchema = z
	.object({
		email: z.email("Invalid email"),
		password: z.string().min(8, "Password must be at least 8 characters"),
	})
	.strict();

export { registerUserSchema, loginUserSchema };
