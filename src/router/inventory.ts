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
    router.get('/inventory', getAllProductsWithInventorys);
    router.get('/inventory/:id', getProductInventorysById);
    router.get('/inventory/price/:price', getProductInventorysByPrice);
    router.get('/inventory/name/:productName', getProductInventorysByProductName);
    router.get('/inventory/stock/:stock', getProductInventorysByStock);
    router.get('/inventory/category/:category', getProductInventorysByCategory);
    router.post('/inventory/:id', createProductInventory);
    router.patch('/inventory/:id/:inventoryId', updateProductInventoryById);
    router.delete('/inventory/:id/:inventoryId', deleteProductInventoryById);
    router.patch('/inventory/stock',updateProductStock);
};

