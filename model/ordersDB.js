import { pool } from '../config/database.js'; // Assuming you're using a MySQL pool

// Insert a new order
const insertOrderDB = async (user_id, item_id, quantity, total_amount) => {
  const [result] = await pool.query(
    'INSERT INTO orders (user_id, item_id, quantity, total_amount, status) VALUES (?, ?, ?, ?, ?)',
    [user_id, item_id, quantity, total_amount, 'pending']
  );
  return result;
};

// Fetch orders for a user
const getOrdersByUserDB = async (user_id) => {
  const [orders] = await pool.query('SELECT * FROM orders WHERE user_id = ?', [user_id]);
  return orders;
};

export { insertOrderDB, getOrdersByUserDB };
