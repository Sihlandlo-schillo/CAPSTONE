import express from 'express';
import { placeOrder, getUserOrders } from '../controller/orderItemsController.js';

const router = express.Router();

router.post('/orders', placeOrder); // Place a new order
router.get('/orders/:user_id', getUserOrders); // Fetch orders for a specific user

export default router;
