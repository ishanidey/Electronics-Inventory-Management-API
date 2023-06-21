import express from 'express';
import productsRouter from './products';
import inventorysRouter from './inventory';
import roomsRouter from './rooms';
import suppliersRouter from './suppliers';
import appointmentsRouter from './appointments';

export default () => {
  const router = express.Router();
  productsRouter(router);
  inventorysRouter(router);
  roomsRouter(router);
  suppliersRouter(router);
  appointmentsRouter(router);
  return router;
};
