import mongoose from 'mongoose';
import Logger from '../lib/Logger.js';
import { envConfig } from '../config/env.config.js';

export default async function connectDB() {
	try {
		const connectionInstance = await mongoose.connect(envConfig.DATABASE_URL);
		Logger.info(`Database connected ${connectionInstance.connection.host}`);
	} catch (error) {
		Logger.error(`Database connection failed ${error.message}`);
		throw error;
	}
}
