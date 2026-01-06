import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		slug: { type: String },
		isDeleted: { type: Boolean, default: false },
	},
	{ timestamps: true },
);

categorySchema.pre('save', function (next) {
	this.slug = this.name.toLowerCase().split(' ').join('-');
	next();
});

export default mongoose.model('Category', categorySchema);
