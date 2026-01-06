import express from 'express';
import path from 'node:path';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import morganMiddleware from './middlewares/morgan.middleware.js';
import { notFoundHandler } from './middlewares/notFound.middleware.js';

import healthRoutes from './routes/health.routes.js';

export default function initializeExpressApp() {
	const app = express();

	// Morgan Middleware
	app.use(morganMiddleware);

	// Body-Parser Middlewares
	app.use(express.json({ limit: '50mb' }));
	app.use(express.urlencoded({ extended: true, limit: '50mb' }));

	// Static Middleware
	app.use(express.static('public'));

	// Setup template engine
	app.set('view engine', 'ejs');

	// Setup views directory
	app.set('views', path.join(process.cwd(), 'views'));

	// Health Routes
	app.use('/health', healthRoutes);

	// Home Routes
	app.use('/', (req, res) => res.render('home'));

	// Not Found Middleware
	app.use(notFoundHandler);

	// Error Handler Middleware
	app.use(errorHandler);

	return app;
}
