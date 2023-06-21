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
      return res.sendStatus(404);
    }

    const inventorys = await InventoryModel.find({ product: id });
    const totalamountUsed = inventorys.reduce((total, inventory) => total + inventory.amountUsed, 0);
    return res.status(200).json({ product, inventorys, totalamountUsed });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getProductInventorysByFirstName = async (req: express.Request, res: express.Response) => {
  try {
    const { productName } = req.params;
    const products = await ProductModel.find({ productName });

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

export const getProductInventorysByContact = async (req: express.Request, res: express.Response) => {
  try {
    const { price } = req.params;
    const product = await ProductModel.findOne({ price });

    if (!product) {
      return res.sendStatus(404);
    }

    const inventorys = await InventoryModel.find({ product: product._id }); // Use product._id instead of productName
    const totalamountUsed = inventorys.reduce((total, inventory) => total + inventory.amountUsed, 0);
    return res.status(200).json({ product, inventorys, totalamountUsed});
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getProductInventorysByStock = async (req: express.Request, res: express.Response) => {
  try {
    const { stock} = req.params;
    const products = await ProductModel.find({ stock });

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
