import express from 'express';
import {
    createPurchase,
    getAllPurchases,
    getCustomerBalance,
    updateCustomerAmountPaid
} from '../controllers/purchase';

export default (router: express.Router) => {
    router.post('/purchase', createPurchase);
    router.get('/purchase', getAllPurchases);
    router.get('/getcustomerbalance',getCustomerBalance);
    router.patch('/updatepayment',updateCustomerAmountPaid);
};

