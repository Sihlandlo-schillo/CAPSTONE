import express from 'express';
import { addToOrders,getUserOrders } from '../controller/orderItemsController.js';

const router = express.Router();

router.post('/orders',verifyAToken, addToOrders)
router.get('/orders/:user_id', getUserOrders); // Fetch orders for a specific user

export default router;
