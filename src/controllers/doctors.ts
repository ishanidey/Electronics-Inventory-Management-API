import express from 'express';
import { DoctorModel } from '../db/doctors';

export const createDoctor = async (req: express.Request, res: express.Response) => {
  try {
    const { firstName, lastName, specialization, contact, opdNo } = req.body;

    if (!firstName || !contact || !specialization || !opdNo) {
      return res.sendStatus(400);
    }

    const doctor = await DoctorModel.create({ firstName,lastName, specialization, opdNo, contact });

    return res.status(201).json(doctor);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error, contact already exists
      return res.status(400).json({ error: 'Person with contact already exists' });
    }
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getAllDoctors = async (req: express.Request, res: express.Response) => {
  try {
    const doctors = await DoctorModel.find();
    return res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};