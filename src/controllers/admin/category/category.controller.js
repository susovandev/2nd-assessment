import Logger from '../../../lib/Logger.js';
import categoryModel from '../../../models/category.model.js';

class CategoryController {
	async renderCategoryPage(req, res) {
		console.log('renderCategoryPage');
		try {
			const categories = await categoryModel
				.find({ isDeleted: false })
				.sort({ createdAt: -1 })
				.lean();
			console.log(`categories: ${JSON.stringify(categories)}`);

			res.render('admin/categories/list', { categories });
		} catch (error) {
			Logger.error(error.message);
		}
	}

	// ADD PAGE
	async renderAddCategoryPage(req, res) {
		console.log('renderAddCategoryPage');
		try {
			return res.render('admin/categories/add');
		} catch (error) {
			Logger.error(error.message);
		}
	}

	async getCategoryDetailById(req, res) {
		try {
			const { id } = req.params;

			const category = await categoryModel.findById(id).lean();
			if (!category) {
				res.status(404).send('Category not found');
			}

			return res.render('admin/categories/edit', { category });
		} catch (error) {
			Logger.error(error.message);
		}
	}

async addCategory(req, res) {
	try {
		Logger.debug(`Add category with body: ${JSON.stringify(req.body)}`);

		const { name } = req.body;

		if (!name || typeof name !== 'string') {
			return res.status(400).send('Category name is required and must be a string');
		}

		const category = await categoryModel.create({ name });

		if (!category) {
			Logger.error('Failed to create category in DB');
			return res.status(500).send('Failed to create category');
		}

		// Redirect after success
		return res.redirect('/admin/categories/list');
	} catch (error) {
		Logger.error(`Error adding category: ${error.message}`);
		return res.status(500).send('Internal server error');
	}
}

	// UPDATE
	async updateCategoryById(req, res) {
		try {
			const { id } = req.params;
			const { name } = req.body;

			const category = await categoryModel.findByIdAndUpdate(id, { name });
			if (!category) {
				res.status(404).send('Category not found');
			}

			req.flash('success', 'Category updated successfully');
			return res.redirect('/admin/categories');
		} catch (error) {
			Logger.error(error.message);
		}
	}

	// DELETE (SOFT)
	async deleteCategoryById(req, res) {
		try {
			const { id } = req.params;

			const category = await categoryModel.findByIdAndUpdate(id, { isDeleted: true });

			if (!category) {
				res.status(404).send('Category not found');
			}

			req.flash('success', 'Category deleted successfully');
			return res.redirect('/admin/categories');
		} catch (error) {
			Logger.error(error.message);
		}
	}
}

export default new CategoryController();
