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


export const getWeeklyPurchaseAndTopProducts = async (req: express.Request, res: express.Response) => {
  try {
    const today = new Date();
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 6);

    const purchases = await PurchaseModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfWeek,
            $lte: endOfWeek,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const products = await PurchaseModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfWeek,
            $lte: endOfWeek,
          },
        },
      },
      {
        $group: {
          _id: "$productName",
          quantity: { $sum: "$quantity" },
        },
      },
      {
        $sort: { quantity: -1 },
      },
    ]);

    res.json({
      purchasesByWeek: purchases,
      productsPurchased: products,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getProductPerformance = async (req: express.Request, res: express.Response) => {
  try {
    const productId = req.params.productId;

    // Retrieve the product
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Analyze sales data for the product
    const salesData = await PurchaseModel.aggregate([
      {
        $match: { productName: product.productName },
      },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: '$quantity' },
          totalRevenue: { $sum: { $multiply: ['$quantity', '$amountPaid'] } },
        },
      },
    ]);

    const productPerformance = {
      product: product.productName,
      totalQuantity: salesData[0]?.totalQuantity || 0,
      totalRevenue: salesData[0]?.totalRevenue || 0,
    };

    res.json(productPerformance);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getRevenueBreakdown = async (req: express.Request, res: express.Response) => {
  try {
    const revenueBreakdown = await PurchaseModel.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: 'productName',
          foreignField: 'productName',
          as: 'product',
        },
      },
      {
        $unwind: '$product',
      },
      {
        $group: {
          _id: '$product.category',
          revenue: {
            $sum: {
              $multiply: [
                { $toDouble: '$quantity' },
                { $toDouble: '$product.price' },
              ],
            },
          },
        },
      },
      {
        $project: {
          category: '$_id',
          revenue: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(revenueBreakdown);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
