import express from 'express'
import cors from 'cors'
// import the router

import usersRouter from './routes/usersRouter.js'
import itemsRouter from './routes/itemsRouter.js'

let port = process.env.PORT || 6262

const app = express()
app.use(express.static('public')) // Don't know what it is for
app.use(express.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Request-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next();
  });
app.use(cors())                                                                                                                                 

//use the router
app.use('/users', usersRouter)
app.use('/items', itemsRouter)

app.listen(port,()=>{
    console.log('http://localhost:' +port);
})
