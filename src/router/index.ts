import express from 'express';
import patientsRouter from './patients';

export default () => {
  const router = express.Router();
  patientsRouter(router);
  return router;
};
