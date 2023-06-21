import express from 'express';
import { ProductModel } from '../db/products';

export const getAllProducts = async (req: express.Request, res: express.Response) => {
  try {
    const products = await ProductModel.find();
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getProductById = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);

    if (!product) {
      return res.sendStatus(404);
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getProductByProductName = async (req: express.Request, res: express.Response) => {
  try {
    const { productName } = req.params;
    const product = await ProductModel.findOne({ productName });

    if (!product) {
      return res.sendStatus(404);
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getProductsByCategory = async (req: express.Request, res: express.Response) => {
  try {
    const { category } = req.params;
    const products = await ProductModel.find({ category });

    if (products.length === 0) {
      return res.sendStatus(404);
    }

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};



export const createProduct = async (req: express.Request, res: express.Response) => {
  try {
    const { productName, brandName, stock, category, price } = req.body;

    if (!productName || !stock || !category || !price) {
      return res.sendStatus(400);
    }

    const product = await ProductModel.create({ productName,brandName, stock, category, price });

    return res.status(201).json(product);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error, price already exists
      return res.status(400).json({ error: 'Person with price already exists' });
    }
    console.log(error);
    return res.sendStatus(500);
  }
};


export const updateProductById = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { productName,brandName, stock, category, price } = req.body;

    if (!productName || !stock || !category || !price) {
      return res.sendStatus(400);
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { productName, brandName, stock, category, price },
      { new: true }
    );

    if (!updatedProduct) {
      return res.sendStatus(404);
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const updateProductByProductName = async (req: express.Request, res: express.Response) => {
  try {
    const { productName: paramProductName } = req.params;
    const { productName, brandName, stock, category, price } = req.body;

    if (!paramProductName || !stock || !category || !price) {
      return res.sendStatus(400);
    }

    const updatedProduct = await ProductModel.findOneAndUpdate(
      { productName: paramProductName },
      { productName, brandName, stock, category, price },
      { new: true }
    );

    if (!updatedProduct) {
      return res.sendStatus(404);
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};




export const deleteProductById = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.sendStatus(404);
    }

    return res.status(200).json(deletedProduct);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
