import { StatusCodes } from 'http-status-codes';
export class HttpError extends Error {
	status;
	details;
	constructor(status, message, details) {
		super(message);
		this.status = status;
		this.details = details;
	}
}

export class BadRequestError extends HttpError {
	constructor(message = 'Bad Request', details) {
		super(StatusCodes.BAD_REQUEST, message, details);
	}
}

export class UnauthorizedError extends HttpError {
	constructor(message = 'Unauthorized') {
		super(StatusCodes.UNAUTHORIZED, message);
	}
}

export class ForbiddenError extends HttpError {
	constructor(message = 'Forbidden') {
		super(StatusCodes.FORBIDDEN, message);
	}
}
export class NotFoundError extends HttpError {
	constructor(message = 'Not Found') {
		super(StatusCodes.NOT_FOUND, message);
	}
}

export class ConflictError extends HttpError {
	constructor(message = 'Conflict') {
		super(StatusCodes.CONFLICT, message);
	}
}

export class TooManyRequestsError extends HttpError {
	constructor(message = 'Too Many Requests') {
		super(StatusCodes.TOO_MANY_REQUESTS, message);
	}
}

export class InternalServerError extends HttpError {
	constructor(message = 'Internal Server Error') {
		super(StatusCodes.INTERNAL_SERVER_ERROR, message);
	}
}

export class ServiceUnavailableError extends HttpError {
	constructor(message = 'Service Unavailable') {
		super(StatusCodes.SERVICE_UNAVAILABLE, message);
	}
}
