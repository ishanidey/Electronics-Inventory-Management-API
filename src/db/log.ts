import mongoose, { Schema, Document } from 'mongoose';

export interface Log extends Document {
  activity: string;
  timestamp: Date;
}

const logSchema = new Schema<Log>({
  activity: { type: String, required: true },
  timestamp: { type: Date, default: Date.now, required: true },
});

export const LogModel = mongoose.model<Log>('Log', logSchema);
