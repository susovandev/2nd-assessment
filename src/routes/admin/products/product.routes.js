import { Router } from 'express';
import productController from '../../../controllers/admin/products/product.controller.js';
import { upload } from '../../../middlewares/muler.middleware.js';
import validateRequest from '../../../middlewares/validation.middleware.js';
import {
	createProductValidationSchema,
	updateProductValidationSchema,
} from '../../../validations/products/product.validations.js';

const router = Router();

//http://localhost:5555/admin/products
router.get('/', productController.getAllProducts);

// GET | POST - http://localhost:5555/admin/products/add
router.get('/add', productController.renderAddProductPage);
router.post(
	'/add',
	validateRequest(createProductValidationSchema),
	upload.single('image'),
	productController.createProduct,
);

// GET | PUT - http://localhost:5555/admin/products/edit/:id
router.get('edit/:id', productController.renderProductUpdatePage);
router.put(
	'/edit/:id',
	validateRequest(updateProductValidationSchema),
	upload.single('image'),
	productController.updateProductById,
);

// http://localhost:5555/admin/products/delete/:id
router.delete('/delete/:id', productController.deleteProductById);

export default router;
