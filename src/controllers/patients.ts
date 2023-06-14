import express from 'express';
import { PatientModel } from '../db/patients';

export const getAllPatients = async (req: express.Request, res: express.Response) => {
  try {
    const patients = await PatientModel.find();
    return res.status(200).json(patients);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getPatientById = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const patient = await PatientModel.findById(id);

    if (!patient) {
      return res.sendStatus(404);
    }

    return res.status(200).json(patient);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const createPatient = async (req: express.Request, res: express.Response) => {
  try {
    const { name, age, gender } = req.body;

    if (!name || !age || !gender) {
      return res.sendStatus(400);
    }

    const patient = await PatientModel.create({ name, age, gender });

    return res.status(201).json(patient);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const updatePatientById = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { name, age, gender } = req.body;

    if (!name || !age || !gender) {
      return res.sendStatus(400);
    }

    const updatedPatient = await PatientModel.findByIdAndUpdate(
      id,
      { name, age, gender },
      { new: true }
    );

    if (!updatedPatient) {
      return res.sendStatus(404);
    }

    return res.status(200).json(updatedPatient);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const deletePatientById = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const deletedPatient = await PatientModel.findByIdAndDelete(id);

    if (!deletedPatient) {
      return res.sendStatus(404);
    }

    return res.status(200).json(deletedPatient);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
