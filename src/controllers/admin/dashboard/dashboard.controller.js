import productModel from '../../../models/product.model.js';
import categoryModel from '../../../models/category.model.js';
import Logger from '../../../lib/Logger.js';
class DashboardController {
	/**
	 *
	 * @param {*} req
	 * @param {*} res
	 * @param {*} next
	 * @returns admin/dashboard with totalProducts and totalCategories
	 */
	async getDashboard(req, res) {
		try {
			const [totalProducts, totalCategories] = await Promise.all([
				productModel.countDocuments(),
				categoryModel.countDocuments(),
			]);
			
			return res.render('admin/dashboard', {
				stats: {
					totalProducts,
					totalCategories,
				},
			});
		} catch (error) {
			Logger.error(error.message);
		}
	}
}

export default new DashboardController();
