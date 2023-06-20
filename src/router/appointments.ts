import express from 'express';
import {
    createAppointment,
    getAppointments
} from '../controllers/appointments';

export default (router: express.Router) => {
    router.post('/appointments', createAppointment);
    router.get('/appointments', getAppointments);
};
