import ApiError from "../utils/ApiError.js";

export const validate = (schema) => (req, _, next) => {
	const result = schema.safeParse(req.body);

	if (!result.success) {
		const error = new ApiError(400, "Validation failed", result.error.issues);
		return next(error);
	}

	req.body = result.data;
	next();
};
