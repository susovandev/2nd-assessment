import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const _config = {
	NODE_ENV: process.env.NODE_ENV || 'development',
	PORT: process.env.PORT || 5555,
	SERVICE_NAME: process.env.SERVICE_NAME || '2nd-assessment',
};

const envConfig = Object.freeze(_config);
export { envConfig };
