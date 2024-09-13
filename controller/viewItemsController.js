import {
    getItemsDB,
    getItemDB,
    insertItemDB,
    deleteItemDB,
    updateItemDB,
    addToOrdersDB,
    getOrdersByUserDB
  } from "../model/itemsDB.js";
  import { getUserDB } from "../model/usersDB.js";

  
  const fetchItems = async (req, res) => {
    try {
      const Items = await getItemsDB();
      res.json(Items);
    } catch (err) {
      res.status(500).json({ error: "Errror occured while fetching Items" });
    }
  };
  const getItem = async (req, res) => {
    try {
      const Item = await getItemDB(req.params.id) 
      // res.json(await getItemDB(req.params.id))
      if (!Item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json(Item);
    } catch (err) {
      res.status(500).json({ error: "Error occured while fetching Item" });
    }
  };
  const insertItem = async (req, res) => {
    // console.log(req.headers.cookie.split('=')[1]);
    let { item_name, category, brand, quantity, price } = req.body;
  
    try {

        const existingItem = await getItemDB(item_name);
    if (existingItem) {
      return res.status(409).json({ message: "Product already exists" });
    }
          await insertItemDB(item_name, category,brand, quantity, price);
          res.status(201).send("Data was inserted successfully");

    } catch (error) {
      res.status(500).json({ error: 'Error inserting Item'})
    }
  };
  
  const deleteItem= async (req, res) => {
    // res.json(await deleteItemDB(req.params.id));
    try {
        const result = await deleteItemDB(req.params.id);
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Item not found" }); 
        }
        res.status(200).json({ message: "Item deleted successfully" });  
      } catch (err) {
        res.status(500).json({ error: "Error occurred while deleting Item" });
      }
  };
  
  const updateItem = async (req, res) => {
    // res.json(await updateItemDB(req.params.id));
    let {item_name, category,brand, quantity, price} = req.body
    try {                                                                               
        let items = await getItemDB(req.params.id)
        // console.log(items);
       item_name?item_name=item_name: item_name = items.item_name
       category ?category=category: category = items.category
       brand ?brand=brand: brand = items.brand
       quantity ?quantity=quantity: quantity = items.quantity
       price ?price=price: price = items.price
    
       await  updateItemDB(item_name, category,brand, quantity, price,req.params.id)
       res.status(200).json({ message: "Item updated successfully" });
        
    } catch (error) {
        res.status(500).json({ error: "Error occurred while updating Item" });
    }
  };

  const addToOrders = async (req, res) => {
    try {
      console.log(req.body);
  
      // Retrieve user by email or identifier (req.body.user)
      const user = await getUserDB(req.body.users_id);
      console.log(user);
  
      // Check if user is found
      if (!user || !user.users_id) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Extract items_id from req.body
      const { items_id } = req.body; // Ensure items_id is passed in the request body
  
      const item = await getItemDB(items_id);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
  
      // Destructure users_id safely
      const { users_id } = user;
  
      console.log(users_id);
  
      // Add item to orders
      await addToOrdersDB(req.body.id, user.users_id);
  
      await addToOrdersDB( users_id, item.items_id);
  
      res.json({ message: 'You have ordered an item successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while processing the order' });
    }
  };
  
  

//   const addToOrders = async(req,res)=>{
//     console.log(req.body);
//     let user = await getUserDB(req.body.user)
//     console.log(user); // this returns undefined

//     let {users_id} = await getUserDB(req.body.user)
//     console.log(users_id);
    
//     await addToOrdersDB(req.body.id, users_id)
//     res.json({message:'You have ordered an item successfully'})
// }

// ORDERS CONTROLLER


// // Fetch orders for a user
const getUserOrders = async (req, res) => {
  try {
    const orders = await getOrdersByUserDB(req.params.user_id);
    res.json(orders);

  } catch (error) {
    res.status(500).json({ error: "Error fetching orders" });
  }
 };

//  export { placeOrder,  };

  export { fetchItems, getItem, insertItem, deleteItem, updateItem, addToOrders, getUserOrders };