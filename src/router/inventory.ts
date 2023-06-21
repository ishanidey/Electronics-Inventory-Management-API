import express from 'express';
import {
    getAllProductsWithInventorys,
    getProductInventorysById,
    createProductInventory,
    updateProductInventoryById,
    deleteProductInventoryById,
    getProductInventorysByFirstName,
    getProductInventorysByContact,
    getProductInventorysByStock,
    getProductInventorysByCategory
} from '../controllers/inventory';

export default (router: express.Router) => {
    router.get('/products/inventory', getAllProductsWithInventorys);
    router.get('/products/inventory/:id', getProductInventorysById);
    router.get('/products/inventory/contact/:contact', getProductInventorysByContact);
    router.get('/products/inventory/name/:firstName', getProductInventorysByFirstName);
    router.get('/products/inventory/age/:age', getProductInventorysByStock);
    router.get('/products/inventory/gender/:gender', getProductInventorysByCategory);
    router.post('/products/inventory/:id', createProductInventory);
    router.patch('/products/inventory/:id/:inventoryId', updateProductInventoryById);
    router.delete('/products/inventory/:id/:inventoryId', deleteProductInventoryById);
};

