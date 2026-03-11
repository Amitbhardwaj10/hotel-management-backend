import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import {
	generateAccessToken,
	generateRefreshToken,
} from "../utils/tokenGeneration.js";

const generateAccessRefreshToken = async (userId) => {
	try {
		const user = await findById(userId);

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
	const { email, fullname, role, password, phone, guestId, employeeId } = data;

	const existedUser = await User.findOne({
		$or: [{ email }, { phone }],
	});

	if (existedUser) {
		throw new ApiError(409, "user with email or username already exist");
	}

	const user = await User.create({
		email,
		fullname,
		role,
		password,
		phone,
		guestId,
		employeeId,
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

	const isPasswordValid = user.isPasswordCorrect(password);

	if (!isPasswordValid) {
		throw new ApiError(401, "invalid user credentials");
	}

	const { accessToken, refreshToken } = generateAccessRefreshToken(user._id);

	const loggedInUser = await User.findById(user._id);

	return { loggedInUser, accessToken, refreshToken };
};

export { registerService, loginService };
