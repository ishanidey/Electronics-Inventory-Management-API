import mongoose, { Schema, Document } from 'mongoose';

interface Supplier extends Document {
  firstName: string;
  lastName: string;
  specialization: string;
  contact: number;
  supplierCode: number;
}

const supplierSchema = new Schema<Supplier>({
  firstName: { type: String, required: true },
  lastName: { type: String },
  specialization: { type: String, required: true },
  contact: { type: Number, required : true},
  supplierCode: { type: Number, required: true}
});

export const SupplierModel = mongoose.model<Supplier>('Supplier', supplierSchema);
