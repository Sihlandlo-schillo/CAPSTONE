import { insertOrderDB, getOrdersByUserDB } from '../model/ordersDB.js';
import { getItemPriceDB } from '../model/itemsDB.js'; // To fetch item price for order calculation

// Place a new order
const placeOrder = async (req, res) => {
  const { user_id, item_id, quantity } = req.body;

  try {
    // Fetch item price
    const item = await getItemPriceDB(item_id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    const totalAmount = item.price * quantity;
    await insertOrderDB(user_id, item_id, quantity, totalAmount);

    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error placing order" });
  }
};

// Fetch orders for a user
const getUserOrders = async (req, res) => {
  try {
    const orders = await getOrdersByUserDB(req.params.user_id);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders" });
  }
};

export { placeOrder, getUserOrders };

