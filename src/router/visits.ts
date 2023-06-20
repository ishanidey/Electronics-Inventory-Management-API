import express from 'express';
import {
    getAllPatientsWithVisits,
    getPatientVisitsById,
    createPatientVisit,
    updatePatientVisitById,
    deletePatientVisitById,
    getPatientVisitsByFirstName,
    getPatientVisitsByContact,
    getPatientVisitsByAge,
    getPatientVisitsByGender
} from '../controllers/visits';

export default (router: express.Router) => {
    router.get('/patients/visit', getAllPatientsWithVisits);
    router.get('/patients/visit/:id', getPatientVisitsById);
    router.get('/patients/visit/contact/:contact', getPatientVisitsByContact);
    router.get('/patients/visit/name/:firstName', getPatientVisitsByFirstName);
    router.get('/patients/visit/age/:age', getPatientVisitsByAge);
    router.get('/patients/visit/gender/:gender', getPatientVisitsByGender);
    router.post('/patients/visit/:id', createPatientVisit);
    router.patch('/patients/visit/:id/:visitId', updatePatientVisitById);
    router.delete('/patients/visit/:id/:visitId', deletePatientVisitById);
};
