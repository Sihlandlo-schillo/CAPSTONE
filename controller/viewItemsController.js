import {
    getItemsDB,
    getItemDB,
    insertItemDB,
    deleteItemDB,
    updateItemDB,
    
  } from "../model/itemsDB.js";
  import { hash } from "bcrypt";
  
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
      const Item = await getItemDB(req.params.email) // Assuming you're fetching by Itemname
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
    let { name, surname, email, ItemRole, password } = req.body;
  
    // (password, salt)
    try {

        const existingItem = await loginItemDB(email);
    if (existingItem) {
      return res.status(409).json({ message: "Email already exists" });
    }

      hash(password, 10, async (err, hashedP) => {
          if (err) {
              return res.status(500).json({ error: 'Error hashing password'});
          }
          console.log(hashedP);
  
          await insertItemDB(name, surname, email, ItemRole, hashedP);
          res.status(201).send("Data was inserted successfully");
      })
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
    let {name, surname,email, ItemRole, password} = req.body
    try {                                                                               
        let Items = await getItemDB(req.params.id)
        // console.log(peer);
       name?name=name: name = Items.name
       surname ?surname=surname: surname = Items.surname
       email ?email=email: email = Items.email
       ItemRole ?ItemRole=ItemRole: ItemRole = Items.ItemRole
       password ?password=password: password = Items.password
    
       await  updateItemDB(name,surname,email,ItemRole,password,req.params.id)
       res.status(200).json({ message: "Item updated successfully" });
        
    } catch (error) {
        res.status(500).json({ error: "Error occurred while updating Item" });
    }


  };
  
  export { fetchItems, getItem, insertItem, deleteItem, updateItem, loginItem };