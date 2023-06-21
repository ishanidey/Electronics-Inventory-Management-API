import express from 'express';
import mongoose from 'mongoose';
import { ProductModel } from '../db/products';
import { RoomModel } from '../db/rooms';

export const getAllRooms = async (req: express.Request, res: express.Response) => {
  try {
    const rooms = await RoomModel.find().populate({
      path: 'products',
      select: 'productName brandName stock',
    });

    return res.status(200).json(rooms);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};


export const addRoom = async (req: express.Request, res: express.Response) => {
  try {
    const { roomNo, available, roomType, costRoom } = req.body;

    // Create a new room instance
    const newRoom = new RoomModel({
      roomNo,
      available,
      roomType,
      costRoom,
      products: [],
    });

    // Save the new room to the database
    const savedRoom = await newRoom.save();

    return res.status(201).json(savedRoom);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const addProductToRoom = async (req: express.Request, res: express.Response) => {
  try {
    const { roomNo } = req.params;
    const { product } = req.body;

    // Check if product ID is provided
    if (!product) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    // Check if room exists
    const room = await RoomModel.findOne({ roomNo });

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Check if room is available
    if (room.available === 0) {
      return res.status(400).json({ message: 'Room is not available' });
    }

    // Check if product exists
    const existingProduct = await ProductModel.findById(product);

    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Add product to the room
    room.products.push(product);
    room.available -= 1;

    // Save the updated room to the database
    const updatedRoom = await room.save();

    return res.status(200).json(updatedRoom);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getAvailableRooms: express.RequestHandler = async (req, res) => {
  try {
    const rooms = await RoomModel.find({ available: { $gt: 0 } });

    return res.status(200).json(rooms);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getRoomWithProducts: express.RequestHandler = async (req, res) => {
  try {
    const { roomNo } = req.params;

    // Find the room with the given room number and populate the products field
    const room = await RoomModel.findOne({ roomNo }).populate('products');

    // Check if the room exists
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    return res.status(200).json(room);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const deleteProductFromRoom: express.RequestHandler = async (req, res) => {
  try {
    const { roomNo, id } = req.params;

    // Find the room with the given room number
    const room = await RoomModel.findOne({ roomNo });

    // Check if the room exists
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Convert the id string to an ObjectId
    const objectId = new mongoose.Types.ObjectId(id);

    // Check if the product exists in the room
    if (!room.products.includes(objectId)) {
      return res.status(404).json({ message: 'Product not found in the room' });
    }

    // Remove the product from the room
    room.products = room.products.filter((productId) => productId.toString() !== objectId.toString());
    room.available++;

    // Save the updated room to the database
    await room.save();

    return res.status(200).json({ message: 'Product removed from the room' });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};