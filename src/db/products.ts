import mongoose from 'mongoose';
/*
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const ReviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

const RatingSchema = new mongoose.Schema({
  value: { type: Number, required: true, min: 1, max: 5 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

*/
const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  brandName: { type: String, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

/*export const UserModel = mongoose.model('User', UserSchema);
export const ReviewModel = mongoose.model('Review', ReviewSchema);
export const RatingModel = mongoose.model('Rating', RatingSchema);*/
export const ProductModel = mongoose.model('Product', ProductSchema);
