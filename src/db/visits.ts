import mongoose, { Schema, Document } from 'mongoose';
import { PatientModel } from './patients';

interface Visit extends Document {
  patient: mongoose.Types.ObjectId;
  date: Date;
  reason: string;
  amountCharged: number;
}

const visitSchema = new Schema<Visit>({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  date: { type: Date, required: true },
  reason: { type: String, required: true },
  amountCharged: { type: Number, required: true },
});

visitSchema.path('patient').validate(async (value) => {
  const count = await PatientModel.countDocuments({ _id: value });
  return count > 0;
}, 'Invalid patient ID');

export const VisitModel = mongoose.model<Visit>('Visit', visitSchema);
