import express from 'express';
import {
  getAllProducts,
  getProductById,
  getProductByProductName,
  getProductsByCategory,
  createProduct,
  updateProductById,
  updateProductByProductName,
  deleteProductById
} from '../controllers/products';

export default (router: express.Router) => {
  router.get('/products', getAllProducts);
  router.get('/products/id/:id', getProductById);
  router.get('/products/category/:category',getProductsByCategory);
  router.get('/products/name/:productName', getProductByProductName);
  router.post('/products', createProduct);
  router.patch('/products/id/:id', updateProductById);
  router.patch('/products/name/:productName', updateProductByProductName);
  router.delete('/products/:id', deleteProductById);
};

