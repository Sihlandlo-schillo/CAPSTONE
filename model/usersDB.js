// LEMME USE THE SHORT WAY OF IMPORTING pool
import { pool } from "../config/config.js";

const getUsersDB = async () => {
  let [data] = await pool.query("SELECT * FROM users");
  return data;
};

const getUserDB = async (id) => {
  //add the [] on '[data]'for removing the array square bracket
  let [[data]] = await pool.query("SELECT * FROM users WHERE users_id = ?", [
    id,
  ]);
  return data;
};
const loginUserDB = async (email) => {
  //add the [] on '[data]'for removing the array square bracket
  let [[data]] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return data;
};

const insertUserDB = async (
  name,
  surname,
  email,
  userRole = null,
  password
) => {
  // If userRole is null, omit it from the query so the default value is used
  const query = userRole
    ? "INSERT INTO users (name, surname, email, userRole, password) VALUES (?, ?, ?, ?, ?)"
    : "INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)";

  const params = userRole
    ? [name, surname, email, userRole, password]
    : [name, surname, email, password];

  let [data] = await pool.query(query, params);
  return data;
};

const deleteUserDB = async (id) => {
  // we don't have to have 'let = [data] ...' as we only deleting, we don't want it to return anything as fetch
  let [data] = await pool.query("DELETE FROM users WHERE users_id = ?", [id]);
  return data;
};

const updateUserDB = async (name, surname, email, userRole, password, id) => {
  let [data] = await pool.query(
    "UPDATE users SET name = ?, surname = ?, email = ?, userRole = ?, password = ? WHERE users_id = ?",
    [name, surname, email, userRole, password, id]
  );
  return data;
};

export {
  getUsersDB,
  getUserDB,
  loginUserDB,
  insertUserDB,
  deleteUserDB,
  updateUserDB,
};
