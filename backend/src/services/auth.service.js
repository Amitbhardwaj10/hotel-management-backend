import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import {
	generateAccessToken,
	generateRefreshToken,
} from "../utils/tokenGeneration.js";
import jwt from "jsonwebtoken";

const generateAccessRefreshToken = async (userId) => {
	try {
		const user = await User.findById(userId);

		const accessToken = generateAccessToken(user);
		const refreshToken = generateRefreshToken(user);

		user.refreshToken = refreshToken;
		await user.save({ validateBeforeSave: false });

		return { accessToken, refreshToken };
	} catch (error) {
		throw new ApiError(
			500,
			"something went wrong while generating access and refresh token",
		);
	}
};

const registerService = async (data) => {
	const { email, fullname, password, phone, guestId } = data;

	const existedUser = await User.findOne({
		$or: [{ email }, { phone }],
	});

	if (existedUser) {
		throw new ApiError(409, "user with email or username already exist");
	}

	const user = await User.create({
		email,
		fullname,
		role: "guest",
		password,
		phone,
		guestId,
	});

	if (!user) {
		throw new ApiError(500, "something went wrong while registering the user");
	}

	return user;
};

const loginService = async (data) => {
	const { email, password } = data;

	const user = await User.findOne({ email });

	if (!user) {
		throw new ApiError(404, "user does not exist");
	}

	const isPasswordValid = await user.isPasswordCorrect(password);

	if (!isPasswordValid) {
		throw new ApiError(401, "invalid user credentials");
	}

	const { accessToken, refreshToken } = await generateAccessRefreshToken(
		user._id,
	);

	const loggedInUser = await User.findById(user._id);

	return { loggedInUser, accessToken, refreshToken };
};

const refreshAccessTokenService = async (oldRefreshToken) => {
	const decodedToken = jwt.verify(
		oldRefreshToken,
		process.env.REFRESH_TOKEN_SECRET,
	);

	const user = await User.findById(decodedToken?._id);

	if (!user) {
		throw new ApiError(401, "Invalid refresh token");
	}

	if (oldRefreshToken !== user.refreshToken) {
		throw new ApiError(401, "Invalid refresh token");
	}

	return generateAccessRefreshToken(user._id);
};

export { registerService, loginService, refreshAccessTokenService };
