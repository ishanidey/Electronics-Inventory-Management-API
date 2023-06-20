import express from 'express';
import { PatientModel } from '../db/patients';
import { VisitModel } from '../db/visits';

export const getAllPatientsWithVisits = async (req: express.Request, res: express.Response) => {
  try {

    const patients = await PatientModel.find();
    const patientVisits = [];


    for (const patient of patients) {
      const visits = await VisitModel.find({ patient: patient._id });
      const totalAmountCharged = visits.reduce((total, visit) => total + visit.amountCharged, 0);
      patientVisits.push({ patient, visits, totalAmountCharged });
    }

    return res.status(200).json(patientVisits);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getPatientVisitsById = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const patient = await PatientModel.findById(id);
    if (!patient) {
      return res.sendStatus(404);
    }

    const visits = await VisitModel.find({ patient: id });
    const totalAmountCharged = visits.reduce((total, visit) => total + visit.amountCharged, 0);
    return res.status(200).json({ patient, visits, totalAmountCharged });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getPatientVisitsByFirstName = async (req: express.Request, res: express.Response) => {
  try {
    const { firstName } = req.params;
    const patients = await PatientModel.find({ firstName });

    if (patients.length === 0) {
      return res.sendStatus(404);
    }

    const patientVisits = [];

    for (const patient of patients) {
      const visits = await VisitModel.find({ patient: patient._id });
      const totalAmountCharged = visits.reduce((total, visit) => total + visit.amountCharged, 0);

      patientVisits.push({ patient, visits, totalAmountCharged });
    }

    return res.status(200).json(patientVisits);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getPatientVisitsByContact = async (req: express.Request, res: express.Response) => {
  try {
    const { contact } = req.params;
    const patient = await PatientModel.findOne({ contact });

    if (!patient) {
      return res.sendStatus(404);
    }

    const visits = await VisitModel.find({ patient: patient._id }); // Use patient._id instead of firstName
    const totalAmountCharged = visits.reduce((total, visit) => total + visit.amountCharged, 0);
    return res.status(200).json({ patient, visits, totalAmountCharged});
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getPatientVisitsByAge = async (req: express.Request, res: express.Response) => {
  try {
    const { age} = req.params;
    const patients = await PatientModel.find({ age });

    if (patients.length === 0) {
      return res.sendStatus(404);
    }

    const patientVisits = [];

    for (const patient of patients) {
      const visits = await VisitModel.find({ patient: patient._id });
      const totalAmountCharged = visits.reduce((total, visit) => total + visit.amountCharged, 0);
      patientVisits.push({ patient, visits, totalAmountCharged });
    }

    return res.status(200).json(patientVisits);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};


export const getPatientVisitsByGender = async (req: express.Request, res: express.Response) => {
  try {
    const { gender } = req.params;
    const patients = await PatientModel.find({ gender });

    if (patients.length === 0) {
      return res.sendStatus(404);
    }

    const patientVisits = [];

    for (const patient of patients) {
      const visits = await VisitModel.find({ patient: patient._id });
      const totalAmountCharged = visits.reduce((total, visit) => total + visit.amountCharged, 0);
      patientVisits.push({ patient, visits, totalAmountCharged});
    }

    return res.status(200).json(patientVisits);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};





export const createPatientVisit = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { date, reason, amountCharged } = req.body;

    const patient = await PatientModel.findById(id);
    if (!patient) {
      return res.sendStatus(404);
    }

    const visit = await VisitModel.create({
      patient: id,
      date,
      reason,
      amountCharged,
    });

    return res.status(201).json(visit);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const updatePatientVisitById = async (req: express.Request, res: express.Response) => {
  try {
    const { id, visitId } = req.params;
    const { date, reason, amountCharged } = req.body;

    const patient = await PatientModel.findById(id);
    if (!patient) {
      return res.sendStatus(404);
    }

    const visit = await VisitModel.findOneAndUpdate(
      { _id: visitId, patient: id },
      { date, reason, amountCharged },
      { new: true }
    );

    if (!visit) {
      return res.sendStatus(404);
    }

    return res.status(200).json(visit);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const deletePatientVisitById = async (req: express.Request, res: express.Response) => {
  try {
    const { id, visitId } = req.params;

    const patient = await PatientModel.findById(id);
    if (!patient) {
      return res.sendStatus(404);
    }

    const visit = await VisitModel.findOneAndDelete({ _id: visitId, patient: id });

    if (!visit) {
      return res.sendStatus(404);
    }

    return res.status(200).json(visit);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
