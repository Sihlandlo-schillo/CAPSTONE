// IMPORT POOL SO I CAN WRITE THE SQL Commands
import {pool} from '../config/config.js'

const getItemsDB = async()=>{
    let [data] = await pool.query('SELECT * FROM items')
    return data
}
const getItemDB = async (id)=>{
    //add the [] on '[data]'for removing the array square bracket
    let [[data]] = await pool.query('SELECT * FROM items WHERE items_id = ?',[id])
    return data
}

const insertItemDB= async(item_name, category,brand, quantity, price)=>{
    let [data] = await pool.query('INSERT INTO items (item_name,category,brand, quantity, price) VALUES (?,?,?,?,?)',[item_name, category, brand, quantity, price])
    return data
}

const deleteItemDB= async (id)=>{
    // we don't have to have 'let = [data] ...' as we only deleting, we don't want it to return anything as fetch
    let [data] = await pool.query('DELETE FROM items WHERE items_id = ?',[id])
    return data
}

const updateItemDB = async (item_name,category,brand, quantity, price ,id)=>{
    let [data] = await pool.query('UPDATE Items SET item_name = ?, category = ?, brand = ?, , quantity = ?, price = ? WHERE items_id = ?', [item_name,category,brand,, quantity, price, id])
    return data
}
const addToOrdersDB = async (items_id,users_id)=>{
    await pool.query('INSERT INTO orders (users_id,items_id) VALUES(?,?)', [users_id,items_id])
}

export {getItemsDB, getItemDB, insertItemDB, deleteItemDB, updateItemDB, addToOrdersDB}