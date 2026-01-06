import { v2 as cloudinary } from 'cloudinary';
import { envConfig } from '../config/env.config.js';
import Logger from '../lib/Logger.js';
import { InternalServerError } from '../lib/errors.js';

cloudinary.config({
	cloud_name: envConfig.CLOUDINARY_CLOUD_NAME,
	api_key: envConfig.CLOUDINARY_API_KEY,
	api_secret: envConfig.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (params) => {
	const { localFilePath, resourceType = 'image', uploadFolder = 'webskitter', options } = params;
	Logger.debug(`Uploading file to Cloudinary. Resource Type: ${resourceType}`);

	if (!localFilePath) {
		Logger.warn('No local file path provided for video upload');
		throw new InternalServerError('No local file path provided');
	}

	try {
		const uploadResult = await cloudinary.uploader.upload(localFilePath, {
			folder: uploadFolder,
			resource_type: resourceType,
			...options,
		});

		Logger.debug(`Video uploaded to cloudinary: ${uploadResult?.public_id}`);

		return uploadResult;
	} catch (error) {
		Logger.error('Cloudinary video upload failed', error);
		throw error;
	}
};

export const deleteFromCloudinary = async (publicId) => {
	try {
		Logger.debug(`Preparing to delete image from Cloudinary: ${publicId}`);

		if (!publicId) {
			Logger.warn('No public id provided for image deletion');
			throw new InternalServerError('No public id provided');
		}

		Logger.debug(`Deleting image from cloudinary: ${publicId}`);

		const result = await cloudinary.uploader.destroy(publicId, {
			resource_type: 'auto',
		});

		if (result.result !== 'ok') {
			Logger.error(`Image deletion returned unexpected result: ${result.result}`);
			throw new InternalServerError('Failed to delete image from Cloudinary');
		}

		Logger.info(`Image deleted from cloudinary: ${publicId}`);
	} catch (error) {
		Logger.error(`Cloudinary image delete failed for ID: ${publicId}`, error);
		throw error;
	}
};
