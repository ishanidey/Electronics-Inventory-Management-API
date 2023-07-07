import mongoose from 'mongoose';

const PurchaseSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  customerName: { type: String, required: true },
  amountPaid: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }, // Add createdAt field with default value
});

export const PurchaseModel = mongoose.model('Purchase', PurchaseSchema);
