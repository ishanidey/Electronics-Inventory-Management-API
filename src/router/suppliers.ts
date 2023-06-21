import express from 'express';
import {
    createSupplier,
    getAllSuppliers
} from '../controllers/suppliers';

export default (router: express.Router) => {
    router.post('/suppliers', createSupplier);
    router.get('/suppliers', getAllSuppliers);
};
