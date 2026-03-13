import { logoutService } from "../services/user.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const logout = asyncHandler(async (req, res) => {
	await logoutService(req.user._id);

	const options = {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
	};

	return res
		.status(200)
		.clearCookie("accessToken", options)
		.clearCookie("refreshToken", options)
		.json(new ApiResponse(200, null, "user logged out successfully"));
});

export { logout };
