import express from 'express';
import { SupplierModel } from '../db/suppliers';

export const createSupplier = async (req: express.Request, res: express.Response) => {
  try {
    const { firstName, lastName, specialization, contact, supplierCode } = req.body;

    if (!firstName || !contact || !specialization || !supplierCode) {
      return res.sendStatus(400);
    }

    const supplier = await SupplierModel.create({ firstName,lastName, specialization, supplierCode, contact });

    return res.status(201).json(supplier);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error, contact already exists
      return res.status(400).json({ error: 'Person with contact already exists' });
    }
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getAllSuppliers = async (req: express.Request, res: express.Response) => {
  try {
    const suppliers = await SupplierModel.find();
    return res.status(200).json(suppliers);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};