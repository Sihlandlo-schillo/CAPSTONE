import { compare } from "bcrypt"
import { loginUserDB } from "../model/usersDB.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config()

// const hashedPassword = 'password'

const checkUser = async (req,res,next)=>{
    
    const {email,password} = req.body

    try{
        //Retrieve the use from the database
        const user = await loginUserDB(email)

        // check if user exists
        if(!user){
        return res.status(404).send('User with that email not found, Try adding a correct email address or sign up')
        }
        let hashedPassword = user.password

        console.log(hashedPassword); // can comment out this when i see everything works

        // Compare the provided password with the hashed password in the database

        compare(password,hashedPassword,(err,result)=>{
            if (err) {
                return res.status(500).send('Error comparing passwords')
            }

            if(result==true){

                // 'secret' doesn't what you write there

                let token = jwt.sign({email:email},process.env.SECRET_KEY,{expiresIn:'1h'})
                // res.json({token})
                console.log(token);
                req.body.token = token
                
                next()
               // return //take this 'return' to else
            }else{
                return res.status(401).send('Invalid password')
                // res.send('Wrong Password')
            }
        })
    }catch(err){
        return res.status(500).send('Database error')
    }
    // let result = compare(password, hashedPassword)
    // if(result == true){
    //     next()
    // }else{
    //     res.send('Wrong Password Insertion')
    // }


}

const verifyAToken = (req, res, next) => {
    let {cookie} = req.headers

    // checks if the token exists first
    let token = cookie && cookie.split('=')[1]

    if (!token) {
        return res.status(403).json({ message: 'Missing Token' })
    }

    // verify token 
    jwt.verify(token, process.env.SECRET_KEY,(err, decoded)=> {
        if(err){

            return res.status(403).json({message:'Invalid Token/ token expired'})
        
        }else{
            
            req.body.user = decoded.username
            console.log(decoded);
            next()
        }
    })
}

export {checkUser, verifyAToken}