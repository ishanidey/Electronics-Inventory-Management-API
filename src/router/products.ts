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

export default (router: express.Router) => {
  router.get('/products', getAllProducts);
  router.get('/products/id/:id', getProductById);
  router.get('/products/category/:category',getProductsByCategory);
  router.get('/products/name/:firstName', getProductByProductName);
  router.get('/stock/alerts', checkStockLevels);
  router.post('/products', createProduct);
  router.patch('/products/id/:id', updateProductById);
  router.patch('/products/name/:firstName', updateProductByProductName);
  router.delete('/products/:id', deleteProductById);
};

