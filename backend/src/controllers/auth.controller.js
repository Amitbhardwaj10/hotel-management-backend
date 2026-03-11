import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { registerService } from "../services/auth.service.js";

const register = asyncHandler(async (req, res) => {
	const user = await registerService(req.body);

	res
		.status(201)
		.json(new ApiResponse(200, user, "User registered successfully"));
});

const login = asyncHandler(async (req, res) => {
	const { accessToken, refreshToken, loggedInUser } = await loginService(
		req.body,
	);

	const options = {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
	};

	// Access Token (15 minutes)
	const accessOptions = {
		...options,
		maxAge: 15 * 60 * 1000, // 15 minutes
	};

	// Refresh Token (30 days)
	const refreshOptions = {
		...options,
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
	};

	return res
		.status(200)
		.cookie("accessToken", accessToken, accessOptions)
		.cookie("refreshToken", refreshToken, refreshOptions)
		.json(
			new ApiResponse(
				200,
				{ user: loggedInUser, tokens: { accessToken, refreshToken } },
				"user logged in successfully",
			),
		);
});

export { register, login };
