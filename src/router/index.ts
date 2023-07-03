import express from 'express';
import productsRouter from './products';
import inventorysRouter from './inventory';
import roomsRouter from './rooms';
import suppliersRouter from './suppliers';
import appointmentsRouter from './orders';
import findProductsRouter from './findProducts';
import purchaseRouter from './purchase';

export default () => {
  const router = express.Router();
  productsRouter(router);
  inventorysRouter(router);
  roomsRouter(router);
  suppliersRouter(router);
  appointmentsRouter(router);
  purchaseRouter(router);
  return router;
};
