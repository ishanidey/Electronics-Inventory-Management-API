import mongoose, { Schema, Document } from 'mongoose';

interface Appointment extends Document {
  patient: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
  date: Date;
  time: string;
}

const appointmentSchema = new Schema<Appointment>({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
});

export const AppointmentModel = mongoose.model<Appointment>('Appointment', appointmentSchema);
