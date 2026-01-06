import { Router } from 'express';
import categoryController from '../../../controllers/admin/category/category.controller.js';

const router = Router();

// GET /admin/categories
router.get('/', categoryController.renderCategoryPage);

// GET /admin/categories/add
router.get('/add', categoryController.renderAddCategoryPage);

// POST /admin/categories/add
router.route('/add').post(categoryController.addCategory);

// GET /admin/categories/:id/edit
router.get('/:id/edit', categoryController.getCategoryDetailById);

// PUT /admin/categories/:id
router.put('/:id', categoryController.updateCategoryById);

// DELETE /admin/categories/:id
router.delete('/:id', categoryController.deleteCategoryById);

export default router;
