import {
    getUsersDB,
    getUserDB,
    insertUserDB,
    deleteUserDB,
    updateUserDB,
    loginUserDB,
  } from "../model/usersDB.js";
  import { hash } from "bcrypt";
  
  const fetchUsers = async (req, res) => {
    try {
      const users = await getUsersDB();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: "Errror occured while fetching users" });
    }
  };
  const getUser = async (req, res) => {
    try {
      const user = await getUserDB(req.params.id) 
      console.log(req.params.id);
      // Assuming you're fetching by username
      // res.json(await getUserDB(req.params.id))
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Error occured while fetching user" });
    }
  };
  const insertUser = async (req, res) => {
    // console.log(req.headers.cookie.split('=')[1]);
    let { name, surname, email, userRole, password } = req.body;
  
    // (password, salt)
    try {

        const existingUser = await loginUserDB(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

      hash(password, 10, async (err, hashedP) => {
          if (err) {
              return res.status(500).json({ error: 'Error hashing password'});
          }
          console.log(hashedP);
  
          await insertUserDB(name, surname, email, userRole, hashedP);
          res.status(201).send("Data was inserted successfully");
      })
    } catch (error) {
      res.status(500).json({ error: 'Error inserting user'})
    }
  };
  
  const deleteUser = async (req, res) => {
    // res.json(await deleteUserDB(req.params.id));
    try {
        const result = await deleteUserDB(req.params.id);
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "User not found" }); 
        }
        res.status(200).json({ message: "User deleted successfully" });  
      } catch (err) {
        res.status(500).json({ error: "Error occurred while deleting user" });
      }
  };
  
  const updateUser = async (req, res) => {
    // res.json(await updateUserDB(req.params.id));
    let {name, surname,email, userRole, password} = req.body
    try {                                                                               
        let users = await getUserDB(req.params.id)
        // console.log(peer);
       name?name=name: name = users.name
       surname ?surname=surname: surname = users.surname
       email ?email=email: email = users.email
       userRole ?userRole=userRole: userRole = users.userRole
       password ?password=password: password = users.password
    
       await  updateUserDB(name,surname,email,userRole,password,req.params.id)
       res.status(200).json({ message: "User updated successfully" });
        
    } catch (error) {
        res.status(500).json({ error: "Error occurred while updating user" });
    }


  };
  
  const loginUser = async (req, res) => {
    res.status(200).json({
      message: "You have signed In Successfully",
      token: req.body.token,
    });
  };
  
  export { fetchUsers, getUser, insertUser, deleteUser, updateUser, loginUser };
  