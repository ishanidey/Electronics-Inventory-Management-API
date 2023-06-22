import express from 'express';
import { PurchaseModel } from '../db/purchase';
import { ProductModel } from '../db/products';
import { Request, Response } from 'express';

export const createPurchase = async (req: express.Request, res: express.Response) => {
  try {
    const { productName, quantity, customerName } = req.body;

    // Check if the product exists
    const product = await ProductModel.findOne({ productName });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    const purchase = new PurchaseModel({
      productName,
      quantity,
      customerName,
      // Set other necessary fields
    });

    // Save the purchase to the database
    const savedPurchase = await purchase.save();

    // Reduce the stock of the product
    product.stock -= quantity;
    await product.save();

    res.status(201).json(savedPurchase);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

  

export const getAllPurchases = async (req: express.Request, res: express.Response) => {
    try {
      const purchases = await PurchaseModel.find();
      return res.status(200).json(purchases);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };