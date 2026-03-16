import * as z from "zod";

const registerGuestSchema = z
	.object({
		email: z.email("Invalid email"),
		fullname: z.string().min(1, "Fullname required").trim(),
		password: z.string().min(8, "Password must be at least 8 characters"),
		phone: z
			.string()
			.trim()
			.regex(/^\d{10}$/, "Phone number must be a 10-digit number"),
		guestId: z.string().regex(/^\d{12}$/, "Enter valid 12-digit guest ID!"),
	})
	.strict();

const createEmployeeSchema = z
	.object({
		email: z.email("Invalid email"),
		fullname: z.string().min(1, "Fullname required").trim(),
		password: z.string().min(8, "Password must be at least 8 characters"),
		phone: z
			.string()
			.trim()
			.regex(/^\d{10}$/, "Phone number must be a 10-digit number"),
		employeeId: z.string(),
		role: z.enum(["staff", "manager"]),
	})
	.strict();

const loginUserSchema = z
	.object({
		email: z.email("Invalid email"),
		password: z.string().min(8, "Password must be at least 8 characters"),
	})
	.strict();

export { registerGuestSchema, loginUserSchema, createEmployeeSchema };
