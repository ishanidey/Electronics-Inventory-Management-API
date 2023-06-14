import express from 'express';
import {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatientById,
  deletePatientById
} from '../controllers/patients';

export default (router: express.Router) => {
  router.get('/patients', getAllPatients);
  router.get('/patients/:id', getPatientById);
  router.post('/patients', createPatient);
  router.patch('/patients/:id', updatePatientById);
  router.delete('/patients/:id', deletePatientById);
};
