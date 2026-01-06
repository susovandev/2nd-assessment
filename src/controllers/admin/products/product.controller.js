import Logger from '../../../lib/Logger.js';
import productModel from '../../../models/product.model.js';

import { deleteFromCloudinary, uploadOnCloudinary } from '../../../helper/cloudinary.helper.js';
import mongoose from 'mongoose';
import categoryModel from '../../../models/category.model.js';

class ProductController {
	async getAllProducts(req, res) {
		try {
			const products = await productModel
				.find({ isDeleted: false })
				.populate('category')
				.sort({ createdAt: -1 })
				.lean();

			return res.render('products/list', { products });
		} catch (error) {
			Logger.error(error.message);
		}
	}
	async renderAddProductPage(req, res) {
		try {
			const categories = await categoryModel.find({ isDeleted: false }).lean();

			res.render('admin/products/add', { categories });
		} catch (error) {
			Logger.error(error.message);
		}
	}
	async getProductDetail(req, res) {
		try {
			const { id } = req.params;

			Logger.debug(`Get product detail. ID: ${id}`);

			const query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { slug: id };
			if (!query) {
				res.status(404).send('Product not found');
			}

			const product = await productModel.findOne(query).populate('category').lean().exec();

			if (!product) {
				res.status(404).send('Product not found');
			}

			return res.render('products/detail', { product });
		} catch (error) {
			Logger.error(error.message);
		}
	}
	async createProduct(req, res) {
		try {
			const { name, categoryId, description } = req.body;
			const productImageLocalFilePath = req?.file?.path;

			if (!productImageLocalFilePath) {
				res.status(400).send('Product image is required');
			}

			Logger.debug(`Product image local file path: ${productImageLocalFilePath}`);

			// TODO: Upload image on cloudinary
			const { public_id, secure_url } = await uploadOnCloudinary({
				localFilePath: productImageLocalFilePath,
			});

			const newProduct = await productModel.create({
				name,
				category: categoryId,
				description,
				image: {
					public_id: public_id,
					secure_url: secure_url,
				},
			});
			if (!newProduct) {
				res.status(500).send('Failed to create product');
			}
			req.flash('success', 'Product created successfully');
			return res.redirect('/admin/products');
		} catch (error) {
			Logger.error(error.message);
		}
	}

	async renderProductUpdatePage(req, res) {
		try {
			const { id } = req.params;
			const product = await productModel.findById(id).lean().exec();
			if (!product) {
				res.status(404).send('Product not found');
			}
			return res.render('products/update', { product });
		} catch (error) {
			Logger.error(error.message);
		}
	}

	async updateProductById(req, res) {
		try {
			const { id } = req.params;
			const { name, categoryId, description } = req.body;

			const productImageLocalFilePath = req?.file?.path;

			const product = await productModel.findById(id);
			if (!product) {
				res.status(404).send('Product not found');
			}

			// TODO: If user avatar is already present, consider deleting the old avatar from storage
			if (productImageLocalFilePath && product?.image?.public_id) {
				// TODO: Delete old avatar from cloudinary storage
				await deleteFromCloudinary(product?.image?.public_id || '');
			}

			const uploadedImage = await uploadOnCloudinary({
				localFilePath: productImageLocalFilePath,
				resourceType: 'image',
			});
			if (!uploadedImage) {
				Logger.warn('Product image upload failed during product update');
				res.status(500).send('Product image upload failed');
			}

			const updatedUser = await productModel.findByIdAndUpdate(
				id,
				{
					name,
					category: categoryId,
					description,
					image: {
						public_id: uploadedImage?.public_id,
						secure_url: uploadedImage?.secure_url,
					},
				},
				{ new: true },
			);
			if (!updatedUser) {
				Logger.warn(`Product not found for id: ${id}`);
				res.status(404).send('Product not found');
			}

			Logger.debug(`Product updated for id: ${id}`);

			req.flash('success', 'Product updated successfully');

			res.redirect('/admin/products');
		} catch (error) {
			Logger.error(error.message);
		}
	}
	async deleteProductById(req, res) {
		try {
			const { id } = req.params;

			const product = await productModel.findByIdAndDelete(id);
			if (!product) {
				Logger.error(`Product not found for id: ${id}`);
				res.status(404).send('Product not found');
			}

			// Todo: Delete product image from cloudinary storage
			if (product?.image?.public_id) {
				await deleteFromCloudinary(product?.image?.public_id || '');
			}

			Logger.debug(`Product deleted for id: ${id}`);

			req.flash('success', 'Product deleted successfully');

			res.redirect('/admin/products');
		} catch (error) {
			Logger.error(error.message);
		}
	}
}

export default new ProductController();
