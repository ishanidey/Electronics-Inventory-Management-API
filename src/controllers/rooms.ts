import express from 'express';
import mongoose from 'mongoose';
import { PatientModel } from '../db/patients';
import { RoomModel } from '../db/rooms';

export const getAllRooms = async (req: express.Request, res: express.Response) => {
  try {
    const rooms = await RoomModel.find().populate({
      path: 'patients',
      select: 'firstName lastName age',
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
      patients: [],
    });

    // Save the new room to the database
    const savedRoom = await newRoom.save();

    return res.status(201).json(savedRoom);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const addPatientToRoom = async (req: express.Request, res: express.Response) => {
  try {
    const { roomNo } = req.params;
    const { patient } = req.body;

    // Check if patient ID is provided
    if (!patient) {
      return res.status(400).json({ message: 'Patient ID is required' });
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

    // Check if patient exists
    const existingPatient = await PatientModel.findById(patient);

    if (!existingPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Add patient to the room
    room.patients.push(patient);
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

export const getRoomWithPatients: express.RequestHandler = async (req, res) => {
  try {
    const { roomNo } = req.params;

    // Find the room with the given room number and populate the patients field
    const room = await RoomModel.findOne({ roomNo }).populate('patients');

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

export const deletePatientFromRoom: express.RequestHandler = async (req, res) => {
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

    // Check if the patient exists in the room
    if (!room.patients.includes(objectId)) {
      return res.status(404).json({ message: 'Patient not found in the room' });
    }

    // Remove the patient from the room
    room.patients = room.patients.filter((patientId) => patientId.toString() !== objectId.toString());
    room.available++;

    // Save the updated room to the database
    await room.save();

    return res.status(200).json({ message: 'Patient removed from the room' });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};