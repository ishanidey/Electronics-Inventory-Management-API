import mongoose, { Schema, Document } from 'mongoose';

export interface Appointment extends Document {
  product: mongoose.Types.ObjectId;
  supplier: mongoose.Types.ObjectId;
  date: Date;
  time: string;
}

const appointmentSchema = new Schema<Appointment>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  supplier: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
});

export const AppointmentModel = mongoose.model<Appointment>('Appointment', appointmentSchema);
