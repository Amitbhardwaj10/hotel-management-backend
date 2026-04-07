import * as z from "zod";

const roomTypeEnum = ["single", "double", "suite"];

const statusEnum = ["available", "occupied", "maintenance"];

const amenitiesEnum = [
	"Room Service",
	"Laundry",
	"Spa & Wellness",
	"Transport",
	"Mini-Bar",
];

const addRoomSchema = z.object({
	roomNumber: z.string().trim(),
	roomType: z.enum(roomTypeEnum),
	price: z.number().min(0),
	status: z.enum(statusEnum).default("available"),
	amenities: z.array(z.enum(amenitiesEnum)).default([]),
});

const addRoomsBulkSchema = z.array(addRoomSchema).min(1).max(10);

const updateRoomSchema = z
	.object({
		roomType: z.enum(roomTypeEnum).optional(),
		price: z.number().min(0).optional(),
		status: z.enum(statusEnum).optional(),
		amenities: z.array(z.enum(amenitiesEnum)).optional(),
	})
	.refine((data) => Object.keys(data).length > 0, {
		message: "at least one field must be provided to update",
	});

const updateRoomStatusSchema = z.object({
	status: z.enum(["available", "occupied", "maintenance"]),
});

export {
	addRoomSchema,
	updateRoomSchema,
	updateRoomStatusSchema,
	addRoomsBulkSchema,
};
