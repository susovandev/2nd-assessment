import { StatusCodes } from 'http-status-codes';

const formatJoiError = (error) => {
	return error.details.map((d) => ({
		field: d.path.join('.'),
		message: d.message.replace(/['"]/g, ''),
	}));
};

const validateRequest =
	(schema, property = 'body') =>
	(req, res, next) => {
		const { error } = schema.validate(req[property], { abortEarly: false });

		if (error) {
			res.status(StatusCodes.BAD_REQUEST).json({
				statusCode: StatusCodes.BAD_REQUEST,
				status: false,
				message: 'Validation error',
				errors: formatJoiError(error),
			});
			return;
		}
		next();
	};

export default validateRequest;
