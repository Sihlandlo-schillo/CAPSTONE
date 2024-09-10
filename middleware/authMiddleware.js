import { compare } from "bcrypt"
import { loginUserDB } from "../model/usersDB.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config()

// const hashedPassword = 'password'

const checkUser = async (req,res,next)=>{
    
    const {email,password} = req.body

    try{
        //Retrieve the user from the database
        const user = await loginUserDB(email)
        console.log(user);
        

        // check if user exists
        if(!user){
        return res.status(404).send('Incorrect log in details')
        }
        let hashedPassword = user.password

        console.log(hashedPassword); 
        compare(password,hashedPassword,(err,result)=>{
            if (err) {
                return res.status(500).send('Error comparing passwords')
            }

            if(result==true){

                let token = jwt.sign({email:email},process.env.SECRET_KEY,{expiresIn:'1h'})
            
                console.log(token);
                // res.json({ token });
                req.body.token = token
                
                next()
              
            }else{
                return res.status(401).send('Incorrect loggin details')
            }
        })
    }catch(err){
        return res.status(500).send('Database error')
    }
  

}

// const verifyAToken = (req, res, next) => {
//     let token;

//     // Check if token exists in cookies
//     const { cookie } = req.headers;
//     if (cookie) {
//         token = cookie.split('=')[1];
//     }

//     // Check if token exists in Authorization header (Bearer token)
//     if (!token && req.headers.authorization) {
//         token = req.headers.authorization.split(' ')[1];
//     }

//     // If no token is found
//     if (!token) {
//         return res.status(403).json({ message: 'Missing Token' });
//     }

//     // Verify token
//     jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ message: 'Invalid Token or token expired' });
//         } else {
//             req.body.user = decoded.email;
//             console.log(decoded);
//             next();
//         }
//     });
// };

const verifyAToken = (req, res, next) => {
    let {cookie} = req.headers

    let token = cookie && cookie.split('=')[1]

    if (!token) {
        return res.status(403).json({ message: 'Missing Token' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid Token' });
        } else {
            req.body.user = decoded.email;
            next();
        }
    });
};

export {checkUser, verifyAToken}