// import { pool } from '../config/database.js'; // Assuming you're using a MySQL pool

// // Insert a new order
const insertOrderDB = async (users_id, items_id, quantity, total_amount) => {
  const [result] = await pool.query(
    'INSERT INTO orders (users_id, items_id, quantity, total_amount, status) VALUES (?, ?, ?, ?, ?)',
    [users_id, items_id, quantity, total_amount, 'pending']
  );
  return result;
};

// // Fetch orders for a user


// export { insertOrderDB, getOrdersByUserDB };
