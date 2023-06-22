import express from 'express';
import mongoose from 'mongoose';
import { OrderModel } from '../db/orders';
import { ProductModel } from '../db/products';
import { SupplierModel } from '../db/suppliers';
import { InventoryModel } from '../db/inventory';
import { logActivity } from './log';

export const createOrder = async (req: express.Request, res: express.Response) => {
    try {
      const { productId, supplierId, date, time, amount, deadline } = req.body;
  
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
  
      // Create a new order instance
      const newOrder = new OrderModel({
        product: existingProduct._id,
        supplier: existingSupplier._id,
        date,
        time,
        amount,
        deadline
      });
  
      // Save the new order to the database
      const savedOrder = await newOrder.save();
      await logActivity('Order created', existingProduct.productName);
      return res.status(201).json(savedOrder);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };
  
  export const getOrders = async (req: express.Request, res: express.Response) => {
    try {
      const orders = await OrderModel.find()
        .populate('product', 'productName brandName')
        .populate('supplier', 'firstName lastName');
  
      return res.json(orders);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };

  export const getOrderStatus = async (req: express.Request, res: express.Response) => {
    try {
      const { orderId } = req.params;
      const order = await OrderModel.findById(orderId);
  
      if (!order) {
        return res.sendStatus(404);
      }
  
      return res.status(200).json({ status: order.status });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };
  
  export const updateOrderStatus = async (req: express.Request, res: express.Response) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
  
      if (!status) {
        return res.sendStatus(400);
      }
  
      const updatedOrder = await OrderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
  
      if (!updatedOrder) {
        return res.sendStatus(404);
      }
  
      // Check if the order status is "delivered"
      if (status === 'delivered') {
        // Retrieve the inventory associated with the product in the order
        const inventory = await InventoryModel.findOne({ product: updatedOrder.product });
  
        if (inventory) {
          // Add the amount value of the order to the inventory's amountUsed
          inventory.amountUsed += updatedOrder.amount;
  
          // Save the updated inventory
          await inventory.save();
        }
      }
  
      await logActivity(`Order updated: orderId = ${orderId}, status = ${status}`);
      return res.status(200).json({ status: updatedOrder.status });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };
  
  
  export const getOrdersByStatus = async (req: express.Request, res: express.Response) => {
    try {
      const { status } = req.params;
      const orders = await OrderModel.find({ status });
  
      if (orders.length === 0) {
        return res.sendStatus(404);
      }
  
      return res.status(200).json(orders);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };

  export const analyzeOrdersbySalesTrends = async (req: express.Request, res: express.Response) => {
    try {
      // Perform analysis logic here
      const popularProducts = await OrderModel.aggregate([
        {
          $group: {
            _id: '$product',
            totalSales: { $sum: '$amount' },
            count: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: '_id',
            as: 'productInfo',
          },
        },
        {
          $unwind: '$productInfo',
        },
        {
          $project: {
            productName: '$productInfo.productName',
            brandName: '$productInfo.brandName',
            totalSales: 1,
            count: 1,
          },
        },
        {
          $sort: {
            totalSales: -1,
          },
        },
      ]);
  
      return res.status(200).json(popularProducts);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };
  
  

  export const deleteOrderById = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const deletedOrder = await OrderModel.findByIdAndDelete(id);
  
      if (!deletedOrder) {
        return res.sendStatus(404);
      }
      await logActivity('Order deleted with id = ', id);
      return res.status(200).json(deletedOrder);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };
  