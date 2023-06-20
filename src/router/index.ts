import express from 'express';
import patientsRouter from './patients';
import visitsRouter from './visits';
import roomsRouter from './rooms';
import doctorsRouter from './doctors';
import appointmentsRouter from './appointments';

export default () => {
  const router = express.Router();
  patientsRouter(router);
  visitsRouter(router);
  roomsRouter(router);
  doctorsRouter(router);
  appointmentsRouter(router);
  return router;
};
