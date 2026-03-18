import {
	addNewRoomService,
	getAllRoomsService,
	getSingleRoomService,
} from "../services/room.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const addNewRoom = asyncHandler(async (req, res) => {
	const addedRoom = await addNewRoomService(req.body);

	return res
		.status(201)
		.json(new ApiResponse(201, addedRoom, "room added successfully"));
});

const getAllRooms = asyncHandler(async (req, res) => {
	const rooms = await getAllRoomsService();

	return res.status(200).json(new ApiResponse(200, rooms));
});

const getSingleRoom = asyncHandler(async (req, res) => {
	const roomId = req.params?.roomId;
	if (!roomId || !mongoose.Types.ObjectId.isValid(roomId)) {
		throw new ApiError(400, "invalid room id");
	}

	const room = await getSingleRoomService(roomId);

	return res
		.status(200)
		.json(new ApiResponse(200, room, "got the single room successfully"));
});

export { addNewRoom, getAllRooms, getSingleRoom };
