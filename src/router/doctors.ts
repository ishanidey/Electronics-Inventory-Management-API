import express from 'express';
import {
    createDoctor,
    getAllDoctors
} from '../controllers/doctors';

export default (router: express.Router) => {
    router.post('/doctors', createDoctor);
    router.get('/doctors', getAllDoctors);
};
