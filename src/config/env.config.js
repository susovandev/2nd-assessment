import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const _config = {
	NODE_ENV: process.env.NODE_ENV || 'development',
	PORT: process.env.PORT || 5555,
	SERVICE_NAME: process.env.SERVICE_NAME || '2nd-assessment',

	DATABASE_URL: process.env.DATABASE_URL,
	DATABASE_NAME: process.env.DATABASE_NAME,

	CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

const envConfig = Object.freeze(_config);
export { envConfig };
