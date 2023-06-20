import mongoose, { Schema, Document } from 'mongoose';
import { PatientModel } from './patients';

interface Room extends Document {
  roomNo: number;
  available: number;
  roomType: string;
  costRoom: number;
  patients: mongoose.Types.ObjectId[];
}

const roomSchema = new Schema<Room>({
  roomNo: { type: Number, required: true },
  available: { type: Number, required: true },
  roomType: { type: String, required: true },
  costRoom: { type: Number, required: true },
  patients: [{ type: Schema.Types.ObjectId, ref: 'Patient' }],
});

roomSchema.path('patients').validate(async (values) => {
  if (values.length === 0) {
    return true;
  }

  const count = await PatientModel.countDocuments({ _id: { $in: values } });
  return count === values.length;
}, 'Invalid patient IDs');

export const RoomModel = mongoose.model<Room>('Room', roomSchema);
