import mongoose, { Schema, Document } from 'mongoose';

export interface Notification extends Document {
  message: string;
  date: Date;
}

const notificationSchema = new Schema<Notification>({
  message: { type: String, required: true },
  date: { type: Date, required: true },
});

export const NotificationModel = mongoose.model<Notification>('Notification', notificationSchema);
