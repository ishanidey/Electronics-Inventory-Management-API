import express from 'express';
import {
    getAllProductsWithInventorys,
    getProductInventorysById,
    createProductInventory,
    updateProductInventoryById,
    deleteProductInventoryById,
    getProductInventorysByProductName,
    getProductInventorysByPrice,
    getProductInventorysByStock,
    getProductInventorysByCategory,
    updateProductStock
} from '../controllers/inventory';

export default (router: express.Router) => {
    router.get('/products/inventory', getAllProductsWithInventorys);
    router.get('/products/inventory/:id', getProductInventorysById);
    router.get('/products/inventory/price/:price', getProductInventorysByPrice);
    router.get('/products/inventory/name/:productName', getProductInventorysByProductName);
    router.get('/products/inventory/stock/:stock', getProductInventorysByStock);
    router.get('/products/inventory/category/:category', getProductInventorysByCategory);
    router.post('/products/inventory/:id', createProductInventory);
    router.patch('/products/inventory/:id/:inventoryId', updateProductInventoryById);
    router.delete('/products/inventory/:id/:inventoryId', deleteProductInventoryById);
    router.patch('/inventory/stock',updateProductStock);
};

