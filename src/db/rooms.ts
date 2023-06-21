import mongoose, { Schema, Document } from 'mongoose';
import { ProductModel } from './products';

interface Room extends Document {
  roomNo: number;
  available: number;
  roomType: string;
  costRoom: number;
  products: mongoose.Types.ObjectId[];
}

const roomSchema = new Schema<Room>({
  roomNo: { type: Number, required: true },
  available: { type: Number, required: true },
  roomType: { type: String, required: true },
  costRoom: { type: Number, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

roomSchema.path('products').validate(async (values) => {
  if (values.length === 0) {
    return true;
  }

  const count = await ProductModel.countDocuments({ _id: { $in: values } });
  return count === values.length;
}, 'Invalid product IDs');

export const RoomModel = mongoose.model<Room>('Room', roomSchema);
