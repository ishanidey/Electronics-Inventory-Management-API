import express from 'express';
import { PurchaseModel } from '../db/purchase';
import { ProductModel } from '../db/products';
import {CustomerModel} from '../db/customer';
import { Request, Response } from 'express';

export const createPurchase = async (req: express.Request, res: express.Response) => {
  try {
    const { productName, quantity, customerName, amountPaid } = req.body;

    // Check if the product exists
    const product = await ProductModel.findOne({ productName });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    // Create a new customer or find an existing one
    let customer = await CustomerModel.findOne({ name: customerName });

    if (!customer) {
      customer = new CustomerModel({
        name: customerName,
        amountDue: 0,
      });
    }

    // Calculate the amountDue based on the quantity, price, and amountPaid
    const productPrice = product.price;
    const amountDue = quantity * productPrice - amountPaid;
    customer.amountDue += amountDue;
    await customer.save();

    const purchase = new PurchaseModel({
      productName,
      quantity,
      customerName,
      amountPaid,
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

export const updateCustomerAmountPaid = async (req: express.Request, res: express.Response) => {
  try {
    const { customerName, amountPaid } = req.body;

    // Find the customer
    const customer = await CustomerModel.findOne({ name: customerName });

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Update the amountPaid
    customer.amountDue -= amountPaid;
    await customer.save();

    res.json(customer);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getCustomerBalance = async (req: express.Request, res: express.Response) => {
  try {
    const customers = await CustomerModel.find({});
    const customerBalances = [];

    for (const customer of customers) {
      customerBalances.push({ customerName: customer.name, balance: customer.amountDue });
    }

    res.json(customerBalances);
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