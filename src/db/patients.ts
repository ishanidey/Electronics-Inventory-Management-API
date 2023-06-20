import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  contact: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value: string) {
        return /^\d{10}$/.test(value);
      },
      message: 'Contact number should be a 10-digit number.',
    },
  },
});

export const PatientModel = mongoose.model('Patient', PatientSchema);
