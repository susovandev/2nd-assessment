/* eslint-disable no-unused-vars */
import { HttpError } from '../lib/errors.js';
import { StatusCodes } from 'http-status-codes';
import Logger from '../lib/Logger.js';
export const errorHandler = (err, req, res, _next) => {
	let status = false;
	let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
	let message = 'Internal Server Error';
	let details = undefined;

	if (err instanceof HttpError) {
		statusCode = err.statusCode;
		message = err.message;
		details = err.details;
		status = err.status;
	}

	Logger.error(`${req.method} - ${req.originalUrl} - ${statusCode} - ${message}`);

	res.status(statusCode).json({
		error: {
			status,
			statusCode,
			message,
			details,
		},
	});
};
