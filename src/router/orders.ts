import express from 'express';
import { getAllLogs } from '../controllers/log';
import {
    createOrder,
    getOrders,
    getOrderStatus,
    updateOrderStatus,
    getOrdersByStatus,
    analyzeOrdersbySalesTrends,
    deleteOrderById
} from '../controllers/orders';

export default (router: express.Router) => {
    router.post('/orders', createOrder);
    router.get('/orders', getOrders);
    router.get('/orders/:id',getOrderStatus);
    router.patch('/orders/:orderId', updateOrderStatus);
    router.get('/orders/status/:status',getOrdersByStatus);
    router.get('/orders/sales/trends',analyzeOrdersbySalesTrends);
    router.get('/logs',getAllLogs);
    router.delete('/orders/:id',deleteOrderById);
};
