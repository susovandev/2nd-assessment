import morgan from 'morgan';
import Logger from '../lib/Logger.js';
import { envConfig } from '../config/env.config.js';

const stream = {
	write: (message) => Logger.http(message),
};

const skip = () => {
	const environment = envConfig.NODE_ENV;
	return environment !== 'development';
};
const morganMiddleware = morgan(
	':method :url :status :res[content-length] - :response-time ms :remote-addr',
	{ stream, skip },
);

export default morganMiddleware;
