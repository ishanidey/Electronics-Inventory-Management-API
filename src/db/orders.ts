import mongoose, { Schema, Document } from 'mongoose';

export interface Order extends Document {
  product: mongoose.Types.ObjectId;
  supplier: mongoose.Types.ObjectId;
  date: Date;
  time: string;
  amount: number;
  deadline: Date;
  status: string; // Add the status field
}

const orderSchema = new Schema<Order>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  supplier: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  amount: { type: Number, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, default: 'pending' }, // Set the default status as 'pending'
});

export const OrderModel = mongoose.model<Order>('Order', orderSchema);
