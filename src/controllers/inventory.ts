import express from 'express';
import { ProductModel } from '../db/products';
import { InventoryModel } from '../db/inventory';

export const getAllProductsWithInventorys = async (req: express.Request, res: express.Response) => {
  try {

    const products = await ProductModel.find();
    const productInventorys = [];


    for (const product of products) {
      const inventorys = await InventoryModel.find({ product: product._id });
      const totalamountUsed = inventorys.reduce((total, inventory) => total + inventory.amountUsed, 0);
      productInventorys.push({ product, inventorys, totalamountUsed });
    }

    return res.status(200).json(productInventorys);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getProductInventorysById = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const inventorys = await InventoryModel.find({ product: id });
    const totalamountUsed = inventorys.reduce((total, inventory) => total + inventory.amountUsed, 0);
    return res.status(200).json({ product, inventorys, totalamountUsed });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


export const getProductInventorysByProductName = async (req: express.Request, res: express.Response) => {
  try {
    const { productName } = req.params;
    const decodedProductName = decodeURIComponent(productName); // Decode the URL-encoded product name

    const products = await ProductModel.find({ productName: decodedProductName });

    if (products.length === 0) {
      return res.sendStatus(404);
    }

    const productInventorys = [];

    for (const product of products) {
      const inventorys = await InventoryModel.find({ product: product._id });
      const totalamountUsed = inventorys.reduce((total, inventory) => total + inventory.amountUsed, 0);

      productInventorys.push({ product, inventorys, totalamountUsed });
    }

    return res.status(200).json(productInventorys);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};


export const getProductInventorysByPrice = async (req: express.Request, res: express.Response) => {
  try {
    const { price } = req.params;

    // Convert the price to a number
    const priceValue = parseFloat(price);

    // Check if the price is a valid number
    if (isNaN(priceValue)) {
      return res.status(400).json({ error: 'Invalid price' });
    }

    const products = await ProductModel.find({ price: { $lte: priceValue } });

    if (products.length === 0) {
      return res.sendStatus(404);
    }

    const productInventorys = [];

    for (const product of products) {
      const inventorys = await InventoryModel.find({ product: product._id });
      const totalamountUsed = inventorys.reduce((total, inventory) => total + inventory.amountUsed, 0);

      productInventorys.push({ product, inventorys, totalamountUsed });
    }

    return res.status(200).json(productInventorys);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};


export const getProductInventorysByStock = async (req: express.Request, res: express.Response) => {
  try {
    const { stock } = req.params;

    // Convert the stock to a number
    const stockValue = parseFloat(stock);

    // Check if the stock is a valid number
    if (isNaN(stockValue)) {
      return res.status(400).json({ error: 'Invalid stock' });
    }

    const products = await ProductModel.find({ stock: { $lte: stockValue } });

    if (products.length === 0) {
      return res.sendStatus(404);
    }

    const productInventorys = [];

    for (const product of products) {
      const inventorys = await InventoryModel.find({ product: product._id });
      const totalamountUsed = inventorys.reduce((total, inventory) => total + inventory.amountUsed, 0);

      productInventorys.push({ product, inventorys, totalamountUsed });
    }

    return res.status(200).json(productInventorys);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};



export const getProductInventorysByCategory = async (req: express.Request, res: express.Response) => {
  try {
    const { category } = req.params;
    const products = await ProductModel.find({ category });

    if (products.length === 0) {
      return res.sendStatus(404);
    }

    const productInventorys = [];

    for (const product of products) {
      const inventorys = await InventoryModel.find({ product: product._id });
      const totalamountUsed = inventorys.reduce((total, inventory) => total + inventory.amountUsed, 0);
      productInventorys.push({ product, inventorys, totalamountUsed});
    }

    return res.status(200).json(productInventorys);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};





export const createProductInventory = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { date, location, amountUsed } = req.body;

    const product = await ProductModel.findById(id);
    if (!product) {
      return res.sendStatus(404);
    }

    const inventory = await InventoryModel.create({
      product: id,
      date,
      location,
      amountUsed,
    });

    return res.status(201).json(inventory);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const updateProductInventoryById = async (req: express.Request, res: express.Response) => {
  try {
    const { id, inventoryId } = req.params;
    const { date, location, amountUsed } = req.body;

    const product = await ProductModel.findById(id);
    if (!product) {
      return res.sendStatus(404);
    }

    const inventory = await InventoryModel.findOneAndUpdate(
      { _id: inventoryId, product: id },
      { date, location, amountUsed },
      { new: true }
    );

    if (!inventory) {
      return res.sendStatus(404);
    }

    return res.status(200).json(inventory);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const deleteProductInventoryById = async (req: express.Request, res: express.Response) => {
  try {
    const { id, inventoryId } = req.params;

    const product = await ProductModel.findById(id);
    if (!product) {
      return res.sendStatus(404);
    }

    const inventory = await InventoryModel.findOneAndDelete({ _id: inventoryId, product: id });

    if (!inventory) {
      return res.sendStatus(404);
    }

    return res.status(200).json(inventory);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const updateProductStock = async (req: express.Request, res: express.Response) => {
  try {
    // Retrieve all products
    const products = await ProductModel.find();

    // Iterate over each product
    for (const product of products) {
      // Search for inventory records of the product
      const inventories = await InventoryModel.find({ product: product._id });

      // Calculate the total amount used
      let totalAmountUsed = 0;
      for (const inventory of inventories) {
        totalAmountUsed += inventory.amountUsed;
      }

      // Update the product stock
      product.stock = totalAmountUsed;

      // Save the updated product
      await product.save();
    }

    console.log('Product stock updated successfully');
  } catch (error) {
    console.error('Failed to update product stock:', error);
  }
};
