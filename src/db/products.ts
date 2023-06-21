import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  brandName: { type: String, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  price: { type: String, required: true, },
});

export const ProductModel = mongoose.model('Product', ProductSchema);
