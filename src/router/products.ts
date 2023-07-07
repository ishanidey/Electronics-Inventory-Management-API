import express from 'express';
import {
  getAllProducts,
  getProductById,
  getProductByProductName,
  getProductsByCategory,
  createProduct,
  updateProductById,
  updateProductByProductName,
  checkStockLevels,
  deleteProductById
} from '../controllers/products';
import { getNotifications } from '../controllers/notification';

export default (router: express.Router) => {
  router.get('/products', getAllProducts);
  router.get('/products/id/:id', getProductById);
  router.get('/products/category/:category',getProductsByCategory);
  router.get('/products/name/:productName', getProductByProductName);
  router.get('/stock/alerts', checkStockLevels);
  router.post('/products', createProduct);
  router.patch('/products/id/:id', updateProductById);
  router.patch('/products/name/:productName', updateProductByProductName);
  router.delete('/products/:id', deleteProductById);
  router.get('/notifications',getNotifications);
};

