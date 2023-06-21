import mongoose, { Schema, Document } from 'mongoose';
import { ProductModel } from './products';

interface Inventory extends Document {
  product: mongoose.Types.ObjectId;
  date: Date;
  location: string;
  amountUsed: number;
}

const inventorySchema = new Schema<Inventory>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  amountUsed: { type: Number, required: true },
});

inventorySchema.path('product').validate(async (value) => {
  const count = await ProductModel.countDocuments({ _id: value });
  return count > 0;
}, 'Invalid product ID');

export const InventoryModel = mongoose.model<Inventory>('Inventory', inventorySchema);
