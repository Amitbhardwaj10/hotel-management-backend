import ApiError from "../utils/ApiError.js";

export const validate = (schema) => (req, _, next) => {
	const result = schema.safeParse(req.body);

	if (!result.success) {
		const message = result.error.issues[0].message;

		return next(new ApiError(400, message));
	}

	req.body = result.data;
	next();
};
