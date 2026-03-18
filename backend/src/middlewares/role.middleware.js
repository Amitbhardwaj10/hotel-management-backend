import ApiResponse from "../utils/ApiResponse.js";

export const authorizeRoles = (...allowedRoles) => {
	return (req, res, next) => {
		if (!allowedRoles.includes(req.user.role)) {
			res.status(403).json({
				message: "Forbidden",
			});
		}
		next();
	};
};
