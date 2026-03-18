import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

const changePasswordService = async (req) => {
	const { currentPassword, newPassword } = req.body;
	const user = await User.findById(req.user?._id);

	const isPasswordValid = await user.isPasswordCorrect(currentPassword);

	if (!isPasswordValid) {
		throw new ApiError(400, "invalid old password");
	}

	user.password = newPassword;
	await user.save({ validateBeforeSave: false });
};

const logoutService = async (userId) => {
	await User.findByIdAndUpdate(
		userId,
		{
			$unset: {
				refreshToken: 1,
			},
		},
		{ returnDocument: "after" },
	);
};

export { logoutService, changePasswordService };
