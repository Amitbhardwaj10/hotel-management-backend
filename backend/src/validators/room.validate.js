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

export { addRoomSchema };
