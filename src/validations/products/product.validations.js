import joi from 'joi';

export const createProductValidationSchema = joi.object({
	name: joi.string().required(),
	description: joi.string().required(),
	categoryId: joi
		.string()
		.required()
		.pattern(/^[0-9a-fA-F]{24}$/),
});

export const updateProductValidationSchema = joi.object({
	name: joi.string().optional(),
	description: joi.string().optional(),
	categoryId: joi
		.string()
		.optional()
		.pattern(/^[0-9a-fA-F]{24}$/),
});
