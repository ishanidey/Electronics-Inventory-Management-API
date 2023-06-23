import express, { Request, Response } from 'express';
import { ProductModel } from '../db/products';

const router = express.Router();

// Render the products page
router.get('/find-all-products', async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();
    res.render('products', { products }); // Render the 'products' template and pass the product data to it
  } catch (error) {
    console.log(error);
    res.status(500).send('Failed to fetch products');
  }
});

export default router;
