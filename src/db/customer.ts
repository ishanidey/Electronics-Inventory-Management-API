import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amountDue: { type: Number, required: true }
  // Add any other necessary properties for the customer
});

export const CustomerModel = mongoose.model('Customer', CustomerSchema);
