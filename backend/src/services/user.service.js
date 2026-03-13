import { User } from "../models/guest.model.js";

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
