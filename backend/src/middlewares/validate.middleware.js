import ApiError from "../utils/ApiError.js";

export const validate = (schema) => (req, _, next) => {
	const result = schema.safeParse(req.body);

	if (!result.success) {
		const errors = result.error.issues.map((issue) => ({
			field: issue.path.join("."),
			message: issue.message,
		}));

		return next(new ApiError(400, errors[0].message, errors));
	}

	req.body = result.data;
	next();
};
