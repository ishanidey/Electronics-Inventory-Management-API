import express from 'express';
import mongoose from 'mongoose';
import { AppointmentModel } from '../db/appointments';
import { PatientModel } from '../db/patients';
import { DoctorModel } from '../db/doctors';

export const createAppointment = async (req: express.Request, res: express.Response) => {
    try {
      const { patientId, doctorId, date, time } = req.body;
  
      console.log('Request Body:', req.body);
  
      // Check if patient exists
      const existingPatient = await PatientModel.findById(patientId);
      console.log('Existing Patient:', existingPatient);
  
      if (!existingPatient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      // Check if doctor exists
      const existingDoctor = await DoctorModel.findById(doctorId);
      console.log('Existing Doctor:', existingDoctor);
  
      if (!existingDoctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      // Create a new appointment instance
      const newAppointment = new AppointmentModel({
        patient: existingPatient._id,
        doctor: existingDoctor._id,
        date,
        time,
      });
  
      // Save the new appointment to the database
      const savedAppointment = await newAppointment.save();
  
      console.log('Saved Appointment:', savedAppointment);
  
      return res.status(201).json(savedAppointment);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };
  
  export const getAppointments = async (req: express.Request, res: express.Response) => {
    try {
      const appointments = await AppointmentModel.find()
        .populate('patient', 'firstName lastName')
        .populate('doctor', 'firstName lastName');
  
      return res.json(appointments);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };
  