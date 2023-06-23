import express from 'express';
import productsRouter from './products';
import inventorysRouter from './inventory';
import roomsRouter from './rooms';
import suppliersRouter from './suppliers';
import appointmentsRouter from './orders';
import clientRouter from './client'; // Import the new client router
import findProductsRouter from './findProducts';

export default () => {
  const router = express.Router();
  productsRouter(router);
  inventorysRouter(router);
  roomsRouter(router);
  suppliersRouter(router);
  appointmentsRouter(router);
  router.use(clientRouter); // Add the new client router to the main router
  return router;
};
