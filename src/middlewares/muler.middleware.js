import multer from 'multer';
import path from 'node:path';
import { envConfig } from '../config/env.config.js';

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, 'public/uploads');
	},

	filename: (_req, file, cb) => {
		const companyName = envConfig.SERVICE_NAME;
		const randomString = Math.random().toString(36).substring(2, 12);

		const filename = `${companyName}_${Date.now()}_${randomString}${path.extname(
			file.originalname,
		)}`;

		cb(null, filename);
	},
});

const fileFilter = (_req, file, cb) => {
	if (file.mimetype.startsWith('image/')) {
		cb(null, true);
	} else {
		cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Only image files are allowed'));
	}
};

const upload = multer({
	storage,
	fileFilter,
	limits: {
		fileSize: MAX_FILE_SIZE_BYTES,
	},
});

export { upload };
