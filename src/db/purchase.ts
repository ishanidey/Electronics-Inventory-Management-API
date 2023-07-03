import mongoose from 'mongoose';

const PurchaseSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  customerName: { type: String, required: true },
  // Add other necessary fields for the purchase
  amountPaid: { type: Number, required: true },
});


export const PurchaseModel = mongoose.model('Purchase', PurchaseSchema);
