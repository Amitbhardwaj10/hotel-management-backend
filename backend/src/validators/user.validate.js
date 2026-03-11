import * as z from "zod";

export const registerUserSchema = z
	.object({
		email: z.email("Invalid email"),
		fullname: z.string().min(1, "Fullname required").trim(),
		role: z.enum(["guest", "staff", "manager", "admin"]).default("guest"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		phone: z
			.string()
			.trim()
			.regex(/^\d{10}$/, "Phone number must be a 10-digit number"),
		guestId: z.string().optional(),
		employeeId: z.string().optional(),
	})
	.superRefine((data, ctx) => {
		// Guest requires 12-digit guestId
		if (data.role === "guest") {
			if (!data.guestId) {
				ctx.addIssue({
					code: "custom",
					message: "Guest ID required for guests",
					path: ["guestId"],
				});
				return;
			}
			if (!/^\d{12}$/.test(data.guestId)) {
				ctx.addIssue({
					code: "custom",
					message: "Enter valid 12-digit guest ID!",
					path: ["guestId"],
				});
			}
		}

		// Staff/manager require employeeId
		if (data.role !== "guest" && data.role !== "admin") {
			if (!data.employeeId) {
				ctx.addIssue({
					code: "custom",
					message: "Employee ID required for staff/manager",
					path: ["employeeId"],
				});
				return;
			}
		}
	});
