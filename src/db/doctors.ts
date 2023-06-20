import mongoose, { Schema, Document } from 'mongoose';

interface Doctor extends Document {
  firstName: string;
  lastName: string;
  specialization: string;
  contact: number;
  opdNo: number;
}

const doctorSchema = new Schema<Doctor>({
  firstName: { type: String, required: true },
  lastName: { type: String },
  specialization: { type: String, required: true },
  contact: { type: Number, required : true},
  opdNo: { type: Number, required: true}
});

export const DoctorModel = mongoose.model<Doctor>('Doctor', doctorSchema);
