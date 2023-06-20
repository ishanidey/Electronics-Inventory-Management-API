import express from 'express';
import {
  getAllPatients,
  getPatientById,
  getPatientByFirstName,
  createPatient,
  updatePatientById,
  updatePatientByFirstName,
  deletePatientById
} from '../controllers/patients';

export default (router: express.Router) => {
  router.get('/patients', getAllPatients);
  router.get('/patients/id/:id', getPatientById);
  router.get('/patients/name/:firstName', getPatientByFirstName);
  router.post('/patients', createPatient);
  router.patch('/patients/id/:id', updatePatientById);
  router.patch('/patients/name/:firstName', updatePatientByFirstName);
  router.delete('/patients/:id', deletePatientById);
};
