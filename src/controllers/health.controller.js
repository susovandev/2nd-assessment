import { envConfig } from '../config/env.config.js';
import Logger from '../lib/Logger.js';
import { StatusCodes } from 'http-status-codes';

class HealthController {
	health(req, res) {
		Logger.debug(`Health check`);
		return res.status(StatusCodes.OK).json({
			status: 'Up',
			message: 'Server is running',
			service: envConfig.SERVICE_NAME,
			timestamp: new Date().toISOString(),
			environment: envConfig.NODE_ENV,
		});
	}
}

export default new HealthController();
