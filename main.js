import initializeExpressApp from './src/app.js';
import { envConfig } from './src/config/env.config.js';
import connectDB from './src/db/db.js';
import Logger from './src/lib/Logger.js';

export default function bootstrap() {
	const app = initializeExpressApp();
	const env = envConfig.NODE_ENV;
	const port = envConfig.PORT;

	connectDB()
		.then(() => {
			app.listen(port, () => {
				Logger.info(`Server is running in ${env} mode on http://localhost:${port}`);
			});
		})
		.catch((error) => {
			Logger.error(`Database connection failed ${error.message}`);
			process.exit(1);
		});
}

bootstrap();
