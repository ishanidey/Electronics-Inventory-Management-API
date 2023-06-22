import express from 'express';
import { createPurchase, getAllPurchases } from '../controllers/purchase';

const router = express.Router();

// Handle the purchase form submission
router.post('/', createPurchase);

router.get('/all',getAllPurchases);

export default router;
