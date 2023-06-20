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

export const getPatientByFirstName = async (req: express.Request, res: express.Response) => {
  try {
    const { firstName } = req.params;
    const patient = await PatientModel.findOne({ firstName });

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
    const { firstName, lastName, age, gender, contact } = req.body;

    if (!firstName || !age || !gender || !contact) {
      return res.sendStatus(400);
    }

    const patient = await PatientModel.create({ firstName,lastName, age, gender, contact });

    return res.status(201).json(patient);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error, contact already exists
      return res.status(400).json({ error: 'Person with contact already exists' });
    }
    console.log(error);
    return res.sendStatus(500);
  }
};


export const updatePatientById = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { firstName,lastName, age, gender, contact } = req.body;

    if (!firstName || !age || !gender || !contact) {
      return res.sendStatus(400);
    }

    const updatedPatient = await PatientModel.findByIdAndUpdate(
      id,
      { firstName, lastName, age, gender, contact },
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

export const updatePatientByFirstName = async (req: express.Request, res: express.Response) => {
  try {
    const { firstName: paramFirstName } = req.params;
    const { firstName, lastName, age, gender, contact } = req.body;

    if (!paramFirstName || !age || !gender || !contact) {
      return res.sendStatus(400);
    }

    const updatedPatient = await PatientModel.findOneAndUpdate(
      { firstName: paramFirstName },
      { firstName, lastName, age, gender, contact },
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
