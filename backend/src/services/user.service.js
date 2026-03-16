import { User } from "../models/user.model.js";

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

export { logoutService };
