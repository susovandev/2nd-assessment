import Logger from '../lib/Logger.js';
import productModel from '../models/product.model.js';
import categoryModel from '../models/category.model.js';

class HomeController {
	async homePage(req, res, next) {
		try {
			const { search, category } = req.query;

			Logger.debug(`Get product list. Search: ${search}, Category: ${category}`);

			const filter = {};

			if (search && search.trim()) {
				filter.$or = [
					{ name: { $regex: search, $options: 'i' } },
					{ description: { $regex: search, $options: 'i' } },
				];
			}

			if (category) {
				filter.category = category;
			}

			const products = await productModel
				.find(filter)
				.populate('category')
				.lean()
				.exec();

			const categories = await categoryModel
				.find({ isDeleted: false })
				.lean()
				.exec();

			return res.render('index', {
				products,
				categories,
				query: req.query,
			});
		} catch (error) {
			Logger.error(error.message);
			next(error);
		}
	}
}

export default new HomeController();
