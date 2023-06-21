import express from 'express';
import mongoose from 'mongoose';
import { AppointmentModel } from '../db/appointments';
import { ProductModel } from '../db/products';
import { SupplierModel } from '../db/suppliers';

export const createAppointment = async (req: express.Request, res: express.Response) => {
    try {
      const { productId, supplierId, date, time } = req.body;
  
      // Check if product exists
      const existingProduct = await ProductModel.findById(productId);
  
      if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Check if supplier exists
      const existingSupplier = await SupplierModel.findById(supplierId);
  
      if (!existingSupplier) {
        return res.status(404).json({ message: 'Supplier not found' });
      }
  
      // Create a new appointment instance
      const newAppointment = new AppointmentModel({
        product: existingProduct._id,
        supplier: existingSupplier._id,
        date,
        time,
      });
  
      // Save the new appointment to the database
      const savedAppointment = await newAppointment.save();
  
      return res.status(201).json(savedAppointment);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };
  
  export const getAppointments = async (req: express.Request, res: express.Response) => {
    try {
      const appointments = await AppointmentModel.find()
        .populate('product', 'productName brandName')
        .populate('supplier', 'productName brandName');
  
      return res.json(appointments);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };

  export const deleteAppointmentById = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const deletedAppointment = await AppointmentModel.findByIdAndDelete(id);
  
      if (!deletedAppointment) {
        return res.sendStatus(404);
      }
  
      return res.status(200).json(deletedAppointment);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };
  