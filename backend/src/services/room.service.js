import { Room } from "../models/room.model.js";
import ApiError from "../utils/ApiError.js";

const addNewRoomService = async (data) => {
	const { roomNumber, roomType, price, status, amenities } = data;

	const isRoomExist = await Room.findOne({ roomNumber });

	if (isRoomExist) {
		throw new ApiError(400, "room already exists!");
	}

	const addedRoom = await Room.create({
		roomNumber,
		roomType,
		price,
		status,
		amenities,
	});

	if (!addedRoom) {
		throw new ApiError(500, "error while adding the room");
	}

	return addedRoom;
};

const getAllRoomsService = async () => {
	const rooms = await Room.find();

	if (rooms.length === 0) {
		throw new ApiError(404, "no rooms found");
	}

	return rooms;
};

const getSingleRoomService = async (roomId) => {
	const room = await Room.findById(roomId);

	if (!room) {
		throw new ApiError(404, "room not found");
	}

	return room;
};

const updateRoomService = async (roomId, data) => {
	const updatedRoom = Room.findByIdAndUpdate(
		roomId,
		{
			$set: data,
		},

		{ returnDocument: "after" },
	);

	if (!updatedRoom) {
		throw new ApiError(500, "error while updating the room");
	}

	return updatedRoom;
};

const deleteRoomService = async (roomId) => {
	const deletedRoom = await Room.findByIdAndDelete(roomId);

	if (!deletedRoom) {
		throw new ApiError(404, "room not found");
	}

	return deletedRoom;
};

export {
	addNewRoomService,
	getAllRoomsService,
	getSingleRoomService,
	updateRoomService,
	deleteRoomService,
};
