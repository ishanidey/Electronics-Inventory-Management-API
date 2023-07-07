import express from 'express';
import {
    createPurchase,
    getAllPurchases,
    getCustomerBalance,
    updateCustomerAmountPaid,
    getWeeklyPurchaseAndTopProducts,
    getProductPerformance,
    getRevenueBreakdown
} from '../controllers/purchase';

export default (router: express.Router) => {
    router.post('/purchase', createPurchase);
    router.get('/purchase', getAllPurchases);
    router.get('/getcustomerbalance',getCustomerBalance);
    router.patch('/updatepayment',updateCustomerAmountPaid);
    router.get('/purchases/weekly', getWeeklyPurchaseAndTopProducts);
    router.get('/purchase/performance/:productId', getProductPerformance);
    router.get('/purchase/revenue', getRevenueBreakdown);
};

