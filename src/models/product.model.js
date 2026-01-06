import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		slug: { type: String, required: true },
		category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
		description: { type: String, required: true },
		image: {
			public_id: { type: String, required: true },
			secure_url: { type: String, required: true },
		},
		isDeleted: { type: Boolean, default: false },
	},
	{ timestamps: true },
);

productSchema.pre('save', function (next) {
	this.slug = this.name.toLowerCase().split(' ').join('-');
	next();
});

export default mongoose.model('Product', productSchema);
